jQuery(document).ready(function($) {
	
	$( '.saf-select select' ).select2();
	jQuery( ".saf-date" ).datepicker();
	
	
	$( 'select[name="saf-service-type"]' ).change(function(){
		
		const serviceType = $( 'select[name="saf-service-type"]' ).val();

		if ( serviceType == 2 ) {

			jQuery.get('https://dev-liquidmobile-api.azurewebsites.net/api/Facilities/Clinics', function(data){

				const selectOptions = data.map((i) => {
					let d = {};
					d.id = i.facilityId;
					d.text = i.facilityName;

					return d;
				});
				const emptyObj = { 
					id : '', 
					text : 'Select Facility', 
					disabled: true,
					selected: true,
				};

				selectOptions.push(emptyObj);
				console.log(selectOptions);
				$('select[name="saf-facility"]').select2({
					data: selectOptions,
				});
			})
		}


	});

	$('select[name="saf-facility"]').change(function(){
		
		const serviceType = $( 'select[name="saf-service-type"]' ).val();
		const facility = $( 'select[name="saf-facility"]' ).val();

		if ( serviceType == 2 ) {

			jQuery.get(`https://dev-liquidmobile-api.azurewebsites.net/api/Facilities/${facility}/OperationTypes/${serviceType}/Products`, function(data){

				//console.log(data);
				const selectFacilityOptions = data.map((i) => {
					let d = {};
					d.id = i.productId;
					d.text = i.productName;
					d.cat = i.productCategoryName;

					return d;
				});

				const groupByKey = (list, key) => list.reduce((hash, obj) => ({...hash, [obj[key]]:( hash[obj[key]] || [] ).concat(obj)}), {});

				const groupedSelectFacilityOptions = groupByKey(selectFacilityOptions, 'cat');
				const allCats = Object.keys(groupedSelectFacilityOptions);

				//console.log(allCats);
				const facilityOptions = allCats.map((cat) => {
					let groupedObject = {};
					groupedObject.text = cat;
					groupedObject.children = groupedSelectFacilityOptions[cat];

					return groupedObject;
				});

				const emptyObj = { 
					id : '', 
					text : 'Select Service', 
					disabled: true,
					selected: true,
				};

				facilityOptions.push(emptyObj);
				$('select[name="saf-services"]').select2({
					data: facilityOptions
				})
			})
		}


	});

	$('select[name="saf-services"]').change(function(){
		
		const serviceType = $( 'select[name="saf-service-type"]' ).val();
		const facility = $( 'select[name="saf-facility"]' ).val();
		const service = $( 'select[name="saf-services"]' ).val();

		if ( serviceType == 2 ) {

			//jQuery.get(`https://dev-liquidmobile-api.azurewebsites.net//api/Facilities/${facility}/OperationTypes/${serviceType}/Products`, function(data){
			jQuery.get(`https://dev-liquidmobile-api.azurewebsites.net/api/Facilities/${facility}/OperationTypes/${serviceType}/Products/${service}/AddOns`, function(data){

				console.log(data);
				const selectServicesOptions = data.map((i) => {
					
					let serviceObject = {};
					
					serviceObject.id = i.productId;
					serviceObject.text = i.productName;

					return serviceObject;
				});

				console.log(selectServicesOptions);
				/* const emptyObj = { 
					id : '', 
					text : 'Select Boosts', 
					disabled: true,
					selected: true,
				};

				selectServicesOptions.push(emptyObj); */
				
				$('select[name="saf-boosts[]"]').select2({
					data: selectServicesOptions
				})
			})
		}


	});

});