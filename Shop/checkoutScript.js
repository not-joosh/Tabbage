var modal = document.getElementById("alert-modal");
var btn = document.getElementById("place-order-btn");
var span = document.getElementsByClassName("close")[0];
const orderTotalDisplay = document.getElementById("order-total-display");
let song = new Audio("songs/song1.mp3");

// Loadingg the checkout page...
window.addEventListener('load', function() {
    song.currentTime = this.localStorage.getItem("songTime");
    song.play();
    const orderTotal = localStorage.getItem("orderTotal");
    orderTotalDisplay.textContent = `$${parseFloat(orderTotal).toFixed(2)}`;
});

btn.onclick = function() {
    if (!validateForm()) {
        modal.style.display = "block";
    }
}
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Checking if Form is ready to be submitted
function validateForm() {
    var inputs = document.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
        if (!inputs[i].value) {
            return false;
        }
    }
    return true;
}

// Handling user to go back to Shop
const backButton = document.getElementById("back-button");
backButton.addEventListener("click", function () {
    localStorage.setItem("songTime", song.currentTime);
    window.location.href = "shopIndex.html";
});
