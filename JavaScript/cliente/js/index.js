
const ShopContent = document.getElementById("shopContent");
const cartBubble = document.getElementById("cart-bubble");
const cart = [];

productos.forEach((product) => {
    const content = document.createElement("div");
    content.innerHTML = `
        <img src="${product.img}">
        <h3>"${product.productName}"</h3>
        <p>"${product.price}$"</p>
    `;
    ShopContent.append(content);


    const buyButton = document.createElement("button");
    buyButton.innerText = "Comprar"

    content.append(buyButton)

    buyButton.addEventListener("click", ()=>{
        const repeat = cart.some((repeatProduct) => repeatProduct.id === product.id);
        if(repeat){
            cart.map((prod) => {
                if(prod.id === product.id){
                    prod.quanty++;
                }
            })
        } else {
            cart.push({
                id : product.id,
                productName: product.productName,
                price : product.price,
                quanty : product.quantity,
                img : product.img
            })
        }
        console.log(cart)
    })
    buyButton.addEventListener("click", () => {
    let count = Number(cartBubble.textContent) || 0;
    count++;
    cartBubble.textContent = count;
});
});