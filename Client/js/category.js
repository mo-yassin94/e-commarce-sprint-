const loader = document.getElementById("loader"); 
loader.style.display = "none";
window.addEventListener("load", async () => {
    //get products from server based on url parameter
    const productscontainer = document.querySelector(".furniture-middle");
    const docFragment = document.createDocumentFragment();
    const categoryheader = document.getElementById("categoryheader");
    let url = window.location.href;
    let urlarray = url.split("?");
    async function getData(url = '') {
        const response = await fetch(url, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }
    let rl = urlarray[1] ? `/${urlarray[1]}` : '';
    const fetchurl = `http://localhost:5000/products${rl}`;
    getData(fetchurl).then(data => {
        if (data != "") {
            document.title = `Online Store Products-${data[0].category}}`;
            loader.style.display = "none";
            productscontainer.style.display="block";
            categoryheader.innerText = rl ? data[0].category : "All";
            for (let index = 0; index < data.length; index++) {
                let div = document.createElement("div");
                div.classList.add("big-box");
                div.style.margin = "10px 0px";
                let items = `
                <div class="big-img-box">
                    <img src="./assets/images/${data[index].images}" alt="#" />
                </div>
                <div class="big-dit-b clearfix">
                    <div class="col-md-6">
                    <div class="left-big">
                        <h3>${data[index].title}</h3>
                        <p> <span>  </span>  <span></span></p>
                        <div class="prod-btn">
                            <a href="#"><i class="fa fa-plus" aria-hidden="true"></i> Add to cart</a>
                            <a href="#"><i class="fa fa-opencart" aria-hidden="true"></i> Buy now</a>
                            
                        </div>
                    </div>
                    </div>
                    <div class="col-md-6">
                    <div class="right-big-b">
                        <div class="tight-btn-b clearfix">
                            <a class="view-btn" target="blank" href="productpage.html?${data[index].product_id}" >View</a>
                            <a href="#">$${data[index].price}</a>
                        </div>
                        
                    </div>
                    </div>
                </div>
                `;
                div.innerHTML = items;
                docFragment.prepend(div);
            }
            productscontainer.prepend(docFragment);

        } else {
            loader.style.display = "block";
            productscontainer.style.display="none";
        }
    });
    //build categorys from server data
    const categorylist = document.getElementById("categorylist");
    const categoryfrag = document.createDocumentFragment();
    const categoryurl = 'http://localhost:5000/app/category';
    async function getcatData(url = '') {
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
    getcatData(categoryurl).then(data => {
        if(data){
            for (let index = 0; index < data.length; index++) {
                let li = document.createElement("li");
                let items = `
                    <a href="category.html?${data[index].name}"><img width="32" src="./assets/images/product/${data[index].imagepath}" alt="#" /> ${data[index].name}</a>
                `;
                li.innerHTML = items;
                categoryfrag.appendChild(li);
            }
            categorylist.appendChild(categoryfrag);
        }else{
            
        }
    });
});

