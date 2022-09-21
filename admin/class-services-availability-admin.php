<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       https://allshorevirtualstaffing.com/
 * @since      1.0.0
 *
 * @package    Services_Availability
 * @subpackage Services_Availability/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Services_Availability
 * @subpackage Services_Availability/admin
 * @author     Arqam Saleem <arqam.s@allshorestaffing.com>
 */
class Services_Availability_Admin {

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
	 * @param      string    $plugin_name       The name of this plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;

	}

	/**
	 * Register the stylesheets for the admin area.
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

		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/services-availability-admin.css', array(), $this->version, 'all' );

	}

	/**
	 * Register the JavaScript for the admin area.
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

		wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/services-availability-admin.js', array( 'jquery' ), $this->version, false );

	}
	public function built_admin_menu() {
		add_menu_page( 'Services Availability', 'Services Availability', 'manage_options', 'saf_settings', array( $this, 'setting_page' ));
	}
	function setting_page() {
		if ( isset($_GET['success']) && $_GET['success'] != '' ) {
			$this->am->showSuccessAlert($_GET['success']);
		}
		if ( isset($_GET['error']) && $_GET['error'] != '' ) {
			$this->am->showErrorAlert($_GET['error']);
		}

		load_template( plugin_dir_path( dirname( __FILE__ ) ) . 'admin/partials/services-availability-admin-display.php' );
	}

}
