import { Student } from "./Student.js";
import { StudentServiceImpl } from "./StudentServiceImpl.js";

export class Render {

    studentService: StudentServiceImpl = new StudentServiceImpl();

    removeAllRowInTable() {
        let tbody: Element = document.getElementById("data-students");
        let arrRow = tbody.getElementsByTagName("tr");
        for (let i = 1; i < arrRow.length;) {
            arrRow[i].remove();
        }
    }

    renderDataInTable(listStudent: Array<Student>): void {
        let tbody: Element = document.getElementById("data-students");
        if (listStudent != null) {
            listStudent.forEach((s, index) => {
                let tr = document.createElement("tr");
                let tdIndex: Element = document.createElement("td");
                tdIndex.textContent = "" + (index + 1);
                tr.appendChild(tdIndex);

                let tdCheckBox: Element = document.createElement("td");
                tdCheckBox.innerHTML = `<input type='checkbox' name='edit-and-delete' id='${s.id}'>`;
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
    }
    addStudent(listStudent: Array<Student>, buttonAdd: Element, add: any, showForm: any): void {
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
            this.studentService.insertStudent(s);
            buttonAdd.removeEventListener("click", add);
            buttonAdd.addEventListener("click", showForm);
            alert("Luu thanh cong");
        } catch (error) {
            alert("Khong the luu");
        }

    }
    findStudent() {
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
    deleteStudent() {
        let allInputDelete: NodeListOf<HTMLElement> = document.getElementsByName("edit-and-delete");
        let listIdStudent: string[] = [];
        for(let i = 0; i<allInputDelete.length; i++){
            let inputHTML: HTMLInputElement = (allInputDelete[i] as HTMLInputElement);
            if (inputHTML.checked) {
                listIdStudent.push(inputHTML.getAttribute("id"));
            }
        }
        // allInputDelete.forEach(input => {
        //     let inputHTML: HTMLInputElement = (input as HTMLInputElement);
        //     if (inputHTML.checked) {
        //         listIdStudent.push(inputHTML.getAttribute("id"));
        //     }
        // });

        listIdStudent.forEach(id =>{
            this.studentService.deleteStudent(id);
        })
    }
    showForm(buttonAdd: Element, buttonDelete: Element, add: any, showForm: any, deleteSt: any, hidenForm: any): void {
        let formAddStudent: Element = document.getElementById("form-add-student");
        formAddStudent.setAttribute("class", "form-add-student-show");
        buttonAdd.removeEventListener("click", showForm);
        buttonAdd.addEventListener("click", add);
        buttonDelete.removeEventListener("click", deleteSt);
        buttonDelete.addEventListener("click", hidenForm);
    }
    hidenForm(buttonDelete: Element, deleteSt: any, hidenForm: any) {
        let formAddStudent: Element = document.getElementById("form-add-student");
        formAddStudent.setAttribute("class", "form-add-student-hiden");
        buttonDelete.removeEventListener("click", hidenForm);
        buttonDelete.addEventListener("click", deleteSt);
    }
}