import { Student } from "./class/Student.js";
import { StudentDAOImpl } from "./class/StudentDAOImpl.js";
import { StudentServiceImpl } from "./class/StudentServiceImpl.js";

class Render {

    renderStudents(data: Array<Student>): void {

    }
}
// let st1: Student = new Student("312", "name", "username", true, "loai", "asdasd@email", new Date());
let listStudent: Array<Student> = JSON.parse(localStorage.getItem("listStudent"));

let tbody: Element = document.getElementById("data-students");
if (listStudent != null) {
    listStudent.forEach((s, index) => {
        let tr = document.createElement("tr");
        let tdIndex: Element = document.createElement("td");
        tdIndex.textContent = "" + (index + 1);
        tr.appendChild(tdIndex);

        let tdCheckBox: Element = document.createElement("td");
        tdCheckBox.innerHTML = `<input type='checkbox' name='' id='${s.id}'>`;
        tr.appendChild(tdCheckBox);

        let tdList: Element[] = [];
        for (let i = 1; i <= 7; i++) {
            let td: Element = document.createElement("td");

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
} else {
    listStudent = [];
}

function showForm() {
    let formAddStudent: Element = document.getElementById("form-add-student");
    formAddStudent.setAttribute("class", "form-add-student-show");
    buttonAdd.removeEventListener("click", showForm);
    buttonAdd.addEventListener("click", addStudent);
}
function hidenForm() {
    let formAddStudent: Element = document.getElementById("form-add-student");
    formAddStudent.setAttribute("class", "form-add-student-hiden");
}

let buttonAdd: Element = document.getElementById("add");
buttonAdd.addEventListener("click", showForm);


let buttonDelete: Element = document.getElementById("delete");
buttonDelete.addEventListener("click", hidenForm);

function addStudent(): void {
    let formAddStudent: Element = document.getElementById("form-add-student");
    let name: string = (document.getElementsByName("name")[0] as HTMLInputElement).value;
    let username: string = (document.getElementsByName("username")[0] as HTMLInputElement).value;;
    let status: boolean = (document.getElementsByName("status")[0] as HTMLInputElement).checked;
    let role: string = (document.getElementsByName("role")[0] as HTMLInputElement).checked ? "Admin" : "User";
    let email: string = (document.getElementsByName("email")[0] as HTMLInputElement).value;
    let date: string = (document.getElementsByName("date")[0] as HTMLInputElement).value;
    let id: string = (document.getElementsByName("idStudent")[0] as HTMLInputElement).value;

    let s: Student = new Student(id, name, username, status, role, email, new Date(date));
    listStudent.push(s);
    try {
        localStorage.setItem("listStudent", JSON.stringify(listStudent));
        buttonAdd.removeEventListener("click", addStudent);
        buttonAdd.addEventListener("click", showForm);
        alert("Luu thanh cong");
    } catch (error) {
        alert("Khong the luu");
    }

}

function findStudent() {
    // input, filter, table, tr, td, i, txtValue;
    let inputFind: Element = document.getElementById("text-find-student");
    let filter = (inputFind as HTMLInputElement).value.toUpperCase();
    let table = document.getElementById("data-students");
    let tr = table.getElementsByTagName("tr");
    for (let i = 0; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName("td")[8];
        if (td) {
            let idStudent = td.textContent || td.innerText;
            if (idStudent.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

let inputFind: Element = document.getElementById("text-find-student");
inputFind.addEventListener("keyup",findStudent);

