// import user model
import { User } from '../models';
// import sign token function from auth
import { signToken } from '../utils/auth';

module.exports = {

    // create a user, sign a token, and send it back (to client/src/components/SignUpForm.js)
    async createUser({ body }, res) {
        const user = await User.create(body);

        if (!user) {
            return res.status(400).json({ message: 'Something is wrong!' });
        }
        const token = signToken(user);
        res.json({ token, user });
    },
    // login a user, sign a token, and send it back (to client/src/components/LoginForm.js)
    async login({ body }, res) {
        const user = await User.findOne({ $or: [{ username: body.username }, { email: body.email }] });
        if (!user) {
            return res.status(400).json({ message: "Can't find this user" });
        }
        console.log(user);
        const correctPw = await user.isCorrectPassword(body.password);

        if (!correctPw) {
            return res.status(400).json({ message: 'Wrong password!' });
        }
        const token = signToken(user);
        res.json({ token, user });
    },
};
