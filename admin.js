function resetInput(){
    document.getElementById('name').value = ""
    document.getElementById('category').value = ""
    document.getElementById('price').value = ""
}

function createProduct(){
    
    const name = document.getElementById('name').value
    const category = document.getElementById('category').value
    const price = document.getElementById('price').value
    
    let jsonProduct = localStorage.getItem('ProductList') ? JSON.parse(localStorage.getItem('ProductList')) : []

    if(!name.replace(/\s+/,'').length){
        alert("Ten rong");
        return false;
    }else
    if(!category.replace(/\s+/,'').length){
        alert("Ten rong");
        return false;
    }else  
    if(!price.match(/\d+/).length){
        alert("Gia rong");
        return false;
    }
    jsonProduct.push({
        name:name,
        category:category,
        price:price
    })
    
    localStorage.setItem('ProductList',JSON.stringify(jsonProduct))
    renderProduct()
    resetInput()
}

function deleteProduct(index){
    let jsonProduct = localStorage.getItem('ProductList') ? JSON.parse(localStorage.getItem('ProductList')) : []

	if (confirm("Are you sure")) {
        jsonProduct.splice(index,1)
    }
    localStorage.setItem('ProductList',JSON.stringify(jsonProduct));
	renderProduct();
}

function editProduct(index){
    let jsonProduct = localStorage.getItem('ProductList') ? JSON.parse(localStorage.getItem('ProductList')) : []
    document.getElementById("name").value = jsonProduct[index].name
    document.getElementById("category").value = jsonProduct[index].category
    document.getElementById("price").value = jsonProduct[index].price
    document.getElementById("index").value = index

    document.getElementById("add").style.display="none"
    document.getElementById("update").style.display="inline-block"
}
function changeProduct(){
    let jsonProduct= localStorage.getItem('ProductList') ? JSON.parse(localStorage.getItem('ProductList')) : []
    let index = document.getElementById("index").value
    jsonProduct[index] = {
        name: document.getElementById("name").value,
        category: document.getElementById("category").value,
        price: document.getElementById("price").value
    }
    localStorage.setItem('ProductList',JSON.stringify(jsonProduct))
    document.getElementById("add").style.display = "inline-block"
    document.getElementById("update").style.display = "none"
    renderProduct()
    resetInput()
}


function renderProduct(){
    let jsonProduct= localStorage.getItem('ProductList') ? JSON.parse(localStorage.getItem('ProductList')) : []
    let productdb =`<tr>
        
    </tr>` 

    jsonProduct.map((value,index)=>{
        productdb +=`<tr>
        <td>${index+1}</td>
        <td>${value.name}</td>
        <td>${value.category}</td>
        <td>${value.price}</td>
        <td>
            <button class="adminButton" onclick="deleteProduct(${index})">Delete</button>
            <button class="adminButton" onclick="editProduct(${index})">Edit</button>
        </td>
    </tr>    
    ` 
    })

    document.getElementById('innerProductList').innerHTML=productdb
}

function renderAccount(){

    let userArray= localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : []
    let userdb =`<tr>
        
    </tr>` 

    userArray.map((value,index)=>{
        userdb +=`<tr>
        <td>${index+1}</td>
        <td>${value.username}</td>
        <td>${value.email}</td>
        <td>
            <button class="adminButton" onclick="deleteProduct(${index})">Delete</button>
        </td>
    </tr>    
    ` 
    })

    document.getElementById('innerAccountList').innerHTML=userdb
}

window.onload=function(){
    renderAccount()
    renderProduct()
}