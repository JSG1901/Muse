
function appendStyleSheet(cssURL) {
    var debug = false;
    if (debug) console.log("Appending css: " + cssURL);
    var link = window.document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = cssURL;
    document.getElementsByTagName("HEAD")[0].appendChild(link);
    if (debug) console.log("Finished appending css.");
}
function buildContainerDivs() {
    // using this to force the sequence of divs
    // communities
    var header = document.createElement('div');
    header.setAttribute('class', 'lotusSection');
    header.setAttribute('id', 'communitiesSectionHeader');
    var outerDiv = document.createElement("div");
    outerDiv.setAttribute('class','outerDisplayDiv');
    var div = document.createElement("div");
    div.setAttribute('id','communityDisplayArea');
    // files
    var header2 = document.createElement('div');
    header2.setAttribute('class', 'lotusSection');
    header2.setAttribute('id', 'filesSectionHeader');
    var div2 = document.createElement("div");
    div2.setAttribute('id','filesDisplayArea');
    // both
    var rightCol = document.getElementById("lotusColRight");
    outerDiv.appendChild(header);
    outerDiv.appendChild(div);
    outerDiv.appendChild(header2);
    outerDiv.appendChild(div2);
    rightCol.insertBefore(outerDiv, rightCol.childNodes[0]);

    // client logo
    var logoDiv = document.createElement('div');
    logoDiv.setAttribute('id','clientCoLogo');
    var body = document.getElementsByTagName('body')[0];
    body.appendChild(logoDiv);
    // container for left airliner
    var leftGraphic = document.createElement('div');
    leftGraphic.setAttribute('id','leftSideBGGraphic');
    body.appendChild(leftGraphic);
    // free the left menu
    var menu = document.getElementById('homepageLeftNavigationMenuContainer');
    body.appendChild(menu);
    // build phantom communities/files
    buildCommunityPlaceholders();
    buildFilePlaceholders();
}
function buildFilePlaceholders() {
    var outHTML = "<div id='files1'>";
    for (var a = 0; a < 24; a++) {
        outHTML += "<a class='fileContainer' target='_blank' href='javascript:void(0);'>";
        outHTML += "<div class='fileIcon'>";
        outHTML += "<img class='fileImg' src='scottgood/images/FileIconPlaceholder.png' />";
        outHTML += "<div class='fileTitle'>&nbsp;</div>";
        outHTML += "<div class='lastUpdated'>&nbsp;</div>";
        outHTML += "</div></a>";
        if (a == 11) {
            outHTML += "<div class='lotusSectionFooter'>";
            outHTML += "<div class='lotusPaging'>";
            outHTML += "<div class='lotusLeft' label='Showing files 1 through 12 of 24' title='Showing files 1 through 12 of 24'>1 - 12 of 24</div>";
            outHTML += "<ul class='lotusRight lotusInlinelist'>";
            outHTML += "<li class='lotusFirst'>";
            outHTML += "<span class='meta'>Previous</span>";
            outHTML += "</li>";
            outHTML += "<li><a href='javascript:void(0);' onclick='document.getElementById(\"files1\").style.display=\"none\"; document.getElementById(\"files2\").style.display=\"block\";' alt='Next' title='Next'>Next</a></li>";
            outHTML += "</ul></div></div>";
            outHTML += "</div><div id='files2' style='display:none;'>";
        }
    }
    if (outHTML !== '') {
        outHTML += "<div class='lotusSectionFooter'>";
        outHTML += "<div class='lotusPaging'>";
        outHTML += "<div class='lotusLeft' label='Showing files 2 through 24 of 24' title='Showing files 2 through 24 of 24'>2 - 24 of 24</div>";
        outHTML += "<ul class='lotusRight lotusInlinelist'>";
        outHTML += "<li class='lotusFirst'><a href='javascript:void(0)' onclick='document.getElementById(\"files2\").style.display=\"none\"; document.getElementById(\"files1\").style.display=\"block\";' alt='Previous' title='Previous'>Previous</a></li>";
        outHTML += "<li>";
        outHTML += "<span class='meta'>Next</span>";
        outHTML += "</li>";
        outHTML += "</ul></div></div>";
        outHTML += "</div>";
        var headerHTML = "<h2>My most-recently updated files</h2>";
        document.getElementById('filesSectionHeader').innerHTML = headerHTML;
        document.getElementById('filesDisplayArea').innerHTML = outHTML;
    }
}
function buildCommunityPlaceholders() {
    var outHTML = "<div id='communities1'>";
    for (var a = 0; a < 24; a++) {
        outHTML += "<a class='communityContainer' target='_blank' href='javascript:void(0)'>";
        outHTML += "<div class='communityIcon'>";
        outHTML += "<img class='communityImg' src='scottgood/images/CommunityIconPlaceholder.png' />";
        outHTML += "<div class='communityTitle'></div>";
        outHTML += "</div></a>";
        if (a == 11) {
            outHTML += "<div class='lotusSectionFooter'>";
            outHTML += "<div class='lotusPaging'>";
            outHTML += "<div class='lotusLeft' label='Showing items 1 through 12 of 24' title='Showing items 1 through 12 of 24'>1 - 12 of 24</div>";
            outHTML += "<ul class='lotusRight lotusInlinelist'>";
            outHTML += "<li class='lotusFirst'>";
            outHTML += "<span class='meta'>Previous</span>";
            outHTML += "</li>";
            outHTML += "<li><a href='javascript:void(0);' onclick='document.getElementById(\"communities1\").style.display=\"none\"; document.getElementById(\"communities2\").style.display=\"block\";' alt='Next' title='Next'>Next</a></li>";
            outHTML += "</ul></div></div>";
            outHTML += "</div><div id='communities2' style='display:none;'>";
        }
    }
    if (outHTML !== '') {
        outHTML += "<div class='lotusSectionFooter'>";
        outHTML += "<div class='lotusPaging'>";
        outHTML += "<div class='lotusLeft' label='Showing items 2 through 24 of 24' title='Showing items 2 through 24 of 24'>2 - 24 of 24</div>";
        outHTML += "<ul class='lotusRight lotusInlinelist'>";
        outHTML += "<li class='lotusFirst'><a href='javascript:void(0)' onclick='document.getElementById(\"communities2\").style.display=\"none\"; document.getElementById(\"communities1\").style.display=\"block\";' alt='Previous' title='Previous'>Previous</a></li>";
        outHTML += "<li>";
        outHTML += "<span class='meta'>Next</span>";
        outHTML += "</li>";
        outHTML += "</ul></div></div>";
        outHTML += "</div>";
        var headerHTML = "<h2>My top communities</h2>";
        document.getElementById('communitiesSectionHeader').innerHTML = headerHTML;
        document.getElementById('communityDisplayArea').innerHTML = outHTML;
    }
}
function buildCommunities(json) {
    var containers = document.getElementsByClassName('communityContainer');
    var thisContainer;
    var thisImg;
    var thisTitle;
    for (var a = 0; a < json.length; a++) {
        thisContainer = containers[a];
        thisContainer.href = json[a].href;
        thisImg = thisContainer.getElementsByClassName('communityImg')[0];
        thisTitle = thisContainer.getElementsByClassName('communityTitle')[0];
        thisImg.src = json[a].iconUrl;
        thisTitle.innerHTML = json[a].title;
    }
}
function buildFiles(json) {
    // href, thumbnail, title, updatedDate, type.
    /* icon images doc.gif, html.gif, mp3.gif, pdf.gif, ppt.gif, xls.gif, zip.gif */
    var containers = document.getElementsByClassName('fileContainer');
    var thisContainer;
    var img;
    var title;
    var date;
    for (var a = 0; a < json.length; a++) {
        thisContainer = containers[a];
        thisContainer.href= json[a].href;
        img = thisContainer.getElementsByClassName('fileImg')[0];
        title = thisContainer.getElementsByClassName('fileTitle')[0];
        date = thisContainer.getElementsByClassName('lastUpdated')[0];
        switch (json[a].type) {
            case 'doc':
                img.src = "scottgood/images/doc.gif";
                break;
            case 'docx':
                img.src = "scottgood/images/doc.gif";
                break;
            case 'html':
                img.src = "scottgood/images/html.gif";
                break;
            case 'htm':
                img.src = "scottgood/images/html.gif";
                break;
            case 'mp3':
                img.src = "scottgood/images/mp3.gif";
                break;
            case 'pdf':
                img.src = "scottgood/images/pdf.gif";
                break;
            case 'pptx':
                img.src = "scottgood/images/ppt.gif";
                break;
            case 'xls':
                img.src = "scottgood/images/xls.gif";
                break;
            case 'xlsx':
                img.src = "scottgood/images/xls.gif";
                break;
            case 'zip':
                img.src = "scottgood/images/zip.gif";
                break;
            default:
                img.src = "scottgood/images/doc.gif";
                break;
        }
        var updated = new Date(json[a].updatedDate);
        title.innerHTML = json[a].title;
        date.innerHTML = updated.toDateString();
    }
}
function getCommunities() {
	require(["dojo/request"], function(request) {
		request.get('/files/basic/api/myuserlibrary/feed?ps=24&sortBy=modified&sortOrder=desc')
			.then( function(response) {
            var parser = new DOMParser();
			var xmlDoc = parser.parseFromString(response,"text/xml");
			var entries = xmlDoc.getElementsByTagName('entry'); // return array-like obj
            var filesArray = [];
            for (var i = 0; i < entries.length; i++ ) {
                var oneFile = {};
                var title = entries[i].getElementsByTagName('title');
				oneFile.title = title[0].innerHTML;
                var filetype = oneFile.title.split('.');
                oneFile.type = filetype[filetype.length - 1];
                var links = Array.prototype.slice.call(entries[i].getElementsByTagName('link'), 0);
                var href = links.filter(function(element) {
                    return element.getAttribute('rel') === 'alternate';
				});
                oneFile.href = href[0].getAttribute('href');
                var thumbnail = links.filter(function(element) {
                    return element.getAttribute('rel') === 'thumbnail';
				});
				oneFile.thumbnail = thumbnail[0].getAttribute('href').replace('mediumview','smallview');
                var updatedDate = entries[i].getElementsByTagName('updated')[0].innerHTML;
                oneFile.updatedDate = updatedDate;
                filesArray.push(oneFile);

            }
            //console.log('files array is', filesArray);
            buildFiles(filesArray);


				 },
				function(error) {
					console.log('An error occurred calling myfiles ' + error);
				}
			);

        request.get('/communities/service/atom/communities/my?ps=24')
			.then( function(response) {
						var parser = new DOMParser();
						var xmlDoc = parser.parseFromString(response,"text/xml");
						var entries = xmlDoc.getElementsByTagName('entry'); // return array-like obj
						var communitiesArray = []; // array of community data
						for (var i = 0; i < entries.length; i++ ) {
								var community = {}; // this will hold each community's data
								var title = entries[i].getElementsByTagName('title');
								community.title = title[0].innerHTML;
								// use this to create a real array
								var links = Array.prototype.slice.call(entries[i].getElementsByTagName('link'), 0);
								// function to return only the icon link
								var findIcon = function(element) {
										return element.getAttribute('rel') === 'http://www.ibm.com/xmlns/prod/sn/logo';
								};
								var icon = links.filter(findIcon);
								community.iconUrl = icon[0].getAttribute('href');
								// function to return only the community href
								var href = links.filter(function(element) {
										return element.getAttribute('rel') === 'alternate';
								});
								community.href = href[0].getAttribute('href');
								var uuid = entries[i].getElementsByTagName('snx:communityUuid')[0].innerHTML;
								community.uuid = uuid;
								communitiesArray.push(community);
						}
						//console.log('communities array is', communitiesArray);
                        buildCommunities(communitiesArray);
				 },
				function(error) {
					console.log('An error occurred calling mycommunities ' + error);
				}
			);
		});
}



