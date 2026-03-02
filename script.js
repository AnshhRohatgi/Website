let cart = [];
let total = 0;

(function(){
    emailjs.init("OzqZZaeCycR_Pm8Hv"); // replace with EmailJS public key
})();

function addToCart(name, price){
    cart.push({name, price});
    total += price;
    document.getElementById("cart-count").innerText = cart.length;
}

function openCart(){
    document.getElementById("cart-modal").style.display = "block";
    displayCart();
}

function closeCart(){
    document.getElementById("cart-modal").style.display = "none";
}

function displayCart(){
    let list = document.getElementById("cart-items");
    list.innerHTML = "";
    cart.forEach(item=>{
        let li = document.createElement("li");
        li.innerText = item.name + " - ₹" + item.price;
        list.appendChild(li);
    });
    document.getElementById("total-price").innerText = total;
}

function sendOrder(){
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let address = document.getElementById("address").value;

    let orderDetails = cart.map(item => item.name + " - ₹" + item.price).join("\n");

    let templateParams = {
        customer_name: name,
        customer_email: email,
        customer_address: address,
        order: orderDetails,
        total_price: total
    };

    emailjs.send("YOUR_SERVICE_ID","YOUR_TEMPLATE_ID", templateParams)
    .then(function(response) {
        alert("Order sent successfully!");
        cart = [];
        total = 0;
        closeCart();
        document.getElementById("cart-count").innerText = 0;
    }, function(error) {
        alert("Failed to send order.");
    });
}