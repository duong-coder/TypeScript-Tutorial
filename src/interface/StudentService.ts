import { Student } from  "../class/Student";

export interface StudentService{
    insertStudent(s: Student): void;
    updateStudent(s: Student): void;
    deleteStudent(id: string): void;
    getStudnetById(id: string): Student;
    getAllStudent(): Array<Student>;
}
