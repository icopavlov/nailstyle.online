/*-----------------------------------------------------------------*/
/*	Constants
/*-----------------------------------------------------------------*/

const CURRENT_ITEM_CLASS = "current", 
	OPEN_ITEM_CLASS = "open",
	RANDOM_ACCESS_CLASS = "random-access",
	SLIDE_BACKGROUND_LEFT_CLASS = "slide-background-left",
	SLIDE_BACKGROUND_RIGHT_CLASS = "slide-background-right",
	SCROLL_TO_TOP_BUTTON_REVEAL_CLASS = "reveal",
	SCROLL_TO_TOP_BUTTON_SCROLL_DISTANCE_TO_REVEAL = 400;

/*-----------------------------------------------------------------*/
/*	General
/*-----------------------------------------------------------------*/

function attachSliderFunctionallityTo( section, options ) {
	try {
		section.slick( "getSlick" );
	} catch {
		$( section ).slick( options !== undefined ? options : {} );
	}
}

function getSlidePos( slider, slide ) {
	let slides = $( slider ).find( "li" );
	for ( let pos = 0; pos < slides.length; pos++ ) {
		if ( slide.is( slides[ pos ] ) ) {
			return pos;
		}
	}
	return -1;
}

/**
 * Custom function to get the slide the slider is set on at the moment
 */
function getCurrentSlide( slider ) {
	return slider.find( "li" ).eq( slider.slick( "slickCurrentSlide" ) );
}

function isOpen( section ) {
	return $( section ).hasClass( OPEN_ITEM_CLASS );
}
	
function open( section ) {
	$( section ).addClass( OPEN_ITEM_CLASS );
}

function close( section ) {
	$( section ).removeClass( OPEN_ITEM_CLASS );
}

function toggle( section ) {
	$( section ).toggleClass( OPEN_ITEM_CLASS );
}


/*-----------------------------------------------------------------*/
/*	Buttons
/*-----------------------------------------------------------------*/

function buttonPreventDefault( e ) {
	let target = $( e.target );
	if ( target.is( ".button" ) ) {
		e.preventDefault();
	}
}


/*-----------------------------------------------------------------*/
/*	Main navigation
/*-----------------------------------------------------------------*/

function toggleWhen( minPageOffset, wasNavOpen, nav ) {
	if ( minPageOffset ) {
		if ( isOpen( nav ) ) {
			close( nav );
		}
	} else {
		if ( wasNavOpen ) {
			open( nav );
		}
	}
}


/*-----------------------------------------------------------------*/
/*	Main slider
/*-----------------------------------------------------------------*/

const sliderSlideOptions = {
	// fade: true,
	arrows: false,
	dots: true,
	appendDots: $( "#slider .controls" ),
	dotsClass: "random-access",
	touchThreshold: 10,
	autoplay: true,
	autoplaySpeed: 6000,
	focusOnSelect: false,
	pauseOnFocus: false,
	pauseOnHover: false,
	// speed: 0,
	infinite: false
};

function transitionContent( slider ) {
	let prevSlide = slider.find( "." + CURRENT_ITEM_CLASS ), 
		nextSlide = getCurrentSlide( slider ),
		prevSlidePos = getSlidePos( slider, prevSlide ), 
		nextSlidePos = getSlidePos( slider, nextSlide );
	if ( nextSlide.is( prevSlide ) ) {
		return;
	}
	prevSlide.removeClass( CURRENT_ITEM_CLASS );
	nextSlide.addClass( CURRENT_ITEM_CLASS );
	
	if ( prevSlidePos < nextSlidePos ) {
		nextSlide.addClass( SLIDE_BACKGROUND_LEFT_CLASS );
	} else {
		nextSlide.addClass( SLIDE_BACKGROUND_RIGHT_CLASS );
	}
	prevSlide.removeClass( SLIDE_BACKGROUND_LEFT_CLASS + " " + SLIDE_BACKGROUND_RIGHT_CLASS );
}

/*-----------------------------------------------------------------*/
/*	About
/*-----------------------------------------------------------------*/

const aboutSlideOptions = {
	adaptiveHeight: true,
	appendArrows: false,
	swipe: false,
	speed: 200
};

function toggleWhenIsButton( target, about ) {
	const header = 0, 
		main = 1;
		
	if ( target.is( $( ".button.open" ) ) ) {
		about.slick( "slickGoTo", main );
	} else if ( target.is( $( ".button.close" ) ) ) {
		about.slick( "slickGoTo", header );
	}
}


/*-----------------------------------------------------------------*/
/*	Services
/*-----------------------------------------------------------------*/

const servicesContentOptions = {
	adaptiveHeight: true,
	arrows: false,
	dotsClass: "random-access",
	autoplay: false
};

/**
 * Custom function, calling the other functions for implementing slider functionallity
 * on the service group that was open by clicking the open button
 *
 * - A slick instance is initialized on the content of the service group, holding the specific services
 * - Its random access section is connected to the slick instance as a pager navigation
 * - An event listener for slide transition is set on the random access navigation 
 *   for the state of its buttons to match the state of the slider at any time
 */


/**
 * Custom function to initialize the slider functionallity of service group content,
 * when service group is open
 */
 
 
function attachRandomAccessFunctionallity( randomAccess, content ) {
	randomAccess.on( "click", function( e ) {
		let target = $( e.target );
		if ( target.is( ".button.open" ) ) {
			let buttonHolders = target.closest( ".random-access" ).children(), 
				targetButtonHolder = target.closest( "li" ), 
				position = buttonHolders.index( targetButtonHolder );
				
			content.slick( "slickGoTo", position );
		}
	} );
}

/**
 * Custom function for setting button holders to match the currently selected slide, 
 * when initializing the slider functionallity of the corresponding service group section
 *
 * The class "current" is shifted from the last button holder that had it,
 * to the button holder, corresponding to the current slide
 */

function updateRandomAccess( randomAccess, slider ) {
	randomAccess.find( "." + CURRENT_ITEM_CLASS ).removeClass( CURRENT_ITEM_CLASS );
	getCurrentSlide( slider ).addClass( CURRENT_ITEM_CLASS );
}


/*-----------------------------------------------------------------*/
/*	Contact info
/*-----------------------------------------------------------------*/

const contactInfoSlideOptions = {
	arrows: false,
	dots: true,
	appendDots: $( "#contact-info .controls" ),
	dotsClass: "random-access",
	autoplay: false
};


/*-----------------------------------------------------------------*/
/*	Scroll to top button
/*-----------------------------------------------------------------*/

function toggleBasedOn( pageOffset, element ) {
	if ( pageOffset >= SCROLL_TO_TOP_BUTTON_SCROLL_DISTANCE_TO_REVEAL ) {
		element.addClass( SCROLL_TO_TOP_BUTTON_REVEAL_CLASS );
	} else {
		element.removeClass( SCROLL_TO_TOP_BUTTON_REVEAL_CLASS );
	}
}














