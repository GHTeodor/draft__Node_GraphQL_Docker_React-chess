import { DeleteResult, UpdateResult } from 'typeorm';

import { IUser } from '../entities/interfaces/IUser';
import userRepository from '../repositories/user/userRepository';

class UserService {
    public async getUsers(): Promise<IUser[]> {
        return userRepository.getUsers();
    }

    public async getUserByEmail(email: string): Promise<IUser | undefined> {
        return userRepository.getUserByEmail(email);
    }

    public async createUser(user: IUser): Promise<IUser> {
        return userRepository.createUser(user);
    }

    public async updateUser(id: number, email: string, password: string): Promise<UpdateResult> {
        return userRepository.updateUser(id, email, password);
    }

    public async deleteUser(id: number): Promise<DeleteResult> {
        return userRepository.deleteUser(id);
    }
}

export default new UserService();
