import { StudentServiceImpl } from "./class/StudentServiceImpl.js";
import { Render } from "./class/Render.js";
let studentService = new StudentServiceImpl();
let render = new Render();
let listStudent = studentService.getAllStudent();
let refreshData = function () {
    listStudent = studentService.getAllStudent();
    render.removeAllRowInTable();
    render.renderDataInTable(listStudent);
};
refreshData();
let tbody = document.getElementById("data-students");
let buttonAdd = document.getElementById("add");
let buttonDelete = document.getElementById("delete");
let showFormHTML = function () {
    render.showForm(buttonAdd, buttonDelete, addStudentHTML, showFormHTML, deleteStudent, hidenFormHTML);
};
let addStudentHTML = function () {
    render.addStudent(listStudent, buttonAdd, addStudentHTML, showFormHTML);
    refreshData();
};
buttonAdd.addEventListener("click", showFormHTML);
let hidenFormHTML = function () {
    render.hidenForm(buttonDelete, deleteStudent, hidenFormHTML);
};
let deleteStudent = function () {
    render.deleteStudent();
    refreshData();
};
buttonDelete.addEventListener("click", deleteStudent);
let findStudentHTML = function () {
    render.findStudent();
};
let inputFind = document.getElementById("text-find-student");
inputFind.addEventListener("keyup", findStudentHTML);
