import { Student } from "./class/Student.js";
import { StudentServiceImpl } from "./class/StudentServiceImpl.js";
import {Render} from "./class/Render.js";

let studentService: StudentServiceImpl = new StudentServiceImpl();
let render: Render = new Render();

let listStudent: Array<Student> = studentService.getAllStudent();

// hien thi du lieu
let refreshData = function(){
    render.renderDataInTable(listStudent);
}

refreshData();

let tbody: Element = document.getElementById("data-students");
let buttonAdd: Element = document.getElementById("add");

let showFormHTML = function(){
    render.showForm(buttonAdd, addStudentHTML, showFormHTML);
}

let addStudentHTML = function(){
    render.addStudent(listStudent, buttonAdd, addStudentHTML, showFormHTML);
    refreshData();
}

buttonAdd.addEventListener("click", showFormHTML);

let deleteFormHTML = function(){
    render.hidenForm();
}
let buttonDelete: Element = document.getElementById("delete");
buttonDelete.addEventListener("click", deleteFormHTML);

let findStudentHTML = function(){
    render.findStudent();
}
let inputFind: Element = document.getElementById("text-find-student");
inputFind.addEventListener("keyup",findStudentHTML);

