

window.onload=function(){
    document.getElementById("search_bar_input").addEventListener("input", function (event) {
        const searchText = event.target.value.toLowerCase();
        const grid = document.getElementsByClassName("select_item")
        for (let i = 0; i < grid.length; i++) {
            // grid[i];
            const itemText = grid[i].textContent.toLowerCase();
            if (itemText.includes(searchText)) {
                grid[i].style.display = 'block';
            } else {
                grid[i].style.display = 'none';
            }
        }
        // grid.forEach(function (item) {
        //     const itemText = item.textContent.toLowerCase();

        //     if (itemText.includes(searchText)) {
        //         item.style.display = 'visible';
        //     } else {
        //         item.style.display = 'none';
        //     }
        // });

    })
}