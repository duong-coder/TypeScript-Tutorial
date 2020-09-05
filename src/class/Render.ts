import { Student } from "./Student.js";
import { StudentServiceImpl } from "./StudentServiceImpl.js";

export class Render {

    studentService: StudentServiceImpl = new StudentServiceImpl();

    removeAllRowInTable() {
        let tbody: Element = document.getElementById("data-students");
        let arrRow = tbody.getElementsByTagName("tr");
        for (let i = 0; i < arrRow.length;) {
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
    createForm(tbody: Element): void {
        let tr = document.createElement("tr");
        let tdList: Element[] = [];
        for (let i = 1; i <= 9; i++) {
            let td: Element = document.createElement("td");
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
    addStudent(listStudent: Array<Student>): void {
        // let formAddStudent: Element = document.getElementById("form-add-student");
        let name: string = (document.getElementsByName("name")[0] as HTMLInputElement).value;
        let username: string = (document.getElementsByName("username")[0] as HTMLInputElement).value;;
        let status: boolean = (document.getElementsByName("status")[0] as HTMLInputElement).checked;
        let role: string = (document.getElementsByName("role")[0] as HTMLInputElement).checked ? "Admin" : "User";
        let email: string = (document.getElementsByName("email")[0] as HTMLInputElement).value;
        let date: string = (document.getElementsByName("date")[0] as HTMLInputElement).value;
        let id: string = (document.getElementsByName("idStudent")[0] as HTMLInputElement).value;

        let s: Student = new Student(id, name, username, status, role, email, new Date(date));
        // listStudent.push(s);
        try {
            this.studentService.insertStudent(s);

            alert("Luu thanh cong");
        } catch (error) {
            alert("Khong the luu");
        }

    }
    findStudent(): void {
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
    getAllIdStudentSelect(): string[] {
        let allInputDelete: NodeListOf<HTMLElement> = document.getElementsByName("edit-and-delete");
        let listIdStudent: string[] = [];
        for (let i = 0; i < allInputDelete.length; i++) {
            let inputHTML: HTMLInputElement = (allInputDelete[i] as HTMLInputElement);
            if (inputHTML.checked) {
                listIdStudent.push(inputHTML.getAttribute("id"));
            }
        }

        return listIdStudent;
    }
    deleteStudent(): void {
        let listIdStudent: string[] = this.getAllIdStudentSelect();
        if (listIdStudent.length > 0) {
            listIdStudent.forEach(id => {
                this.studentService.deleteStudent(id);
            })
        }
    }
    showStudentEdit(): void {
        // let tbody: Element = document.getElementById("data-students");
        // this.createForm(tbody);

        let listIdStudent: string[] = this.getAllIdStudentSelect();
        if (listIdStudent.length > 0) {
            let student: Student = this.studentService.getStudnetById(listIdStudent[0]);

            (document.getElementsByName("name")[0] as HTMLInputElement).value = student.name;
            (document.getElementsByName("username")[0] as HTMLInputElement).value = student.username;
            (document.getElementsByName("status")[0] as HTMLInputElement).checked = student.status;
            if (student.role === "Admin") {
                (document.getElementsByName("role")[0] as HTMLInputElement).checked = true;
            } else {
                (document.getElementsByName("role")[1] as HTMLInputElement).checked = true;
            }
            (document.getElementsByName("email")[0] as HTMLInputElement).value = student.email;
            (document.getElementsByName("date")[0] as HTMLInputElement).valueAsDate = new Date(student.dateActive);

            let inputId: HTMLElement = document.getElementsByName("idStudent")[0];
            inputId.setAttribute("readonly", "true");
            (inputId as HTMLInputElement).value = student.id;

        }
    }
    editStudent(): void{
        let name: string = (document.getElementsByName("name")[0] as HTMLInputElement).value;
        let username: string = (document.getElementsByName("username")[0] as HTMLInputElement).value;;
        let status: boolean = (document.getElementsByName("status")[0] as HTMLInputElement).checked;
        let role: string = (document.getElementsByName("role")[0] as HTMLInputElement).checked ? "Admin" : "User";
        let email: string = (document.getElementsByName("email")[0] as HTMLInputElement).value;
        let date: string = (document.getElementsByName("date")[0] as HTMLInputElement).value;
        let id: string = (document.getElementsByName("idStudent")[0] as HTMLInputElement).value;

        let s: Student = new Student(id, name, username, status, role, email, new Date(date));
        // listStudent.push(s);
        try {
            this.studentService.updateStudent(s);

            alert("Cap nhat thanh cong");
        } catch (error) {
            alert("Khong the cap nhat");
        }
    }
    showForm(buttonAdd: Element, add: any, showForm: any,
        buttonDelete: Element, deleteSt: any, hidenForm: any,
        btnEdit: Element, edit: any, showData: any): void {

        let tbody: Element = document.getElementById("data-students");
        // formAddStudent.setAttribute("class", "form-add-student-show");
        this.createForm(tbody);
        buttonAdd.removeEventListener("click", showForm);
        buttonAdd.addEventListener("click", add);
        buttonDelete.removeEventListener("click", deleteSt);
        buttonDelete.addEventListener("click", hidenForm);
        btnEdit.removeEventListener("click", showData);
        btnEdit.addEventListener("click", edit);
    }
    hidenForm(buttonAdd: Element, add: any, showForm: any,
        buttonDelete: Element, deleteSt: any, hidenForm: any,
        btnEdit: Element, edit: any, showData: any) {

        let tbody: Element = document.getElementById("data-students");
        // formAddStudent.setAttribute("class", "form-add-student-hiden");
        tbody.removeChild(tbody.firstChild);
        buttonAdd.removeEventListener("click", add);
        buttonAdd.addEventListener("click", showForm);
        buttonDelete.removeEventListener("click", hidenForm);
        buttonDelete.addEventListener("click", deleteSt);
        btnEdit.removeEventListener("click", edit);
        btnEdit.addEventListener("click", showData);
    }
    
}