// Your code here...
/* ------ actual stuff happening -------*/
//appendStyleSheet('https://rawgit.com/JSG1901/Muse/master/Homepage_Airplane.css');
if(typeof(dojo) != "undefined") {

	require(["dojo/domReady!"], function() {

		try {
				// utility function to let us wait for a specific element of the page to load...
				var waitFor = function(callback, elXpath, elXpathRoot, maxInter, waitTime) {
						if(!elXpathRoot) var elXpathRoot = dojo.body();
						if(!maxInter) var maxInter = 10000;  // number of intervals before expiring
						if(!waitTime) var waitTime = 1;  // 1000=1 second
						if(!elXpath) return;
						var waitInter = 0;  // current interval
						var intId = setInterval( function(){
								if( ++waitInter<maxInter && !dojo.query(elXpath,elXpathRoot).length) return;

								clearInterval(intId);
								if( waitInter >= maxInter) {
										console.log("**** WAITFOR ["+elXpath+"] WATCH EXPIRED!!! interval "+waitInter+" (max:"+maxInter+")");
								} else {
										console.log("**** WAITFOR ["+elXpath+"] WATCH TRIPPED AT interval "+waitInter+" (max:"+maxInter+")");
										callback();
								}
						}, waitTime);
				};

				// here we use waitFor to wait on the .lotusStreamTopLoading div.loaderMain.lotusHidden element
				// before we proceed to customize the page...
				waitFor( function() {
                    buildContainerDivs();

					getCommunities();
				}, ".lotusStreamTopLoading div.loaderMain.lotusHidden");

		} catch(e) {
			alert("Exception occurred in helloWorld: " + e);
		}
	});
}
