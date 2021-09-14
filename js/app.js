
// deaful load page 
const loadDefault = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data))
    .catch(error =>{console.log(error)});
}; 
loadDefault();

// find product with category
const loadProducts=()=>{
  const inputField= document.getElementById('input-field');
  const searchText = inputField.value;
  
  if(!searchText){
    document.getElementById('search-warning').style.visibility ='hidden';
    return;
  }
  const ulr = `https://fakestoreapi.com/products/category/${searchText}`
  inputField.value ='';

  fetch(ulr)
  .then(res =>res.json())
  .then(data => showSearchProducts(data))
  .catch(error => {console.log(error)});
}

// show product by category on search result
document.getElementById('search-warning').style.visibility ='hidden';
const showSearchProducts = (products) => {
  document.getElementById("search-products").textContent = '';
  if(products.length){
  document.getElementById('search-warning').style.visibility ='hidden';
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const id = product.id;
    const div = document.createElement("div");
    div.classList.add("product", 'card', 'h-100', 'm-2', 'single-product');
    div.innerHTML = `<div class="">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h3>${product.title}</h3>
      <p>Category: ${product.category}</p>
      <h2>Price: $ ${product.price}</h2>
      <p><div class="Stars" style="--rating:${product.rating.rate};" aria-label="Rating of this product is 2.3 out of 5."></div><span class='text-warning fs-5'> ${product.rating.rate}</span></p>
      <p>${product.rating.count} reviews </p>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      <button onclick='getDetailsById(${id})' id="details-btn" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Details</button></div>
      `;
    
     document.getElementById("search-products").appendChild(div);
    }
  } else{
    document.getElementById('search-warning').style.visibility ='visible';
  }
 };


// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const id = product.id;
    const div = document.createElement("div");
    div.classList.add("product", 'card', 'h-100', 'm-2', 'single-product');
    div.innerHTML = `<div class="">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h3>${product.title}</h3>
      <p>Category: ${product.category}</p>
      <h2>Price: $ ${product.price}</h2>
      <p><div class="Stars" style="--rating:${product.rating.rate};" aria-label="Rating of this product is 2.3 out of 5."></div><span class='text-warning fs-5'> ${product.rating.rate}</span></p>
      <p>${product.rating.count} reviews </p>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      <button onclick='getDetailsById(${id})' id="details-btn" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};

let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  updateTotal();
  document.getElementById("total-Products").innerText = count;
  document.getElementById('cart-main').style.display ='block';
  
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = parseFloat(total).toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = parseFloat(value).toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
    setInnerText('total', parseFloat(grandTotal).toFixed(2));
};

// buy now check out from cart 
document.getElementById('buy-now').addEventListener('click', function(){
  location.reload();
})

const getDetailsById=product=>{

  const url = `https://fakestoreapi.com/products/${product}`

  fetch(url)
  .then(res => res.json())
  .then(data => displayDetail(data))
  .catch(error=>{console.log(error)});
}

const displayDetail=details=>{
  const title = `${details.title}`;
  const textContent = `${details.description}`;
 
document.getElementById('card-title').innerText = title;
document.getElementById('card-img').setAttribute('src', details.image);
document.getElementById('card-text').innerText = textContent;
  
}