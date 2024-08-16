var productNameInput = document.getElementById('productName')
var productPriceInput = document.getElementById('productPrice')
var productTypeInput = document.getElementById('productType')
var productImgInput = document.getElementById('productImg')
var productDescriptionInput = document.getElementById('productDescription')
var btnAddProduct = document.getElementById('addProduct')
var btnUpdateProduct = document.getElementById('updateProduct')

var updatedIndex
var productContainerElement =  document.getElementById('productContainerElement')

var productList=[];

if(localStorage.getItem('ourProducts') != null){
productList=JSON.parse(localStorage.getItem('ourProducts'))
displayProducts(productList)
}

function addProduct(){
var product=
{
    productName :productNameInput.value,
    productPrice : productPriceInput.value,
    productType : productTypeInput.value,
    productDescription : productDescriptionInput.value,
    productImg : productImgInput.files[0].name

}
productList.push(product)
localStorage.setItem('ourProducts', JSON.stringify(productList))
console.log(productList)
displayProducts(productList)
clearData()
}

function clearData(){
    productNameInput.value=null,
    productPriceInput.value=null,
    productTypeInput.value='choose a file',
    productDescriptionInput.value=null,
    productImgInput.value=null;
 
}


function displayProducts(array){
    var containerElement = ``
    for (var i=0 ; i < array.length ; i++){
      const words = array[i].productDescription.split(" ");
      const truncatedDescription = words.slice(0, 15).join(" ") + (words.length > 30 ? "..." : "");

        containerElement +=
        `<div class="col mb-4">
         <div class="border shadow-sm p-2">
           <div class="size mb-3">  
             <img class="w-100 h-100 object-fit-contain" src="./images/${array[i].productImg}">
           </div>
           <h2 class="text-uppercase fs-5">${array[i].productName}</h2>
           <p class="text-secondary">${truncatedDescription}</p>
           <p><span class="fw-semibold">Category :</span>${array[i].productType}</p>
           <div class="d-flex justify-content-between">
             <p class="fw-semibold">${array[i].productPrice} EGP</p>
             <div class="me-2">
               <i class="fa-solid fa-trash-can text-success" onclick="deleteProducts(${i})"></i>
               <i class="fa-solid fa-pen-to-square text-danger" onclick="moveProductsInputs(${i})"></i>
             </div>
           </div>  
         </div>
         </div>`
    }
    
productContainerElement.innerHTML=containerElement;
}


function deleteProducts(index){
  productList.splice(index , 1)
  localStorage.setItem('ourProducts' , JSON.stringify(productList))
  displayProducts(productList)
}



function productsSearch(term){
   var filteredProductList=[]
  for(var i=0 ; i< productList.length ; i++ ){

    if(productList[i].productName.toLowerCase().includes(term.toLowerCase()) == true){
      filteredProductList.push(productList[i])
    }
  }
  console.log(filteredProductList)
  displayProducts(filteredProductList)
}



function moveProductsInputs(index){
  productNameInput.value=productList[index].productName
  productPriceInput.value=productList[index].productPrice
  productTypeInput.value=productList[index].productType
  productDescriptionInput.value=productList[index].productDescription

  btnAddProduct.classList.replace('d-block','d-none')
  btnUpdateProduct.classList.replace('d-none','d-block')
  updatedIndex=index;
}

function updateProduct(){
  productList[updatedIndex].productName=productNameInput.value
  productList[updatedIndex].productPrice=productPriceInput.value
  productList[updatedIndex].productDescription=productDescriptionInput.value
  productList[updatedIndex].productType=productTypeInput.value

  if(productImgInput.files[0] != undefined){
    productList[updatedIndex].productImg=productImgInput.files[0].name
  }

  displayProducts(productList)
  localStorage.setItem('ourProducts',JSON.stringify(productList))
  clearData()
  btnAddProduct.classList.replace('d-none','d-block')
  btnUpdateProduct.classList.replace('d-block','d-none')

}