function openList(evt, listName) {

    let i, cas, tablinks;

    cas = document.getElementsByClassName("cases");
    for (i = 0; i < cas.length; i++) {
        cas[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(listName).style.display = "block";
    evt.currentTarget.className += " active";

}

function openTab () {
    document.getElementById("defaultOpen").click();
}

openTab();