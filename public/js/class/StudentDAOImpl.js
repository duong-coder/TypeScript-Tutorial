export class StudentDAOImpl {
    insertStudent(s) {
        let listStudent = JSON.parse(localStorage.getItem("listStudent"));
        listStudent.push(s);
        this.saveInLocalStorage(listStudent);
    }
    ;
    updateStudent(sNew) {
        let listStudent = JSON.parse(localStorage.getItem("listStudent"));
        listStudent.forEach(sOld => {
            if (sOld.id === sNew.id) {
                sOld.name = sNew.name;
                sOld.username = sNew.username;
                sOld.role = sNew.role;
                sOld.email = sNew.email;
                sOld.status = sNew.status;
                sOld.dateActive = sNew.dateActive;
            }
        });
        this.saveInLocalStorage(listStudent);
    }
    ;
    deleteStudent(id) {
        let listStudent = JSON.parse(localStorage.getItem("listStudent"));
        let indexID = listStudent.findIndex(s => {
            return s.id === id;
        });
        listStudent.splice(indexID, 1);
        this.saveInLocalStorage(listStudent);
    }
    ;
    getStudnetById(id) {
        let listStudent = JSON.parse(localStorage.getItem("listStudent"));
        let student = listStudent.find(s => {
            return s.id === id;
        });
        return student;
    }
    getAllStudent() {
        let listStudent = JSON.parse(localStorage.getItem("listStudent"));
        return listStudent;
    }
    ;
    saveInLocalStorage(listStudent) {
        localStorage.setItem("listStudent", JSON.stringify(listStudent));
    }
}
