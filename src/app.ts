import {Student} from "./class/Student.js";
import {StudentDAOImpl} from "./class/StudentDAOImpl.js";
import {StudentServiceImpl} from "./class/StudentServiceImpl.js";

class Render{
    
    renderStudents(data:Array<Student>): void {
        
    }
}
let bodyTableData: Element = document.getElementById("data-students");
let st1: Student = new Student("asd", "asd", true, "asd", "asdasd", new Date());

let tr = document.createElement("tr");
for(let k in st1){
    let td: Element = document.createElement("td");
    td.textContent = st1[k];
    tr.appendChild(td);
}
bodyTableData.appendChild(tr);
