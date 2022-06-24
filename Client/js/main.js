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
            div.classList.add("col-lg-3", "col-sm-6", "col-md-3", "categorycard");
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
//search button
const searchinput = document.getElementById("searchinput");
const searchbtn = document.getElementById("searchbtn");
function capitalizeFirstLetter(longstring) {
    let words = longstring.split(" ");
    let fraze = "";
    for (let index = 0; index < words.length; index++) {
        fraze += words[index].charAt(0).toUpperCase() + words[index].slice(1) + " ";
    }
    return fraze;
  }
searchbtn.addEventListener("click", () => {
    searchbtn.setAttribute("href", `category.html?${capitalizeFirstLetter(searchinput.value)}`);
});

