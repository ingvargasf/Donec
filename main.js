const electron = require("electron");
const {app, BrowserWindow} = electron;
const path = require("path");
const url = require("url");

var server = require('./server/app');
var Constants = require("./server/helpers/Constants.js");
var Helper = require("./server/helpers/helper");
var app_config = './server/app.json';
function loadConfig(callback){
	Helper.readFile(app_config)
	.then(function(obj){
		// Helper.writeFile(app_config,obj);
		if(callback!=undefined){
			callback(obj);
		}
	},function(err){
	    if(err){
	        throw err;
	    }
		// Helper.writeFile(app_config,obj);
		if(callback!=undefined){
			callback({});
		}
	});
}

let win

function createWindow(){
	win = new BrowserWindow({
		width:800,
		height:600
	});
	win.loadURL(url.format({
		pathname:path.join(__dirname,'public/index.html'),
		protocol:'file',
		slashes:true
	}));
}
app.on("ready",function(){

	loadConfig(function(config){
		server(config)
		.then(function(){
			console.log("Aplicación Iniciada.",__dirname)
			createWindow();
		},
		function(err){
		    
		    if(err){
		        throw err;
		    }
			
		});
	});
});
