// bootstrap_demo_1.js
var debug = true;
if (debug) console.log("Beginning bootstrap_demo_1.js file");
//document.getElementsByTagName('body')[0].style.backgroundColor = 'orange';


if(typeof(dojo) != "undefined") {
	dojo.place(
			'<link rel="stylesheet" type="text/css" href="/files/muse-static/scottgood/css/ProjectMuse.css"></link>',
			dojo.doc.head,
			'last');
    dojo.place(
			'<link rel="stylesheet" type="text/css" href="/files/muse-static/scottgood/css/ConnectionsBootstrap.css"></link>',
			dojo.doc.head,
			'last');
    /*
    require("dojo/ready", function(ready){
      var savedView = document.getElementById('savedView');
      var navMenu = savedView.parentNode.parentNode;
      var newDiv = document.createElement('div');
        console.log('running bootstrap_demo_1.js code...');
      newDiv.className = 'lotusMenuSection';
      newDiv.innerHTML = "Hello World!";
      //newDiv.innerHTML += '<img src="/files/muse-static/dcacy/homepage_demo/images/watson.gif">';
      navMenu.appendChild(newDiv);
    });
    */
}


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

var knownPageType;
function getPageType() {
    var debug = false;
    if (knownPageType) return knownPageType;
    // blog

    if (jQuery('body.blog').length > 0) {
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

    }
    // wiki
    if (jQuery('body .wikiHeader').length > 0) {
        knownPageType = 'wiki';
        if (debug) console.log("it's a wiki");
        return true;
    }
   // activity
    if (jQuery('body div#activitypage').length > 0) {
        knownPageType = 'activity';
        if (debug) console.log("it's an activity");
        return true;
    }
    // files
    if (jQuery('body div.filesListFilled').length > 0) {
        knownPageType = 'files';
        if (debug) console.log("it's files");
        return true;
    }


    // community
    if (jQuery('body div#contentArea.lconnCommLanding').length > 0) {
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
    var link = window.document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = cssURL;
    document.getElementsByTagName("HEAD")[0].appendChild(link);
    if (debug) console.log("Finished appending css.");
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

/* ------ actual stuff happening -------*/


appendStyleSheet('https://rawgit.com/JSG1901/Muse/master/ProjectMuse.css'); // universal css settings
appendStyleSheet('https://rawgit.com/JSG1901/Muse/master/ConnectionsBootstrap.css'); // Bootstrap customized for Connections environment (and extended to smaller screen sizes)

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
                    appendStyleSheet('https://rawgit.com/JSG1901/Muse/master/blogs.css');
                    jQuery.initialize(".lotusui30_layout .lotusMain .lotusContent", function () {
                        $(this).css("margin-left", '');
                    });
                    break;
                case 'ideation blog':
                    break;
                case 'blog listing':
                    appendStyleSheet('https://rawgit.com/JSG1901/Muse/master/blogs.css');
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
                    appendStyleSheet('https://rawgit.com/JSG1901/Muse/master/blogs.css');
                    jQuery.initialize(".lotusui30_layout .lotusMain .lotusContent", function () {
                        $(this).css("margin-left", '');
                    });
                    break;
            }
        }
    }
});



