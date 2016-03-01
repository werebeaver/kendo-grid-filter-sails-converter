/**
 *
 * kendo-grid-filter-sails-converter
 * @desc Converter `kendo ui grid` filter to `sails.js` find query
 *
 **/

/**
 *
 * Operators
 * @desc Available operators
 *
 **/
var operators = {
    "eq": "",
    "gt": ">",
    "gte": ">=",
    "isnotnull": "!",
    "isnull": "",
    "lt": "<",
    "lte": "<=",
    "neq": "!",
    "contains": "contains",
    "doesnotcontain": "like",
    "endswith": "endsWith",
    "isempty": "",
    "isnotempty": "!",
    "startswith": "startsWith"
};

/**
 *
 * KendoGridFilterConverter()
 * @desc Main entry point
 *
 **/
function KendoGridFilterConverter() {

    this.resolveFilter = function (filter) {
        if (!filter || !filter.logic || !filter.filters)
            throw 'The filter is not specified or an invalid format filter';

        if (filter.filters.length == 0)
            return null;

        var finder,
            where = {},
            logic = filter.logic;

        where[logic] = [];

        for (var i = 0; i < filter.filters.length; i++) {
            if (filter.filters[i].logic) {
                var a = this.resolveFilter(filter.filters[i]);
                if (!a)
                    continue;

                where[logic].push(a);

            } else
                where[logic].push(addSimpleCondition(filter.filters[i]));
        }


        if (where.and) {
            _.each(where.and, function (val) {
                _.merge(where, val);
            });

            delete where.and;
        }

        return where;
    };

    function addSimpleCondition(filter) {
        var item = translateFieldCondition(filter),
            toInsert = {};

        if (item.name == '')
            toInsert[filter.field] = item.value;
        else {
            toInsert[filter.field] = {};
            toInsert[filter.field][item.name] = item.value;
        }

        return toInsert;
    }

    function translateFieldCondition(filter) {
        var item = {},
            value = filter.value;

        item.name = operators[filter.operator];

        if (filter.operator == 'isnull' || filter.operator == 'isnotnull')
            value = null;
        else if (filter.operator == 'isempty' || filter.operator == 'isnotempty')
            value = '';
        else if (filter.operator == 'contains' || filter.operator == 'doesnotcontain')
            value = '%' + filter.value + '%';
        else if (filter.operator == 'startswith')
            value = filter.value + '%';
        else if (filter.operator == 'endswith')
            value = '%' + filter.value;

        item.value = value;

        return item;
    }
}

module.exports = KendoGridFilterConverter;
