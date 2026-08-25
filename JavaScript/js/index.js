
const ShopContent = document.getElementById("shopContent");
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

    content.append(content)

    buyButton.addEventListener("click", ()=>{
        cart.push({
            id : product.id,
            productName: product.productName,
            price : product.price,
            quanty : product.quantity,
            img : product.img
        })
        console.log(cart)
    })
});