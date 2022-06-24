const loginsignup = document.getElementById("login-signup");
const loginsr = document.getElementById("login-sr");
const useremail = document.getElementById("useremail");
const userdata = document.getElementById("userdata");
//log out btn
let btnlogout = document.createElement("div");
btnlogout.innerText = "Log out";
btnlogout.style.margin = "15px 0px"
btnlogout.classList.add("btn", "btn-danger");
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
let name = getCookie("username");
if (name) {
  loginsignup.style.display = "none";
  loginsr.appendChild(btnlogout);
  //set user email if loged in
  useremail.innerText = `Welcome ${name}`;
  userdata.style.display = "inline-block";

} else {
  loginsignup.style.display = "block";
  userdata.style.display = "none";
  loginsr.removeChild(btnlogout);

}
btnlogout.addEventListener("click", () => {
  document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  window.location = `/`;
  async function getData(url = '') {
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
  let url = "http://localhost:5000/user/logout";
  getData(url);
});
