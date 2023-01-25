if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
} else {
    ready()
}

function ready() {
    const removeProductButtons = document.getElementsByClassName("remove-product-button")
    for (var i = 0; i < removeProductButtons.length; i++) {
        removeProductButtons[i].addEventListener("click",removeProduct)
    }

    const quantityInputs = document.getElementsByClassName("product-qtd-input")
    for (var i = 0; i < quantityInputs.length; i++) {
        quantityInputs[i].addEventListener("change", checkIfInputIsNull)
    }

    const addToCartButtons = document.getElementsByClassName("btn-primary")
    for (var i = 0; i < addToCartButtons.length; i++) {
        addToCartButtons[i].addEventListener("click", addToCartCart)
    }
}


function checkIfInputIsNull(event) {
    if (event.target.value === "0") {
        event.target.parentElement.parentElement.parentElement.remove()
    }
    updateTotal()

}

function addToCartCart(event) {
    const button = event.target
    const productInfos = button.parentElement.parentElement.parentElement
    const productImage = productInfos.getElementsByClassName("card-img-top")[0].src
    const productTitle = productInfos.getElementsByClassName("card-title")[0].innerText
    const productPrice = productInfos.getElementsByClassName("card-price")[0].innerText


    const productCartName = document.getElementsByClassName("cart-title")
    for (var i = 0; i < productCartName.length; i++) {
        if (productCartName[i].innerText === productTitle) {
            productCartName[i].parentElement.parentElement.parentElement.getElementsByClassName("product-qtd-input")[0].value++
            return
        }
    }


    let newCartProduct = document.createElement("ul")
    newCartProduct.classList.add("cart-product")

    newCartProduct.innerHTML = 
    ` <li class="list-group-item py-3">
    <div class="row g-3">
        <div class="col-4 col-md-3 col-lg-2">
            <a href="#">
                <img src="${productImage}" class="img-thumbnail">
            </a>
        </div>
        <div class="col-8 col-md-9 col-lg-7 col-xl-8 text-left align-self-center">
            <h6>
                <strong>${productTitle}</strong>
            </h6>
        </div>
        <div class="text-start mt-2">
            <small class="text-secondary cart-product-price">${productPrice}</small><br>
        </div>
        <div
            class="col-6 offset-6 col-sm-6 offset-sm-6 col-md-4 offset-md-8 col-lg-3 offset-lg-0 col-xl-2 align-self-center mt-3">
            <div class="input-group">

                <input style="max-width: 50px;" class="form-control text-center border-dark rounded-3 product-qtd-input"
                value="1" min="0" type="number">
                </input>

                <button
                    class="btn btn-danger border-dark btn-sm ms-2 rounded-3 remove-product-button"
                    type="button">
                    Remover
                </button>
            </div>
            
        </div>
    </div>
</li>
    `
    const tableBody = document.querySelector(".carrinho tbody")
    tableBody.append(newCartProduct)
    updateTotal()
    newCartProduct.getElementsByClassName("product-qtd-input")[0].addEventListener("change", checkIfInputIsNull)
    newCartProduct.getElementsByClassName("remove-product-button")[0].addEventListener("click,", removeProduct)
}

function removeProduct(event) {
    event.target.parentElement.parentElement.parentElement.remove()
    updateTotal()
}


function updateTotal() {
    let totalAmount = 0
    const cartProducts = document.getElementsByClassName("cart-product")
    for (var i = 0; i < cartProducts.length; i++) {
        const productPrice = cartProducts[i].getElementsByClassName("cart-product-price")[0].innerText.replace("R$", "").replace(",", ".")
        const productQuantity = cartProducts[i].getElementsByClassName("product-qtd-input")[0].value
        totalAmount += productPrice * productQuantity
}

    totalAmount = totalAmount.toFixed(2)
    totalAmount = totalAmount.replace(".", ",")
    document.querySelector(".list-group span").innerText = "Valor total: R$" + totalAmount

}

