// ==UserScript==
// @name         Get Communities
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://apps.na.collabserv.com/homepage/*
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';

////// Customizer code starts here ////////
function getCommunities() {
	console.log('in getCommunitites');
	require(["dojo/request"], function(request) {

		request.get('/communities/service/atom/communities/my')
			.then( function(response) {
						var parser = new DOMParser();
						var xmlDoc = parser.parseFromString(response,"text/xml");
						var entries = xmlDoc.getElementsByTagName('entry'); // return array-like obj
						var communitiesArray = []; // array of community data
						for (var i = 0; i < entries.length; i++ ) {
								var community = {}; // this will hold each community's data
								var title = entries[i].getElementsByTagName('title');
								//console.log('found title!:', title);
								//console.log('title name is:', title[0].innerHTML);
								community.title = title[0].innerHTML;
								// use this to create a real array
								var links = Array.prototype.slice.call(entries[i].getElementsByTagName('link'), 0);
								//console.log('links:', links);
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
						console.log('array is', communitiesArray);
				 },
				function(error) {
					console.log('An error occurred calling mycommunities ' + error);
				}
			);
		});
}

//console.log('howdy');
//var reposts = document.getElementsByClassName('repostAction');
// console.log('reposts:', reposts);
// Your code here...
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
					getCommunities();
				}, ".lotusStreamTopLoading div.loaderMain.lotusHidden");

		} catch(e) {
			alert("Exception occurred in helloWorld: " + e);
		}
	});
}

////// Customizer code ends here ////////

})();