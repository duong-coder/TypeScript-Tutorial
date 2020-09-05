import { Student } from "./class/Student.js";
import { StudentServiceImpl } from "./class/StudentServiceImpl.js";
import {Render} from "./class/Render.js";

let studentService: StudentServiceImpl = new StudentServiceImpl();
let render: Render = new Render();

let listStudent: Array<Student> = studentService.getAllStudent();

// hien thi du lieu
let refreshData = function(){
    listStudent = studentService.getAllStudent();
    render.removeAllRowInTable();
    render.renderDataInTable(listStudent);
}

refreshData();

let tbody: Element = document.getElementById("data-students");
let buttonAdd: Element = document.getElementById("add");
let buttonDelete: Element = document.getElementById("delete");

let showFormHTML = function(){
    render.showForm(buttonAdd, buttonDelete, addStudentHTML, showFormHTML, deleteStudent, hidenFormHTML);
}

let addStudentHTML = function(){
    render.addStudent(listStudent, buttonAdd, addStudentHTML, showFormHTML);
    refreshData();
}

buttonAdd.addEventListener("click", showFormHTML);

let hidenFormHTML = function(){
    render.hidenForm(buttonDelete, deleteStudent, hidenFormHTML);
}

let deleteStudent = function(){
    render.deleteStudent();
    refreshData();
}
// buttonDelete.addEventListener("click", deleteFormHTML);
buttonDelete.addEventListener("click", deleteStudent);

let findStudentHTML = function(){
    render.findStudent();
}
let inputFind: Element = document.getElementById("text-find-student");
inputFind.addEventListener("keyup",findStudentHTML);

