/**
 * Created by Daryl on 03.12.2014.
 */
 //adds all events handlers to menu buttons
(function(){
	$('#mainMenu').on('click',handlEvent);

})();
function funC() {
	$('.search-button').on('click',function() {
		$('#mainContent').find(':first-child').remove();
		if($('input[name=factor]:checked').val() == 'Title'){
			searchByTitle();
		} else {
			searchByActor();
		}
	});
}
// menu event handlers
function handlEvent(event) {
	var target=event.target || event.srcElement;
	var menu={'menuHome' : homeTemplate, 'menuMovies' : defaultMovies,'menuHelp' : getHelp,
	'subMenuPop':mostPopular,'subMenu2013':mostPopular2013,'subMenuKids':popular4Kids,'subMenuComedy':mostPopularComedies};

	for (var temp in menu) {
		if(temp == target.id) {
			$('#mainContent').find(':first-child').remove();
			menu[temp]();
		}
	}

}



//single movie block slide out handler
function addEvents() {
	var infoBlock;

	$(".singleMovieBlock").on('click',function() {
		showOneMovie(this.id);
	});

	$(".singleMovieBlock").hover(function() {
		infoBlock=$(this).find(':last-child')[0];

		$(infoBlock).stop(true,false).css({height: '0px',visibility: "visible"}).animate({height: '100px'}, 700);

	},
	function(){
		$(infoBlock).stop(false,false).animate({height: '0px'}, 700,
		 	function(){		 
		 	$(this).css({visibility: "hidden",height : '100px'});

		 })
	});
	
}

function addEventsToActors() {
	var infoBlock;
	$(".singleActorBlock").hover(function() {
			infoBlock=$(this).find(':last-child')[0];

			$(infoBlock).stop(true,false).css({height: '0px',visibility: "visible"}).animate({height: '100px'}, 700);

		},
		function(){
			$(infoBlock).stop(false,false).animate({height: '0px'}, 700,
				function(){
					$(this).css({visibility: "hidden",height : '100px'});

				})
		});
	$(".singleActorBlock").on('click',function() {
		createBlock();
		$('#offOnBtn').on('click',deleteBlock);
		findThisActor(this.id);
		$('#Actor').append('<div id="loaderImage"></div>');
		new imageLoader(cImageSrc, 'startAnimation()');
	});
}

//slider for singleMoviePage
function scrollCarousel(){
    var imageContainer = $('.img-container');
    var images=$('.img-container').find('.screenshot');
    var prevArrow = $('.prev-ar');
    var nextArrow = $('.next-ar')
    var imagesWidth = parseInt($('.img-container').css('width'));
    var sliderWidth = parseInt($('.slider').css('width'));
    var imagesRight = parseInt($('.img-container').css('right'));
    var step = images.outerWidth(true);
    var direction=$(this).data('direction');
    var diffWidth = imagesWidth - sliderWidth;
    var lastStep = diffWidth - imagesRight;
    if (direction == 'previous' && imagesRight > step) {
        nextArrow.removeClass('next-unable').addClass('next-able');
        imageContainer.stop().animate({"right": "-=" + step + "px" }, "slow","linear")
    } else if (direction == 'previous' && imagesRight <= step && imagesRight > 0) {
        prevArrow.removeClass('prev-able').addClass('prev-unable');
        imageContainer.stop().animate({"right": "-=" + imagesRight + "px" }, "slow","linear")
    };
    if (direction =='next' && lastStep > step) {
        prevArrow.removeClass('prev-unable').addClass('prev-able');
        imageContainer.stop().animate({"right": "+=" + step + "px"}, "slow", "linear")
    } else if (direction =='next' && lastStep <= step) {
        nextArrow.removeClass('next-able').addClass('next-unable');
        imageContainer.stop().animate({"right": "+=" + lastStep + "px"}, "slow", "linear")
    };
    return
}
function createCarousel(){
    var images=$('.img-container').find('.screenshot');
    $('.prev-ar').addClass('prev-unable');
    $('.next-ar').addClass('next-able');
    var totalLength = (parseInt(images.css('width')) + parseInt(images.css('margin-left')) + parseInt(images.css('margin-right'))) * images.length;
    $('.img-container').css({'width': totalLength});
    $('.carousel').on('click','.control',scrollCarousel);
    // $('.screenshot').on('click', createModalWindow)
    $('.img-container').css('right', '0')
};  

//toggle for help page
function toggleHelp(){
	$('#Help').on('click', '.question', function(){
		$(this).next().slideToggle("fast")
	});
};	





