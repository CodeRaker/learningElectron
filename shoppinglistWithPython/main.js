//https://www.techiediaries.com/python-electron-tutorial/
// Uses the python shell module - npm install --save python-shell 
// https://www.npmjs.com/package/python-shell
// https://medium.com/heuristics/electron-react-python-part-2-architecture-d49634521efd

const electron = require('electron');
const url = require('url');
const path = require('path');
const {PythonShell} = require('python-shell');

// ipcMain is used to catch data from the window's ipcRenderer
const {app, BrowserWindow, Menu, ipcMain} = electron;

// Set ENV
// Production removes devtools
//process.env.NODE_ENV = 'production';

let mainWindow;
let addWindow;

// Listen for app to be ready
app.on('ready', createWindow)

// Run Python script 
runpy();

//let shell = PythonShell.run("hello.py", null, function(err, results) {
// if (err) throw err;
 //console.log('hello.py finished.');
 //console.log('results', results);
// shell.receive('results', function(results){
// 	mainWindow.webContents.send('data', results);
// });
//});
//let shell = new PythonShell('hello.py', function(err, results){
//	shell.receive('results', function(results){
//		mainWindow.webContents.send('data', results);
//	});
//});
//shell.receive('data', function(data){
//	mainWindow.webContents.send('data', data);
//});

function runpy(){
	let pyshell = new PythonShell('hello.py');
	pyshell.on('message', function (message) {
	// received a message sent from the Python script (a simple "print" statement)
	//console.log(message);
	mainWindow.webContents.send('results', message);
	});
}

// Create Main Window
function createWindow(){
	// Create new window
	mainWindow = new BrowserWindow({
		// From Electron 5 and up, webPreferences are necessary for scripts in windows
		webPreferences: { 
            nodeIntegration: true
        }
		});
		// Load html into window
		mainWindow.loadURL(url.format({
			pathname: path.join(__dirname, 'mainWindow.html'),
			protocol: 'file:', 
			slashes: true
		}));
		// Quit app when closed
		mainWindow.on('closed', function(){
			app.quit();
		});

		// Build menu from template
		const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
		// Insert menu
		Menu.setApplicationMenu(mainMenu);
}

// Handle createAddWindow
function createAddWindow(){
	// Create new window
	addWindow = new BrowserWindow({
		width: 300,
		height: 200,
		title: 'Add Shopping List Item',
		// From Electron 5 and up, webPreferences are necessary for scripts in windows
		webPreferences: {
            nodeIntegration: true
        }
		});
		// Load html into window
		addWindow.loadURL(url.format({
			pathname: path.join(__dirname, 'addWindow.html'),
			protocol: 'file:',
			slashes: true
		})); 
		// Garbage collection
		addWindow.on('close', function(){
			appWindow = null;
		});

}

// Catch item:add
ipcMain.on('item:add', function(e, item){
	// console.log(item)
	mainWindow.webContents.send('item:add', item);
	addWindow.close();
});

// Create menu template
const mainMenuTemplate = [
	{
		label: 'File',
		submenu: [
			{
				label: 'Add Item',
				click(){
					createAddWindow();
				}
			},
			{
				label: 'Clear Items',
				click(){
					mainWindow.webContents.send('item:clear');
				}
			},
			{
				label: 'Quit',
				// Key Shortcut - if we are on Mac then CMD+Q else CTRL+Q
				accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
				click(){
					app.quit();
				}
			}
		]
	}
];

// If Mac, add empty object to beginning of mainMenuTemplate
//if(process.platform == 'darwin'){
//	mainMenuTemplate.unshift({});
//}

// Add developer tools item if not in production
if(process.env.NODE_ENV !== 'production'){
	mainMenuTemplate.push({
		label: 'Developer Tools',
		submenu: [
			{
				label: 'Toggle DevTools',
				accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
				click(item, focusedWindow){
					focusedWindow.toggleDevTools();
				}
			},
			{
				role: 'reload'	
			}	
		]
	});
}