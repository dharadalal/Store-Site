// Dropdown menu

const menuExpand = document.querySelector(".menu-expand");
const menuDropdown = document.querySelector(".menu-dropdown");
const menuOpen = document.querySelector(".menu-open");
const menuClose = document.querySelector(".menu-close");

const headerBottom = document.querySelector(".header-bottom");

const leftBtn = document.querySelectorAll(".left-btn");
const rightBtn = document.querySelectorAll(".right-btn");

menuExpand.addEventListener("click", () => {
  console.log("click");
  if (menuDropdown.classList.contains("menu-close")) {
    menuDropdown.classList.replace("menu-close", "menu-open");
  } else {
    menuDropdown.classList.replace("menu-open", "menu-close");
  }
});

// close the drawer
const menuIcon = document.querySelector(".menu-icon");
const drawerContent = document.querySelector(".drawer-content");
const closenavBtn = document.querySelector(".close-navbtn");
const drawer = document.querySelector(".drawer-container");

const navBackdrop = document.querySelector(".drawer-backdrop");
let isDrawerOpen = false;

menuIcon.addEventListener("click", () => {
  drawer.classList.remove("hide");
  drawerContent.classList.add("show");
  document.body.style.overflowY = "hidden";
  isDrawerOpen = true;
});

navBackdrop.addEventListener("click", closeDrawer);

closenavBtn.addEventListener("click", closeDrawer);

function closeDrawer() {
  drawerContent.classList.remove("show");
  drawer.classList.add("hide");
  document.body.style.overflowY = null;
  isDrawerOpen = false;
}

window.addEventListener("resize", () => {
  if (window.innerWidth > 900) {
    drawer.classList.add("hide");
  } else if (isDrawerOpen) {
    drawer.classList.remove("hide");
    document.body.style.overflowY = "hidden";
  }
});

// sticky nav bar
window.addEventListener("scroll", () => {
  if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
    document.querySelector("#header").classList.add("header-bottom-fix");
    document.querySelector("#header").style.top = 0;
  } else {
    document.querySelector("#header").classList.remove("header-bottom-fix");
    document.querySelector("#header").style.top = "-100px";
  }
});

// Slider Section
const sliderContainer = document.querySelectorAll(".slider-container");

let currentSlider = 0;
let maxslides = sliderContainer.length;
//2

// initialize slider
function startSlide() {
  for (let i = 0; i < sliderContainer.length; i++) {
    sliderContainer[i].style.display = "none";
  }
  sliderContainer[0].style.display = "block";
}

// left arrow click
rightBtn.forEach((btn) => {
  btn.addEventListener("click", function () {
    if (currentSlider === maxslides - 1) {
      currentSlider = 0;
      startSlide();
    } else {
      sliderContainer[currentSlider].style.display = "none";
      currentSlider++;
      sliderContainer[currentSlider].style.display = "block";
    }
  });
});

// left arrow click

leftBtn.forEach((prevbtn) => {
  prevbtn.addEventListener("click", function () {
    if (currentSlider === 0) {
      sliderContainer[currentSlider].style.display = "none";
      sliderContainer[maxslides - 1].style.display = "block";
      currentSlider = maxslides - 1;
    } else {
      sliderContainer[currentSlider].style.display = "none";

      let updateone = currentSlider - 1;
      sliderContainer[updateone].style.display = "block";
      currentSlider--;
    }
  });
});

startSlide();
// scroll to top
const scrolltop = document.querySelector(".scroll-area");
window.addEventListener("scroll", () => {
  if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
    scrolltop.style.display = "block";
  } else {
    scrolltop.style.display = "none";
  }
});

