const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadFile('index.html');

  // Criando o menu
  const template = [
    {
      label: 'Game Store',
      submenu: [
        { label: 'Settings', click: () => console.log('Settings clicked') },
        { type: 'separator' },
        { label: 'Exit', role: 'quit' },
      ],
    },
    {
      label: 'Library',
      submenu: [
        { label: 'Games' },
        { label: 'Software' },
        { label: 'Music' },
        { label: 'Tools' },
      ],
    },
    {
      label: 'Store',
      submenu: [
        { label: 'Featured' },
        { label: 'Top Sellers' },
        { label: 'New Releases' },
      ],
    },
    {
      label: 'Friends',
      submenu: [
        { label: 'View Friends List' },
        { label: 'Chat' },
      ],
    },
    {
      label: 'Help',
      submenu: [
        { label: 'Support' },
        { label: 'System Information' },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
