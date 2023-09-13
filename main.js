const { app, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");

let mainWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, ".next/server/pages/index.html"),
      protocol: "file:",
      slashes: true,
    })
  );
});
