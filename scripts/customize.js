window.onload=function(){
    filterSetup();
    initializeFlowers();
    printFlowerImages();
    printFlowerPreview();
}

// mini database
const allFlowers = [];

// protocols
const VALUE_ELEMENT = "qt-val-";
const FLOWER_IMAGE = "flower-image-";
const PLUS_BUTTON_ELEMENT = "qt-plus-btn-";
const MINUS_BUTTON_ELEMENT = "qt-minus-btn-";

// constants
const FLOWER_QTY_LIMIT = 5;
const ALL_FLOWER_QTY_LIMIT = 10;

class Flower {
    constructor(id, name, price, color, quantity, imageSource) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.color = color;
        this.quantity = quantity;
        this.imageSource = imageSource;
    }

    plusOne() {
        if (this.quantity < FLOWER_QTY_LIMIT) {
            this.quantity += 1;
        }
    }
    minusOne() {
        if (this.quantity > 0) {
            this.quantity -= 1;
        }
    }

    setQuantity(num) {
        if (num > FLOWER_QTY_LIMIT) {
            this.quantity = 5;
        } else if(num < 0) {
            this.quantity = 0;
        } else {
            this.quantity = num
        }
    }
}

function initializeFlowers() {
    // new Flower(id, name, price, color, quantity, imageSource)
    allFlowers[0] = new Flower(0, "Sunflower 1", 1, "yellow", 0,"../assets/flower1.png");
    allFlowers[1] = new Flower(1,"Red Flower 1", 1, "red", 0, "../assets/flower2.png");
    allFlowers[2] = new Flower(1,"Red Flower 2", 1, "red", 0, "../assets/flower3.png");
    allFlowers[3] = new Flower(1,"Red Flower 3", 1, "red", 0, "../assets/flower2.png");
    allFlowers[4] = new Flower(1,"Sunflower 2", 1, "yellow", 0, "../assets/flower1.png");
}

function addFlower(index) {
    allFlowers[index].plusOne();
    updateQuantity(index);
}
function removeFlower(index) {
    allFlowers[index].minusOne();
    updateQuantity(index);
}

function getAllFlowersQuantity() {
    var totalQuantity = 0;
    for (let i = 0; i < allFlowers.length; i++) {
        var currFlower = allFlowers[i];
        totalQuantity += currFlower.quantity;
    }
    return totalQuantity;
}

function updateQuantityPlusButton(quantity, index) {
    const button = document.getElementById(PLUS_BUTTON_ELEMENT+index);
    if (quantity >= FLOWER_QTY_LIMIT) {
        button.disabled = true;
    } else {
        button.disabled = false;
    }
}

function updateQuantityMinusButton(quantity, index) {
    const button = document.getElementById(MINUS_BUTTON_ELEMENT+index);
    if (quantity <= 0) {
        button.disabled = true;
    } else {
        button.disabled = false;
    }
}

function updateQuantity(index) {
    var elementId = VALUE_ELEMENT + index;
    const element = document.getElementById(elementId);

    var currFlower = allFlowers[index];
    element.value = currFlower.quantity;

    updateQuantityPlusButton(element.value, index);
    updateQuantityMinusButton(element.value, index);
    
    // update the flower preview
    printFlowerPreview();
}

function resetSelections() {

    // go through every flowers and reset the quantity to zero
    for (let i = 0; i < allFlowers.length; i++) {
        var currFlower = allFlowers[i];
        currFlower.quantity = 0;
        updateQuantity(i);
    }

    // de-select everything
}



function openInfo(index) {
    var currFlower = allFlowers[index];

    const dialog = document.getElementById("info-popup-dialog");

    const image = document.getElementById("info-image");
    image.src = currFlower.imageSource;

    const title = document.getElementById("info-title");
    title.innerHTML = currFlower.name;

    const description = document.getElementById("info-description");
    description.innerHTML = "This is some description for " + currFlower.name + ". Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

    dialog.showModal();
}



function printFlowerImages() {
    for (let i = 0; i < allFlowers.length; i++) {
        var currElement = document.getElementById(FLOWER_IMAGE + i);
        var currFlower = allFlowers[i];
        var html = "<p>" + currFlower.name + "</p>";
        html += "<img src='" + currFlower.imageSource + "'/>";
        html += "<p>$" + currFlower.price + "</p>";

        currElement.innerHTML = html;
    }
}

function printFlowerPreview() {
    var preview = document.getElementById("preview-image");
    preview.innerHTML = "";
    
    var allFlowersQuantity = getAllFlowersQuantity();
    let multiplier = 90/(allFlowersQuantity-1);
    let rotation = -45;

    // no rotation if there is a single flower
    if (allFlowersQuantity == 1) {
        rotation = 0;
    }

    for (let i = 0; i < allFlowers.length; i++) {
        var currFlower = allFlowers[i];

        if (currFlower.quantity > 0) {
            for (let j = 0; j < currFlower.quantity; j++) {
                preview.innerHTML += "<img src='" + currFlower.imageSource + "' style='transform:rotate(" + rotation + "deg)'; />";
                rotation += (multiplier);
            }
        }
    }
}

function checkboxClicked(index){

    const checkbox = document.getElementById("checkbox" + index);
    const selectItem = document.getElementById("select-item-" + index);
    const quantityInput = document.getElementById("quantity-input-" + index)

    if (checkbox.checked){
        selectItem.style.border = "2px solid blue";
        selectItem.style.margin = "0 6px 6px 0";
        quantityInput.style.display = "flex"
    }
    else{
        selectItem.style.border = "";
        selectItem.style.margin = "0 10px 10px 0";
        quantityInput.style.display = "none"
    }
}

function updateState(input,index) {
    var num = parseInt(input.value)
    if (input.value == "")
        num = 0
    if (num > 5)
        num = 5
    input.value = num
    allFlowers[index].setQuantity(num)

    updateQuantityPlusButton(input.value, index);
    updateQuantityMinusButton(input.value, index);

    printFlowerPreview();
}


var innerTrigger = false;
function filterSetup() {
    document.getElementById('all_btn').click();
    document.getElementById("search_bar_input").addEventListener("input", function (event) {
        innerTrigger = true
        document.getElementById('all_btn').click();
        innerTrigger = false
        const searchText = event.target.value.toLowerCase();
        const grid = document.getElementsByClassName("select_item");
        for (let i = 0; i < grid.length; i++) {
            const itemText = grid[i].textContent.toLowerCase();
            RemoveClass(grid[i], "show");
            if (itemText.includes(searchText)) {
                AddClass(grid[i], "show")
            }
        }
    })
}


function filterSelection(c) {
    var x, i;
    x = document.getElementsByClassName("select_item");
    if (c == "all") c = "";
    // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
    for (i = 0; i < x.length; i++) {
        RemoveClass(x[i], "show");
        if (x[i].className.indexOf(c) > -1) AddClass(x[i], "show");
    }
    // Add active class to the current control button (highlight it)
    var btns = document.getElementsByClassName("filter_btn");
    for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function() {
            var current = document.getElementsByClassName("active");
            current[0].className = current[0].className.replace(" active", "");
            this.className += " active";
        });
    }
    if (!innerTrigger){
        document.getElementById('search_bar_input').value = "";
    }
}

// Show filtered elements
function AddClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1) {
            element.className += " " + arr2[i];
        }
    }
}

// Hide elements that are not selected
function RemoveClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        while (arr1.indexOf(arr2[i]) > -1) {
            arr1.splice(arr1.indexOf(arr2[i]), 1);
        }
    }
    element.className = arr1.join(" ");
}

