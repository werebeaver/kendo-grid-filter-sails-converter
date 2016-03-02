# kendo-grid-filter-sails-converter
Converter `kendo ui grid` filter to `sails.js` find query

Example of use:
    var f  = new Filtering();
    filter = f.resolveFilter(sourceFilter); // sourceFilter - kendo.data.DataSource.filter
                                            // filter compatible with sails.js Model.find(filter)
