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