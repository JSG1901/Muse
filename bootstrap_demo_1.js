// bootstrap_demo_1.js

if(typeof(dojo) != "undefined") {
	dojo.place(
			'<link rel="stylesheet" type="text/css" href="/files/muse-static/dcacy/homepage_demo/style.css"></link>',
			dojo.doc.head,
			'last');

    require("dojo/ready", function(ready){
      var savedView = document.getElementById('savedView');
      var navMenu = savedView.parentNode.parentNode;
      var newDiv = document.createElement('div');
      newDiv.className = 'lotusMenuSection';
      newDiv.innerHTML = "Hello World!";
      newDiv.innerHTML += '<img src="/files/muse-static/dcacy/homepage_demo/images/watson.gif">';
      navMenu.appendChild(newDiv);
    });

}