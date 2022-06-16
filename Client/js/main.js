window.addEventListener('load', async () => {
    const productscontainer = document.getElementById("productscontainer");
    const url = 'http://localhost:5000/app/category';
    const docFragment = document.createDocumentFragment();
    async function getData(url = '') {
        // Default options are marked with *
        const response = await fetch(url, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
            },
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }
    //print categorys to the index page
    getData(url).then(data => {
        for (let index = 0; index < data.length; index++) {
            let div = document.createElement("div");
            div.classList.add("col-lg-3", "col-sm-6", "col-md-3","categorycard");
            let items = `
                <a href="category.html?${data[index].name}">
                    <div class="box-img">
                        <h4>${data[index].name}</h4>
                        <img src="./assets/images/product/${data[index].imagepath}" alt="" />
                    </div>
                </a>
            `;
            div.innerHTML = items;
            docFragment.appendChild(div);
        }
        productscontainer.appendChild(docFragment);
    });
});


// validate the form Sign up 
let log = document.querySelector(".log");

log.onclick = function () {
  let Fname = document.getElementById("fname").value;
  let secName = document.getElementById("secname").value;
  let email = document.getElementById("email").value;
  localStorage.setItem("Fname", Fname);
  localStorage.setItem("secName", secName);
  localStorage.setItem("email", email);

  let passOne = document.getElementById("pass1").value;
  let passTwo = document.getElementById("pass2").value;

  if (passOne === passTwo) {
  } else {
    alert("Your password does not match");
  }
 
};