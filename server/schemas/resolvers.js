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
                const item = await Item.findByIdAndDelete({ _id: itemId });
                console.log(item)
                if (!item) {
                    throw new Error('Item not found.')
                };

                // Remove reference to user
                await User.updateOne(
                    { _id: userId },
                    { $pull: { Item: itemId } } // Remove the itemId
                );

                return { success: true, message: 'Item removed.' };
            } catch (error) {
                console.error(error);
                throw new Error('Failed to remove item.');
            }
        },
        addOrder: async (parent, { userId, itemId }) => {
            try {
                // Validate input parameters
                if (!userId || !itemId || !Array.isArray(itemId) || itemIds.length === 0) {
                    throw new Error('Invalid input parameters.');
                }

                // Create the order
                const order = await Order.create({
                    user: userId, // Associate the order with the user
                    items: itemId // Associate the order with the items
                });

                return order;
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