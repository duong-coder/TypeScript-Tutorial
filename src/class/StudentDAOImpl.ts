import {StudentDAO} from "../interface/StudentDAO";
import {Student} from "./Student";

export class StudentDAOImpl implements StudentDAO{
    insertStudent(s: Student): void{

    };
    updateStudent(s: Student): void{

    };
    deleteStudent(id: string): void{

    };
    getAllStudent(): Array<Student>{
        let arr: Array<Student> = [];
        return arr;
    };
}