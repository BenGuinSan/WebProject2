import { products as defaultProducts } from "./ProductList.js";

var productList = [];

// Nếu ProductList chưa tồn tại trong localStorage,
// lấy defaultProducts
if (!localStorage.getItem("ProductList")) {
  localStorage.setItem("ProductList", JSON.stringify(defaultProducts));
  productList = defaultProducts;
} else {
  // Nếu ProductList đã tồn tại, lấy ProductList từ LocalStrorage
  const jsonProduct = localStorage.getItem("ProductList");
  var productList = JSON.parse(jsonProduct);
}

function start() {
  renderCoursesAll(productList);
  sortPriceHightToLow(productList);
  sortPriceLowToHight(productList);
  newestProducts(productList);
  allProducts(productList);
  productDetail(productList);
  startModal();
  totalP(productList);
  renderListPage(productList);
  changePageFuc(productList);
  changePage(productList);
  renderAll(productList);
  renderLap(productList);
  renderMor(productList);
  renderHead(productList);
  renderCon(productList);
  renderMouse(productList);
  renderBoard(productList);
}

let perPage = 10;
let currentPage = 1;
let starts = 0;
let end = perPage;

function totalP(productList) {
  return Math.ceil(productList.length / perPage);
}

function renderCoursesAll(productList) {
  const productAll = document.getElementById("row__product");
  let htmlAll = productList.map(function (product, index) {
    let price = product.price.toLocaleString();
    let saleOff = product.saleoffvalue.toLocaleString();

    let priceCur = product.price - product.saleoffvalue;
    let priceCurrent = priceCur.toLocaleString();
    if (index >= starts && index < end) {
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

function getCurrentPage(currentPage) {
  starts = (currentPage - 1) * perPage;
  end = currentPage * perPage;
}

function changePageFuc(productList) {
  const btnNext = document.querySelector(".page-item-next");
  const btnPrev = document.querySelector(".page-item-prev");
  btnNext.addEventListener("click", () => {
    currentPage++;
    if (currentPage >= totalP(productList)) {
      currentPage = totalP(productList);
    }
    if (currentPage === totalP(productList)) {
      btnNext.classList.add("page-disable");
    }
    btnPrev.classList.remove("page-disable");
    const pageNums = document.querySelectorAll(
      ".number-page li.page-item-current"
    );
    pageNums.forEach(function (page) {
      if (page.textContent == currentPage) {
        page.classList.add("page-active");
      } else {
        page.classList.remove("page-active");
      }
    });
    getCurrentPage(currentPage);
    renderCoursesAll(productList);
    productDetail(productList);
    renderProductDetails(productList);
    startModal();
  });

  btnPrev.addEventListener("click", () => {
    currentPage--;
    if (currentPage <= 1) {
      currentPage = 1;
    }
    if (currentPage === 1) {
      btnPrev.classList.add("page-disable");
    }
    btnNext.classList.remove("page-disable");

    const pageNums = document.querySelectorAll(
      ".number-page li.page-item-current"
    );
    pageNums.forEach(function (page) {
      if (page.textContent == currentPage) {
        page.classList.add("page-active");
      } else {
        page.classList.remove("page-active");
      }
    });
    getCurrentPage(currentPage);
    renderCoursesAll(productList);
    productDetail(productList);
    renderProductDetails(productList);
    startModal();
  });
}

function renderListPage(productList) {
  let htmlList = "";
  const pageNum = document.querySelector(".number-page");
  htmlList += `<li class="page-item-current page-active">${1}</li>`;
  for (let i = 2; i <= totalP(productList); i++) {
    htmlList += `<li class="page-item-current">${i}</li>`;
  }
  pageNum.innerHTML = htmlList;
}

function changePage(productList) {
  renderListPage(productList);
  const btnPrev = document.querySelector(".page-item-prev");
  const btnNext = document.querySelector(".page-item-next");
  const currentPages = document.querySelectorAll(".number-page li");
  const $$ = document.querySelectorAll.bind(document);
  const $ = document.querySelector.bind(document);
  const pageNums = $$(".number-page li.page-item-current");

  for (let i = 0; i < currentPages.length; i++) {
    currentPages[i].addEventListener("click", () => {
      let value = i + 1;
      currentPage = value;
      if (currentPage === 1) {
        btnPrev.classList.add("page-disable");
        btnNext.classList.remove("page-disable");
      }
      if (currentPage === totalP(productList)) {
        btnNext.classList.add("page-disable");
        btnPrev.classList.remove("page-disable");
      }
      if (currentPage > 1 && currentPage < totalP(productList)) {
        btnPrev.classList.remove("page-disable");
        btnNext.classList.remove("page-disable");
      }
      getCurrentPage(currentPage);
      renderCoursesAll(productList);
      productDetail(productList);
      renderProductDetails(productList);
      startModal();
    });
  }

  pageNums.forEach(function (page) {
    page.onclick = function () {
      $(".number-page li.page-item-current.page-active").classList.remove(
        "page-active"
      );
      this.classList.add("page-active");
    };
  });
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
    startModal();
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

function sortDefault(productList) {
  var sortDefaultBtn = document.querySelector(".sort-default");
  sortDefaultBtn.addEventListener("click", function () {
    start();
  });
}

//ProductDetails
function startModal() {
  const productDetail = document.querySelectorAll(".product-item");
  productDetail.forEach(function (item) {
    item.addEventListener("click", function () {
      closeProductDetail();
      hideModal();
    });
  });
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
      var detailIDProduct = productList.filter(function (product) {
        return product.id == detailID;
      });
      renderProductDetails(detailIDProduct);
    });
  });

  productDetail.forEach(function (item) {
    item.addEventListener("click", function () {
      modalDetail.style.display = "block";
    });
  });
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

  let carts = document.querySelector(".product-detail-addCart");
  carts.addEventListener("click", function () {
    cartNumber(productList);
    totalCost(productList);
    displayCartAdd();
  });

  function onLoadCartNumber() {
    let productNum = localStorage.getItem("cartNumber");
    if (productNum) {
      document.querySelector(".header__cart-notice").textContent = productNum;
    }
  }

  function cartNumber(productList) {
    let productNum = localStorage.getItem("cartNumber");
    productNum = parseInt(productNum);
    if (productNum) {
      localStorage.setItem("cartNumber", productNum + 1);
      document.querySelector(".header__cart-notice").textContent =
        productNum + 1;
    } else {
      localStorage.setItem("cartNumber", 1);
      document.querySelector(".header__cart-notice").textContent = 1;
    }

    setItems(productList);
  }

  function setItems(productList) {
    let cartItems = localStorage.getItem("productInCart");
    cartItems = JSON.parse(cartItems);

    var product = {
      ...productList,
    };
    var product = Object.values(product)[0];

    if (cartItems != null) {
      if (cartItems[product.id] == undefined) {
        cartItems = {
          ...cartItems,
          [product.id]: product,
        };
      }
      cartItems[product.id].incart += 1;
    } else {
      product.incart = 1;
      console.log(product);
      cartItems = {
        [product.id]: product,
      };
    }
    localStorage.setItem("productInCart", JSON.stringify(cartItems));
  }
  onLoadCartNumber();

  function totalCost(productList) {
    var product = {
      ...productList,
    };
    var product = Object.values(product)[0];
    var price = product.price - product.saleoffvalue;
    let cartCost = localStorage.getItem("totalCost");

    if (cartCost != null) {
      cartCost = parseInt(cartCost);
      localStorage.setItem("totalCost", cartCost + price);
    } else {
      localStorage.setItem("totalCost", price);
    }
  }

  function displayCartAdd() {
    let cartItems = localStorage.getItem("productInCart");
    let cartCost = localStorage.getItem("totalCost");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".header__cart-list");
    if (cartItems && productContainer) {
      productContainer.innerHTML = "";
      Object.values(cartItems).map(function (item) {
        let price = item.price - item.saleoffvalue;
        let priceCur = (price * item.incart).toLocaleString();
        productContainer.innerHTML += `
        <li class="header__cart-item">
        <a href="" class="header__cart-link">
          <img
            src="${item.img}"
            alt=""
            class="header__cart-img"
          />
          <div class="header__cart-info">
            <span class="header__cart-name">
            ${item.name}
            </span>
            <span class="header__cart-amount">
              Số lượng: ${item.incart}
            </span>
            <span class="header__cart-price">
              ${priceCur} &#8363
            </span>
            
          </div>
        </a>
      </li>
        `;
      });

      productContainer.innerHTML += `
      
      <div class="header__cart-totalCost">Tổng tiền: ${cartCost} &#8363</div>
      
      `;
    }
  }
}

