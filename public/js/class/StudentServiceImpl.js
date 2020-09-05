import { StudentDAOImpl } from "./StudentDAOImpl.js";
export class StudentServiceImpl {
    constructor() {
        this.studentDAO = new StudentDAOImpl();
    }
    insertStudent(s) {
        this.studentDAO.insertStudent(s);
    }
    ;
    updateStudent(s) {
        this.studentDAO.updateStudent(s);
    }
    ;
    deleteStudent(id) {
        this.studentDAO.deleteStudent(id);
    }
    ;
    getStudnetById(id) {
        return this.studentDAO.getStudnetById(id);
    }
    getAllStudent() {
        let listStudent = this.studentDAO.getAllStudent();
        return listStudent;
    }
    ;
}
