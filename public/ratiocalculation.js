
define(function (require) {
	require('plugins/ratiocalculation/ratiocalculation.less');
 	require('plugins/ratiocalculation/ratiocalculationController');
	require('ui/registry/vis_types').register(ratiocalculationProvider);

	// The provider function, which must return our new visualization type
	function ratiocalculationProvider(Private) {
		var TemplateVisType = Private(require('ui/template_vis_type/TemplateVisType'));
		// Include the Schemas class, which will be used to define schemas
		var Schemas = Private(require('ui/Vis/Schemas'));

		// Describe our visualization
		return new TemplateVisType({
			name: 'trRatioCalculation', // The internal id of the visualization (must be unique)
			title: 'RatioCalculation', // The title of the visualization, shown to the user
			description: 'Easy ratio calculation and visualization: this plugin computes for a filer or a filter the ratios between aggregation results and number of hits. Results are presented as percentages, rounded to 2 decimals.', // The description of this vis
			icon: 'fa-calculator', // The font awesome icon of this visualization
			template: require('plugins/ratiocalculation/ratiocalculation.html'), // The template, that will be rendered for this visualization
			params: {
        		defaults: {
          			handleNoResults: true,
          			valueSize: 40,
          			labelSize : 20,
  		            bgColor: 'white',
          			fontColor: 'black'
        		},
        		editor: require('plugins/ratiocalculation/ratiocalculation_params.html')
      		},
			// Define the aggregation your visualization accepts
			schemas: new Schemas([
			{
				group: 'metrics',
				name: 'numerator',
				title: 'Numerator',
				min: 1,
				max: 1,
				aggFilter: ['count']
			},
			{
				group: 'buckets',
				name: 'denominator',
				title: 'Denominator',
				min: 1,
				max: 1,
				aggFilter: ['filters', 'terms']
			},
			])
		});
	}

	// export the provider so that the visType can be required with Private()
  	return ratiocalculationProvider;
});