function renderAll(productList) {
  const renderAllBtn = document.querySelector(".category-all");
  renderAllBtn.addEventListener("click", function () {
    start();
  });
}

function renderLap(productList) {
  const renderLapBtn = document.querySelector(".category-lap");
  renderLapBtn.addEventListener("click", function () {
    var lapList = productList.filter(function (product) {
      return product.category === "Laptop";
    });
    totalP(lapList);
    renderCoursesAll(lapList);
    productDetail(lapList);
    renderProductDetails(lapList);
    startModal();
    renderListPage(lapList);
    changePage(lapList);
    changePageFuc(lapList);
    renderListPage(lapList);
    sortPriceHightToLow(lapList);
    sortPriceLowToHight(lapList);
  });
}

function renderMor(productList) {
  const renderMorBtn = document.querySelector(".category-monitor");
  renderMorBtn.addEventListener("click", function () {
    var MorList = productList.filter(function (product) {
      return product.category === "Monitor";
    });
    renderCoursesAll(MorList);
    productDetail(MorList);
    renderProductDetails(MorList);
    startModal();
    totalP(MorList);
    renderListPage(MorList);
    changePage(MorList);
    changePageFuc(MorList);
    sortPriceHightToLow(MorList);
    sortPriceLowToHight(MorList);
  });
}

