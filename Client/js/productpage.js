window.addEventListener("load", async () => {
    const productprice = document.getElementById("productprice");
    const producttitlehead = document.getElementById("producttitlehead");
    const producttitle = document.getElementById("producttitle");
    const productcat = document.getElementById("productcat");
    const mainpic = document.getElementById("mainpic");
    const thumbpic = document.getElementById("thumbpic");
    const descriptionwords = document.getElementById("descriptionwords");
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
    const fetchurl = `http://localhost:5000/products/${urlarray[1]}`;
    getData(fetchurl).then(data => {
        console.log(data);
        if (data) {
            productprice.innerText=`$${data[0].price}`;
            productcat.innerText = `${data[0].category}`;
            producttitle.innerText = `${data[0].title}`;
            producttitlehead.innerText = `${data[0].title}`;
            mainpic.setAttribute("src",`./assets/images/${data[0].images}`);
            thumbpic.setAttribute("src",`./assets/images/${data[0].images}`);
            descriptionwords.innerText = `${data[0].description}`;
            document.title = `Online Store-${data[0].title}`;

            
        } else {
            alert(data.msg);
        }
    });
});