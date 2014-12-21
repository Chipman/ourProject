/**
 * Created by Daryl on 03.12.2014.
 */
 //adds all events handlers to menu buttons
(function(){

	$('.logo-backgr').css({cursor : 'pointer'});
	$('.logo-backgr').on('click',function(){
		if($('#favSection')) {
			hideFavBlock();
		}
		$('#searchWrapper').remove();
		$('#mainContent').children().remove();
		window.location='#menuHome';
	});
	$('#mainMenu').on('click',handlEvent);
	$('#callSearch').on('click',function() {
		if(!document.getElementById('searchWrapper')) {
			addSearchPanel();
			var autoHeight=$('#searchWrapper').height();
			$('#searchWrapper').css({height: '0px',opacity : 0}).animate({height: autoHeight,opacity: 1}, 300,function(){
				$('#searchWrapper').css('height','auto');
				favSectionTop(); // СТАЛО ТУТ
			});
			//$('#searchWrapper').css({opacity : 1});
            //favSectionTop(); БУЛО ТУТ
		}else {
			$('#searchWrapper').animate({height: 'toggle',opacity: 0}, 'slow',function(){
				$('#searchWrapper').remove();
				favSectionTop();  //  СТАЛО ТУТ
			});

           // favSectionTop();  БУЛО ТУТ
		}
	});
	homeTemplate();
})();
function searchBy() {
	$('.search-button').on('click',function() {
		$('#mainContent').find(':first-child').remove();

		if($('input[name=factor]:checked').val() == 'Title'){
			$('#searchWrapper').stop(true,true).animate({opacity : 0},500,function(){
				this.remove();
			});
			searchByTitle();
		} else {
			$('#searchWrapper').stop(true,true).animate({opacity : 0},500,function(){
				this.remove();
			});
			searchByActor();

		}
	});
}
// menu event handlers
function handlEvent(event) {
	var target=event.target || event.srcElement;
	var menu={'menuHome' : homeTemplate, 'menuMovies' : defaultMovies,'menuHelp' : getHelp,
	'subMenuPop':mostPopular,'subMenu2013':mostPopular2013,'subMenuKids':popular4Kids,'subMenuComedy':mostPopularComedies,
		'subMenuHorror' : bestHorrors,'subMenuFantasy' : bestFantasy};

	for (var temp in menu) {
		if(temp == target.id) {
			$('#mainContent').find(':first-child').remove();
			window.location='#' + temp;
			menu[temp]();
		}
	}

}



