function changePage2(path, data) {
    url = path + '?data=' + data;
    console.log(url)
    window.location.href = url;
}