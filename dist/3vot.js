(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
require("3vot")(require("./package"));
},{"./package":4,"3vot":2}],2:[function(require,module,exports){
function init(t,e){e||(e={}),_3vot.initOptions=e,_3vot["package"]=t,_3vot.user_name=t.threevot.user_name,_3vot.endpoint=e.endpoint||"http://backend.3vot.com/v1",_3vot.frontpoint=e.frontpoint||"http://daulau2emlz5i.cloudfront.net",_3vot.domain="",_3vot.path=t.name,_3vot.host=_3vot.frontpoint.split("://")[1],_3vot.el=document.getElementById("_3vot_"+t.name),_3vot.app=t.name,loadFile(fileToLoad())}function fileToLoad(){var t=_3vot["package"].threevot.entries||_3vot["package"].threevot.platforms||_3vot["package"].threevot.screens,e="index",o=document.documentElement.clientWidth;for(entry in t){var n=entry.split("-");o>parseInt(n[0])&&o<=parseInt(n[1])&&(e=t[entry])}return e?e:console.error("Could not determine a file to load from package.json threevot.screens. 3VOT will load index.js please fix package.json of your app.")}function loadFile(t){if(!t)return!1;var e=document.createElement("script");e.type="text/javascript",e.src="{3vot}/"+t+".js?"+_3vot.unique_query_string,document.getElementsByTagName("head")[0].appendChild(e)}window=window||{location:{hostname:"3vot.com",protocol:"http"}},window._3vot={el:null,"package":{},initOptions:{},utils:require("./utils"),device:"",width:"",height:"",user_name:"",unique_query_string:"unique_domain="+window.location.protocol+window.location.hostname},module.exports=init;
},{"./utils":3}],3:[function(require,module,exports){
module.exports={getCurrentUrl:function(){var e=window.location.href;return lastIndex=e[e.length-1],"/"!=lastIndex&&(e+="/"),e},replaceAll:function(e,n,r){return e.replace(new RegExp(n.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"),"g"),r)}};
},{}],4:[function(require,module,exports){
module.exports={
	"name": "test_leaflet",
	"description": "",
	"version": "0.0.22",
	"threevot": {
		"version": "22",
		"screens": {
			"0-320": "index",
			"320-900": "index",
			"900-1200": "index",
			"1200-5000": "index"
		},
		"extensions": [
			".coffee",
			".eco",
			".html"
		],
		"transforms": [
			"browserify-eco",
			"brfs",
			"uglifyify"
		],
		"external": {},
		"gitDependencies": {},
		"paths": {
			"sourceBucket": "source.3vot.com",
			"productionBucket": "3vot.com"
		},
		"uploadSource": true,
		"distFolder": "dist",
		"uploadApp": true,
		"build": true,
		"pathsToExclude": [
			"node_modules"
		]
	},
	"dependencies": {
		"3vot": "0.1.4",
		"insert-css": "0.2.0",
		"3vot-model": "0.1.0",
		"brfs": "0.0.8",
		"browserify-eco": "~0.2.4",
		"uglifyify": "~2.0.0"
	}
}
},{}]},{},[1])