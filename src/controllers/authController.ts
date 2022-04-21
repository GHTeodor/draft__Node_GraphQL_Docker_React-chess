import { Request, Response } from 'express';

import { authService, tokenService } from '../services';
import { IRequestExtended, ITokenData } from '../interfaces';
import { IUser } from '../entities/interfaces';

class AuthController {
    public async registration(req: Request, res: Response): Promise<Response<ITokenData>> {
        const data = await authService.registration(req.body);
        res.cookie(
            'refreshToken',
            data.refreshToken,
            { maxAge: 24 * 60 * 60 * 1000, httpOnly: true },
        );
        return res.json(data);
    }

    public async logout(req: IRequestExtended, res: Response): Promise<Response<string>> {
        const { id } = req.user as IUser;

        res.clearCookie('refreshToken');

        await tokenService.deleteUserTokenPair(id);

        return res.json('Logout OK');
    }

    // public async login(req: Request, res: Response) {
    //
    // }

    // public async refresh(req: Request, res: Response) {
    //
    // }
}

export const authController = new AuthController();
