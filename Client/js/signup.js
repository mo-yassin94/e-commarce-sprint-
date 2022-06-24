
const signupbtn = document.getElementById("signupbtn");

signupbtn.addEventListener("click", async () => {
    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    async function postData(url = '') {
        data = {
            'name': `${fname} ${lname}`,
            'email': `${email}`,
            'password': `${password}`
        }
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }
    const url = 'http://localhost:5000/user/register';
    postData(url).then(data => {        
        if (data.user) {
            window.location = "index.html";
            localStorage.setItem("email",`${email}`);
            localStorage.setItem("userid",`${data.user}`);
        } else {
            alert(data.msg);
        }
    });
});