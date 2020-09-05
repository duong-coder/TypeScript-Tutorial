import { Student } from "./Student.js";
import { StudentServiceImpl } from "./StudentServiceImpl.js";
export class Render {
    constructor() {
        this.studentService = new StudentServiceImpl();
    }
    removeAllRowInTable() {
        let tbody = document.getElementById("data-students");
        let arrRow = tbody.getElementsByTagName("tr");
        for (let i = 0; i < arrRow.length;) {
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
    createForm(tbody) {
        let tr = document.createElement("tr");
        let tdList = [];
        for (let i = 1; i <= 9; i++) {
            let td = document.createElement("td");
            tdList.push(td);
        }
        tr.appendChild(tdList[0]);
        tr.appendChild(tdList[1]);
        tdList[2].innerHTML = `<input type="text" name="name">`;
        tr.appendChild(tdList[2]);
        tdList[3].innerHTML = `<input type="text" name="username">`;
        tr.appendChild(tdList[3]);
        tdList[4].innerHTML = `<input type="checkbox" name="status">`;
        tr.appendChild(tdList[4]);
        tdList[5].innerHTML = `<input type="radio" name="role" id="admin">
                        <label for="admin">Admin</label>
                        <input type="radio" name="role" id="user">
                        <label for="user">User</label>`;
        tr.appendChild(tdList[5]);
        tdList[6].innerHTML = `<input type="email" name="email">`;
        tr.appendChild(tdList[6]);
        tdList[7].innerHTML = `<input type="date" name="date">`;
        tr.appendChild(tdList[7]);
        tdList[8].innerHTML = `<input type="text" name="idStudent">`;
        tr.appendChild(tdList[8]);
        tbody.insertBefore(tr, tbody.firstChild);
    }
    addStudent(listStudent) {
        let name = document.getElementsByName("name")[0].value;
        let username = document.getElementsByName("username")[0].value;
        ;
        let status = document.getElementsByName("status")[0].checked;
        let role = document.getElementsByName("role")[0].checked ? "Admin" : "User";
        let email = document.getElementsByName("email")[0].value;
        let date = document.getElementsByName("date")[0].value;
        let id = document.getElementsByName("idStudent")[0].value;
        let s = new Student(id, name, username, status, role, email, new Date(date));
        try {
            this.studentService.insertStudent(s);
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
    getAllIdStudentSelect() {
        let allInputDelete = document.getElementsByName("edit-and-delete");
        let listIdStudent = [];
        for (let i = 0; i < allInputDelete.length; i++) {
            let inputHTML = allInputDelete[i];
            if (inputHTML.checked) {
                listIdStudent.push(inputHTML.getAttribute("id"));
            }
        }
        return listIdStudent;
    }
    deleteStudent() {
        let listIdStudent = this.getAllIdStudentSelect();
        if (listIdStudent.length > 0) {
            listIdStudent.forEach(id => {
                this.studentService.deleteStudent(id);
            });
        }
    }
    showStudentEdit() {
        let listIdStudent = this.getAllIdStudentSelect();
        if (listIdStudent.length > 0) {
            let student = this.studentService.getStudnetById(listIdStudent[0]);
            document.getElementsByName("name")[0].value = student.name;
            document.getElementsByName("username")[0].value = student.username;
            document.getElementsByName("status")[0].checked = student.status;
            if (student.role === "Admin") {
                document.getElementsByName("role")[0].checked = true;
            }
            else {
                document.getElementsByName("role")[1].checked = true;
            }
            document.getElementsByName("email")[0].value = student.email;
            document.getElementsByName("date")[0].valueAsDate = new Date(student.dateActive);
            let inputId = document.getElementsByName("idStudent")[0];
            inputId.setAttribute("readonly", "true");
            inputId.value = student.id;
        }
    }
    editStudent() {
        let name = document.getElementsByName("name")[0].value;
        let username = document.getElementsByName("username")[0].value;
        ;
        let status = document.getElementsByName("status")[0].checked;
        let role = document.getElementsByName("role")[0].checked ? "Admin" : "User";
        let email = document.getElementsByName("email")[0].value;
        let date = document.getElementsByName("date")[0].value;
        let id = document.getElementsByName("idStudent")[0].value;
        let s = new Student(id, name, username, status, role, email, new Date(date));
        try {
            this.studentService.updateStudent(s);
            alert("Cap nhat thanh cong");
        }
        catch (error) {
            alert("Khong the cap nhat");
        }
    }
    showForm(buttonAdd, add, showForm, buttonDelete, deleteSt, hidenForm, btnEdit, edit, showData) {
        let tbody = document.getElementById("data-students");
        this.createForm(tbody);
        buttonAdd.removeEventListener("click", showForm);
        buttonAdd.addEventListener("click", add);
        buttonDelete.removeEventListener("click", deleteSt);
        buttonDelete.addEventListener("click", hidenForm);
        btnEdit.removeEventListener("click", showData);
        btnEdit.addEventListener("click", edit);
    }
    hidenForm(buttonAdd, add, showForm, buttonDelete, deleteSt, hidenForm, btnEdit, edit, showData) {
        let tbody = document.getElementById("data-students");
        tbody.removeChild(tbody.firstChild);
        buttonAdd.removeEventListener("click", add);
        buttonAdd.addEventListener("click", showForm);
        buttonDelete.removeEventListener("click", hidenForm);
        buttonDelete.addEventListener("click", deleteSt);
        btnEdit.removeEventListener("click", edit);
        btnEdit.addEventListener("click", showData);
    }
}
