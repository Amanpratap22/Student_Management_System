import { db } from "./firebase.js";
import {
  ref,
  set,
  onValue,
  remove,
  update
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const nameInput = document.getElementById("name");
const rollInput = document.getElementById("roll");
const courseInput = document.getElementById("course");
const studentList = document.getElementById("studentList");

window.addStudent = function () {
  const name = nameInput.value;
  const roll = rollInput.value;
  const course = courseInput.value;

  if (!name || !roll || !course) {
    alert("Fill all fields");
    return;
  }

  set(ref(db, "students/" + roll), {
    name,
    roll,
    course
  });

  nameInput.value = "";
  rollInput.value = "";
  courseInput.value = "";
};


onValue(ref(db, "students"), (snapshot) => {
  studentList.innerHTML = "";

  snapshot.forEach((child) => {
    const data = child.val();

    studentList.innerHTML += `
      <tr>
        <td>${data.name}</td>
        <td>${data.roll}</td>
        <td>${data.course}</td>
        <td>
          <button onclick="deleteStudent('${data.roll}')">Delete</button>
          <button onclick="editStudent('${data.roll}', '${data.name}', '${data.course}')">Edit</button>
        </td>
      </tr>
    `;
  });
});


window.deleteStudent = function (roll) {
  remove(ref(db, "students/" + roll));
};


window.editStudent = function (roll, name, course) {
  const newName = prompt("Update name:", name);
  const newCourse = prompt("Update course:", course);

  if (newName && newCourse) {
    update(ref(db, "students/" + roll), {
      name: newName,
      course: newCourse,
      roll: roll
    });
  }
};