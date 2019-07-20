/*-----------------------------------------------------------------*/
/*	Buttons
/*-----------------------------------------------------------------*/

/**
 * Turning off the default behaviour of the buttons, that are actually link elements 
 */
$( document ).ready( function() {
	
	$( document ).on( "click", function( e ) {
		buttonPreventDefault( e );
	} );
	
} );


/*-----------------------------------------------------------------*/
/*	Main navigation
/*-----------------------------------------------------------------*/

$( document ).ready( function() {
	let header = $( "header" ),
		mainNav = $( "#main-nav" ),
		wasNavOpen = false;
		
	/**
	 * Clicking on the navigation open/close button:
	 * adds/removes a class to/from the navigation itself, that toggles its visibility
	 * and saves the current state of the navigation in a variable
	 */
	header.on( "click", function( e ) {
		let target = $( e.target );
		if ( target.is( "#main-nav .button.open" ) ) {
			toggle( mainNav );
			wasNavOpen = !wasNavOpen;
		}
	} );
	
	/**
	 * In case the navigation is turned on, scrolling the page down turns it off and
	 * scrolling up to the top turns it back on 
	 */
	$( document ).on( "scroll", function() {
		toggleWhen( window.pageYOffset > 0, wasNavOpen, mainNav );
	} );
	
	/**
	 * Initializing main navigation smooth scrolling functionallity, 
	 * selecting main nav current button
	 */
	UIkit.scrollspyNav( mainNav, {
		cls: CURRENT_ITEM_CLASS,
		scroll: true
	} );
} );


/*-----------------------------------------------------------------*/
/*	Main slider
/*-----------------------------------------------------------------*/

$( document ).ready( function() {
	let slider = $( "#slider .content" );
	
	/**
	 * Initializing the slider with dots only
	 */
	attachSliderFunctionallityTo( slider, sliderSlideOptions );
	
	/**
	 * Implementing slider content animation
	 *
	 * Listening for slider's "afterChange" event, triggered by current slide entering the viewport and 
	 * removing a class from the previous slide, while adding the same class to the current slide
	 * 
	 * The previous and the current slide are compared and 
	 * the highlighting class is moved from the previous slide to the next one 
	 * only in case of an actual slide transition,
	 * but not when the current slide dragging distance is under the transition threshold,
	 * and despite the slide moving and an "afterChange" event is fired, the slide returns back and does not change
	 */
	transitionContent( slider );
	slider.on( "afterChange", function( event, slick, currentSlide ) {
		transitionContent( slider );
	} );
	
	/**
	 * Clicking on a slide button calls UIkit's scrollTo method to direct to the corresponding service section
	 */
	$( "#slider" ).on( "click", function( e ) {
		let target = $( e.target );
		if ( target.is( "#slider .button.open" ) ) {
			let targetSectionClass = target.attr( "data-target" ), 
				targetSection = $( "#services" + " " + "." + targetSectionClass )[ 0 ];
			
			UIkit.scroll( target ).scrollTo( targetSection );
		}
	} );
} );


/*-----------------------------------------------------------------*/
/*	About
/*-----------------------------------------------------------------*/

$( document ).ready( function() {
	let about = $( "#about" );
	
	/**
	 * Initializing the about section slider functionallity
	 */
	attachSliderFunctionallityTo( about, aboutSlideOptions );
	
	/**
	 * Listening for clicks on the about section and in case the open or close button was clicked,
	 * the slickSlider goTo(index)-method is called and index=1 (open) or index=0 (close) is passed to it
	 */
	about.on( "click", function( e ) {
		let target = $( e.target );
		toggleWhenIsButton( target, about );
	} );
} );


/*-----------------------------------------------------------------*/
/*	Services
/*-----------------------------------------------------------------*/

$( document ).ready( function() {
	
	$( "#services .service-group" ).each( function() {
		attachSliderFunctionallityTo( this, aboutSlideOptions );
	} );
	
	let serviceGroups = $( "#services .service-groups-array" );
	serviceGroups.on( "click", function( e ) {
		let target = $( e.target );
		if ( target.is( ".button" ) ) {
			let serviceGroup = target.closest( ".service-group" );
			toggleWhenIsButton( target, serviceGroup );
			toggle( serviceGroup );
		}
	} );
	
} );


/*-----------------------------------------------------------------*/
/*	Contact info
/*-----------------------------------------------------------------*/

/**
 * Initializing the contact info section functionallity
 */
$( document ).ready( function() {
	let contactInfo = $( "#contact-info .contact-info-items" );
	attachSliderFunctionallityTo( contactInfo, contactInfoSlideOptions );
} );


/*-----------------------------------------------------------------*/
/*	UI Kit
/*-----------------------------------------------------------------*/

/**
 * Initializing UI Kit Scroll component allows specifying custom speed for the animated scroll
 */
$( document ).ready( function() {
	UIkit.component( 'scroll', UIkit.component( 'scroll' ).extend( {
		data: {
			duration: 300
		}
	} ) );
} );


/*-----------------------------------------------------------------*/
/*	Scroll to top button
/*-----------------------------------------------------------------*/

$( document ).ready( function() {
	let scrollToTopButton = $( "header .scroll-to-top" );
	
	/**
	 * Initializing scroll-to-top button smooth scrolling functionallity
	 */
	UIkit.scroll( scrollToTopButton );
	
	/**
	 * Adding and removing designated class to scroll-to-top button
	 * for revealing or hiding the button, depending on the page scroll position
	 */
	$( document ).on( "scroll", function() {
		toggleBasedOn( window.pageYOffset, scrollToTopButton );
	} );
} );


/*-----------------------------------------------------------------*/
/*	Form
/*-----------------------------------------------------------------*/































