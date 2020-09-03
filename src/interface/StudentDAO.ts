import {Student} from "../class/Student";

export interface StudentDAO{
    insertStudent(s: Student): void;
    updateStudent(s: Student): void;
    deleteStudent(id: string): void;
    getAllStudent(): Array<Student>;
}