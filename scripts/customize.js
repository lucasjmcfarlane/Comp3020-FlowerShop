
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