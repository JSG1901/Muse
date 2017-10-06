var jQInsert = document.createElement('script');
jQInsert.src = 'https://code.jquery.com/jquery-latest.js';
jQInsert.type = 'text/javascript';
document.getElementsByTagName('body')[0].appendChild(jQInsert);

console.log('JSG -- Hello World!');
//console.log('JSG - lconn is', lconn);
console.log('JSG - username is', lconn.homepage.userName);

if (typeof (dojo) != "undefined") {
    dojo.place('<script src="https://code.jquery.com/jquery-latest.js"></script>', dojo.doc.head, 'last');
    dojo.place('<script src="initialLoad.js"></script>', dojo.doc.head, 'last');

    require("dojo/ready", function (ready) {
        /*
        var savedView = document.getElementById('savedView');
        var navMenu = savedView.parentNode.parentNode;
        var newDiv = document.createElement('div');
        console.log('running bootstrap_demo_1.js code...');
        newDiv.className = 'lotusMenuSection';
        newDiv.innerHTML = "Hello World!";
        //newDiv.innerHTML += '<img src="/files/muse-static/dcacy/homepage_demo/images/watson.gif">';
        navMenu.appendChild(newDiv);
        
        jQuery('.shareSome-desc .shareSome-title').html('THIS WAS INSERTED');
        
        var hasJQuery = jQuery('body');
        if (hasJQuery) {
            console.log('YES, this has jQuery');
        } else {
            console.log('NOPE. No jQuery as far as I can tell.');
        }
    });
    */

}