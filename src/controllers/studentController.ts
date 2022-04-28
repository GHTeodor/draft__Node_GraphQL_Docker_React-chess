import { NextFunction, Request, Response } from 'express';

import { studentModel } from '../models(MongoDB)';

class StudentController {
    public async getStudents(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const students = await studentModel.find({});
            res.json(students);
        } catch (e) {
            next(e);
        }
    }

    public async createStudent(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const createdStudent = await studentModel.create(req.body);
            res.json(createdStudent);
        } catch (e) {
            next(e);
        }
    }

    public async updateStudentById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const updatedStudent = await studentModel.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true },
            );
            res.json(updatedStudent);
        } catch (e) {
            next(e);
        }
    }

    public async deleteStudentById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const deletedStudent = await studentModel.findByIdAndDelete(req.params.id);
            res.json(deletedStudent);
        } catch (e) {
            next(e);
        }
    }
}

export const studentController = new StudentController();
