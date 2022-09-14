jQuery( document ).ready( function( $ ) {
	
	$( '.saf-select select' ).select2();
	$( ".saf-date" ).datepicker();
	$( '.saf-mobile-location' ).hide();
	
	$( 'select[name="saf-service-type"]' ).change(function(){
		
		const serviceType = $( this );
		
		if ( serviceType.val() == 2 ) {

			$( this ).closest( 'form' ).find( '.saf-mobile-location' ).hide();
			$( this ).closest( 'form' ).find( '.saf-clinic-facility' ).show();


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

		if ( serviceType.val() == 1 ) {

			$( this ).closest( 'form' ).find( '.saf-mobile-location' ).show();
			$( this ).closest( 'form' ).find( '.saf-clinic-facility' ).hide();

			console.log('hello');
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
		
		const serviceType 	= 	$( this ).closest( 'form' ).find( 'select[name="saf-service-type"]' );
		const services 		= 	$( this );
		let facility 		= 	'';

		if ( serviceType.val() == 1 ) {
			facility = $( this ).closest( 'form' ).find( 'input[name="saf-mobile-location"]' ).data('location').facilityId;
			
		}
		else if ( serviceType.val() == 2 ) {
			facility = $( this ).closest( 'form' ).find( 'select[name="saf-facility"]' ).val();
		} 

		jQuery.get( `https://dev-liquidmobile-api.azurewebsites.net/api/Facilities/${facility}/OperationTypes/${serviceType.val()}/Products/${services.val()}/AddOns`, function( data ){

			const selectServicesOptions = data.map( ( i ) => {
				
				let serviceObject = {};
				
				serviceObject.id = i.productId;
				serviceObject.text = i.productName;

				return serviceObject;
			});
			
			services.closest( 'form' ).find( 'select[name="saf-boosts[]"]' ).select2({
				data: selectServicesOptions
			});
		});

	});

	jQuery( "button.saf-submit-btn" ).click( function(){

		const serviceType 	= $( this ).closest( 'form' ).find( 'select[name="saf-service-type"]' );
		let facility 		= '';
		let facilityRef = '';
		if ( serviceType.val() == 1 ) {
			facilityRef = $( this ).closest( 'form' ).find( 'input[name="saf-mobile-location"]' );
			
		}
		else if ( serviceType.val() == 2 ) {
			facilityRef = $( this ).closest( 'form' ).find( 'select[name="saf-facility"]' );
		} 
		const services 		= jQuery( this ).closest( 'form' ).find( 'select[name="saf-services"]' );
		const boosts 		= jQuery( this ).closest( 'form' ).find( 'select[name="saf-boosts[]"]' );
		const date 			= jQuery( this ).closest( 'form' ).find( 'input[name="saf-date"]' );
		const time 			= jQuery( this ).closest( 'form' ).find( 'select[name="saf-time"]' );
		let validationError = false;

		console.log(serviceType.val(), facility, services.val(), boosts.val(), date.val(), time.val());

		
		if ( serviceType.val() === null ) {
			serviceType.parent().addClass('saf-error');
			validationError = true;
		}

		if ( facilityRef.val() === null || facilityRef.val() === '' ) {
			facilityRef.parent().addClass('saf-error');
			validationError = true;
		}
		
		if ( services.val() === null ) {
			services.parent().addClass('saf-error');
			validationError = true;

		}
		
		if ( date.val() === '' ) {
			date.parent().addClass('saf-error');
			validationError = true;

		}
		
		if ( time.val() === null ) {
			time.parent().addClass('saf-error');
			validationError = true;

		}
		
		if ( validationError ) {
			return false;
		} else {

			if ( serviceType.val() == 1 ) {
				facilityRef = $( this ).closest( 'form' ).find( 'input[name="saf-mobile-location"]' );
				facility = facilityRef.data('location').facilityId;
				
			}
			else if ( serviceType.val() == 2 ) {
				facilityRef = $( this ).closest( 'form' ).find( 'select[name="saf-facility"]' );
				facility = facilityRef.val();
			} 

			const submitURL = `https://purple-sand-066809e10.1.azurestaticapps.net/?operationTypeId=${serviceType.val()}&facilityId=${facility}&productId=${services.val()}&addOns=${boosts.val()}&date=${date.val()}&time=${time.val()}&guests=undefined&facility=${facility}&operationType=${serviceType.val()}&serviceDateUTC=${date.val()}&serviceDate=${date.val()}&lineItems=${boosts.val()}&type=widget`;
			console.log(encodeURI(submitURL));
			window.location.replace(encodeURI(submitURL));
		}
	});

});