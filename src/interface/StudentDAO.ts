import {Student} from "../class/Student";

export interface StudentDAO{
    insertStudent(s: Student): void;
    updateStudent(s: Student): void;
    deleteStudent(id: string): void;
    getStudnetById(id: string): Student;
    getAllStudent(): Array<Student>;
}