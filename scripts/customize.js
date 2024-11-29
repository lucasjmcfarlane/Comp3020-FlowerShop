window.onload=function(){
    var url = window.location.href;
    console.log(url)
    var flowers = url.split('?')[1].split("=")[1].split(",");
    var vase = url.split('?')[2].split("=")[1]
    console.log(flowers)
    console.log(vase)
    var data = {};
    var tmp;
    for (var i = 0, l = flowers.length; i < l; i++) {
         tmp = flowers[i].split(':');
         data[tmp[0]] = tmp[1];
    }

    filterSetup();
    initializeFlowers(data);
    initializeVases(vase);
    initializeGrid();
}

// mini database
const allFlowers = [];
const allVases = [];

// protocols
const VALUE_ELEMENT = "qt-val-";
const FLOWER_IMAGE = "flower-image-";
const VASE_IMAGE = "vase-image-";
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

class Vase {
    constructor(id, name, price, color, quantity, imageSource) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.color = color;
        this.quantity = quantity;
        this.imageSource = imageSource;
    }
    
    plusOne() {
        if (this.quantity < 1) {
            this.quantity += 1;
        }
    }

    minusOne() {
        if (this.quantity > 0) {
            this.quantity -= 1;
        }
    }
}

function initializeFlowers(flowers) {
    // new Flower(id, name, price, color, quantity, imageSource)
  
    allFlowers[0] = new Flower(0, "Sunflower", 1, "yellow", flowers[0],"../assets/flower1.png");
    allFlowers[1] = new Flower(1,"Red Flower 1", 1, "red", flowers[1], "../assets/flower2.png");
    allFlowers[2] = new Flower(2,"Red Flower 2", 1, "red", flowers[2], "../assets/flower3.png");
    allFlowers[3] = new Flower(3,"Blue Rose", 1, "blue", flowers[3], "../assets/flower4.png");
    allFlowers[4] = new Flower(4,"White Flower", 1, "white", flowers[4], "../assets/flower5.png");
    allFlowers[5] = new Flower(5,"Red Sunflower", 1, "red", flowers[5], "../assets/flower6.png");

    for (let index = 0; index < allFlowers.length; index++) {
        const element = document.getElementById("qt-val-"+index);
        var currFlower = allFlowers[index];
        element.value = currFlower.quantity-1;
        updateState(element,index)
        if (currFlower.quantity > 0) {
            console.log(element.value)
            document.getElementById("select-flower-"+index).click();
        }
    }
    printFlowerImages();
    printFlowerPreview();


}

function initializeVases(vase) {
    // new Vase(id, name, price, color, quantity, imageSource)
    allVases[0] = new Vase(0, "Purple Floral Vase", 15, "purple", 0, "../assets/vase1.png");
    allVases[1] = new Vase(1, "Purple Vase", 10, "purple", 0, "../assets/vase2.png");
    allVases[2] = new Vase(2, "Black Floral Vase", 20, "black", 0, "../assets/vase3.png");
    allVases[3] = new Vase(3, "White Designer Vase", 35, "white", 0, "../assets/vase4.png");
    if (vase < 4) {
        addVase(vase)
        document.getElementById("select-vase-"+vase).click();
    }
    printVaseImages();
    printVasePreview();
}

function addFlower(index) {
    event.stopPropagation();
    allFlowers[index].plusOne();
    updateFlowerQuantity(index);

    // update the flower preview
    printFlowerPreview();
}
function removeFlower(index) {
    event.stopPropagation();
    allFlowers[index].minusOne();
    updateFlowerQuantity(index);

    // update the flower preview
    printFlowerPreview();
}

function addVase(index) {
    for (let i = 0; i < allVases.length; i++) {
        if (i != index) {
            removeVase(i);
            const checkbox = document.getElementById("checkbox-vase-" + i);
            if (checkbox.checked) {
                checkbox.checked = !checkbox.checked;
                checkboxClicked(i, 'vase');
            }
        } else {
            allVases[index].plusOne();
        }
    }
    
    //update the vase preview
    printVasePreview();
}

function removeVase(index) {
    allVases[index].minusOne();

    //update the vase preview
    printVasePreview();
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
        const checkbox = document.getElementById("checkbox-flower-" + index);
        if (checkbox.checked) {
            checkbox.checked = !checkbox.checked;
            checkboxClicked(index, 'flower');
        }
    } else {
        button.disabled = false;
    }
}

function updateFlowerQuantity(index) {
    var elementId = VALUE_ELEMENT + index;
    const element = document.getElementById(elementId);

    var currFlower = allFlowers[index];
    element.value = currFlower.quantity;

    updateQuantityPlusButton(element.value, index);
    updateQuantityMinusButton(element.value, index);
}

