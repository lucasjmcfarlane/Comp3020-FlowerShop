function addToValue(id, value){
    const oldValue = document.getElementById(id)
    oldValue.value = Number(oldValue.value) + Number(value)
    if (Number(oldValue.value) <= 0){
        oldValue.value = 1
    }
}