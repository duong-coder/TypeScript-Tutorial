import { StudentServiceImpl } from "./class/StudentServiceImpl.js";
import { Render } from "./class/Render.js";
let studentService = new StudentServiceImpl();
let render = new Render();
let listStudent = studentService.getAllStudent();
let tbody = document.getElementById("data-students");
let buttonAdd = document.getElementById("add");
let buttonDelete = document.getElementById("delete");
let buttonEdit = document.getElementById("edit");
let showFormHTML = function () {
    render.showForm(buttonAdd, addStudentHTML, showFormHTML, buttonDelete, deleteStudent, hidenFormHTML, buttonEdit, editStudent, showDataStudentHTML);
};
let addStudentHTML = function () {
    render.addStudent(listStudent);
    refreshData();
};
buttonAdd.addEventListener("click", showFormHTML);
let hidenFormHTML = function () {
    render.hidenForm(buttonAdd, addStudentHTML, showFormHTML, buttonDelete, deleteStudent, hidenFormHTML, buttonEdit, editStudent, showDataStudentHTML);
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
let showDataStudentHTML = function () {
    showFormHTML();
    render.showStudentEdit();
};
let editStudent = function () {
    render.editStudent();
    refreshData();
};
buttonEdit.addEventListener("click", showDataStudentHTML);
let refreshData = function () {
    listStudent = studentService.getAllStudent();
    render.removeAllRowInTable();
    render.renderDataInTable(listStudent);
    buttonAdd.addEventListener("click", showFormHTML);
    buttonDelete.addEventListener("click", deleteStudent);
    buttonEdit.addEventListener("click", showDataStudentHTML);
};
refreshData();
