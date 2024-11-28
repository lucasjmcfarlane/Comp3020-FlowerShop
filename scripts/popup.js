
const dialog = document.getElementById("popup-dialog");

function openAndSelect(element) {
    // Handle opening the popup
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
    image.src = popupImagePath;

    const title = document.getElementById("popup-title");
    title.innerHTML = popupTitle

    const description = document.getElementById("popup-description");
    description.innerHTML = popupDescription

    dialog.showModal();
}

function closePopUp() {
    const dialog = document.getElementById("popup-dialog");
    dialog.close();
}