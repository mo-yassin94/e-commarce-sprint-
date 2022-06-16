// VARIABLES ===> CART BTN S

const cartIconBtn = document.querySelector("#cart-icon");
const btnCloseCart = document.querySelector(".btn-close-cart");
const btnClearBtn = document.querySelector(".clear-cart");
const cartPanale = document.querySelector(".shop-cart");

// VARIABLES ===> CART CONTENTS
const cartContent = document.querySelector(".cart-content");
const cartItems = document.querySelector(".cart-card");
const cartTotal = document.querySelector(".cart-total");
const cartItemsNum = document.querySelector(".cart-itemsNum");

// VARIABLES ===> PRODUCTS SLIDER SECTION
const productsCon = document.querySelector(".products-content");

// NAV-CART-ICON TOGGLE SHOPPING CART [OPEN & CLOSE]
cartIconBtn.addEventListener("click", (e) => {
  e.preventDefault();
  cartPanale.classList.toggle("active");
});

// HEAD-oF-CART CLOSE SHOPPING CART BUTTON [OPEN & CLOSE]
btnCloseCart.addEventListener("click", () => {
  cartPanale.classList.remove("active");
});

// CLOSE SHOPPIN CART EVEN CLICK OUTSIDE OF CART BODY
cartPanale.addEventListener("click", (e) => {
  const closeCartIcon = btnCloseCart.querySelector(".close-cart-icon");
  if (
    e.target === btnCloseCart ||
    e.target === closeCartIcon ||
    e.target === e.currentTarget
  )
    cartPanale.classList.remove("active");
});

// API

//CART

// UNTILL WE SETUP OUR DATABASE
let cart = [];

let buttonDom = [];

//REQUSET TO THE PRODUCTS
class Products {
  async getProducts() {
    try {
      // CONTACT SERVER & DATABASE
      const result = await fetch("./assets/dbs/db.json");
      // LOOP FOR ALL PRODUCTS AND CREATE NEW ARRAY
      let data = await result.json();
      data.map((item) => {
        const {
          id,
          title,
          price,
          description,
          category,
          image,
          rating: { rate, count },
        } = item;

        return { id, title, price, description, category, image, rate, count };
      });
      return data;
    } catch (err) {
      console.log(err);
      // throw new Error(`cannot get orders`);
    }
  }
}

// DISPLAY PRODUCTS [UPDATA UI]
class UpdateUi {
  displayProduct(products) {
    let result = "";
    // LOOP ON PRODUCTS AND GENERATE IT IN UI CONTENTS [PRODUCTS SECTIONS]
    products.forEach((product) => {
      result += `
           
            <div class="swiper-slide slide product-card shadow">
                  <div class="image-product text-center">
                    <img src=${product.image} alt="#" class="img-fluid w-50" />

                    <div class="btns-cart w-100">
                      <a class="wis btn shadow" href="#" data-id=${product.id}
                        ><i class="fa-solid fa-cart-plus"></i> Add to cart
                      </a>
                      <a class="btn shadow " href="checkout.html"
                        ><i class="fa-brands fa-opencart"></i> Buy
                        now</a
                      >
                    </div>
                  </div>

                  <div class="product-content">
                      <div class="wrapper border-bottom">
                          <div class="info">
                            <a href="" class="product-name">${product.title}</a>
                          </div>
                          <div class="rating">
                            <i class="fa-solid fa-star rate-icon"></i>
                            <p>${product.rating.rate}</p>
                          </div>
                      </div>

                      <div class="wrapper">
                        <div class="product-price">$${product.price}</div>
                        <a href="category.html" class="product-categ" data-categ=${product.category}>${product.category}</a>
                      </div>
                </div>
              </div>
 `;
    });
    //APPEND CHILDREN
    productsCon.innerHTML = result;
  }

