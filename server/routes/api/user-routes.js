import express from 'express';
const router = express.Router();
import {
    createUser,
    login,
} from '../../controllers/user-controller';

import { authMiddleware } from '../../utils/auth';

router.route('/').post(createUser).put(authMiddleware);
router.route('/login').post(login);
