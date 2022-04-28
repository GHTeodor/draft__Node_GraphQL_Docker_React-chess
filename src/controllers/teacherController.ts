import { Request, Response, NextFunction } from 'express';

import { teacherModel } from '../models(MongoDB)';

class TeacherController {
    public async getTeachers(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const teachers = await teacherModel.find({});
            res.json(teachers);
        } catch (e) {
            next(e);
        }
    }

    public async createTeacher(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const createdTeacher = await teacherModel.create(req.body);
            res.json(createdTeacher);
        } catch (e) {
            next(e);
        }
    }

    public async updateTeacher(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const updatedTeacher = await teacherModel.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true },
            );
            res.json(updatedTeacher);
        } catch (e) {
            next(e);
        }
    }

    public async deleteTeacherById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const deletedTeacher = await teacherModel.findByIdAndDelete(req.params.id);
            res.json(deletedTeacher);
        } catch (e) {
            next(e);
        }
    }
}

export const teacherController = new TeacherController();
