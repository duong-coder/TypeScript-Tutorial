import { Student } from "./class/Student.js";
class Render {
    renderStudents(data) {
    }
}
let listStudent = JSON.parse(localStorage.getItem("listStudent"));
let tbody = document.getElementById("data-students");
if (listStudent != null) {
    listStudent.forEach((s, index) => {
        let tr = document.createElement("tr");
        let tdIndex = document.createElement("td");
        tdIndex.textContent = "" + (index + 1);
        tr.appendChild(tdIndex);
        let tdCheckBox = document.createElement("td");
        tdCheckBox.innerHTML = `<input type='checkbox' name='' id='${s.id}'>`;
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
function showForm() {
    let formAddStudent = document.getElementById("form-add-student");
    formAddStudent.setAttribute("class", "form-add-student-show");
    buttonAdd.removeEventListener("click", showForm);
    buttonAdd.addEventListener("click", addStudent);
}
function hidenForm() {
    let formAddStudent = document.getElementById("form-add-student");
    formAddStudent.setAttribute("class", "form-add-student-hiden");
}
let buttonAdd = document.getElementById("add");
buttonAdd.addEventListener("click", showForm);
let buttonDelete = document.getElementById("delete");
buttonDelete.addEventListener("click", hidenForm);
function addStudent() {
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
        localStorage.setItem("listStudent", JSON.stringify(listStudent));
        buttonAdd.removeEventListener("click", addStudent);
        buttonAdd.addEventListener("click", showForm);
        alert("Luu thanh cong");
    }
    catch (error) {
        alert("Khong the luu");
    }
}
function findStudent() {
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
let inputFind = document.getElementById("text-find-student");
inputFind.addEventListener("keyup", findStudent);
