import {products} from './ProductList.js';

// Chuyển products thành chuỗi JSON
var jsonProduct = JSON.stringify(products);

// Truyền dữ liệu từ jsonProduct lên LocalStrorage
localStorage.setItem('ProductList',jsonProduct);
localStorage.getItem('ProductList',jsonProduct);

var productList = JSON.parse(jsonProduct);

var productList = products;


function start(){
  renderCoursesAll(productList);
  sortPriceHightToLow(productList);
  sortPriceLowToHight(productList);
  sortDefault(productList);
  newestProducts(productList);
  allProducts(productList);
}

start();

function renderCoursesAll(productList){
    const productAll = document.getElementById("row__product");
    let htmlAll = productList.map(function (product) {
            let price = product.price.toLocaleString();
            let saleOff = product.saleoffvalue.toLocaleString();

            let priceCur = product.price - product.saleoffvalue;
            let priceCurrent = priceCur.toLocaleString();
            return `<div class="grid__col-2-4 ${product.category}">
                            <div class="product-item ">
                                <div class="product-item__img" style="background-image:url(${product.img});"></div>
                                <h3 class="product-item__name">${product.name}</h3>
                                <div class="pruduct-item__container">
                                    <div class="product-item__price">
                                        <span class="product-item__price-cur">${priceCurrent} &#8363;</span>
                                        <span class="product-item__price-old">${price} &#8363;</span>
                                    </div>
        
                                    <div class="product-item-freeship">
                                        <i class="product-item-freeship-icon fa-solid fa-truck-fast"></i>
                                    </div>
                                </div>
                                <div class="product-item__sale-off">
                                    <div class="product-item__sale-off-label">TIẾT KIỆM</div>
                                    <div class="product-item__sale-off-value">${saleOff} &#8363; </div>
                                </div>
                            </div>
                        </div>`;
          });
          productAll.innerHTML = htmlAll.join("");
}

function newestProducts(productList){
  var newBtn = document.querySelector('.selection-newest');
  newBtn.addEventListener("click", function(){
    var newProducts = productList.filter(function(product){
      return product.status === 'new';
    })  

    renderCoursesAll(newProducts); 
  })
}  

function allProducts(productList){
  var allProductsBtn = document.querySelector('.selection-all');
  allProductsBtn.addEventListener('click', function(){
    renderCoursesAll(productList);
  });
}

function sortPriceHightToLow(productList){
  var sortHightBtn = document.querySelector('.sort-hight');
  sortHightBtn.addEventListener('click', function(){
    var sortHight = productList.sort(function(a,b){
      return (b.price - b.saleoffvalue) - (a.price - a.saleoffvalue);
    })
  renderCoursesAll(sortHight);
  });
}

function sortPriceLowToHight(productList){
  var sortLowBtn = document.querySelector('.sort-low');
  sortLowBtn.addEventListener('click', function(){
    var sortLow = productList.sort(function(a,b){
      return (a.price - a.saleoffvalue) - (b.price - b.saleoffvalue);
    })
  renderCoursesAll(sortLow);
  });
}

function sortDefault(productList){
  var sortDefaultBtn = document.querySelector('.sort-default');
  sortDefaultBtn.addEventListener('click', function(){
    renderCoursesAll(productList);
  });
}


