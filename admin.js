/*import { products } from "./ProductList.js";

var a=localStorage.getItem("ProductList");
var productList = JSON.parse(a);
var productList = products;
function displayProductList(productList)
{
    var s= productList.map(function(product){
    let priceCur = product.price - product.saleoffvalue;
    let priceCurrent = priceCur.toLocaleString();
    return `
      <tr>
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>${product.category}</td>
        <td>${priceCurrent}</td>
        <td class="editButton"><a href="#">Sửa</a> / <a href="#">Xóa</a></td>
        </tr>
      `
    });
    document.getElementById('innerProductList').innerHTML = s.join('');
}
displayProductList(productList);*/

function renderProduct(){
    let jsonProduct= localStorage.getItem('ProductList') ? JSON.parse(localStorage.getItem('ProductList')) : []
    let productdb =`<tr>
        
    </tr>` 

    jsonProduct.map((value,index)=>{
        productdb +=`<tr>
        <td>${index}</td>
        <td>${value.name}</td>
        <td>${value.category}</td>
        <td>${value.price}</td>
        <td>
            <button onclick="deleteProduct(${index})">Delete</button>
            <button onclick="editProduct(${index})">Edit</button>
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
            <button onclick="deleteProduct(${index})">Delete</button>
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