// JS slideshow
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides((slideIndex += n));
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;

  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");

  if (n > slides.length) {
    slideIndex = 1;
  }

  if (n < 1) {
    slideIndex = slides.length;
  }

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace("active", "");
  }

  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

showSlidesAuto();

function showSlidesAuto() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;

  if (slideIndex > slides.length) {
    slideIndex = 1;
  }

  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace("active", "");
  }

  dots[slideIndex - 1].className += " active";
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlidesAuto, 2500); // Chuyển sldie mỗi 2.5s
}

// JS categary

var categories = document.querySelectorAll(".category-item__link");

categories.forEach(function (category) {
  category.onclick = function () {
    var categoryChange = document.querySelector(
      ".category-item__link.category-item--active"
    );
    categoryChange.classList.remove("category-item--active");

    this.classList.add("category-item--active");
  };
});

searchProduct();
function searchProduct() {
  const searchBtn = document.querySelector(".header__search-btn");
  const searchInput = document.querySelector(".header__search-input");
  searchBtn.addEventListener("click", function () {
    const listProduct = document.querySelectorAll(".grid__col-2-4");
    listProduct.forEach(function (item) {
      if (item.innerText.trim().toLowerCase().includes(searchInput.value)) {
        item.classList.remove("hide");
      } else {
        item.classList.add("hide");
      }
    });
  });
}
