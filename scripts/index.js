window.onload = function () {
    slide2 = document.getElementById("slide1");
    slide2 = document.getElementById("slide2");
    slide3 = document.getElementById("slide3");
    slide1.style.display = "flex";
    slide2.style.display = "none";
    slide3.style.display = "none";
}

function showSlide(index) {
    slide1 = document.getElementById("slide1");
    slide2 = document.getElementById("slide2");
    slide3 = document.getElementById("slide3");

    slide1.style.display = "none";
    slide2.style.display = "none";
    slide3.style.display = "none";

    switch (index) {
        case 1:
            slide1.style.display = "flex";
            break;
        case 2:
            slide2.style.display = "flex";
            break;
        case 3:
            slide3.style.display = "flex";
            break;
        default:
            slide1.style.display = "flex";
            break;
    }




}