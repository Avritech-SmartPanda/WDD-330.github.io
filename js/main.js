
const links = [
    { label: "Week 01", url: "week01/index.html" },
    { label: "Week 02", url: "week02/index.html" },
    { label: "Week 03", url: "week03/index.html" },
    { label: "Week 04", url: "week04/index.html" },
    { label: "Week 05", url: "week05/index.html" },
    { label: "Week 06", url: "week06/index.html" },
    { label: "Week 07", url: "week07/index.html" },
    // { label: "Week 08", url: "week08/index.html" },
    // { label: "Week 09", url: "week09/index.html" },
    // { label: "Week 10", url: "week10/index.html" },
    // { label: "Week 11", url: "week11/index.html" },
    // { label: "Week 12", url: "week12/index.html" },
    // { label: "Week 13", url: "week13/index.html" }
]

function embedLinks() {
    for (var i = 0; i < links.length; i++) {
        document.getElementById("navigation").innerHTML +=
            '<li><a href="' + links[i].url + '">' + links[i].label + '</li>';
    }
    this.getDates();
}


function getDates() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    var hh = today.getHours();
    var mn = today.getMinutes();
    var ss = today.getSeconds();

    if (hh > 12) {
        hh = hh - 12
    }

    if (hh < 10) {
        hh = "0" + hh
    }

    if (dd < 10) {
        dd = "0" + dd
    }

    if (mm < 10) {
        mm = "0" + mm
    }

    if (mn < 10) {
        mn = "0" + mn
    }

    if (ss < 10) {
        ss = "0" + ss
    }

    var display2 = "Last Updated: " + document.lastModified;

    document.getElementById("updateDate").innerHTML = display2;
    document.getElementById("currentYear").innerHTML = yyyy;
}



