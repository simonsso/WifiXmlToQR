//(function () {
// ==UserScript==
// @name        WifiXmlToQR
// @description WifiXmlToQR
// @include https://lastpass.com/export.php?&hp=0
// @require qrcodejs/qrcode.js
// @namespace     http://localhost.localdomain
// @version     1
// ==/UserScript==

//
// WiFi configuration to QR code tool
// Dual functionality:
// Either as grease monkey user script
//
// or as stand alone website.
//


function wpa_encoding_type(rawstring){
   //Network types in xml are have other name in wifi object type
	if(rawstring=="WPA2PSK"){
		return("WPA")
	}
	return (rawstring);
}

// string hexstring(string)
// return hexadecimal representation of a string in a string.
//
function hexstring(rawstring){
	var buffer="";
	var i=0;
	for(i=0; i<rawstring.length; i++){
		buffer=buffer+rawstring.charCodeAt(i).toString(16);
	}
	return(buffer);
}

function WifiXmlToQR(){
   var txt="xxx";
   if (window.getSelection) {
      txt = window.getSelection();
   }
   else if (document.getSelection) {
      txt = document.getSelection();
   }
   else if (document.selection) {
      txt = document.selection.createRange().text;
   }
   // Selection is an object and needs to be transformed into String before
   // regexp transformations...
   var txt2=txt.toString();
   txt=txt2.replace(/""/g,"\"");

   imagediv = document.getElementById("testcode");
	if(imagediv){
      imagediv.style.visibility = "hidden";
	}

   //alert(datastring);
	datastring=WifiXmlToMeCard(txt);
   genqr(datastring);

}
function WifiXmlToMeCard(txt){
   // Datastring is generated here

   var z=parseXml(txt);
   var aa=z.getElementsByTagName("SSIDConfig")[0];
   var datastring="WIFI:"
   +"S:"+z.getElementsByTagName("SSIDConfig")[0].getElementsByTagName("name")[0].textContent+";"
   +"P:"+(z.getElementsByTagName("security")[0].getElementsByTagName("keyMaterial")[0].textContent)+";"
   +"T:"+wpa_encoding_type(z.getElementsByTagName("security")[0].getElementsByTagName("authentication")[0].textContent)+";"
   ;


	return datastring;
}

function genqr(datastring,options){
   mainDoc = top.document.body;
	options=options || {};

	var width = options.width || 500;
	var height = options.height || 500;

   var imagediv = document.getElementById("testcode");

	if(! imagediv){
      mainDoc.innerHTML = "<div id=outer_frame><table id=outertable border=0><tr><td><div id=testcode></div></td></tr><tr><td id=qrdatasubtitle></td></tr></table></div>" + mainDoc.innerHTML;

      var myouter = document.getElementById("outer_frame");
	   myouter.style.position="fixed";
	   myouter.style.right=0;
      myouter = document.getElementById("outertable");
	   myouter.style.border="30px solid white";
      imagediv = document.getElementById("testcode");
      imagediv.style.visibility = "visible";
	}
   document.getElementById("testcode").innerHTML="";
	var oQRCode = new QRCode("testcode", {
	     text : datastring,
	     width : width,
	     height : height,
        correctLevel : QRCode.CorrectLevel.M
	})
   imagediv.style.visibility = "visible";
}


//Main
//
   if (typeof window.DOMParser != "undefined") {
	   parseXml = function(xmlStr) {
		return ( new window.DOMParser() ).parseFromString(xmlStr, "text/xml");
	   };
   }else{
   	alert("Did not find xml parser");
   };

   GM_registerMenuCommand("Convert wifi xml string to qr code", WifiXmlToQR, "e" );
   // uncoment for debugging 
   // alert("All systems loaded");
// vim:ts=3
// }
