# Where is the grass greener?

Weather specific suggestions on where to go within a radius of current or selected location. Is the grass greener another place? 

[![Netlify Status](https://api.netlify.com/api/v1/badges/e4fa8399-b7e7-4cd5-b898-fd82dd1b34a2/deploy-status)](https://app.netlify.com/sites/greenergrass/deploys)


### TODO:
Data:
- Implement Entur.no API to get public transportation routes in Norway.
- Add ebb and tide information?

UI/UX:
- Remove layers, markers etc. when new search (place, profile of transport and time) is run
- Show information somewhere static
- Hide weather icons on zoom out [might have to switch to marker layer, to be able to do this.]
- Add loading logic when quering data from APIs

Functional:
- Chain axios calls?

### Fixed:
- Add night mode
- Calculate sunset for a given location and time
- Implement Overpass API to find relevant places within the shape area (eg. beaches or mountain, forest etc)
- Zoom the map to fit the isochrone shape (zoom in/out after the bbox of the shape)
- Isochrone: color the shape in levels? [found solution - need to redo it]
- Get bounding box or just use polygon from Isochrone shape to use as shape to query the MET API from
- Implement Turf.js to be able to select points within the shape to query from (to minimize amount of queries)
- Add a to/from shortest path when clicking on a location
- Get place name or address based on lat,lng? 
- Get lat/lng from a marker and calculate the shortest trip (how to access the markers info?)
- Implement a vueistic way for handling UI, triggering events etc
- Prompt user for location on load

## Documentation of external APIs and libraries

- Isochrone: https://docs.mapbox.com/api/navigation/#isochrone
- https://joeyklee.github.io/geosandbox/hello-turf.html#section10

#### Ebb and tide
https://api.sehavniva.no/tideapi_no.html

https://api.sehavniva.no/tideapi.php?lat=68.79889&lon=16.53139&fromtime=2019-12-28T00%3A00&totime=2020-01-29T00%3A00&datatype=tab&refcode=cd&place=&file=&lang=nb&interval=10&dst=0&tzone=&tide_request=locationdata

https://api.sehavniva.no/tideapi.php?lat=68.79889&lon=16.53139&fromtime=2019-12-28T00%3A00&totime=2020-01-29T00%3A00&datatype=tab&refcode=cd&place=&file=&lang=nb&interval=10&dst=0&tzone=0&tide_request=locationdata

http://api.sehavniva.no/tideapi.php?lat=68.79889&lon=16.53139&fromtime=2019-12-28T00%3A00&totime=2020-01-29T00%3A00&datatype=tab&refcode=cd&place=&file=&lang=nb&interval=60&dst=0&tzone=0&tide_request=locationdata


#### Overpass 

"leisure"="nature_reserve"
"leisure"="park"
"leisure"="swimming_pool"
"natural"="wood" (big)

Most relevant:
"sport"="swimming"


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