  // GET  ADD-TO-CART-BTN FROM PRODUCT CARD CUZ IT DYNAMIC AND ADD EVENTS LISTNER
  getAddCartBtn() {
    const AddToCart = [...document.querySelectorAll(".wis")];
    buttonDom = AddToCart;

    AddToCart.forEach((btn) => {
      let id = btn.dataset.id;

      // check database local storage IF THERE PRODUCT HAVE THE SAME BTN-ID ==>IF THERE DISABLE THAT BUTTON
      let cartExiste = cart.find((item) => item.id == id);
      if (cartExiste) {
        btn.innerHTML = `<i class="fa-solid fa-cart-circle-check"></i> In Cart
        `;
        btn.classList.add("isDisabled");
      }
      // ALSO DISABLE THAT BUTTON SINCE U ADD THIS PRODUCT TO CART
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.target.innerHTML = `<i class="fa-solid fa-cart-circle-check"></i> In Cart
        `;
        e.target.classList.add("isDisabled");

        //GET PRODUCT FROM PRODUCT AND SET DEFAULT AMOUNT :(1)
        let cartItem = { ...Storage.getCartItems(id), amount: 1 };
        // THEN ADD PRODUCT TO THE CART
        cart = [...cart, cartItem];
        // SAVE CART ITEM IN LOCAL STORAGE
        Storage.saveCartItem(cart);
        // SET CART VALUES (PRICE & AMOUNT ....ETC)
        this.setCartValues(cart);
        // AFTER ALL DISPLAY ADDED CART ITEMS IN CART
        this.addCartItems(cartItem);
      });
    });
  }

  // SET CART VALUES (PRICE & AMOUNT ....ETC) LOGICS
  setCartValues(cart) {
    let tempTotal = 0;
    let itemTotal = 0;
    cart.map((item) => {
      tempTotal += item.price * item.amount;

      itemTotal += item.amount;
    });

    cartTotal.innerHTML = parseFloat(tempTotal.toFixed(2));
    cartItemsNum.innerHTML = itemTotal;
  }
  // FUNC THAT GENERATE CART ITEM AS UI CART
  addCartItems(item) {
    const newSection = `<div class="cart-card border-bottom">
    
    <div class="cart-description">
    <img src=${item.image} class="cart-item-img">
    <div class="cart-title  text-start">
        <!-- <a href="#" class="cart-item-name ">single panel bed </a>
        <span class="cart-item-price">39$</span> -->
        <a href=${item.id} class="cart-item-name ">
            <span class="cart-item-name" id="cart-item-name">${item.title}</span> 
            <span class="cart-item-price">${item.price}$</span>
        </a>
     
        <span class="remove-cart-item" data-id=${item.id}> remove </span>
    </div>

</div>

<div class="cart-item-quantity">
    <i class="fas fa-chevron-up arrow-up" data-id=${item.id}></i>
    <p class="item-amount text-center">${item.amount}</p>
    <i class="fas fa-chevron-down arrow-down" data-id=${item.id}></i>
</div>
 
    </div>`;

    // add this newSection in the end of main element
    cartContent.insertAdjacentHTML("beforeend", newSection);
  }
  // FUNC DEAL AFTER REALOAD DIRECTLY TO GEL ALL PRODUCTS IN LOCAL STORAGE[KEY: CART] TO SHOW IN UI CART
  setupApp() {
    cart = Storage.getCart();
    this.setCartValues(cart);
    this.populate(cart);
  }
  // METHODS THAT LOOP ALL CART THEN USE [addCartItems()] TO GENERATE UI FOREACHE ONE
  populate(cart) {
    cart.forEach((item) => {
      this.addCartItems(item);
    });
  }
  //METHOD THAT DEAL WITH CART ITEM VALUES WITH SOME LOGICS (AMOUNT ==>INCREAMENT & DECREAMENT / COUNT TOTAL PRICE // SHOW NUM OF INTEM IN NAV-CART-ICON)
  dealCrtValues() {
    // CLEAR ALL ITEMES IN CART BTN
    btnClearBtn.addEventListener("click", () => {
      // this.clearCart();

      /// LOOP FOR ALL ITEMS IN UI AND LOCAL-STORAGE AND CLEAR ALL
      let cartitems = cart.map((item) => item.id);
      cartitems.forEach((id) => this.removeItem(id));
      while (cartContent.children.length > 0) {
        cartContent.removeChild(cartContent.children[0]);
      }
    });

    // SOME LOGIC AND EVENTS TO CART BTN-S
    cartContent.addEventListener("click", (e) => {
      // HERE WE TARGET REMOVE THIS ITEM OWN BTN
      if (e.target.classList.contains("remove-cart-item")) {
        let targetItem = e.target;
        let id = targetItem.dataset.id;
        let grandPa = targetItem.parentElement.parentElement;
        this.removeItem(id);
        cartContent.removeChild(grandPa.parentElement);
      } else if (e.target.classList.contains("arrow-up")) {
        // HERE WE TARGET [ARROW-UP BTN] TO IN INCREASE AMOUNT THIS ITEM OWN BTN WHEN WE WANT THAT
        let icreament = e.target;
        let id = icreament.dataset.id;
        let tempItem = cart.find((item) => item.id == id);
        tempItem.amount = tempItem.amount + 1;
        Storage.saveCartItem(cart);
        this.setCartValues(cart);
        icreament.nextElementSibling.innerHTML = tempItem.amount;
      } else if (e.target.classList.contains("arrow-down")) {
        // HERE WE TARGET [ARROW DOWN BTN] TO IN DECREASE AMOUNT THIS ITEM OWN BTN WHEN WE WANT THAT
        let decreament = e.target;
        let id = decreament.dataset.id;
        let tempItem = cart.find((item) => item.id == id);
        let grandPa = decreament.parentElement.parentElement;

        tempItem.amount = tempItem.amount - 1;

        if (tempItem.amount <= 0) {
          // LOGIC WILL REMOVE ITEM SINCE IT AMOUNT LESS THAN (1)
          this.removeItem(id);
          cartContent.removeChild(grandPa);
          return;
        }
        Storage.saveCartItem(cart);
        this.setCartValues(cart);
        decreament.previousElementSibling.innerHTML = tempItem.amount;
      }
    });
  }

  // FUNC TO REACTIVE PRODUCT CARD BTN THAT ADD THIS PRODUCT TO CART
  removeItem(id) {
    //PASS ID TO COMPARE WITH LOCAL STORAGE TO REMOVE IT FROM LOCAL AND UI
    cart = cart.filter((item) => item.id != id); // WILL REVERSE IT AND OUR FILLTER WILL RETUR ALL LOCAL STORAGE ITEM THE IS NO THE SAME WITH (ID ABOVE)
    // THEN WILL RE ADD THE REST ID'S TO LOCAL STOORAGE AND UI
    this.setCartValues(cart);
    Storage.saveCartItem(cart);
    let button = buttonDom.find((button) => button.dataset.id == id);
    // ENABLE ADT-T-CART BTN IN THAT PRODUCT CARD
    button.classList.remove("isDisabled");
    button.innerHTML = `<i class="fa-solid fa-cart-plus"></i> Add to cart
    `;
  }
}

