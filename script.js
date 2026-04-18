let students = JSON.parse(localStorage.getItem("students")) || [];
let editIndex = -1;

displayStudents();

function addStudent(){

    let name = document.getElementById("name").value.trim();
    let roll = document.getElementById("roll").value.trim();
    let course = document.getElementById("course").value.trim();
    let email = document.getElementById("email").value.trim();

    if(name=="" || roll=="" || course=="" || email==""){
        alert("Please fill all details");
        return;
    }

    let student = {
        name:name,
        roll:roll,
        course:course,
        email:email
    };

    if(editIndex==-1){
        students.push(student);
    }else{
        students[editIndex]=student;
        editIndex=-1;
        document.getElementById("mainBtn").innerText="Add Student";
    }

    localStorage.setItem("students", JSON.stringify(students));

    clearFields();
    displayStudents();
}

function displayStudents(){

    let table = document.getElementById("studentTable");
    table.innerHTML="";

    students.forEach((student,index)=>{

        table.innerHTML += `
        <tr>
            <td>${index+1}</td>
            <td>${student.name}</td>
            <td>${student.roll}</td>
            <td>${student.course}</td>
            <td>${student.email}</td>
            <td>
                <button class="edit-btn" onclick="editStudent(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteStudent(${index})">Delete</button>
            </td>
        </tr>
        `;
    });
}

function editStudent(index){

    document.getElementById("name").value = students[index].name;
    document.getElementById("roll").value = students[index].roll;
    document.getElementById("course").value = students[index].course;
    document.getElementById("email").value = students[index].email;

    editIndex=index;

    document.getElementById("mainBtn").innerText="Update Student";
}

function deleteStudent(index){

    students.splice(index,1);

    localStorage.setItem("students", JSON.stringify(students));

    displayStudents();
}

function clearFields(){

    document.getElementById("name").value="";
    document.getElementById("roll").value="";
    document.getElementById("course").value="";
    document.getElementById("email").value="";
}