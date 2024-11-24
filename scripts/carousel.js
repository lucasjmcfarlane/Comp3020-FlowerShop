window.onload = function () {
    showSlide();
}

function moveCarouselLeft(){
    const firstRadio = document.forms['carousel-selection'][0].checked;
    const secondRadio = document.forms['carousel-selection'][1].checked;

    if (firstRadio){document.forms['carousel-selection'][2].checked = true;}
    else if (secondRadio){document.forms['carousel-selection'][0].checked = true;}
    else{document.forms['carousel-selection'][1].checked = true;}

    showSlide()
}

function moveCarouselRight(){
    const firstRadio = document.forms['carousel-selection'][0].checked;
    const secondRadio = document.forms['carousel-selection'][1].checked;

    if (firstRadio){document.forms['carousel-selection'][1].checked = true;}
    else if (secondRadio){document.forms['carousel-selection'][2].checked = true;}
    else{document.forms['carousel-selection'][0].checked = true;}

    showSlide()
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

setInterval(moveCarouselRight, 7000);