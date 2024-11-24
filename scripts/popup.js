

function openPopUp(popupImagePath, popupTitle, popupDescription) {
    const dialog = document.getElementById("popup-dialog");

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