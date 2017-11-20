var firstCommunity = 0;
var communitiesJSON;
function getMoreCommunities(startNum) {
    if (startNum == 'undefined') startNum = 0;
    alert('hey, that worked!');
}
function temp() {
    // nothing here yet
    alert('this is temp()');
}

function buildCommunities(json) {
    var outHTML = '';
    for (var a = 0; a < json.length; a++) {
        outHTML += "<a class='communityContainer' target='_blank' href='" + json[a].href + "'>";
        outHTML += "<div class='communityIcon'>";
        outHTML += "<img class='communityImg' src='" + json[a].iconUrl + "' />";
        outHTML += "<div class='communityTitle'>" + json[a].title + "</div>";
        outHTML += "</div></a>";
    }
    if (outHTML !== '') {
        var headerHTML = "<h2>My top communities</h2>";
        var header = document.createElement('div');
        header.setAttribute('class', 'lotusSection');
        header.setAttribute('id', 'communitiesSectionHeader');

        var div = document.createElement("div");
        div.setAttribute('id','communityDisplayArea');

        outHTML += "<button onclick=getMoreCommunities()>Test me!</button>";

        var rightCol = document.getElementById("lotusColRight");
        rightCol.appendChild(header);
        document.getElementById('communitiesSectionHeader').innerHTML = headerHTML;
        rightCol.appendChild(div);
        document.getElementById('communityDisplayArea').innerHTML = outHTML;
    }
}