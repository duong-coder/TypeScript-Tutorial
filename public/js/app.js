import { StudentServiceImpl } from "./class/StudentServiceImpl.js";
import { Render } from "./class/Render.js";
let studentService = new StudentServiceImpl();
let render = new Render();
let listStudent = studentService.getAllStudent();
let refreshData = function () {
    render.renderDataInTable(listStudent);
};
refreshData();
let tbody = document.getElementById("data-students");
let buttonAdd = document.getElementById("add");
let showFormHTML = function () {
    render.showForm(buttonAdd, addStudentHTML, showFormHTML);
};
let addStudentHTML = function () {
    render.addStudent(listStudent, buttonAdd, addStudentHTML, showFormHTML);
    refreshData();
};
buttonAdd.addEventListener("click", showFormHTML);
let deleteFormHTML = function () {
    render.hidenForm();
};
let buttonDelete = document.getElementById("delete");
buttonDelete.addEventListener("click", deleteFormHTML);
let findStudentHTML = function () {
    render.findStudent();
};
let inputFind = document.getElementById("text-find-student");
inputFind.addEventListener("keyup", findStudentHTML);
