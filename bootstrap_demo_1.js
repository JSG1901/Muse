// bootstrap_demo_1.js
var outerDebug = true;
var knownPageType;
var subPageType;




/* -------------*/

function isAnyMember(lookForList, lookInList) {
    if(typeof lookForList !== 'object') lookForList = [lookForList];
    if(typeof lookInList !== 'object') lookInList = [lookInList];
    var hasVal = false;
    for (var a = 0; a < lookInList.length; a++) {
        targetVal = lookForList[a];
        for (var b = 0; b < lookForList.length; b++) {
            //console.log(lookForList[a] + " == " + lookInList[b]);
            if (lookForList[a] == lookInList[b]) {
                hasVal = true;
                break;
            }
        }
        if (hasVal) {
            return true;
        }
    }
    return false;
}

function getPageType() {
    var debug = true;
    if (knownPageType) return knownPageType;
    subPageType = null;
    var thisURL = window.location.href;
    if (thisURL.indexOf('homepage') > -1) {
        // connections home page
        knownPageType = 'homepage';
        if (debug) console.log('this is the site home page');
        doHomePageMods();
        return true;
    } else if (jQuery('body.blog').length > 0) {
        // blog
        if (jQuery(".lotusActionBar.lotusBtnContainer.aria_toolbar form[name='graduateIdeaForm']").length > 0){
            knownPageType = 'ideation blog';
            if (debug) console.log("it's an ideation blog");
            return true;
        }
        if (debug) console.log("buttons found: " + jQuery('.lotusActionBar.lotusBtnContainer.aria_toolbar .lotusBtn a').length);
        var buttns = jQuery('.lotusActionBar.lotusBtnContainer.aria_toolbar .lotusBtn a');
        var numButtons = buttns.length;
        if (numButtons === 2) {
            knownPageType = 'blog';
            if (debug) console.log("it's a blog");
            doBlogMods(buttns);
            return true;
        } else {
            knownPageType = 'blog listing';
            if (debug) console.log("it's a blog listing");
            doBlogMods(buttns);
            return true;
        }
    } else if (jQuery('body .wikiHeader').length > 0) {
        // wiki
        knownPageType = 'wiki';
        if (debug) console.log("it's a wiki");
        return true;
    } else if (jQuery('body div#activitypage').length > 0) {
        // activity
        knownPageType = 'activity';
        if (debug) console.log("it's an activity");
        return true;
    } else if (jQuery('body div.filesListFilled').length > 0) {
        // files
        knownPageType = 'files';
        if (debug) console.log("it's files");
        return true;
    } else if (thisURL.indexOf('?communityUuid=') > -1) {
        // individual community 
        // not currently used (see further down), but could be
        if (debug) console.log('this is an individual community');
    } else if (thisURL.indexOf('communities') > -1 && thisURL.indexOf('communityUuid') === -1) {
        // communities listing
        knownPageType = 'community listing';
        var subTypes = ['mycommunities','ownedcommunities','followedcommunities','communityinvites','allcommunities'];
        for (var s = 0; s < subTypes.length; s++) {
            if (thisURL.indexOf(subTypes[s] > -1)) {
                subPageType = subTypes[s]; // set for communities in case there's different handling among the types
                if (debug) console.log("it's a community listing of subtype " + subTypes[s]);
                break;
            }
        }
        return true;
        
    } else if (jQuery('body div#contentArea.lconnCommLanding').length > 0) {
        // community
        knownPageType = 'genl community';
        if (debug) console.log("it's a genl community page"); // e.g., community landing page, survey page
        doOverviewMods();
        return true;
    }
    return false;
}

function appendStyleSheet(cssURL) {
    var debug = false;
    if (debug) console.log("Appending css: " + cssURL);
    if (typeof (dojo) != "undefined") {
        dojo.place('<link rel="stylesheet" type="text/css" href="' + cssURL + '"></link>', dojo.doc.head, 'last');
    }
    if (debug) console.log("Finished appending css.");
}

