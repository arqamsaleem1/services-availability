<?php

/**
 * Define the internationalization functionality
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @link       https://allshorevirtualstaffing.com/
 * @since      1.0.0
 *
 * @package    Services_Availability
 * @subpackage Services_Availability/includes
 */

/**
 * Define the internationalization functionality.
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @since      1.0.0
 * @package    Services_Availability
 * @subpackage Services_Availability/includes
 * @author     Arqam Saleem <arqam.s@allshorestaffing.com>
 */
class Services_Availability_i18n {


	/**
	 * Load the plugin text domain for translation.
	 *
	 * @since    1.0.0
	 */
	public function load_plugin_textdomain() {

		load_plugin_textdomain(
			'services-availability',
			false,
			dirname( dirname( plugin_basename( __FILE__ ) ) ) . '/languages/'
		);

	}



}
