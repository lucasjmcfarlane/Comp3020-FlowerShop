window.onload = function () {
    showSlide();
}

function showSlide() {
    const slide1 = document.getElementById("slide1");
    const slide2 = document.getElementById("slide2");
    const slide3 = document.getElementById("slide3");
    const radio1 = document.getElementById("r1");
    const radio2 = document.getElementById("r2");

    slide1.style.display = "none";
    slide2.style.display = "none";
    slide3.style.display = "none";

    if (radio1.checked){slide1.style.display = "flex";}
    else if (radio2.checked){slide2.style.display = "flex";}
    else{slide3.style.display = "flex";}
}