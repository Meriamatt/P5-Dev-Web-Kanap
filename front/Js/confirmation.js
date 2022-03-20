var confirmationUrl = window.location;
var url = new URL(confirmationUrl);
var orderId = url.searchParams.get("orderId");
console.log(orderId);
addOrderId = () => {
let id = document.getElementById("orderId");
id.innerText = orderId;
}
addOrderId ();

    
