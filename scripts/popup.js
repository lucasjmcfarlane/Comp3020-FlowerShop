
var data = ""

function openPopUp(popupImagePath, popupTitle, popupDescription, id) {
    const dialog = document.getElementById("popup-dialog");

    const image = document.getElementById("popup-image");
    image.src = popupImagePath;

    const title = document.getElementById("popup-title");
    title.innerHTML = popupTitle;

    const description = document.getElementById("popup-description");
    description.innerHTML = popupDescription;

    data = id.getAttribute("value")

    dialog.showModal();
}


function changePage(path) {
    url = path + '?data=' + data;

    window.location.href = url;
}

function closePopup(dialogElement) {
    const dialog = document.getElementById(dialogElement);

    dialog.addEventListener('click', function(event) {
        var rect = dialog.getBoundingClientRect();
        var isInDialog = (rect.top <= event.clientY && event.clientY <= rect.top + rect.height &&
          rect.left <= event.clientX && event.clientX <= rect.left + rect.width);
        if (!isInDialog) {
          dialog.close();
        }
      });
}