// when user click on the scroll top button
scrolltop.addEventListener("click", () => {
  // document.body.scrollTop = 0;
  // document.documentElement.scrollTop = 0;
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// products
// api url
const api_url =
  "https://demo-ecommerce-api-bzuk.onrender.com/featured-products";

// api url
const api_products = "https://demo-ecommerce-api-bzuk.onrender.com/products";

fetch(api_url)
  .then((res) => {
    // parse the dtaa into json and returning promise here
    //The Response object, in turn, does not directly contain the actual JSON response body but is instead a representation of the entire HTTP response. So, to extract the JSON body content from the Response object, we use the json() method, which returns a second promise that resolves with the result of parsing the response body text as JSON.
    return res.json();
  })
  .then((response) => {
    // if products null na hoy tyare add thase
    if (!response.error) {
      // }
      // if (response.data.products) {
      response.data.products.forEach((product) => {
        // console.log(product);
        // let eachproduct = "";
        // let htmlSegment = `
        // <div class="product-card-container">
        //   <img id="pro-image" class="product-image" src="${product.image}" />
        //   <button class="share-button">Share</button>
        //   <button class="learn-button">Learn More</button>
        //   <div class="content-container">
        //     <p class="product-name">${product.name}</p>
        //     <p class="product-description">${product.description}</p>
        //     <p class="product-price">${product.price}</p>
        //   </div>
        // </div>`;
        // eachproduct += htmlSegment;

        // let productCard = document.querySelector(".product-row-container");
        // productCard.innerHTML += htmlSegment;

        let productCardContainer = document.querySelector(
          ".product-row-container"
        );
        const productCard = document.createElement("div");
        productCard.classList.add("product-card-container");
        productCard.innerHTML = `
        <div class="featured-thumbnail">
          <img id="featured-image" class="product-image" src="${product.image}" />
        <div class="product-overly">
          <div class="product-overly-full">
            <div class="product-overly-full-top">
              <ul>
                <li><a href="#"><i class="far fa-heart"></i></a></li>
                <li><a href="#"><i class="fas fa-random"></i></a></li>
                <li><a href="#"><i class="far fa-eye"></i></a></li>
              </ul>
            </div>
            <!-- add to cart button -->
            <div class="product-overly-full-bottom">
              <button class="add-to-cart" href="#">Add To Cart</button>
            </div>
          </div>
        </div>
          </div>
        
          <div class="content-container">
            <p class="product-name">${product.name}</p>
           <span class="product-price">$${product.price}<span>
           <span class="price">$89.00</span>
          </div>
        `;
        productCardContainer.append(productCard);
      });
    } else {
      // let errorString = "Server is down";
      let productCardContainer = document.querySelector(
        ".product-row-container"
      );
      productCardContainer.innerHTML = `<p> ${response.error} +</p>`;
    }
    // console.log(response.data.products.length);
  })
  // ahiya browser ma je error ave e catch ma vse
  .catch((error) => console.log(error));

fetch(api_products)
  .then((res) => {
    // parse the dtaa into json and returning promise here
    //The Response object, in turn, does not directly contain the actual JSON response body but is instead a representation of the entire HTTP response. So, to extract the JSON body content from the Response object, we use the json() method, which returns a second promise that resolves with the result of parsing the response body text as JSON.
    return res.json();
  })
  .then((response) => {
    // if products null na hoy tyare add thase
    if (!response.error) {
      // }
      // if (response.data.products) {
      response.data.products.forEach((product) => {
        let featuredCardContainer = document.querySelector(
          ".featured-container"
        );
        const featuredproductCard = document.createElement("div");
        featuredproductCard.classList.add("featured-card-container");
        featuredproductCard.innerHTML = `
      
        <div class="featured-thumbnail">
        <img id="featured-image" class="featured-image" src="${product.image}" />
        <div class="product-overly">
          <div class="product-overly-full">
            <div class="product-overly-full-top">
              <ul>
                <li><a href="#"><i class="far fa-heart"></i></a></li>
                <li><a href="#"><i class="fas fa-random"></i></a></li>
                <li><a href="#"><i class="far fa-eye"></i></a></li>
              </ul>
            </div>
            <!-- add to cart button -->
            <div class="product-overly-full-bottom">
              <button class="add-to-cart" href="#">Add To Cart</button>
            </div>
          </div>
        </div>
          </div>
        <div class="container">
          <p class="product-name">${product.name}</p>
         <span class="product-price">$${product.price}<span>
         <span class="price">$89.00</span>
        </div>
        
        `;
        featuredCardContainer.append(featuredproductCard);
      });
    } else {
      // let errorString = "Server is down";
      let featuredCardContainer = document.querySelector(
        ".featured-row-container"
      );
      productCardContainer.innerHTML = `<p> ${response.error} +</p>`;
    }
    // console.log(response.data.products.length);
  })
  // ahiya browser ma je error ave e catch ma vse
  .catch((error) => console.log(error));

// error handle if server has some error
// fetch("http://127.0.0.1:3000/error")
//   .then((res) => {
//     // parse the dtaa into json and returning promise here
//     //The Response object, in turn, does not directly contain the actual JSON response body but is instead a representation of the entire HTTP response. So, to extract the JSON body content from the Response object, we use the json() method, which returns a second promise that resolves with the result of parsing the response body text as JSON.
//     return res.json();
//   })
//   .then((response) => {
//     let productCardContainer = document.querySelector(".product-row-container");
//     productCardContainer.innerHTML = `<p> ${response.error} +</p>`;
//   });
