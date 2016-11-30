## Mumbai Tourism
##### Neighborhood map project for Udacity FEND Nanodegree

### About project
The website displays all the famous places worth visiting in Mumbai and their information.

### Getting started

#### Download
* Fork this repository.
* Clone it to ur PC.

#### Create local server
1. You can run a local server

  ```bash
  $> cd /path/to/your-project-folder
  $> python -m SimpleHTTPServer 8080
  ```
2. Open a browser and visit localhost:8080

#### Using Grunt
* This project is built with grunt to minify and optimize html, js and css files.
* Assuming that the Grunt CLI has been installed, it's very easy to start working with Grunt in this project:
  1. Change to the project's root directory.
  2. Install project dependencies with ```npm install```.
  3. Run Grunt with ```grunt``` command.
* If you are using grunt for the first time, please visit: [http://gruntjs.com/getting-started](http://gruntjs.com/getting-started)

### How to use
* Map is displayed with all the famous places worth visiting in **Mumbai**.
* Click on any marker to display its information and a relevant Wikipedia link.
* Use the filter bar at the side (can be accessed by clicking *hamburger icon* at the top left in smaller devices) to filter out the markers.
* Type in the textbox and hit ```search``` to filter.
* To reset the map, click on the reset button.

### Developer information
* *Knockout.js* is used for bindings as it is MVVM.
* *Bootstrap* is used for grid systems.
* *jQuery* is used for ajax requests.
* *Google Maps api* and *Wikipedia api* is used in this project both loaded asynchronously.
* Error handling is done gracefully so that user can realize that there is a problem.
* As *grunt* is used, the ```dist``` directory contains minified code and the ```src``` directory contains original code.
* The project is responsive to any screen sizes.
