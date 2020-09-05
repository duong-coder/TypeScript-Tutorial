import {StudentDAO} from "../interface/StudentDAO.js";
import {Student} from "./Student.js";

export class StudentDAOImpl implements StudentDAO{
    

    insertStudent(s: Student): void{
        let listStudent: Array<Student> = JSON.parse(localStorage.getItem("listStudent"));
        listStudent.push(s);

        this.saveInLocalStorage(listStudent);
    };
    updateStudent(sNew: Student): void{
        let listStudent: Array<Student> = JSON.parse(localStorage.getItem("listStudent"));
        listStudent.forEach(sOld => {
            if(sOld.id === sNew.id){
                sOld.name = sNew.name;
                sOld.username = sNew.username;
                sOld.role = sNew.role;
                sOld.email = sNew.email;
                sOld.status = sNew.status;
                sOld.dateActive = sNew.dateActive;
            }
        });
        
        this.saveInLocalStorage(listStudent);
    };
    deleteStudent(id: string): void{
        let listStudent: Array<Student> = JSON.parse(localStorage.getItem("listStudent"));
        let indexID = listStudent.findIndex(s => {
            return s.id === id;
        });
        listStudent.splice(indexID, 1);
        
        this.saveInLocalStorage(listStudent);
    };
    getAllStudent(): Array<Student>{
        let listStudent: Array<Student> = JSON.parse(localStorage.getItem("listStudent"));

        return listStudent;
    };

    saveInLocalStorage(listStudent: Array<Student>){
        localStorage.setItem("listStudent", JSON.stringify(listStudent));
    }
}