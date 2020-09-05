export class StudentDAOImpl {
    constructor() {
        this.listStudent = JSON.parse(localStorage.getItem("listStudent"));
    }
    insertStudent(s) {
        this.listStudent.push(s);
        this.saveInLocalStorage(this.listStudent);
    }
    ;
    updateStudent(sNew) {
        this.listStudent.forEach(sOld => {
            if (sOld.id === sNew.id) {
                sOld.name = sNew.name;
                sOld.username = sNew.username;
                sOld.role = sNew.role;
                sOld.email = sNew.email;
                sOld.status = sNew.status;
                sOld.dateActive = sNew.dateActive;
            }
        });
        this.saveInLocalStorage(this.listStudent);
    }
    ;
    deleteStudent(id) {
        let indexID = this.listStudent.findIndex(s => {
            return s.id === id;
        });
        this.listStudent.splice(indexID, 1);
        this.saveInLocalStorage(this.listStudent);
    }
    ;
    getAllStudent() {
        return this.listStudent;
    }
    ;
    saveInLocalStorage(listStudent) {
        localStorage.setItem("listStudent", JSON.stringify(this.listStudent));
    }
}