function loadScript(url, callback){
    // asynchronously loads javascript libraries...probably only one at this point.
    var script = document.createElement("script")
    script.type = "text/javascript";
    if (script.readyState){  //IE
        script.onreadystatechange = function(){
            if (script.readyState == "loaded" ||
                    script.readyState == "complete"){
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {  //Others
        script.onload = function(){
            callback();
        };
    }
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}

function doHomePageMods() {
    appendStyleSheet('/files/muse-static/scottgood/css/homepage.css');
    jQuery('#lotusFrame').addClass('container-fluid');
    jQuery('#lotusBanner').parent().addClass('row');
    jQuery('#lotusBanner').addClass('col-lg-12 col-md-12 col-sm-12 col-xs-12');
    jQuery('#lotusTitleBar').addClass('row');
    jQuery('#lotusTitleBar .lotusWrapper').addClass('col-lg-12 col-md-12 col-sm-12 col-xs-12 col-xxs-12');
    jQuery('#lotusMain').addClass('row');
    jQuery('#lotusColLeft').addClass('col-lg-2 col-md-2 col-sm-3 col-xs-4 col-xxs-12');
    jQuery('#lotusColRight').addClass('col-lg-3 col-md-3 col-sm-3 col-xs-8 col-xxs-12');
    jQuery('#lotusContent').addClass('col-lg-7 col-md-7 col-sm-6 col-xs-12 col-xxs-12');
    // style tweaks
    // jQuery('.lotusui30 .lotusTitleBar2 .lotusInner .titleBarBody img').attr('src', 'https://www.androidcentral.com/sites/androidcentral.com/files/styles/w550h500/public/wallpapers/blue-square-tiles-ebd.jpg?itok=p6J0DUCA');
}

function doBlogMods(buttns) {
    //container-fluid
    appendStyleSheet('https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css');
    for (var d = 0; d < buttns.length; d++) {
        if (buttns[d].innerHTML == "New Entry") buttns[d].innerHTML = 'New Blog Entry';
        if (buttns[d].innerHTML == "View All Entries") buttns[d].innerHTML = 'View All Blog Entries';
    }
    jQuery('#lotusFrame').addClass('container-fluid');
    jQuery('#lotusBanner').parent().addClass('row');
    jQuery('#lotusBanner').addClass('col-lg-12 col-md-12 col-sm-12 col-xs-12');
    jQuery('#lotusTitleBar').addClass('row');
    jQuery('#lotusTitleBar .lotusWrapper').addClass('col-lg-12 col-md-12 col-sm-12 col-xs-12 col-xxs-12');
    jQuery('#lotusMain').addClass('row');
    jQuery('#lotusColLeft').addClass('col-lg-3 col-md-3 col-sm-3 col-xs-6 col-xxs-12');
    jQuery('#lotusColRight').addClass('col-lg-3 col-md-3 col-sm-3 col-xs-6 col-xxs-12');
    jQuery('#lotusContent').addClass('col-lg-6 col-md-6 col-sm-6 col-xs-12 col-xxs-12');
}

function doOverviewMods() {
    //container-fluid
    appendStyleSheet('https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css');
    var layout = getPageLayout(); // options: 2-col, 3-col, 3-col w/banner
    if (layout == '2-col') {
        jQuery('#lotusFrame').addClass('container-fluid');
        jQuery('#lotusBanner').parent().addClass('row');
        jQuery('#lotusBanner').addClass('col-lg-12 col-md-12 col-sm-12 col-xs-12');
        jQuery('#lotusTitleBar').addClass('row');
        jQuery('#lotusTitleBar .lotusWrapper').addClass('col-lg-12 col-md-12 col-sm-12 col-xs-12 col-xxs-12');
        jQuery('#lotusMain').addClass('row');
        jQuery('#lotusColLeft').addClass('col-lg-3 col-md-3 col-sm-3 col-xs-12 col-xxs-12');
        //jQuery('#lotusColRight').addClass('col-lg-3 col-md-3 col-sm-3 col-xs-6 col-xxs-12');
        jQuery('#lotusContent').addClass('col-lg-9 col-md-9 col-sm-9 col-xs-12 col-xxs-12');

    } else {
        // both 3-col versions
        jQuery('#lotusFrame').addClass('container-fluid');
        jQuery('#lotusBanner').parent().addClass('row');
        jQuery('#lotusBanner').addClass('col-lg-12 col-md-12 col-sm-12 col-xs-12');
        jQuery('#lotusTitleBar').addClass('row');
        jQuery('#lotusTitleBar .lotusWrapper').addClass('col-lg-12 col-md-12 col-sm-12 col-xs-12 col-xxs-12');
        jQuery('#lotusMain').addClass('row');
        jQuery('#lotusColLeft').addClass('col-lg-3 col-md-3 col-sm-6 col-xs-6 col-xxs-12');
        jQuery('#lotusColRight').addClass('col-lg-3 col-md-3 col-sm-6 col-xs-6 col-xxs-12');
        jQuery('#lotusContent').addClass('col-lg-6 col-md-6 col-sm-12 col-xs-12 col-xxs-12');
    }

}

function getPageLayout() {
    var debug = true;
    var leftCol = document.getElementById('lotusColLeft');
    var rightCol = document.getElementById('lotusColRight');
    var centerCol = document.getElementById('lotusContent');
    var bannerArea = document.getElementById('bannerDropZone');
    if (debug) {
        console.log('leftCol: ' + ((leftCol) ? 'yes' : 'no'));
        console.log('centerCol: ' + ((centerCol) ? 'yes' : 'no'));
        console.log('rightCol: ' + ((rightCol) ? 'yes' : 'no'));
        console.log('bannerArea: ' + ((bannerArea) ? 'yes' : 'no'));
    }
    if (leftCol && centerCol && rightCol) {
        var layoutFormat = (bannerArea) ? '3-col w/banner' : '3-col';
        if (debug) console.log('Page layout: ' + layoutFormat);
        return layoutFormat;
    }
    if (leftCol && centerCol && !rightCol) {
        if (debug) console.log('Page layout: 2-col');
        return '2-col';
    }
}

/* ******** now do something ************ */

function startJQueryProcessing () {
    if (outerDebug) console.log('Starting jQueryProcessing()');
    
    (function() {
        'use strict';
        // MutationSelectorObserver represents a selector and its associated initialization callback.
        var MutationSelectorObserver = function (selector, callback) {
            this.selector = selector;
            this.callback = callback;
        };
       // List of MutationSelectorObservers.
        var msobservers = [];
        msobservers.initialize = function (selector, callback) {
            // Wrap the callback so that we can ensure that it is only
            // called once per element.
            var seen = [];
            var callbackOnce = function () {
                if (seen.indexOf(this) == -1) {
                    seen.push(this);
                    jQuery(this).each(callback);
                }
            };

            // See if the selector matches any elements already on the page.
            jQuery(selector).each(callbackOnce);

            // Then, add it to the list of selector observers.
            this.push(new MutationSelectorObserver(selector, callbackOnce));
        };
        // The MutationObserver watches for when new elements are added to the DOM.
        var observer = new MutationObserver(function (mutations) {
            // For each MutationSelectorObserver currently registered.
            for (var j = 0; j < msobservers.length; j++) {
                jQuery(msobservers[j].selector).each(msobservers[j].callback);
            }
        });
        // Observe the entire document.
        observer.observe(document.documentElement, {childList: true, subtree: true, attributes: true});
        // Deprecated API (does not work with jQuery >= 3.1.1):
        jQuery.fn.initialize = function (callback) {
            msobservers.initialize(this.selector, callback);
        };
        jQuery.initialize = function (selector, callback) {
            msobservers.initialize(selector, callback);
        };
    })(jQuery);
    
    jQuery.initialize(".blog .entryContentContainer.blogsWrapText div", function () {
       $(this).css("paddingTop", 0);
    });

    jQuery.initialize('*', function () {
        var debug = true;
        if (!knownPageType) {
            getPageType();
            if (knownPageType) {
                
                if (debug) console.log('knownPageType = ' + knownPageType);
                switch (knownPageType) {
                    case 'blog':
                        appendStyleSheet('/files/muse-static/scottgood/css/blogs.css');
                        jQuery.initialize(".lotusui30_layout .lotusMain .lotusContent", function () {
                            $(this).css("margin-left", '');
                        });
                        break;
                    case 'ideation blog':
                        break;
                    case 'blog listing':
                        appendStyleSheet('/files/muse-static/scottgood/css/blogs.css');
                        jQuery('h4').addClass('bidiAware');
                        jQuery.initialize(".lotusui30_layout .lotusMain .lotusContent", function () {
                            $(this).css("margin-left", '');
                        });
                        break;
                    case 'wiki':
                        break;
                    case 'activity':
                        break;
                    case 'files':
                        break;
                    case 'genl community':
                        appendStyleSheet('/files/muse-static/scottgood/css/blogs.css');
                        jQuery.initialize(".lotusui30_layout .lotusMain .lotusContent", function () {
                            $(this).css("margin-left", '');
                        });
                        break;
                    case 'homepage':
                        jQuery.initialize('activityStreamPage lotusMain', function () {
                            $(this).css("margin-left", '');
                        });
                        jQuery.initialize('.lotusWarningMsgs', function () {
                            $(this).css('background-color', '#ffc76c');
                            $(this).css('border', '1pt solid #ffaa22');
                        });
                        break;
                }
            }
        }
    });
}

if (outerDebug) console.log('about to load css');

appendStyleSheet('/files/muse-static/scottgood/css/ProjectMuse.css');
appendStyleSheet('/files/muse-static/scottgood/css/ConnectionsBootstrap.css');
appendStyleSheet('/files/muse-static/scottgood/css/tether.min.css');

if (outerDebug) console.log('css loaded, getting Launcher.js');

loadScript('/files/muse-static/scottgood/js/Launcher.js', function () {
    // Launcher.js is used only to get the load timing right
    if (outerDebug) console.log('Launcher.js file loaded successfully');
});  

if (outerDebug) console.log('past load sequence now...');
