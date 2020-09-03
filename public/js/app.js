import { Student } from "./class/Student.js";
class Render {
    renderStudents(data) {
    }
}
let bodyTableData = document.getElementById("data-students");
let st1 = new Student("asd", "asd", true, "asd", "asdasd", new Date());
let tr = document.createElement("tr");
for (let k in st1) {
    let td = document.createElement("td");
    td.textContent = st1[k];
    tr.appendChild(td);
}
bodyTableData.appendChild(tr);
