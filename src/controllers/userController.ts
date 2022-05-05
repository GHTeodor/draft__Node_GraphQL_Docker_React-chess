import { Request, Response } from 'express';

class UserController {
    public getUsers(req: Request, res: Response) {
        return res.json(1);
    }
}

export const userController = new UserController();
