import {StudentService} from "../interface/StudentService";
import {Student} from "./Student";

export class StudentServiceImpl implements StudentService{
    insertStudent(s: Student): void{

    };
    updateStudent(s: Student): void{

    };
    deleteStudent(id: string): void{

    };
    getAllStudent(): Array<Student>{
        let a :Array<Student> = [];
        return a;
    };
}