//single movie block slide out handler
function addEvents() {
	var infoBlock;

	$(".singleMovieBlock").on('click',function() {
		window.location='#movie+'+this.id;
		/*showOneMovie(this.id);
		$(window).scrollTop(0);*/
	});

	$(".singleMovieBlock").hover(function() {
		//infoBlock=$(this).find(':last-child')[0];
		infoBlock=$(this).find('.infoBlock');

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
	$("#Actors .singleActorBlock").hover(function() {
			infoBlock=$(this).find(':last-child')[0];

			$(infoBlock).stop(true,false).css({height: '0px',visibility: "visible"}).animate({height: '100px'}, 700);

		},
		function(){
			$(infoBlock).stop(false,false).animate({height: '0px'}, 700,
				function(){
					$(this).css({visibility: "hidden",height : '100px'});

				});
		});

	$(".singleActorBlock").on('click',function() {

		createBlock();
		$('body').css('overflow','hidden');
		//$('body').css('position','fixed');
		$('#offOnBtn').on('click',deleteBlock);
		window.location ='#actor+' + this.id;

		$('#Actor').append('<div id="loaderImage"></div>');
		new imageLoader(cImageSrc, 'startAnimation()');
	});
}

//events and functions for singleMoviePage
function addEventsToMovie(){
	//setting width for small carousel container
	var smImageContainer = $('.smCarousel').find($('.img-container'));
	var smImages = smImageContainer.find('.screenshot');
    var smTotalLength = (parseInt(smImages.css('width')) + parseInt(smImages.css('margin-left')) + parseInt(smImages.css('margin-right'))) * smImages.length;
    smImageContainer.css({'width': smTotalLength,'right':0});
    $('.carousel').on('click','.control', scrollCarousel);
    smImages.on('click', showLightRoom);

    $('#singleMovie').on('click', '.search-rate', searchRate);
    $('#singleMovie').on('click', '.search-year', searchYear);
    $('#singleMovie').on('click', '.search-genre', searchYear);
    $('#singleMovie').on('click', '.similar', showMovie);


	function searchRate(){
		var rate = $(this).children('span').text();
		window.location = '#' + 'movies-with-rates+' + rate;
	}
    function searchYear(){
		var year = $(this).children('span').text();
		window.location = '#' + 'movies-with-year+' + year;
	}
	function searchGenre(){
		var genreName = $(this).children('span').text();
		var genreId = $(this).children('span').data('genre');
		window.location = '#' + 'movies-with-genre+' + genreId + '+' + genreName;
	}
	function showMovie(){
		var movieId = $(this).data('id');
		window.location = '#' + 'movie+' + movieId;
	}
    //func that shows modal large carousel
	function showLightRoom(){

	//setting position and width for large carousel
		var numb = $(this).data('numb')
		var lgImageContainer = $('.lgCarousel').find($('.img-container'));
		
		var lgImages = lgImageContainer.find('.lgScreenshot');
		var lgStep = lgImages.outerWidth();
		

		var lgTotalLength = parseInt(lgImages.css('width')) * lgImages.length;
		lgImageContainer.css({'width': lgTotalLength,'right': numb*lgStep});

		console.log(lgTotalLength, numb, lgStep )
		lgImages.on('click', scrollCarousel);
		createModal()
	}
    //creating and inserting modal window and mask
	function createModal() {
		var mask = $('#mask');
		var modwin = $('#modwin');
		var winH = $(window).height();
	    var winW = $(window).width();
	    modwin.css('top', winH/2-modwin.height()/2);
	    modwin.css('left', winW/2-modwin.width()/2);
	    mask.fadeIn(400);    
	    mask.fadeTo("slow",0.8);    
	    modwin.fadeIn(2000); 
	    mask.on('click', function () {
	        mask.hide();
	        modwin.hide();
    	}); 

	}
    //function for sliding carousel
	function scrollCarousel(){
		var slider = $(this).closest('.carousel').find('.slider');
		var img_cont = $(this).closest('.carousel').find('.img-container');
		var images = img_cont.find('.screenshot');
		var prevArrow = $(this).closest('.carousel').find($('.prev-ar'));
		var nextArrow = $(this).closest('.carousel').find($('.next-ar'));
	    var imagesWidth = parseInt(img_cont.css('width'));
	    var sliderWidth = parseInt(slider.css('width'));
	    var imagesRight = parseInt(img_cont.css('right'));
	    var step = images.outerWidth(true);
	    var direction=$(this).data('direction');
	    var diffWidth = imagesWidth - sliderWidth;
	    var lastStep = diffWidth - imagesRight;
	    if (direction == 'previous' && imagesRight > step) {
	        nextArrow.removeClass('next-unable').addClass('next-able');
	        img_cont.stop().animate({"right": "-=" + step + "px" }, "slow","linear")
	    } else if (direction == 'previous' && imagesRight <= step && imagesRight > 0) {
	        prevArrow.removeClass('prev-able').addClass('prev-unable');
	        img_cont.stop().animate({"right": "-=" + imagesRight + "px" }, "slow","linear")
	    };
	    if (direction =='next' && lastStep > step) {
	        prevArrow.removeClass('prev-unable').addClass('prev-able');
	        img_cont.stop().animate({"right": "+=" + step + "px"}, "slow", "linear")
	    } else if (direction =='next' && lastStep <= step) {
	        nextArrow.removeClass('next-able').addClass('next-unable');
	        img_cont.stop().animate({"right": "+=" + lastStep + "px"}, "slow", "linear")
	    };
	    return
	}

};  

//toggle for help page
function toggleHelp(){
	$('#Help').on('click', '.question', function(){
		$(this).next().slideToggle("fast")
	});
}

// events to scroll top btn
function toTopBtnEvents() {
	$('#scrollTopBtn').on('click',function() {
		$(window).scrollTop(0);
		window.location = '#' + document.URL.split('#')[1];
		this.remove();
	});
}
