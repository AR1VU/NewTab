
# NewTab

A new ***🔹SUPERCHARGED🔹*** New Tab Experience for your browser

## Demo

![Demo](/README/demo.png)

## Features

- **Search Bar** ('/' keybind for quick select | Also works for URLs)
- **6 Bookmarks** (Big Icons)
- **4 Shortcuts** (Small Icons)
- **Greeting** (Based on time of the day)
- **Upto 5 Backgrounds** (Reload Background with Alt+R)
- **Date / Day / Time**
- **Weather** (API Key Required)
- **Battery Information**
- **Connection Information**
- **Notepad** (Ctrl+Alt)


## Installation and Setup

1) Download the files through `Code < Download ZIP` or
```bash
  git clone https://github.com/ar1vu/newtab.git
```
2) Unzip the file / Open folder.

3) Open the `config.json` file in Notepad (Any text editor).

> ⚠️ **NOTE**: Do not modify any code unless you know what you're doing, only modify the config file

4) Login/Signup on [OpenWeather](https://openweathermap.org/).

5) Go to [OpenWeather API](https://home.openweathermap.org/api_keys) and copy the API Key (or generate one if it is already not there).

6) Paste the API Key in the `weatherAPIKey` tag in the config file

7) Enter you're desired city in the `city` tag

8) For shortcuts, replace the `shortCutIcon` tag with the URL of the icon of the shortcut (this is for the bigger icons)

9) Replace the `shortCutLink` tag with the URL of the website you want as the shortcut

10) Repeat this for all 6 shortcuts and bookmarks (**NOTE**: Bookmarks have smaller icons)

11) For the Backgrounds, enter the URL of the background image in `bg1, bg2...`

Once that is done, you have successfully setup the configuration file and can activate the extention, to do that...

1) Open the Extentions Page (`chrome://extensions`)
2) Enable `Developer Mode / Developer Tools`
3) Select `Load Unpacked`
4) Select the folder containing the extention files 
You may be asked if you want to keep the new tab or revert to the orginal, select `Keep Tab`

Great! Your NewTab has been successfully setup! 🥳

You can now do small customizations like entering your name in the `[Enter Name]` box (Make sure to click Enter to save the name)

> **Note**: You may find errors on the brower's extentions page if the Weather API is either incorrect or unavailable


## Roadmap

- Adding to the Chrome WebStore
- More widgets and customization


## Tech Stack

- HTML
- CSS
- JavaScript


## Authors

[@AR1VU](https://www.github.com/AR1VU)


## Support

For support, email ar1vu@outlook.com

![Logo](https://raw.githubusercontent.com/AR1VU/resources/bad1f21a51380afa390ca8192f629aa4722e5795/white%20logo.png)

