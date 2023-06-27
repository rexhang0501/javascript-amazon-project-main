let cartItemContainerHTML = "";

if(JSON.parse(localStorage.getItem('cart'))){
    cart = JSON.parse(localStorage.getItem('cart'));
}

cart.forEach((item)=>{
    const productInfo = products.find((product) => {
        return product.id === item.productId;
    });

    console.log(productInfo.id);

    cartItemContainerHTML += `
        <div class="cart-item-container id=${item.productId}">
            <div class="delivery-date">
                Delivery date: Wednesday, June 15
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image"
                    src=${productInfo.image}>

                <div class="cart-item-details">
                    <div class="product-name">
                        ${productInfo.name}
                    </div>
                    <div class="product-price">
                        $${((productInfo.priceCents) / 100).toFixed(2)}
                    </div>
                    <div class="product-quantity">
                        <span>
                            Quantity: <span class="quantity-label">${item.quantity}</span>
                        </span>
                        <span class="update-quantity-link link-primary">
                            Update
                        </span>
                        <span class="delete-quantity-link link-primary">
                            Delete
                        </span>
                    </div>
                </div>

                <div class="delivery-options">
                    <div class="delivery-options-title">
                        Choose a delivery option:
                    </div>

                    <div class="delivery-option">
                        <input type="radio" class="delivery-option-input"
                            name="delivery-option-2">
                        <div>
                            <div class="delivery-option-date">
                                Tuesday, June 21
                            </div>
                            <div class="delivery-option-price">
                                FREE Shipping
                            </div>
                        </div>
                    </div>
                    <div class="delivery-option">
                        <input type="radio" checked class="delivery-option-input"
                            name="delivery-option-2">
                        <div>
                            <div class="delivery-option-date">
                                Wednesday, June 15
                            </div>
                            <div class="delivery-option-price">
                                $4.99 - Shipping
                            </div>
                        </div>
                    </div>
                    <div class="delivery-option">
                        <input type="radio" class="delivery-option-input"
                            name="delivery-option-2">
                        <div>
                            <div class="delivery-option-date">
                                Monday, June 13
                            </div>
                            <div class="delivery-option-price">
                                $9.99 - Shipping
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
});

document.querySelector(".order-summary").innerHTML = cartItemContainerHTML;