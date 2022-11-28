import { products } from "./ProductList.js";







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
displayProductList(productList);

/* function displayAccountList() {
    return `
    <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td class="editButton"><a href="#">Sửa</a> / <a href="#">Xóa</a></td>
    </tr>
    `
    document.getElementById('innerAccount').innerHTML = s.join('');
}
displayAccountList();

function displaySoldList() {
    return `
    <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    `
    document.getElementById('innerSold').innerHTML = s.join('');
}
displaySoldList(); */

