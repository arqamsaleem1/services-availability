"use strict";
$ = jQuery;
function initMap() {
    
    let inputs = document.querySelectorAll( "input[name='saf-mobile-location']" );
    let autocompletes = [];

    let options = {
        fields: ["formatted_address", "geometry", "name"],
    };
    
    /* Data Adapter defin - START */
		$.fn.select2.amd.define( 'select2/data/customAdapter',
        [ 'select2/data/array', 'select2/utils' ],
        function ( ArrayAdapter, Utils ) {
            function CustomDataAdapter ( $element, options ) {
                CustomDataAdapter.__super__.constructor.call( this, $element, options );
            }
            Utils.Extend(CustomDataAdapter, ArrayAdapter);
            CustomDataAdapter.prototype.updateOptions = function (data) {
                this.$element.find('option').remove(); // remove all options
                this.addOptions(this.convertToOptions(data));
            }        
            return CustomDataAdapter;
        }
    );
    let customAdapter = $.fn.select2.amd.require('select2/data/customAdapter');		
    /* Data Adapter defin - END */

    for ( let index = 0; index < inputs.length; index++ ) {
        
        let autocomplete = new google.maps.places.Autocomplete( inputs[index], options );
        
        autocomplete.addListener( "place_changed", function () {
    
            let place = autocomplete.getPlace();

            const latitude = place.geometry.location.lat();
            const longitude = place.geometry.location.lng();
            jQuery.get( `https://dev-liquidmobile-api.azurewebsites.net/api/Facilities/InZone?operationTypeId=1&latitude=${latitude}&longitude=${longitude}`, function( data ){

                if ( data == undefined ) {

                    const notice = '<div class="saf-notification-notice-with-icon" role="alert"><span role="img" aria-label="close-circle" class="saficon saficon-close-circle saf-notification-notice-icon saf-notification-notice-icon-error"><svg viewBox="64 64 896 896" focusable="false" data-icon="close-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 00-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z"></path><path d="M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path></svg></span><div class="saf-notification-notice-message"><p>Error!</p></div><div class="saf-notification-notice-description">The address is out of zone. Please contact Liquid Mobile IV to book.</div></div>';
                    
                    jQuery.when( jQuery( 'body' ).append( notice ) ).then( () => {

                        setTimeout( () => {
                            jQuery( '.saf-notification-notice-with-icon' ).fadeOut();
                        }, 3000);

                    });
                    
                    return false
                }

                jQuery( inputs[ index ] ).attr( 'data-location', JSON.stringify( data ) );
                
                    jQuery.get(`https://dev-liquidmobile-api.azurewebsites.net/api/Facilities/${data.facilityId}/OperationTypes/1/Products`, function(data){

                    /**
                     * Building an array of objects by API Response, to make it ready for select2 dropdown.
                     *
                     */
                    const selectFacilityOptions = data.map( ( i ) => {
                        let d = {};
                        d.id = i.productId;
                        d.text = i.productName;
                        d.cat = i.productCategoryName;

                        return d;
                    });

                    const groupByKey = ( list, key ) => list.reduce( ( hash, obj ) => ( { ...hash, [ obj[ key ] ] : ( hash[ obj[ key ] ] || [] ).concat( obj ) } ), {} );

                    const groupedSelectFacilityOptions = groupByKey( selectFacilityOptions, 'cat' );
                    const allCats = Object.keys( groupedSelectFacilityOptions );

                    const facilityOptions = allCats.map( ( cat ) => {
                        
                        let groupedObject = {};
                        groupedObject.text = cat;
                        groupedObject.children = groupedSelectFacilityOptions[ cat ];

                        return groupedObject;
                    });

                    /**
                     * Creating an empty Object as a placeholder.
                     *
                     */
                    const emptyObj = { 
                        id : '', 
                        text : 'Select Service', 
                        disabled: true,
                        selected: true,
                    };

                    facilityOptions.push( emptyObj );

                    /**
                     * Passing the final data array to select2 to populate the dropdown.
                     *
                     */
                    let sel = jQuery(inputs[index]).closest( 'form' ).find( 'select[name="saf-services"]' ).select2( {
                        dataAdapter: customAdapter,
                        data: facilityOptions,
                        minimumResultsForSearch: -1,
                    });

                    sel.data('select2').dataAdapter.updateOptions(facilityOptions);
                });

            });
            
        });

        autocompletes.push( autocomplete );
    }
    
}
window.initMap = initMap;