// DEAL WITH LOCAL STORAGE

class Storage {
  // GET PRODUCTS FROM LOCAL STORAGE //// IN THE FUTURE WE WILL MAYBE DONT NEED IT
  static getCartItems(id) {
    let cartItems = JSON.parse(localStorage.getItem("cartItems"));
    let results = cartItems.find((cartItem) => cartItem.id == id);
    return results;
  }

  // SET NEW PRODUCTS IN LOCAL STORAGE //// IN THE FUTURE WE WILL MAYBE DONT NEED IT
  static setCartItems(cartItems) {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }

  // SET NEW CART PRODUCT ITEM IN LOCAL STORAGE
  static saveCartItem(cart) {
    localStorage.setItem("saveCart", JSON.stringify(cart));
  }

  // GET CART ITEMS FROM LOCAL STORAGE
  static getCart() {
    const getItems = localStorage.getItem("saveCart")
      ? JSON.parse(localStorage.getItem("saveCart"))
      : [];
    return getItems;
  }
}

// ADD CART LOGICS AFTER PAGE RELOADED
document.addEventListener("DOMContentLoaded", async () => {
  const updateUi = new UpdateUi();
  const products = new Products();
  const storage = new Storage();

  try {
    //setup app
    updateUi.setupApp();
    //get all products
    const getProducts = await products.getProducts();
    await updateUi.displayProduct(getProducts);
    await Storage.setCartItems(getProducts);
    await updateUi.getAddCartBtn();
    await updateUi.dealCrtValues();
    productsSwiper()
  } catch (error) {
    console.log(error);
  }
});

// swiper products action
const productsSwiper = () => {
  (new Swiper(".products-slider", {
    // Optional parameters
  
    loop: true,
    grapCursor: true,
    spaceBetween: 20,
    centeredSlides: true,
  
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    //If we need pagination
    pagination: {
      el: ".swiper-pagination",
      dynamicBullets: true,
      clickable: true,
    },
  
    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      991: {
        slidesPerView: 3,
      },
    },
 }))()
 
} 
