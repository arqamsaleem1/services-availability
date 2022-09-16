jQuery( document ).ready( function( $ ) {
	
	$( '.saf-select select' ).select2( {
		
		minimumResultsForSearch: -1,
		width: 'resolve', 
		language: {
			noResults: function ( params ) {
				const svgImage = '<svg class="ant-empty-img-default" width="184" height="152" viewBox="0 0 184 152" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g transform="translate(24 31.67)"><ellipse class="ant-empty-img-default-ellipse" cx="67.797" cy="106.89" rx="67.797" ry="12.668"></ellipse><path class="ant-empty-img-default-path-1" d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"></path><path class="ant-empty-img-default-path-2" d="M101.537 86.214L80.63 61.102c-1.001-1.207-2.507-1.867-4.048-1.867H31.724c-1.54 0-3.047.66-4.048 1.867L6.769 86.214v13.792h94.768V86.214z" transform="translate(13.56)"></path><path class="ant-empty-img-default-path-3" d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"></path><path class="ant-empty-img-default-path-4" d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"></path></g><path class="ant-empty-img-default-path-5" d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"></path><g class="ant-empty-img-default-g" transform="translate(149.65 15.383)"><ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815"></ellipse><path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z"></path></g></g></svg>' ;
				const notFoundMessage = `<div class='notfound-msg'> ${svgImage} <span class='msg'>Results not available</span></div>`;
				return notFoundMessage;
			}
		},
		escapeMarkup: function ( markup ) {
			return markup;
		}

	} );
	jQuery('span.select2-selection__arrow').html('<svg viewBox="64 64 896 896" focusable="false" data-icon="down" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path></svg>');

	$( ".saf-date" ).datepicker();
	$( '.saf-mobile-location' ).hide();
	
	$( 'select[ name="saf-service-type" ]' ).change( function() {
		
		const serviceType = $( this );
		
		if ( serviceType.val() == 2 ) {

			$( this ).closest( 'form' ).find( '.saf-mobile-location' ).hide();
			$( this ).closest( 'form' ).find( '.saf-clinic-facility' ).show();


			jQuery.get( 'https://dev-liquidmobile-api.azurewebsites.net/api/Facilities/Clinics', function( data ) {

				const selectOptions = data.map( ( i ) => {
					
					let facilityObject = {};
					
					facilityObject.id = i.facilityId;
					facilityObject.text = i.facilityName;

					return facilityObject;
				} );

				const emptyObj = { 
					
					id : '', 
					text : 'Select Facility', 
					disabled: true,
					selected: true,
				};

				selectOptions.push( emptyObj );
				//console.log(selectOptions);

				serviceType.closest( 'form' ).find( 'select[ name="saf-facility" ]' ).select2( {
					data: selectOptions,
					minimumResultsForSearch: -1,
				} );
			} )
		}

		if ( serviceType.val() == 1 ) {

			$( this ).closest( 'form' ).find( '.saf-mobile-location' ).show();
			$( this ).closest( 'form' ).find( '.saf-clinic-facility' ).hide();

			//console.log('hello');
		}


	} );

	$( 'select[ name="saf-facility" ]' ).change( function() {
		
		const serviceType = $( this ).closest( 'form' ).find( 'select[ name="saf-service-type" ]' );
		const facility = $( this );

		if ( serviceType.val() == 2 ) {

			jQuery.get( `https://dev-liquidmobile-api.azurewebsites.net/api/Facilities/${facility.val()}/OperationTypes/${serviceType.val()}/Products`, function( data ) {

				//console.log(data);
				const selectFacilityOptions = data.map( ( i ) => {
					let singleServiceObject = {};
					singleServiceObject.id = i.productId;
					singleServiceObject.text = i.productName;
					singleServiceObject.cat = i.productCategoryName;

					return singleServiceObject;
				} );

				const groupByKey = ( list, key ) => list.reduce( ( hash, obj ) => ( { ...hash, [ obj[ key ] ] : ( hash[ obj[ key ] ] || [] ).concat( obj ) } ), {} );

				const groupedSelectFacilityOptions = groupByKey( selectFacilityOptions, 'cat' );
				const allCats = Object.keys( groupedSelectFacilityOptions );

				//console.log(allCats);
				const facilityOptions = allCats.map( ( cat ) => {
					
					let groupedObject = {};
					groupedObject.text = cat;
					groupedObject.children = groupedSelectFacilityOptions[ cat ];

					return groupedObject;
				} );

				const emptyObj = { 
					id : '', 
					text : 'Select Service', 
					disabled: true,
					selected: true,
				};

				facilityOptions.push( emptyObj );
				facility.closest( 'form' ).find( 'select[ name="saf-services" ]' ).select2( {
					data: facilityOptions,
					minimumResultsForSearch: -1,
				} );
			} );
		}


	} );

	$( 'select[ name="saf-services" ]' ).change( function(){
		
		const serviceType 	= 	$( this ).closest( 'form' ).find( 'select[ name="saf-service-type" ]' );
		const services 		= 	$( this );
		let facility 		= 	'';

		if ( serviceType.val() == 1 ) {
			facility = $( this ).closest( 'form' ).find( 'input[ name="saf-mobile-location" ]' ).data( 'location' ).facilityId;
			
		}
		else if ( serviceType.val() == 2 ) {
			facility = $( this ).closest( 'form' ).find( 'select[ name="saf-facility" ]' ).val();
		} 

		jQuery.get( `https://dev-liquidmobile-api.azurewebsites.net/api/Facilities/${facility}/OperationTypes/${serviceType.val()}/Products/${services.val()}/AddOns`, function( data ) {

			const selectServicesOptions = data.map( ( i ) => {
				
				let serviceObject = {};
				
				serviceObject.id = i.productId;
				serviceObject.text = i.productName;

				return serviceObject;
			});
			
			services.closest( 'form' ).find( 'select[ name="saf-boosts[]" ]' ).select2({
				data: selectServicesOptions,
				minimumResultsForSearch: -1,
			});
		});

	});

	jQuery( "button.saf-submit-btn" ).click( function(){

		const serviceType 	= $( this ).closest( 'form' ).find( 'select[ name="saf-service-type" ]' );
		let facility 		= '';
		let facilityRef = '';
		if ( serviceType.val() == 1 ) {
			facilityRef = $( this ).closest( 'form' ).find( 'input[ name="saf-mobile-location" ]' );
			
		}
		else if ( serviceType.val() == 2 ) {
			facilityRef = $( this ).closest( 'form' ).find( 'select[ name="saf-facility" ]' );
		} 
		const services 		= jQuery( this ).closest( 'form' ).find( 'select[ name="saf-services" ]' );
		const boosts 		= jQuery( this ).closest( 'form' ).find( 'select[ name="saf-boosts[]" ]' );
		const date 			= jQuery( this ).closest( 'form' ).find( 'input[ name="saf-date" ]' );
		const time 			= jQuery( this ).closest( 'form' ).find( 'select[ name="saf-time" ]' );
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
				facilityRef = $( this ).closest( 'form' ).find( 'input[ name="saf-mobile-location" ]' );
				facility = facilityRef.data('location').facilityId;
				
			}
			else if ( serviceType.val() == 2 ) {
				facilityRef = $( this ).closest( 'form' ).find( 'select[ name="saf-facility" ]' );
				facility = facilityRef.val();
			} 

			const submitURL = `https://purple-sand-066809e10.1.azurestaticapps.net/?operationTypeId=${serviceType.val()}&facilityId=${facility}&productId=${services.val()}&addOns=${boosts.val()}&date=${date.val()}&time=${time.val()}&guests=undefined&facility=${facility}&operationType=${serviceType.val()}&serviceDateUTC=${date.val()}&serviceDate=${date.val()}&lineItems=${boosts.val()}&type=widget`;
			console.log(encodeURI(submitURL));
			window.location.replace(encodeURI(submitURL));
		}
	});

});