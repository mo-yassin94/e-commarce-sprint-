window.addEventListener("load", async () => {
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
        if (data) {
            categoryheader.innerText = rl ? data[0].category : "All";
            for (let index = 0; index < data.length; index++) {
                let div = document.createElement("div");
                div.classList.add("big-box");
                div.style.margin="10px 0px";
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
                docFragment.appendChild(div);
            }
            productscontainer.appendChild(docFragment);

        } else {
            alert(data.msg);
        }
    });
});