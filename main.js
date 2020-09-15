const { app, BrowserWindow, Menu, globalShortcut } = require('electron');

// Environment (dev/production)
process.env.NODE_ENV = 'development';

const isDev = process.env.NODE_ENV !== 'production' ? true : false;
const isMac = process.env.NODE_ENV === 'darwin' ? true : false;
const isWin = process.env.NODE_ENV === 'win32' ? true : false;

let mainWindow;

function createMainWindow() {
	mainWindow = new BrowserWindow({
		title: 'ImageShrink',
		width: 500,
		height: 600,
		icon: `${__dirname}/assets/icons/Icon_256x256.png`,
		backgroundColor: 'white',
		//resizable: isDev,
	});

	//mainWindow.loadURL(`https://twitter.com`);
	//mainWindow.loadURL(`file://${__dirname}/app/index.html`);
	mainWindow.loadFile('./app/index.html');
}

app.on('ready', () => {
	createMainWindow();

	const mainMenu = Menu.buildFromTemplate(menu);
	Menu.setApplicationMenu(mainMenu);

	globalShortcut.register('CmdOrCtrl+R', () => mainWindow.reload());
	globalShortcut.register(isMac ? 'Command+Alt+I' : 'Ctrl+Shift+I', () =>
		mainWindow.toggleDevTools()
	);

	mainWindow.on('closed', () => (mainWindow = null));
});

const menu = [
	...(isMac ? [{ role: 'appMenu' }] : []),
	{
		role: 'fileMenu',
	},
];

app.on('window-all-closed', () => {
	if (!isMac) {
		app.quit();
	}
});

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createMainWindow();
	}
});
