
var data = ""

function openPopUp(popupImagePath, popupTitle, popupDescription, id) {
    const dialog = document.getElementById("popup-dialog");

    const image = document.getElementById("popup-image");
    image.src = popupImagePath;

    const title = document.getElementById("popup-title");
    title.innerHTML = popupTitle

    const description = document.getElementById("popup-description");
    description.innerHTML = popupDescription

    data = id.getAttribute("value")
    console.log(data)

    dialog.showModal();
}

function closePopUp() {
    const dialog = document.getElementById("popup-dialog");
    data = ""
    dialog.close();
}


function changePage(path) {
    url = path+'?data=' + data;
    console.log(url)


    // document.location.href = url;

    window.location.href = url

}