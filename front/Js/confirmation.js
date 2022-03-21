let confirmationUrl = window.location;
let url = new URL(confirmationUrl);
let orderId = url.searchParams.get("orderId");
console.log(orderId);
addOrderId = () => {
let id = document.getElementById("orderId");
id.innerText = orderId;
}
addOrderId ();

    
