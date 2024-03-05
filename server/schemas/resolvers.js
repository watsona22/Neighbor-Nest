const Auth = require('../utils/auth.js')
const { User } = require('../models/index.js');
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
        addUser: async (parent, args, context) => {
            const user = await User.create({ 
                name: args.name,
                 username: args.username,
                  email: args.email,
                   password: args.password
                })
                const token = Auth.signToken(user);
                return { user, token}

        },
        // addUser: async (parent, { products }, context) => {
        //     if (context.user) {
        //         const order = new Order({ products });

        //         await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });

        //         return order;
        //     }

        //     throw AuthenticationError;
        // },
        updateUser: async (parent, args, context) => {
            if (context.user) {
                return await User.findByIdAndUpdate(context.user._id, args, { new: true });
            }

            throw Auth.AuthenticationError
        },
        // updateProduct: async (parent, { _id, quantity }) => {
        //     const decrement = Math.abs(quantity) * -1;

        //     return await Item.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
        // },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw Auth.AuthenticationError
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw Auth.AuthenticationError
            }

            const token = Auth.signToken(user);

            return { token, user };
        }
    }
};
module.exports = resolvers