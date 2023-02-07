var modal = document.getElementById("alert-modal");
var btn = document.getElementById("place-order-btn");
var span = document.getElementsByClassName("close")[0];

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
function validateForm() {
    var inputs = document.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
        if (!inputs[i].value) {
            return false;
        }
    }
    return true;
}
