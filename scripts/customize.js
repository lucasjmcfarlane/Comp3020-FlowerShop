class Flower {
    constructor(id, name, price, color, quantity, isSelected, imageSource) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.color = color;
        this.quantity = quantity;
        this.isSelected = isSelected;
        this.imageSource = imageSource;
    }

    static plusOne() {
        this.quantity += 1;
    }
    static minusOne() {
        if (this.quantity > 0) {
            this.quantity -= 1;
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

const items = [];

function addItem(item) {
    items.push(item);
    
    if (item["flower-src"]) {
        addFlowerPreview(item["flower-src"]);
        console.log(items);
    }
}

function removeItem(item) {
    items.pop();
    flowers.pop();
}

const flowers = [];

function addFlowerPreview(flowerSrc) {
    flowers.push(flowerSrc);
    console.log(flowers);
}

function removeFlowerPreview(flowerSrc) {
    flowers.pop();
}

function printFlowerPreview() {
    var preview = document.getElementById("preview-image");
    preview.innerHTML = "";
    
    if (flowers.length > 1) {
        let multiplier = 90/(flowers.length-1);
        let rotation = -45;
        for (let i = 0; i < flowers.length; i++) {
            preview.innerHTML += "<img src='" + flowers[i] + "' style='transform:rotate(" + rotation + "deg)'; \\>";
            rotation += (multiplier);
        }
    } else if (flowers.length == 1) {
        preview.innerHTML = "<img src='" + flowers[0] + "'\\>";
    }
    
}

function previewSetup() {
    setInterval(printFlowerPreview, 1000);
}


var innerTrigger = false;
window.onload=function(){
    document.getElementById('all_btn').click();
    document.getElementById("search_bar_input").addEventListener("input", function (event) {
        innerTrigger = true
        document.getElementById('all_btn').click();
        innerTrigger = false
        const searchText = event.target.value.toLowerCase();
        const grid = document.getElementsByClassName("select_item");
        for (let i = 0; i < grid.length; i++) {
            const itemText = grid[i].textContent.toLowerCase();
            w3RemoveClass(grid[i], "show");
            if (itemText.includes(searchText)) {
                w3AddClass(grid[i], "show")
            }
        }
    })

    previewSetup();

    // var flower1 = new Flower(1, "item1", 1, "yellow", 0, false, "../assets/flower1.png");
    // console.log(flower1);
}



function filterSelection(c) {
    var x, i;
    x = document.getElementsByClassName("select_item");
    if (c == "all") c = "";
    // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
    for (i = 0; i < x.length; i++) {
        w3RemoveClass(x[i], "show");
        if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
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
function w3AddClass(element, name) {
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
function w3RemoveClass(element, name) {
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

function addToValue(id, value){
    const oldValue = document.getElementById(id)
    oldValue.value = Number(oldValue.value) + Number(value)
    if (Number(oldValue.value) <= 0){
        oldValue.value = 1
    }
}

