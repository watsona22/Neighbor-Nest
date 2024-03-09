const Auth = require('../utils/auth.js')

const { User, Item, Category, Order } = require('../models/index.js');
// import stripe from 'stripe';

const resolvers = {
    Query: {
        categories: async () => {
            return await Category.find();
        },
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
        item: async (parent, { _id }) => {
            return await Item.findById(_id).populate('category');
        },
        user: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findById(context.user._id).populate({
                    path: 'orders.items',
                    populate: 'category'
                });

                user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

                return user;
            }

            throw new Auth.AuthenticationError
        },
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
        users: async () => {
            return await User.find();
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            console.log("logging out", args);
            try {

                const user = await User.create({
                    firstName: args.firstName,
                    lastName: args.lastName,
                    email: args.email,
                    password: args.password
                })
                const token = Auth.signToken(user);
                return { user, token }
            } catch (err) {
                console.log(err);

            }

        },
        updateUser: async (parent, args, context) => {
            if (context.user) {
                return await User.findByIdAndUpdate(context.user._id, args, { new: true });
            }

            throw Auth.AuthenticationError
        },
        addItem: async (parent, { userId, name, price, description }) => {
            try {
                const item = await Item.create({
                    name,
                    price,
                    description,
                    user: userId
                })
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
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            console.log(email);
            console.log(user);
            if (!user) {
                throw Auth.AuthenticationError
            }
            const correctPw = await user.isCorrectPassword(password);
            console.log(correctPw);

            if (!correctPw) {
                throw Auth.AuthenticationError
            }

            const token = Auth.signToken(user);

            return { token, user };
        }
    }
};
module.exports = resolvers