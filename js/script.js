let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let lightbtn = document.getElementById("lightbtn");
let search = document.getElementById("search");
let searchTitlebtn = document.getElementById("searchTitle");
let searchCategorybtn = document.getElementById("searchCategory");

let mood = "create";
let num = '';
let m = "dark";


//getTotal function

function getTotal() {

    if(price.value != ''){
        total.innerText = +price.value + +taxes.value + +ads.value - discount.value;
        total.style.backgroundColor = "green";
    }else {
        total.innerText = 0;
        total.style.backgroundColor = 'hsl(0, 93%, 34%)';
    }

}


// create product

let dataPro;

if(localStorage.products != null) {
    dataPro = JSON.parse(localStorage.products)
}else {
    dataPro = [];
}

submit.onclick = function() {
    let newPro = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        total: total.innerText,
        discount: discount.value,
        count: count.value,
        category: category.value,
    }

    if(title.value != ''
    && price.value != ''
    && category.value != ''){

        if(mood === "create"){
            if(newPro.count > 1){
                for(let i = 1; i <= newPro.count; i++){
                    dataPro.push(newPro);
                }
            }else{
                dataPro.push(newPro);
            }
        }else{
            dataPro[num] = newPro;
            mood = "create";
            submit.innerText = "Create";
            count.style.display = "block";
        }
        clearInputs();
    }else{
        alert("please fill Title , Price and Category");
    }


    
    

    localStorage.setItem("products", JSON.stringify(dataPro));


    showData();
}


//clear inputs function

function clearInputs() {
    title.value = ''
    price.value = ''
    taxes.value = ''
    ads.value = ''
    total.innerText = 0
    total.style.backgroundColor = 'hsl(0, 93%, 34%)';
    count.value = ''
    discount.value = ''
    category.value = ''
}

//read

function showData() {
    let table = "";
    for(let i = 0; i < dataPro.length; i++){
        table += `
        <tr>
            <th>${i + 1}</th>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>
        `
    }

    document.getElementById('tbody').innerHTML = table;

    let deleteAll = document.getElementById('deleteAll');
    if(dataPro.length > 0){
        deleteAll.innerHTML = `
        <button onclick="deleteAll()">delete All (${dataPro.length})</button>
        `
    }else{
        deleteAll.innerHTML = ""
    }
}

showData();

//delete

function deleteData(i) {
    dataPro.splice(i,1);
    localStorage.products = JSON.stringify(dataPro);
    showData();
}

function deleteAll() {
    dataPro = [];
    localStorage.products = JSON.stringify(dataPro);
    showData();
}

//update
function updateData(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    category.value = dataPro[i].category;
    count.style.display = "none"
    submit.innerText = "Update";
    mood = "update";
    num = i;
    getTotal();
    scroll({
        top:0,
        behavior:'smooth',
    })
}

lightbtn.onclick = function() {
    if(m === "dark"){
        document.getElementById("light").innerHTML = "<link rel='stylesheet' href='css/lightMood.css'></link>";
        m = "light";
        document.getElementById("lightbtn").innerText = "Dark Mood"
    }else{
        document.getElementById("light").innerHTML = '';
        m = "dark";
        document.getElementById("lightbtn").innerText = "Light Mood"
    }
    
}


// search

let searchMood = "title";

function getSearchMood(id){
    if(id == "searchTitle"){
        searchMood = "title";
        search.placeholder = "search by Title"
    }else{
        searchMood = "category";
        search.placeholder = "search by Category"
    }
    search.focus();
    search.value = '';
}

function searchData(value){
    let table = ''
    for(let i = 0; i<dataPro.length; i++){
        if(searchMood == "title"){
       
            if(dataPro[i].title.includes(value)){
                table += `
                <tr>
                    <th>${i + 1}</th>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>
                `
            }
            
        }else{
            if(dataPro[i].category.includes(value)){
                table += `
                <tr>
                    <th>${i + 1}</th>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>
                `
            }
    
        }
    }

    document.getElementById('tbody').innerHTML = table;
    
}