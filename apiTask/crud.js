function postData() {
  var fdata = {
    firstName: document.getElementById("fname").value,
    lastName: document.getElementById("secname").value,
    age: document.getElementById("age").value,
    gender: document.getElementById("gender").value,
    mobile: document.getElementById("mobile").value,
    email: document.getElementById("email").value,
  };
  document.getElementById("fname").value = "";
  document.getElementById("secname").value = "";
  document.getElementById("age").value = "";
  document.getElementById("gender").value = "";
  document.getElementById("mobile").value = "";
  document.getElementById("email").value = "";

  try {
    var postdata = fetch(
      "https://61ee841ad593d20017dbaef9.mockapi.io/Details",
      {
        method: "POST",
        body: JSON.stringify(fdata),
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    alert("Data Stored");
    getData();
  } catch (error) {
    alert("Something Went Wrong");
  }
}

document.getElementById("submit").addEventListener("click", function (params) {
  getData();
});

function getData() {
  try {
    fetch("https://61ee841ad593d20017dbaef9.mockapi.io/Details")
      .then((data) => data.json())
      .then((dat) => {
        var user = dat;
        console.log(user);
        var tbody = document.getElementById("tbody");
        tbody.innerHTML = "";
        user.forEach((users) => {
          var tr = document.createElement("tr");
          var idtd = document.createElement("td");
          idtd.innerHTML = users.id;

          var firsttd = document.createElement("td");
          firsttd.innerHTML = users.firstName;
          var lasttd = document.createElement("td");
          lasttd.innerHTML = users.lastName;
          var agetd = document.createElement("td");
          agetd.innerHTML = users.age;
          var gendertd = document.createElement("td");
          gendertd.innerHTML = users.gender;
          var mobiletd = document.createElement("td");
          mobiletd.innerHTML = users.mobile;
          var emailtd = document.createElement("td");
          emailtd.innerHTML = users.email;
          var edtr = document.createElement("td");

          var edittd = document.createElement("button");
          edittd.innerText = "edit";
          var deltd = document.createElement("td");
          var delkey = document.createElement("button");
          delkey.innerText = "Delete";
          delkey.addEventListener("click", function () {
            try {
              var del = fetch(
                `https://61ee841ad593d20017dbaef9.mockapi.io/Details/${idtd.innerText}`,
                {
                  method: "DELETE",
                }
              );
              alert("user Deleted");
              getData();
            } catch (error) {
              alert("Problem in Delfunction");
            }
          });

          edittd.addEventListener("click", function () {
            document.getElementById("fname").value = firsttd.innerText;
            document.getElementById("secname").value = lasttd.innerText;
            document.getElementById("age").value = agetd.innerText;
            document.getElementById("gender").value = gendertd.innerText;
            document.getElementById("mobile").value = mobiletd.innerText;
            document.getElementById("email").value = emailtd.innerText;

            var up = document.getElementById("submit");
            up.style.display = "none";
            document.getElementById("update").style.display = "block";
            document
              .getElementById("update")
              .addEventListener("click", function () {
                document.getElementById("update").style.display = "none";
                document.getElementById("submit").style.display = "block";

                var putdata = {
                  firstName: document.getElementById("fname").value,
                  lastName: document.getElementById("secname").value,
                  age: document.getElementById("age").value,
                  gender: document.getElementById("gender").value,
                  mobile: document.getElementById("mobile").value,
                  email: document.getElementById("email").value,
                };
                document.getElementById("fname").value = "";
                document.getElementById("secname").value = "";
                document.getElementById("age").value = "";
                document.getElementById("gender").value = "";
                document.getElementById("mobile").value = "";
                document.getElementById("email").value = "";
                try {
                  var ptdata = fetch(
                    `https://61ee841ad593d20017dbaef9.mockapi.io/Details/${idtd.innerText}`,
                    {
                      method: "PUT",
                      body: JSON.stringify(putdata),
                      headers: {
                        "Content-type": "application/json",
                      },
                    }
                  );
                  alert("Information Updated");
                  getData();
                } catch (error) {
                  alert("Problem in Updater function");
                }
              });
          });
          deltd.append(delkey);
          edtr.appendChild(edittd);
          tr.append(
            idtd,
            firsttd,
            lasttd,
            agetd,
            gendertd,
            mobiletd,
            emailtd,
            edtr,
            deltd
          );

          tbody.appendChild(tr);
        });
      });
  } catch {
    alert("problem in get method");
  }
}

getData();

// // simple way format to get data from api
// function getdata() {
//   var url = "https://61ee841ad593d20017dbaef9.mockapi.io/Details/";
//   fetch(url)
//     .then((res) => res.json())
//     .then((data) => console.log(data))
//     .catch((err) => console.log(error));
// }
