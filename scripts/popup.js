
const dialog = document.getElementById("popup-dialog");

function openPopUp(_src, _alt) {
    
    //set the image
    const image = document.getElementById("popup-image");
    image.src = _src;

    const title = document.getElementById("popup-title");
    title.innerHTML = _alt
    
    dialog.showModal();
}

function closePopUp() {
    dialog.close();
}