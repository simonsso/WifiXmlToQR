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
   alert(txt);
   var txt2=txt.toString();
   txt=txt2.replace(/""/g,"\"");
   alert(txt);
   var z=parseXml(txt);
   var datastr=z.getElementsByTagName("SSID");
   var aa=z.getElementsByTagName("SSIDConfig")[0];
   var aaa=aa.childNodes.item("SSID");
   var aaa=aa.childNodes.item("SSID").childNodes("hex");
   alert(aa.childNodes("SSID").childNodes("hex").textContent);
   return;
   mainDoc = top.document.body;
   image = "<div  id='imager' style='position:absolute;top:0px;left:0px;z-index:1000;border:black solid 10px;'><a href='#' onclick='javascript:imager=document.getElementById(\"imager\");imager.innerHTML=\"\"; ' ><div  style='border:white solid 10px;'><img src='http://qrcode.kaywa.com/img.php?s=8&d=" +   txt + "' alt='qrcode' id='qrcodethingy' style='border:black solid 0px;'/></div></a></div>";
	
   mainDoc.innerHTML = image + mainDoc.innerHTML;
   imagediv = document.getElementById("imager");
	
   if (imagediv){
      imagediv.style.visibility = "visible";				
   }
}
   if (typeof window.DOMParser != "undefined") {
	   parseXml = function(xmlStr) {
		return ( new window.DOMParser() ).parseFromString(xmlStr, "text/xml");
	   };
   }else{
   	alert("Did not find xml parser");
   };

   GM_registerMenuCommand("Hello, world! (example)", example, "e" );
   // uncoment for debugging 
   alert("All systems loaded");
   var txt="abrak\"\"i123\"\"adabra";
   txt=txt.replace(/""/g,"\"");
   alert("and"+txt);
//};
