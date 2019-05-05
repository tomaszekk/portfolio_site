# Front End Web Developer
---
#### _Three Stage Course Material Project - Restaurant Reviews_

## Project Overview:

For the **Restaurant Reviews** projects I converted a static webpage to a mobile-ready web application, provide caching for offline and implement web accessibility.

### Specification

Udacity has provided the code for a restaurant reviews website. Based on the info:
*The code has a lot of issues. It’s barely usable on a desktop browser, much less a mobile device. It also doesn’t include any standard accessibility features, and it doesn’t work offline at all. Your job is to update the code to resolve these issues while still maintaining the included functionality.*

My role as developer is provide:
- MapBox API integration with the app
- convert static page to a responsive webpage
- implement web accessibility features
- provide ServiceWorker for cache page for offline purporses


### Installation

1. Download or clone this project from my repository.

2. You have to serve a up simple HTTP server for the site files on your local computer. Recommend is Python.

    * In a terminal, check the version of Python you have: `python -V`. If you have Python 2.x, spin up the server with `python -m SimpleHTTPServer 8000` (or some other port, if port 8000 is already in use.) For Python 3.x, you can use `python3 -m http.server 8000`. If you don't have Python installed, navigate to Python's [website](https://www.python.org/) to download and install the software.
   * Note -  For Windows systems, Python 3.x is installed as `python` by default. To start a Python 3.x server, you can simply enter `python -m http.server 8000`.

2. With your server running go to the site: `http://localhost:8000`.

3. To use a map you need a Mapbox and Leaflet.js libraries. See *Annotation to Leaflet.js and Mapbox*.


### Folders structure

The main file is index.html as you run app.
Each restaurant has its own page - restarurant.html which is dynamically load from a DB.
The DB is a file in folder: "/data/restaurants.json".
All styling is in "/CSS" folder. The main file is "Style.css" which provide all styling. For RWD purposes there are to files: "responsive.css" for "index.html" and "responsive_restaurant.css" for restaurants' page.

All logic is "/js" folder apart one file "sw.js" which is in main folder as Python doesnt provided secure layer HTTPS for ServiceWorker:((
"Main.css" is for serving data from DBHelper, manages "index.html" and registers ServiceWorker (SW).
"restaurant_info.js"  is for serving restaurant web HTML.
"dbhelper.js" is for data - providing data, filtering, fetching and generally provide data in a specific way.


## Annotation to Leaflet.js and Mapbox:

This repository uses [leafletjs](https://leafletjs.com/) with [Mapbox](https://www.mapbox.com/). To run functionality you used`<your MAPBOX API KEY HERE>` with a token from [Mapbox](https://www.mapbox.com/). Mapbox is free to use.

### Note about Author

The page was made by Tomasz Konopka, May 2019.
