
const dialog = document.getElementById("popup-dialog");

function openAndSelect(element) {
    // Handle opening the popu
    console.log(element);
    const imgElement = element.querySelector('img');
    openPopUp(imgElement.src, imgElement.alt);

    // Remove the "selected" class from all flower boxes
    document.querySelectorAll('.flower-box').forEach((box) => {
        box.classList.remove('selected');
    });

    // Add the "selected" class to the clicked flower box
    element.classList.add('selected');
}


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