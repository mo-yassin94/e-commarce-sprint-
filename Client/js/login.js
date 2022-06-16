const loginbtn = document.getElementById("loginbtn");
const email = document.getElementById("email");
const password = document.getElementById("password");
Date.prototype.addMinutes= function(m){
    this.setMinutes(this.getMinutes()+m);
    return this;
}
loginbtn.addEventListener("click",async ()=> {
    async function postData(url = '') {
        data = {
            'email': `${email.value}`,
            'password': `${password.value}`
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
    const url = 'http://localhost:5000/user/login';
    postData(url).then(data => {
        if(data.user){
            window.location = `/index.html`;
            let expire = new Date().addMinutes(1);
            document.cookie = `username=${data.name};expires=${expire};`
        }else {
            alert(data.msg);
        }
    });
});