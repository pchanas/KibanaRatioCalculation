let _ = require('lodash');
// Create an Angular module for this plugin
var module = require('ui/modules').get('ratiocalculation');


module.controller('RatiocalculationController', function($scope, Private) {

	var filterManager = Private(require('ui/filter_manager'));

	$scope.filter = function(tag) {
		// Add a new filter via the filter manager
		filterManager.add(
			// The field to filter for, we can get it from the config
			$scope.vis.aggs.bySchemaName['numerator'][0].params.field,
			// The value to filter for, we will read out the bucket key from the tag
			numerator.value,
			// Whether the filter is negated. If you want to create a negated filter pass '-' here
			null,
			// The index pattern for the filter
			$scope.vis.indexPattern.title
		);
	};

    const tabifyAggResponse = Private(require('ui/agg_response/tabify/tabify'));
    const ratios = $scope.ratios = [];
    const localNumerator = $scope.localNumerator = 0

    function isInvalid(val) {
      return _.isUndefined(val) || _.isNull(val) || _.isNaN(val);
    }

    $scope.processTableGroups = function (tableGroups, hitsCount) {
    	console.log("tableGroups : ", tableGroups)
    	tableGroups.tables.forEach(function (table) {
    		console.log("table : ", table)
    		table.rows.forEach(function (row, i) {
    			console.log("row : ", row)
    			ratios.push({
    				label: row[0],
    				value: (100 * row[1] / hitsCount).toFixed(2) + " %"
    			});
    		});
    	});
    };

    $scope.$watch('esResponse', function (resp) {
      if (resp) {
      	console.log(resp)
        ratios.length = 0;
        $scope.processTableGroups(tabifyAggResponse($scope.vis, resp), resp.hits.total);
      }
    });
});



