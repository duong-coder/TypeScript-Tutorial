import { Student } from "./Student.js";
import { StudentServiceImpl } from "./StudentServiceImpl.js";
export class Render {
    constructor() {
        this.studentService = new StudentServiceImpl();
    }
    removeAllRowInTable() {
        let tbody = document.getElementById("data-students");
        let arrRow = tbody.getElementsByTagName("tr");
        for (let i = 1; i < arrRow.length;) {
            arrRow[i].remove();
        }
    }
    renderDataInTable(listStudent) {
        let tbody = document.getElementById("data-students");
        if (listStudent != null) {
            listStudent.forEach((s, index) => {
                let tr = document.createElement("tr");
                let tdIndex = document.createElement("td");
                tdIndex.textContent = "" + (index + 1);
                tr.appendChild(tdIndex);
                let tdCheckBox = document.createElement("td");
                tdCheckBox.innerHTML = `<input type='checkbox' name='edit-and-delete' id='${s.id}'>`;
                tr.appendChild(tdCheckBox);
                let tdList = [];
                for (let i = 1; i <= 7; i++) {
                    let td = document.createElement("td");
                    tdList.push(td);
                }
                tdList[0].textContent = s.name;
                tdList[1].textContent = s.username;
                tdList[2].textContent = s.status ? "Kích hoạt" : "Khóa";
                tdList[3].textContent = s.role;
                tdList[4].textContent = s.email;
                tdList[5].textContent = (new Date(s.dateActive)).toLocaleDateString();
                tdList[6].textContent = s.id;
                tdList.forEach((td) => {
                    tr.appendChild(td);
                });
                tbody.appendChild(tr);
            });
        }
        else {
            listStudent = [];
        }
    }
    addStudent(listStudent, buttonAdd, add, showForm) {
        let formAddStudent = document.getElementById("form-add-student");
        let name = document.getElementsByName("name")[0].value;
        let username = document.getElementsByName("username")[0].value;
        ;
        let status = document.getElementsByName("status")[0].checked;
        let role = document.getElementsByName("role")[0].checked ? "Admin" : "User";
        let email = document.getElementsByName("email")[0].value;
        let date = document.getElementsByName("date")[0].value;
        let id = document.getElementsByName("idStudent")[0].value;
        let s = new Student(id, name, username, status, role, email, new Date(date));
        listStudent.push(s);
        try {
            this.studentService.insertStudent(s);
            buttonAdd.removeEventListener("click", add);
            buttonAdd.addEventListener("click", showForm);
            alert("Luu thanh cong");
        }
        catch (error) {
            alert("Khong the luu");
        }
    }
    findStudent() {
        let inputFind = document.getElementById("text-find-student");
        let filter = inputFind.value.toUpperCase();
        let table = document.getElementById("data-students");
        let tr = table.getElementsByTagName("tr");
        for (let i = 0; i < tr.length; i++) {
            let td = tr[i].getElementsByTagName("td")[8];
            if (td) {
                let idStudent = td.textContent || td.innerText;
                if (idStudent.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                }
                else {
                    tr[i].style.display = "none";
                }
            }
        }
    }
    deleteStudent() {
        let allInputDelete = document.getElementsByName("edit-and-delete");
        let listIdStudent = [];
        for (let i = 0; i < allInputDelete.length; i++) {
            let inputHTML = allInputDelete[i];
            if (inputHTML.checked) {
                listIdStudent.push(inputHTML.getAttribute("id"));
            }
        }
        listIdStudent.forEach(id => {
            this.studentService.deleteStudent(id);
        });
    }
    showForm(buttonAdd, buttonDelete, add, showForm, deleteSt, hidenForm) {
        let formAddStudent = document.getElementById("form-add-student");
        formAddStudent.setAttribute("class", "form-add-student-show");
        buttonAdd.removeEventListener("click", showForm);
        buttonAdd.addEventListener("click", add);
        buttonDelete.removeEventListener("click", deleteSt);
        buttonDelete.addEventListener("click", hidenForm);
    }
    hidenForm(buttonDelete, deleteSt, hidenForm) {
        let formAddStudent = document.getElementById("form-add-student");
        formAddStudent.setAttribute("class", "form-add-student-hiden");
        buttonDelete.removeEventListener("click", hidenForm);
        buttonDelete.addEventListener("click", deleteSt);
    }
}
