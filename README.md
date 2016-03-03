# kendo-grid-filter-sails-converter

Converter `kendo ui grid` filter to `sails.js` find query

[![npm version](https://badge.fury.io/js/kendo-grid-filter-sails-converter.svg)](https://badge.fury.io/js/kendo-grid-filter-sails-converter)

## Installation: &nbsp;
```sh
# Get the latest stable release
npm install kendo-grid-filter-sails-converter --save
```
## Example of use: &nbsp;
```sh
# Initialize converter
var f  = new Filtering();
var filter = f.resolveFilter(sourceFilter); // sourceFilter - kendo.data.DataSource.filter
                                            // filter compatible with sails.js Model.find(filter)
```  
