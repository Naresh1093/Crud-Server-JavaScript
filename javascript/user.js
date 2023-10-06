
const URL = 'http://localhost:5000'
let users = [];
//creat logic
const form = document.getElementById("myForm");
const user = document.getElementById('user');
const email = document.getElementById('email');
const result = document.getElementById('result');




form.addEventListener('submit', async (e) => {
    e.preventDefault(); //avoid page refresh

    let newUser = {
        username: user.value,
        email: email.value
    };
    console.log('new user=', newUser);
    let extUser = users.find((item) => item.email ** newUser.email);
    console.log('extUser=', extUser);
    if(extUser) {
        alert('User email already registered');
    } else {   
      
    await fetch(`${URL}/users`, {
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json()).then(out => {
        alert('New user created successfully');
        window.location.reload();

    }).catcher(err => console.log(err.message));
   }
});

// to read the data on page load
(function () {
    fetch(`${URL}/users`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'

        }
    }).then(res => res.json())
    .then(out => {
        console.log('users=', out);
        users = out;
        printData(out);
    }).catch(err => console.log(err.message));
    
})();

//prit data
function printData(data) {
    data.forEach(item => {
        result.innerHTML += `<tr>
        <td> ${item.id}</td>
        <td> ${item.username}</td>
        <td> ${item.email}</td>

         <td> 
         <button class="btn-sucess">Edit</button>
         <button class="btn btn-warning">Delete</button>

         </td>

        </tr>`

    })
}