function renderHead(productList) {
  const renderHeadBtn = document.querySelector(".category-headphone");
  renderHeadBtn.addEventListener("click", function () {
    var headList = productList.filter(function (product) {
      return product.category === "Headphone";
    });
    totalP(headList);
    renderCoursesAll(headList);
    productDetail(headList);
    renderProductDetails(headList);
    startModal();
    renderListPage(headList);
    changePage(headList);
    changePageFuc(headList);
    renderListPage(headList);
    sortPriceHightToLow(headList);
    sortPriceLowToHight(headList);
  });
}

function renderCon(productList) {
  const renderConBtn = document.querySelector(".category-console");
  renderConBtn.addEventListener("click", function () {
    var conList = productList.filter(function (product) {
      return product.category === "Console";
    });
    totalP(conList);
    renderCoursesAll(conList);
    productDetail(conList);
    renderProductDetails(conList);
    startModal();
    renderListPage(conList);
    changePage(conList);
    changePageFuc(conList);
    renderListPage(conList);
    sortPriceHightToLow(conList);
    sortPriceLowToHight(conList);
  });
}

function renderMouse(productList) {
  const renderMouseBtn = document.querySelector(".category-mouse");
  renderMouseBtn.addEventListener("click", function () {
    var mouseList = productList.filter(function (product) {
      return product.category === "Mouse";
    });
    totalP(mouseList);
    renderCoursesAll(mouseList);
    productDetail(mouseList);
    renderProductDetails(mouseList);
    startModal();
    renderListPage(mouseList);
    changePage(mouseList);
    changePageFuc(mouseList);
    renderListPage(mouseList);
    sortPriceHightToLow(mouseList);
    sortPriceLowToHight(mouseList);
  });
}

function renderBoard(productList) {
  const renderBoardBtn = document.querySelector(".category-keyboard");
  renderBoardBtn.addEventListener("click", function () {
    var BoardList = productList.filter(function (product) {
      return product.category === "Keyboard";
    });
    totalP(BoardList);
    renderCoursesAll(BoardList);
    productDetail(BoardList);
    renderProductDetails(BoardList);
    startModal();
    renderListPage(BoardList);
    changePage(BoardList);
    changePageFuc(BoardList);
    renderListPage(BoardList);
    sortPriceHightToLow(BoardList);
    sortPriceLowToHight(BoardList);
  });
}

start();
