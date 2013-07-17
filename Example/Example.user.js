//(function () {
// ==UserScript==
// @name        Example
// @description example
// @include http://www.murloc.org/*
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
 alert("example"+txt);
}

   alert("Hello world");
   GM_registerMenuCommand("Hello, world! (example)", example, "e", "shift alt", "w");
//};

