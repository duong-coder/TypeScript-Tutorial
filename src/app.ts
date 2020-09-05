import { Student } from "./class/Student.js";
import { StudentServiceImpl } from "./class/StudentServiceImpl.js";
import {Render} from "./class/Render.js";

let studentService: StudentServiceImpl = new StudentServiceImpl();
let render: Render = new Render();

let listStudent: Array<Student> = studentService.getAllStudent();
let tbody: Element = document.getElementById("data-students");
let buttonAdd: Element = document.getElementById("add");
let buttonDelete: Element = document.getElementById("delete");
let buttonEdit: Element = document.getElementById("edit");

// hien thi du lieu




let showFormHTML = function(){
    render.showForm(buttonAdd, addStudentHTML, showFormHTML, 
                    buttonDelete, deleteStudent, hidenFormHTML, 
                    buttonEdit, editStudent, showDataStudentHTML);
}

let addStudentHTML = function(){
    render.addStudent(listStudent);
    refreshData();
}

buttonAdd.addEventListener("click", showFormHTML);

let hidenFormHTML = function(){
    render.hidenForm(buttonAdd, addStudentHTML, showFormHTML, 
                    buttonDelete, deleteStudent, hidenFormHTML, 
                    buttonEdit, editStudent, showDataStudentHTML);
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

let showDataStudentHTML = function(){
    showFormHTML();
    render.showStudentEdit();
}
let editStudent = function(){
    render.editStudent();
    refreshData();
}

buttonEdit.addEventListener("click", showDataStudentHTML);

let refreshData = function(){
    listStudent = studentService.getAllStudent();
    render.removeAllRowInTable();
    render.renderDataInTable(listStudent);
    buttonAdd.addEventListener("click", showFormHTML);
    buttonDelete.addEventListener("click", deleteStudent);
    buttonEdit.addEventListener("click", showDataStudentHTML);
}

refreshData();