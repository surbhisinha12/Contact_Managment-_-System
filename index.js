function validateForm() {
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;

  if (name === "") {
    alert("Please fill name");
    return false;
  }
  if (age === "") {
    alert("Age must be number");
    return false;
  }
  else if (age < 1) {
    alert("Age must not be zero or less than zero");
    return false;
  }
  if (phone === "") {
    alert(" Please fill phone number");
    return false;
  }
  if (email === "") {
    alert("Please fill email id ");
    return false;
  } else if (!email.includes("@")) {
    alert("Invalid email address");
    return false;
  }

  return true;
}

function showData() {
  let list = JSON.parse(localStorage.getItem("list")) || [];
  var tableBody = document.querySelector("tbody");
  var html = "";
  list.forEach(function (element, index) {
    html += "<tr>"
    html += "<td>" + element.name + "</td>";
    html += "<td>" + element.age + "</td>";
    html += "<td>" + element.phone + "</td>";
    html += "<td>" + element.email + "</td>";
    html += `<td><button onclick="deleteData(${index})" class="btn btn-danger">Delete</button>
             <button onclick="updateData(${index})" class="btn btn-warning ">Edit</button></td>`;
    html += "</tr>";
  });

  //document.getElementById("table-Content").innerHTML = html;
 
  tableBody.innerHTML =  html;
  
}

// Loads all data when documents are loaded
window.onload = showData;

// Functions for add data
function AddData() {
  if (validateForm()) {
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    let list = JSON.parse(localStorage.getItem("list")) || [];

    list.push({
      name: name,
      age: age,
      phone: phone,
      email: email,
    });
    localStorage.setItem("list", JSON.stringify(list));
    showData();

    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("email").value = "";
  }
}

function deleteData(index) {
  let list = JSON.parse(localStorage.getItem("list")) || [];

  if (index >= 0 && index < list.length) {
    list.splice(index, 1);
    localStorage.setItem("list", JSON.stringify(list));
    showData();
  }
}

function updateData(index) {
  document.getElementById("Submit").style.display = "none";
  document.getElementById("Update").style.display = "block";
  let list = JSON.parse(localStorage.getItem("list")) || [];

  if (index >= 0 && index < list.length) {
    const data = list[index];
    document.getElementById("name").value = data.name;
    document.getElementById("age").value = data.age;
    document.getElementById("phone").value = data.phone;
    document.getElementById("email").value = data.email;

    document.querySelector("#Update").onclick = function () {
      if (validateForm()) {
        list[index].name = document.getElementById("name").value;
        list[index].phone = document.getElementById("phone").value;
        list[index].age = document.getElementById("age").value;
        list[index].email = document.getElementById("email").value;
        localStorage.setItem("list", JSON.stringify(list));
        showData();

        document.getElementById("name").value = "";
        document.getElementById("phone").value = "";
        document.getElementById("age").value = "";
        document.getElementById("email").value = "";
        document.getElementById("Submit").style.display = "block";
        document.getElementById("Update").style.display = "none";
      }
    };
  }
}
