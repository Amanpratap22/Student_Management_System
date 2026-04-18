loadStudents();

function addStudent(){

let data = {
name: document.getElementById("name").value,
roll: document.getElementById("roll").value,
course: document.getElementById("course").value,
email: document.getElementById("email").value
};

fetch("/add",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify(data)
})
.then(res=>res.json())
.then(data=>{
loadStudents();
});
}

function loadStudents(){

fetch("/students")
.then(res=>res.json())
.then(data=>{

let table = document.getElementById("studentTable");
table.innerHTML="";

data.forEach(row=>{

table.innerHTML += `
<tr>
<td>${row[0]}</td>
<td>${row[1]}</td>
<td>${row[2]}</td>
<td>${row[3]}</td>
<td>${row[4]}</td>
<td>
<button onclick="deleteStudent(${row[0]})">Delete</button>
</td>
</tr>
`;

});

});
}

function deleteStudent(id){

fetch("/delete/"+id,{
method:"DELETE"
})
.then(res=>res.json())
.then(data=>{
loadStudents();
});
}
