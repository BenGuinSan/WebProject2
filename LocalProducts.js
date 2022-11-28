import { products } from "./ProductList.js";


// Chuyển products thành chuỗi JSON
var jsonProduct = JSON.stringify(products);

// Truyền dữ liệu từ jsonProduct lên LocalStrorage
localStorage.setItem("ProductList", jsonProduct);
localStorage.getItem("ProductList", jsonProduct);


var productList = JSON.parse(jsonProduct);
var productList = products;

function start() {
  renderCoursesAll(productList);
  sortPriceHightToLow(productList);
  sortPriceLowToHight(productList);
  // sortDefault(productList);
  newestProducts(productList);
  allProducts(productList);
  productDetail(productList);
  startModal();
  renderListPage(productList);
  changePage(productList);
  changePageFuc(productList);
}

let perPage = 10;
let currentPage = 1;
let starts = 0;
let end = perPage;

function totalP(productList){
  return Math.ceil(productList.length / perPage);
}

function renderCoursesAll(productList) {
  const productAll = document.getElementById("row__product");
  let htmlAll = productList.map(function (product,index) {
    let price = product.price.toLocaleString();
    let saleOff = product.saleoffvalue.toLocaleString();

    let priceCur = product.price - product.saleoffvalue;
    let priceCurrent = priceCur.toLocaleString();
    if(index >= starts && index < end){
      return `<div class="grid__col-2-4 ${product.category}">
                              <div class="product-item" data-id="${product.id}">
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
    }
  });
  productAll.innerHTML = htmlAll.join("");
}

function getCurrentPage(currentPage){
  starts = (currentPage - 1) * perPage;
  end = currentPage * perPage;
}

function changePageFuc(productList){
  const btnNext = document.querySelector('.page-item-next');
  const btnPrev = document.querySelector('.page-item-prev');
  btnNext.addEventListener('click', () =>{
    currentPage++;
    if(currentPage >= totalP(productList)){
      currentPage = totalP(productList);
    }
    if(currentPage === totalP(productList)){
      btnNext.classList.add('page-disable');
    }
    btnPrev.classList.remove('page-disable');
    const pageNums = document.querySelectorAll('.number-page li.page-item-current');
    pageNums.forEach(function(page){
      if(page.textContent == currentPage){
        page.classList.add('page-active');
      }else{
        page.classList.remove('page-active');
      }
    })
    getCurrentPage(currentPage);
    renderCoursesAll(productList);
    productDetail(productList);
    renderProductDetails(productList);
    startModal()
  })
 
  btnPrev.addEventListener('click', () =>{
    currentPage--;
    if(currentPage <= 1){
      currentPage = 1;
    }
    if(currentPage === 1){
      btnPrev.classList.add('page-disable');
    }
    btnNext.classList.remove('page-disable');
  
    const pageNums = document.querySelectorAll('.number-page li.page-item-current');
    pageNums.forEach(function(page){
      if(page.textContent == currentPage){
        page.classList.add('page-active');
      }else{
        page.classList.remove('page-active');
      }
    })
    getCurrentPage(currentPage);
    renderCoursesAll(productList);
    productDetail(productList);
    renderProductDetails(productList);
    startModal()
  })
}

function renderListPage(productList){
  let htmlList = ''
  const pageNum = document.querySelector('.number-page');
  htmlList += `<li class="page-item-current page-active">${1}</li>`
  for(let i = 2; i <= totalP(productList); i++){
    htmlList += `<li class="page-item-current">${i}</li>`
  }
  pageNum.innerHTML = htmlList;
}

function changePage(productList){
  renderListPage(productList);
  const btnPrev = document.querySelector('.page-item-prev');
  const btnNext = document.querySelector('.page-item-next');
  const currentPages = document.querySelectorAll('.number-page li');
  const $$ = document.querySelectorAll.bind(document);
  const $ = document.querySelector.bind(document);
  const pageNums = $$('.number-page li.page-item-current');

  for(let i = 0; i < currentPages.length; i++){
    currentPages[i].addEventListener('click', () => {
      let value = i + 1;
      currentPage = value;
      if(currentPage === 1){
        btnPrev.classList.add('page-disable');
        btnNext.classList.remove('page-disable');
      }
      if(currentPage === totalP(productList)){
        btnNext.classList.add('page-disable');
        btnPrev.classList.remove('page-disable');
      }
      if(currentPage > 1 && currentPage < totalP(productList)){
        btnPrev.classList.remove('page-disable');
        btnNext.classList.remove('page-disable');
      }
      getCurrentPage(currentPage);
      renderCoursesAll(productList)
      productDetail(productList);
      renderProductDetails(productList);
      startModal()
    })
  }

  pageNums.forEach(function(page) {
    page.onclick = function(){
      $('.number-page li.page-item-current.page-active').classList.remove('page-active');
      this.classList.add('page-active');
    }
  })
}

function newestProducts(productList) {
  var newBtn = document.querySelector(".selection-newest");
  newBtn.addEventListener("click", function () {
    var newProducts = productList.filter(function (product) {
      return product.status === "new";
    });
    totalP(newProducts);
    getCurrentPage(currentPage);
    renderCoursesAll(newProducts);
    productDetail(newProducts);
    startModal();
    renderProductDetails(newProducts);
    changePageFuc(newProducts);
    renderListPage(newProducts);
    changePage(newProducts);
    sortPriceHightToLow(newProducts);
    sortPriceLowToHight(newProducts);
  });
}

function allProducts(productList) {
  var allProductsBtn = document.querySelector(".selection-all");
  allProductsBtn.addEventListener("click", function () {
    renderCoursesAll(productList);
    productDetail(productList);
    renderProductDetails(productList);
    startModal();
    renderListPage(productList);
    changePageFuc(productList);
    changePage(productList);
  });
}

function sortPriceHightToLow(productList) {
  var sortHightBtn = document.querySelector(".sort-hight");
  sortHightBtn.addEventListener("click", function () {
    var sortHight = productList.sort(function (a, b) {
      return b.price - b.saleoffvalue - (a.price - a.saleoffvalue);
    });
    renderCoursesAll(sortHight);
    productDetail(sortHight);
    renderProductDetails(sortHight);
    startModal()
  });
}

function sortPriceLowToHight(productList) {
  var sortLowBtn = document.querySelector(".sort-low");
  sortLowBtn.addEventListener("click", function () {
    var sortLow = productList.sort(function (a, b) {
      return a.price - a.saleoffvalue - (b.price - b.saleoffvalue);
    });
    renderCoursesAll(sortLow);
    productDetail(sortLow);
    renderProductDetails(sortLow);
    startModal();
  });
}

// function sortDefault(productList) {
//   var sortDefaultBtn = document.querySelector(".sort-default");
//   sortDefaultBtn.addEventListener("click", function () {
//     renderCoursesAll(productList);
//     productDetail(productList);
//     renderProductDetails(productList);
//     startModal();
//     renderListPage(productList);
//     changePageFucNext(productList);
//     changePageFucPrev(productList);
//     renderListPage(productList);
//     changePage(productList);
//   });
// }

//ProductDetails
function startModal(){
  const productDetail = document.querySelectorAll(".product-item");
  productDetail.forEach(function(item){
    item.addEventListener('click',function(){
      closeProductDetail();
      hideModal();
    })
  })
}

function closeProductDetail() {
  const closeBtn = document.querySelector(".product-close-btn");
  const modalDetail = document.querySelector(".modal");
  closeBtn.addEventListener("click", function () {
    modalDetail.style.display = "none";
  });
}

function hideModal() {
  const modalDetail = document.querySelector(".modal");
  modalDetail.addEventListener("click", function () {
    modalDetail.style.display = "none";
  });
  const productDetail = document.querySelector(".product-view");
  productDetail.addEventListener("click", function (e) {
    e.stopPropagation();
  });
}

function productDetail(productList) {
  const productDetail = document.querySelectorAll(".product-item");
  const modalDetail = document.querySelector(".modal");
  productDetail.forEach(function (item) {
    item.addEventListener("click", function (event) {
      // console.log(event.currentTarget.getAttribute("data-id"));
      let detailID = event.currentTarget.getAttribute("data-id");
      var detailIDProduct = productList.filter(function(product){
        return product.id == detailID;
      })
      renderProductDetails(detailIDProduct);
    });
  });

  productDetail.forEach(function(item){
    item.addEventListener('click', function(){
      modalDetail.style.display = 'block';
    })
  })
}

function renderProductDetails(productList) {
  const productDetails = document.querySelector(".modal__body");
  let htmlProduct = productList.map(function (product) {
    let price = product.price.toLocaleString();
    let priceCur = product.price - product.saleoffvalue;
    let priceCurrent = priceCur.toLocaleString();
    return `
    <div class="product-view">
    <div class="product-close-btn">X</div>
    <div class="product-img-display">
      <img  src="${product.img}" alt=""> 
      <div class="product-detail-info">
      <span class="product-info">${product.infor1}</span>
      <br>
      <span class="product-info">${product.infor2}</span>
      <br>
      <span class="product-info">${product.infor3}</span>
      <br>
      <span class="product-info">${product.infor4}</span>
      <br>
      <span class="product-info">${product.infor5}</span>
      <br>
      <span class="product-info">${product.infor6}</span>
      <br>
      <span class="product-info">${product.infor7}</span>
      <br>
      <span class="product-info">${product.infor8}</span>
      </div>
    </div>
    <div class="product-des">
      <h2 class="product-detail-name">
        ${product.name}
      </h2>
      <h5 class="product-detail-id">
        Product ID: ${product.id}
      </h5>
      <h5 class="product-detail-brand">
        Brand: ${product.trademarks}
      </h5>
      <h6 class="product-detail-review">
        <a href="#">View all review</a>
      </h6>
      <div class="product-detail-price">
        <span class="product-detail-priceCur">${priceCurrent} &#8363</span>
        <span class="product-detail-priceOld">${price} &#8363</span>
      </div>
      <div class="product-detail-btn">
        <button class="product-detail-buy">Mua ngay</button>
        <button class="product-detail-addCart">Thêm vào giỏ hàng</button>
      </div>
    </div>
  </div>
  `;
  });
  productDetails.innerHTML = htmlProduct.join("");
}


start();


displayProductList(productList);
function displayProductList(productList)
{
    /* let p=JSON.parse(localStorage.getItem('products')); */
    console.log(productList);
}