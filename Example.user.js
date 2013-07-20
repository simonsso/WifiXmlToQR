//(function () {
// ==UserScript==
// @name        Example
// @description example
// @include http://www.murloc.org/alts.html
// @include http://www.murloc.org/
// @namespace     http://localhost.localdomain
// @version     1
// ==/UserScript==

//GM_log("hello world");
//GM_openInTab("http://www.murloc.org");


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

function example(){
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

   var z=parseXml(txt);
   var aa=z.getElementsByTagName("SSIDConfig")[0];
   var datastring="WIFI:"
   +"S:"+z.getElementsByTagName("SSIDConfig")[0].getElementsByTagName("name")[0].textContent+";"
   +"P:"+hexstring(z.getElementsByTagName("security")[0].getElementsByTagName("keyMaterial")[0].textContent)+";"
   +"T:"+z.getElementsByTagName("security")[0].getElementsByTagName("authentication")[0].textContent+";"
   +";";

   // Datastring is generated here
   alert(datastring);

   // use external QR service to get an image
   mainDoc = top.document.body;
   image = "<div  id='imager' style='position:absolute;top:0px;left:0px;z-index:1000;border:black solid 10px;'><a href='#' onclick='javascript:imager=document.getElementById(\"imager\");imager.innerHTML=\"\"; ' ><div  style='border:white solid 10px;'><img src='http://qrcode.kaywa.com/img.php?s=8&d=" +   datastring + "' alt='qrcode' id='qrcodethingy' style='border:black solid 0px;'/></div></a></div>";
	
   mainDoc.innerHTML = image + mainDoc.innerHTML;
   imagediv = document.getElementById("imager");
	
   if (imagediv){
      imagediv.style.visibility = "visible";				
   }
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

   GM_registerMenuCommand("Convert wifi xml string to qr code", example, "e" );
   // uncoment for debugging 
//   alert("All systems loaded");

//};
