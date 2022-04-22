import { NextFunction, Response } from 'express';

import { tokenService, userService } from '../services';
import { IRequestExtended } from '../interfaces';
import { tokenRepository } from '../repositories';
import { constant } from '../configs';

class AuthMiddleware {
    public async checkAccessToken(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const accessToken = req.get(constant.AUTHORIZATION);

            if (!accessToken) throw new Error('No token');

            const { userEmail } = tokenService.verifyToken(accessToken);

            const tokenPairFromDB = await tokenRepository.findByParams({ accessToken });

            if (!tokenPairFromDB) throw new Error('Token is not valid');

            const userFromToken = await userService.getUserByEmail(userEmail);

            if (!userFromToken) throw new Error('Token is not valid');

            req.user = userFromToken;

            next();
        } catch ({ message }) {
            res.status(401).json({
                status: 401,
                message,
            });
        }
    }

    public async checkRefreshToken(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const accessToken = req.get(constant.AUTHORIZATION);

            if (!accessToken) throw new Error('No token');

            const { userEmail } = tokenService.verifyToken(accessToken);

            const tokenPairFromDB = await tokenRepository.findByParams({ accessToken });

            if (!tokenPairFromDB) throw new Error('Token is not valid');

            const userFromToken = await userService.getUserByEmail(userEmail);

            if (!userFromToken) throw new Error('Token is not valid');

            req.user = userFromToken;

            next();
        } catch ({ message }) {
            res.status(401).json({
                status: 401,
                message,
            });
        }
    }
}

export const authMiddleware = new AuthMiddleware();
