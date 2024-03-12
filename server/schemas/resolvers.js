const {AuthenticationError, signToken} = require('../utils/auth.js')
const stripe = require('stripe');
const { User, Item, Category, Order } = require('../models');
// import stripe from 'stripe';

const resolvers = {
    Query: {
        // This will get all categories - Tested
        categories: async () => {
            return await Category.find().populate('items')
        },
        category: async (parent, {_id}) => {
            return await Category.findById(_id).populate('items')
        },

        // This will get all items
        items: async (parent, { category, name }) => {
            const params = {}

            if (category) {
                params.category = category
            }
            if (name) {
                params.name = name
            };
            return await Item.find(params).populate('category')
        },
        // This will get a single item by its id
        item: async (parent, { _id }) => {
            return await Item.findById(_id);
        },
        // This will get all users - Tested
        users: async () => {
            return await User.find().populate('orders').populate('items');
            
        },
        // This will get single user???? - Fixed, has to be auth in context
        user: async (parent, args, context) => {
            // console.log(context.user._id);
            if (context.user) {
                const user = await User.findById(context.user._id)
                    .populate('items')
                    

                // user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

                return user;
            }

            throw AuthenticationError
        },
        // This will get a single order by its id
        order: async (parent, { _id }, context) => {
            if (context.user) {
                const user = await User.findById(context.user._id).populate({
                    path: 'orders.items',
                    populate: 'category'
                })
                return user.orders.id(_id);
            }
            throw AuthenticationError;
        },
        // This will checkout an order items
        checkout: async (parent, args, context) => {
            const url = new URL(context.headers.referer).origin;
            const order = new Order({ items: args.items });
            const line_items = []

            const { products } = await order.populate('products');

            for (i = 0; i < products.length; ++i) {
                const product = await stripe.products.create({
                    name: products[i].name,
                    description: products[i].description,
                    image: [`${url}/images/${products[i].image}`]
                });

                const price = await stripe.prices.create({
                    product: product.id,
                    unit_amount: products[i].price * 100,
                    currency: 'usd',
                });

                line_items.push({
                    price: price.id,
                    quantity: 1
                });
            }

            const session = await stripe.checkout.session.create({
                payment_method_types: ['card'],
                line_items,
                mode: 'payment',
                success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${url}/`
            });

            return { session: session.id }
        },
        
    },
    Mutation: {
        // This will add a user - Tested
        addUser: async (parent, args) => {
            try {

                const user = await User.create({
                    firstName: args.firstName,
                    lastName: args.lastName,
                    email: args.email,
                    password: args.password
                })
                const token = signToken(user);
                return { user, token }
            } catch (err) {
                console.log(err);

            }

        },
        updateUser: async (parent, args, context) => {
            if (context.user) {
                return await User.findByIdAndUpdate(context.user._id, args, { new: true });
            }

            throw AuthenticationError
        },
        // adds item to users  - Tested
        addItem: async (parent, { name, price, description }, context) => {
            try {
                if (!context.user) {
                    throw AuthenticationError
                }
                const item = await Item.create({
                    name,
                    price,
                    description,
                })
                 await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { items: item._id } },
                );
                return item;
            } catch (err) {
                console.log(err);
                throw new Error('Failed to add item. Please try again later.');

            }

        },

        removeItem: async (parent, { userId, itemId }) => {
            try {
                // Find the item to be removed
                const item = await Item.findByIdAndDelete(itemId);
                console.log(item)
                if (!item) {
                    throw new Error('Item not found.')
                };

                // Remove reference to user
                await User.updateOne(
                    { _id: userId },
                    { $pull: { Item: itemId } } // Remove the itemId
                );
                return { success: true, message: `Item "${item.name}" removed.` };
            } catch (error) {
                console.error(error);
                throw new Error('Failed to remove item.');
            }
        },
        addOrder: async (parent, { userId, items }) => {
            console.log(items);
            try {
                // Validate input
                if (!userId || !items || !Array.isArray(items) || items.length === 0) {
                    throw new Error('Invalid.');
                }
                // Create the order
                const order = await Order.create({
                    user: userId, // Associate the order with the user
                    items: items // Associate the order with the items
                });
                // Fetch the associated items
                const fetchedItems = await Item.find({ _id: { $in: items } });

                // Include the fetched items in the order object
                order.items = fetchedItems;
                console.log(order)
                return order; // Return the order object with associated items

            } catch (error) {
                console.error(error);
                throw new Error('Failed to add order.');
            }
        },
        //tested 
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            console.log(email);
            console.log(user);
            if (!user) {
                throw AuthenticationError
            }
            const correctPw = await user.isCorrectPassword(password);
            console.log(correctPw);

            if (!correctPw) {
                throw AuthenticationError
            }

            const token = signToken(user);

            return { token, user };
        }
    }
};
module.exports = resolvers