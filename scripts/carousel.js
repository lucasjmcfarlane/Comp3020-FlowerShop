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



function changePage3(path) {
    var id = null;
    slides = document.getElementsByClassName("slide");
    console.log(slides);
    for (let index = 1; index < slides.length+1; index++) {
        id = document.getElementById("slide"+index);
        console.log(id);
        console.log(id.style.display);
        if (id.style.display == "flex") {
            break;
        }
        
    }
    console.log(id);
    data = id.getAttribute("value");
    url = path + '?data=' + data;
    console.log(data);
    console.log(url);
    window.location.href = url;

}