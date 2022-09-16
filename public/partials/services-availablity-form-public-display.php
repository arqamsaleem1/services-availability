<?php

/**
 * Provide a public-facing view for the plugin
 *
 * This file is used to markup the public-facing aspects of the plugin.
 *
 * @link       https://allshorevirtualstaffing.com/
 * @since      1.0.0
 *
 * @package    Services_Availability
 * @subpackage Services_Availability/public/partials
 */
?>

<!-- This file should primarily consist of HTML with a little bit of PHP. -->
<script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>

<!-- <link rel="stylesheet" type="text/css" href="<?php //echo get_stylesheet_directory_uri() . "/css/style.css"; ?>" />
<script type="module" src="<?php //echo get_stylesheet_directory_uri() . "/js/map-script.js"; ?>"></script> -->

<div class="saf-wrapper">
    <div class="saf-content-div">
        <form>
            <div class="saf-fields-container">
                <div class="saf-field-group saf-service-type-group">
                    <div class="label">
                        <label for="saf-service-type">Service Type</label>
                    </div>
                    <div class="saf-select saf-service-type-select">
                        <select style="width: 100%;" name="saf-service-type" data-placeholder="Select type" >
                            <option value="" disabled selected>Select your option</option>
                            <option value="1">Mobile</option>
                            <option value="2">Clinic</option>
                        </select>
                    </div>
                </div>
                <div class="saf-field-group saf-facility-group saf-clinic-facility">
                    <div class="label">
                        <label for="saf-facility">Facility</label>
                    </div>
                    <div class="saf-select saf-facility-select" >
                        <select style="width: 100%;" name="saf-facility" data-placeholder="Select facility"></select>
                    </div>
                </div>
                <div class="saf-field-group saf-location-group saf-mobile-location">
                    <div class="label">
                        <label for="saf-location">Location</label>
                    </div>
                    <div class="saf-select saf-location-input" >
                        <input class="pac-input" name="saf-mobile-location" type="text" placeholder="Enter a location" />
                    </div>
                </div>
                <div class="saf-field-group saf-services-group">
                    <div class="label">
                        <label for="saf-services">Services</label>
                    </div>
                    <div class="saf-select saf-services-select">
                        <select style="width: 100%;" name="saf-services" data-placeholder="Select service"></select>
                    </div>
                </div>
                <div class="saf-field-group saf-boosts-group">
                    <div class="label">
                        <label for="saf-boosts">Boosts</label>
                    </div>
                    <div class="saf-select saf-boosts-select">
                        <select style="width: 100%;" name="saf-boosts[]" multiple="multiple" data-placeholder="Select boosts"></select>
                    </div>
                </div>
                <div class="saf-field-group saf-date-group">
                    <div class="label">
                        <label for="saf-date">Select date</label>
                    </div>
                    <div class="saf-date saf-date-field">
                        <input type="text" name="saf-date" class="saf-date" placeholder="Enter a date" >
                    </div>
                </div>
                <div class="saf-field-group saf-time-group">
                    <div class="label">
                        <label for="saf-time">Time</label>
                    </div>
                    <div class="saf-select saf-time-select">
                        <select style="width: 100%;" name="saf-time" data-placeholder="Select time">
                            <option disabled selected value="">Select time</option>
                            <option value="12:00 PM">12:00 PM</option>
                            <option value="1:00 PM">1:00 PM</option>
                            <option value="2:00 PM">2:00 PM</option>
                            <option value="3:00 PM">3:00 PM</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="saf-submit-btn-row">
                <button type="button" class="saf-submit-btn" >Book now</button>
            </div>
        </form>
    </div>
</div>