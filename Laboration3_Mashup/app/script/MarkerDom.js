/**
 * Created by dav on 2014-12-03.
 * @return {string}
 */
function InfoWindow(marker) {
    var title = marker.title;
    var date = new Date(parseInt(marker.createddate.replace("/Date(", "").replace(")/", ""), 10));
    var description = marker.description;
    var subcategory = marker.subcategory;
    if (marker.description == '') {
        description = "Beskrivning saknas";
    }

    this.getDomString = function () {
        var string = "<div>";
        string += "<h4>" + title + "</h4>";
        string += "    <h6>" + date.toLocaleDateString() + " Klockan: " + date.toLocaleTimeString() + "</h6>";
        string += "  <p>" + "<h6>Beskrivning:</h6>" + description + "</p>";
        string += "<p>" + "<h6>Kategori:</h6> " + subcategory + "</p>";
        string += "</div>";
        return string;
    }
}