function resetSelections() {

    // go through every flowers and reset the quantity to zero
    for (let i = 0; i < allFlowers.length; i++) {
        var currFlower = allFlowers[i];
        currFlower.quantity = 0;
        updateFlowerQuantity(i);
        const checkbox = document.getElementById("checkbox-flower-" + i);
        if (checkbox.checked) {
            checkbox.checked = !checkbox.checked;
            checkboxClicked(i, 'flower');
        }
    }

    // go through every vases and reset the quantity to zero
    for (let i = 0; i < allVases.length; i++) {
        var currVase = allVases[i];
        currVase.quantity = 0;

        const checkbox = document.getElementById("checkbox-vase-" + i);
        if (checkbox.checked) {
            checkbox.checked = !checkbox.checked;
            checkboxClicked(i, 'vase');
        }
    }

    // update preview
    printFlowerPreview();
    printVasePreview();
}



function openInfo(index, type) {
    var currItem = null;
    
    if (type == 'flower') {
        currItem = allFlowers[index];
    } else if (type == 'vase') {
        currItem = allVases[index];
    }

    const dialog = document.getElementById("info-popup-dialog");

    const image = document.getElementById("info-image");
    image.src = currItem.imageSource;

    const title = document.getElementById("info-title");
    title.innerHTML = currItem.name;

    const description = document.getElementById("info-description");
    description.innerHTML = "This is some description for " + currItem.name + ". Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

    dialog.showModal();
}

function printVaseImages() {
    for (let i = 0; i < allVases.length; i++) {
        var currElement = document.getElementById(VASE_IMAGE + i);
        var currVase = allVases[i];
        var html = "<p>" + currVase.name + "</p>";
        html += "<img src='" + currVase.imageSource + "'/>";
        html += "<p>$" + currVase.price + "</p>";

        currElement.innerHTML = html;
    }
}

function printVasePreview() {
    var preview = document.getElementById("preview-vase");
    preview.innerHTML = "";
    

    for (let i = 0; i < allVases.length; i++) {
        var currVase = allVases[i];

        if (currVase.quantity > 0) {
            preview.innerHTML += "<img src='" + currVase.imageSource + "' />";
        }
    }
}

function printFlowerImages() {
    for (let i = 0; i < allFlowers.length; i++) {
        var currElement = document.getElementById(FLOWER_IMAGE + i);
        var currFlower = allFlowers[i];
        var html = "<p>" + currFlower.name + "</p>";
        html += "<img src='" + currFlower.imageSource + "'/>";
        html += "<p>$" + currFlower.price + "</p>";

        currElement.innerHTML = html;

        updateFlowerQuantity(i);
    }
}

function printFlowerPreview() {
    var preview = document.getElementById("preview-flower");
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

function toggleCheckbox(index, type){
    const checkbox = document.getElementById("checkbox-" + type + "-" + index);
    const numFlowers = document.getElementById("qt-val-" + index).value;
    var turnoff = false;

    if (checkbox.checked){
        if (type == 'flower') {
            for (let i = 0; i<numFlowers; i++){
                removeFlower(index);
            }
        } else if (type == 'vase') {
            removeVase(index);
        }
        turnoff = true;
    }
    else {
        if (type == 'flower') {
            addFlower(index);
        } else if (type == 'vase') {
            addVase(index);
        }
    }
    console.log(checkbox.checked);
    if (turnoff) {
        checkbox.checked = false;
    } else {
        checkbox.checked = true;
    }
    checkboxClicked(index, type);
}

function checkboxClicked(index, type){

    const checkbox = document.getElementById("checkbox-" + type + "-" + index);
    const selectItem = document.getElementById("select-" + type + "-" + index);
    const quantityInput = document.getElementById("quantity-input-" + index)

    if (checkbox.checked){
        selectItem.style.border = "2px solid blue";
        selectItem.style.margin = "0 6px 6px 0";
        if (type == 'flower') {
            quantityInput.style.display = "flex"
        }  
    }
    else{
        selectItem.style.border = "";
        selectItem.style.margin = "0 10px 10px 0";
        if (type == 'flower') {
            quantityInput.style.display = "none"
        }
    }
}



// window.onload=function(){
//     var url = window.location.href;
//     console.log(url)
//     params = url.split('?')[1].split("=")[1].split(",");
    
//     var data = {};
//     var tmp;
//     for (var i = 0, l = params.length; i < l; i++) {
//          tmp = params[i].split(':');
//          data[tmp[0]] = tmp[1];
//     }

//     filterSetup();
//     initializeFlowers(data);
//     printFlowerImages();
//     printFlowerPreview();
// }
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

function showFlowerGrid(element) {
    const flowerGrid = document.getElementById("flower-grid");
    const vaseGrid = document.getElementById("vase-grid");
    flowerGrid.style.display = "flex";
    vaseGrid.style.display = "none";
    const btns = document.getElementsByClassName("selection_btn");
    AddClass(btns[0], "active2")
    RemoveClass(btns[1], "active2")
}

function showVaseGrid(element) {
    const flowerGrid = document.getElementById("flower-grid");
    const vaseGrid = document.getElementById("vase-grid");
    flowerGrid.style.display = "none";
    vaseGrid.style.display = "flex";
    const btns = document.getElementsByClassName("selection_btn");
    AddClass(btns[1], "active2")
    RemoveClass(btns[0], "active2")
}

function initializeGrid() {
    showFlowerGrid();
}
