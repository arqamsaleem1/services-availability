jQuery( document ).ready( function( $ ) {
	
	$( '.saf-select select' ).select2();
	jQuery( ".saf-date" ).datepicker();
	
	
	$( 'select[name="saf-service-type"]' ).change(function(){
		
		const serviceType = $( this );

		if ( serviceType.val() == 2 ) {

			jQuery.get('https://dev-liquidmobile-api.azurewebsites.net/api/Facilities/Clinics', function( data ){

				const selectOptions = data.map( ( i ) => {
					
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

				selectOptions.push( emptyObj );
				//console.log(selectOptions);

				serviceType.closest( 'form' ).find( 'select[name="saf-facility"]' ).select2({
					data: selectOptions,
				});
			})
		}


	});

	$('select[name="saf-facility"]').change(function(){
		
		const serviceType = $( this ).closest( 'form' ).find( 'select[name="saf-service-type"]' );
		const facility = $( this );

		if ( serviceType.val() == 2 ) {

			jQuery.get(`https://dev-liquidmobile-api.azurewebsites.net/api/Facilities/${facility.val()}/OperationTypes/${serviceType.val()}/Products`, function(data){

				//console.log(data);
				const selectFacilityOptions = data.map( ( i ) => {
					let d = {};
					d.id = i.productId;
					d.text = i.productName;
					d.cat = i.productCategoryName;

					return d;
				});

				const groupByKey = ( list, key ) => list.reduce( ( hash, obj ) => ( { ...hash, [ obj[ key ] ] : ( hash[ obj[ key ] ] || [] ).concat( obj ) } ), {});

				const groupedSelectFacilityOptions = groupByKey( selectFacilityOptions, 'cat' );
				const allCats = Object.keys( groupedSelectFacilityOptions );

				//console.log(allCats);
				const facilityOptions = allCats.map( ( cat ) => {
					
					let groupedObject = {};
					groupedObject.text = cat;
					groupedObject.children = groupedSelectFacilityOptions[ cat ];

					return groupedObject;
				});

				const emptyObj = { 
					id : '', 
					text : 'Select Service', 
					disabled: true,
					selected: true,
				};

				facilityOptions.push( emptyObj );
				facility.closest( 'form' ).find( 'select[name="saf-services"]' ).select2( {
					data: facilityOptions
				})
			})
		}


	});

	$( 'select[name="saf-services"]' ).change( function(){
		
		const serviceType 	= $( this ).closest( 'form' ).find( 'select[name="saf-service-type"]' );
		const facility 		= $( this ).closest( 'form' ).find( 'select[name="saf-facility"]' );
		const services 		= $( this );

		if ( serviceType.val() == 2 ) {

			jQuery.get( `https://dev-liquidmobile-api.azurewebsites.net/api/Facilities/${facility.val()}/OperationTypes/${serviceType.val()}/Products/${services.val()}/AddOns`, function( data ){

				const selectServicesOptions = data.map( ( i ) => {
					
					let serviceObject = {};
					
					serviceObject.id = i.productId;
					serviceObject.text = i.productName;

					return serviceObject;
				});
				
				services.closest( 'form' ).find( 'select[name="saf-boosts[]"]' ).select2({
					data: selectServicesOptions
				});
			})
		}


	});

});