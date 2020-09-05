import {StudentDAO} from "../interface/StudentDAO.js";
import {Student} from "./Student.js";

export class StudentDAOImpl implements StudentDAO{
    listStudent: Array<Student> = JSON.parse(localStorage.getItem("listStudent"));

    insertStudent(s: Student): void{
        this.listStudent.push(s);

        this.saveInLocalStorage(this.listStudent);
    };
    updateStudent(sNew: Student): void{
        this.listStudent.forEach(sOld => {
            if(sOld.id === sNew.id){
                sOld.name = sNew.name;
                sOld.username = sNew.username;
                sOld.role = sNew.role;
                sOld.email = sNew.email;
                sOld.status = sNew.status;
                sOld.dateActive = sNew.dateActive;
            }
        });
        
        this.saveInLocalStorage(this.listStudent);
    };
    deleteStudent(id: string): void{
        let indexID = this.listStudent.findIndex(s => {
            return s.id === id;
        });
        this.listStudent.splice(indexID, 1);
        
        this.saveInLocalStorage(this.listStudent);
    };
    getAllStudent(): Array<Student>{
        
        return this.listStudent;
    };

    saveInLocalStorage(listStudent: Array<Student>){
        localStorage.setItem("listStudent", JSON.stringify(this.listStudent));
    }
}