import {Student} from "./Student.js";
import {StudentService} from "../interface/StudentService.js";
import { StudentDAOImpl } from "./StudentDAOImpl.js";

export class StudentServiceImpl implements StudentService{
    studentDAO: StudentDAOImpl = new StudentDAOImpl();

    insertStudent(s: Student): void{
        this.studentDAO.insertStudent(s);
    };
    updateStudent(s: Student): void{
        this.studentDAO.updateStudent(s);
    };
    deleteStudent(id: string): void{
        this.studentDAO.deleteStudent(id);
    };
    getAllStudent(): Array<Student>{
        let listStudent: Array<Student> = this.studentDAO.getAllStudent();
        
        return listStudent;
    };
}