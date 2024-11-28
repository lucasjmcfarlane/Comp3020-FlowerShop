function changePage(path, id) {
    var data = id.value,
    url = path+'?data=' + encodeURIComponent(data);


    document.location.href = url;

    window.location.href = path

}