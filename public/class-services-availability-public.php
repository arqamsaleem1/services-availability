<?php

/**
 * The public-facing functionality of the plugin.
 *
 * @link       https://allshorevirtualstaffing.com/
 * @since      1.0.0
 *
 * @package    Services_Availability
 * @subpackage Services_Availability/public
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the public-facing stylesheet and JavaScript.
 *
 * @package    Services_Availability
 * @subpackage Services_Availability/public
 * @author     Arqam Saleem <arqam.s@allshorestaffing.com>
 */
class Services_Availability_Public {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name       The name of the plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;

	}

	/**
	 * Register the stylesheets for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Services_Availability_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Services_Availability_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_style( $this->plugin_name . '-select2', 'https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css', array(), $this->version, 'all' );
		//wp_enqueue_style( 'jquery-ui-datepicker');
		wp_enqueue_style( $this->plugin_name . 'jquery-ui-datepicker', plugin_dir_url( __FILE__ ) . 'css/jquery-ui-datepicker.css', array(), $this->version, 'all' );
		wp_enqueue_style( $this->plugin_name . '-map', plugin_dir_url( __FILE__ ) . 'css/map.css', array(), $this->version, 'all' );
		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/services-availability-public.css', array(), $this->version, 'all' );

	}

	/**
	 * Register the JavaScript for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Services_Availability_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Services_Availability_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_script( $this->plugin_name . '-select2', 'https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js', array( 'jquery' ), $this->version, false );
		wp_enqueue_script( 'jquery-ui-datepicker');
		wp_enqueue_script( $this->plugin_name . '-map', plugin_dir_url( __FILE__ ) . 'js/map-script.js', array( 'jquery' ), $this->version, false );
		wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/services-availability-public.js', array( 'jquery' ), $this->version, false );
		wp_enqueue_script( $this->plugin_name . '-google-map-api', 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA0eoYnn4K0ShoUxhjYKPThufrjtRckOnA&callback=initMap&libraries=places&v=weekly', array(  ), $this->version, true );

	}

}
