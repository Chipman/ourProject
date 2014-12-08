/**
 * Created by Daryl on 01.12.2014.
 */
 // function invokes when one clicks  on sub menu it creates movie list for kids
function popular4Kids() {
   	var forKids ='discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc';
    sendRequest(forKids,'For kids');
}
// -/- most pop
function mostPopular() {
    var mostPopUrl ='discover/movie?sort_by=popularity.desc';
    sendRequest(mostPopUrl,'Most popular');
}
// -/- last year
function mostPopular2013() {
    var lastYear = 'discover/movie?primary_release_year=2013&sort_by=vote_average.desc';
    sendRequest(lastYear,'Last year');
}

function mostPopularComedies() {
    var mostPopComedies = 'discover/movie?with_genres=35,36&sort_by=revenue.desc';
    sendRequest(mostPopComedies,'Most popular comedis');
}

function defaultMovies() {
    var defaultMovies='discover/movie?primary_release_year=2014';
   sendRequest(defaultMovies,'This year movies');
}
function searchByTitle(){
    var titleSearch = 'search/movie?query=' + $('#searchField1').val();
    sendRequest(titleSearch,$('#searchField1').val());

}
function searchByActor () {
    var titleSearch = 'search/person?query=' + $('#searchField1').val();
    sendRequest(titleSearch,$('#searchField1').val());
}
// ajax request  creates  request with recived url 
function sendRequest(url,listName) {
    var apikey = "&api_key=7a135ff2c408f8e138e4645f83b30222";
    var baseUrl = "https://api.themoviedb.org/3/";
    var moviesSearchUrl = baseUrl + url + apikey;
    var page=1;

      //preloader  ON
    $('#mainContent').append('<div id="loaderImage"></div>');
    new imageLoader(cImageSrc, 'startAnimation()');       
    

    $.ajax({
        url: moviesSearchUrl,
        dataType: "jsonp",
        success: callBackFunc
    });


        function callBackFunc (data) {
            //when request recived PRELODER OFF
            stopAnimation();
            $('#loaderImage').remove();
            //-------------------

            //post revcived movies on page 
            moviesTemplate(data.results,listName);


            //adds auto movie list  uploads when scrolling 
        $('#Movies').on({
            'mousewheel': function(e) {

                if ($(window).scrollTop() == $(document).height() - $(window).height()) {
                    //every scroll  appends new page to url
                    var currentPage= '&page=' + (++page);
                    moviesSearchUrl = baseUrl + url + apikey + currentPage;

                    $.ajax({
                        url: moviesSearchUrl,
                        beforeSend: function( ) {
                            //little preloder when scrolling list
                            $('#loader').show();
                        },
                        success: function (data) {
                            //little preloder off
                            $('#loader').hide();
                            
                            moviesTemplate(data.results);

                        }
                    });
                }
            }
        });

    }

}

// this code  handle  preloder animation

var cSpeed=9;
var cWidth=100;
var cHeight=100;
var cTotalFrames=12;
var cFrameWidth=200;
var cImageSrc='images/712.gif';

var cImageTimeout=false;
var cIndex=0;
var cXpos=0;
var cPreloaderTimeout=false;
var SECONDS_BETWEEN_FRAMES=0;

function startAnimation(){
    
    document.getElementById('loaderImage').style.backgroundImage='url('+cImageSrc+')';
    document.getElementById('loaderImage').style.width=cWidth+'px';
    document.getElementById('loaderImage').style.height=cHeight+'px';
    
    //FPS = Math.round(100/(maxSpeed+2-speed));
    FPS = Math.round(100/cSpeed);
    SECONDS_BETWEEN_FRAMES = 1 / FPS;
    
    cPreloaderTimeout=setTimeout('continueAnimation()', SECONDS_BETWEEN_FRAMES/1000);
    
}

function continueAnimation(){
    
    cXpos += cFrameWidth;
    //increase the index so we know which frame of our animation we are currently on
    cIndex += 1;
     
    //if our cIndex is higher than our total number of frames, we're at the end and should restart
    if (cIndex >= cTotalFrames) {
        cXpos =0;
        cIndex=0;
    }
    
    if(document.getElementById('loaderImage'))
        document.getElementById('loaderImage').style.backgroundPosition=(-cXpos) + 'px 0';
    
    cPreloaderTimeout=setTimeout('continueAnimation()', SECONDS_BETWEEN_FRAMES * 1000);
}

function stopAnimation(){//stops animation
    clearTimeout(cPreloaderTimeout);
    cPreloaderTimeout=false;
}

function imageLoader(s, fun)//Pre-loads the sprites image
    {
        clearTimeout(cImageTimeout);
        cImageTimeout=0;
        genImage = new Image();
        genImage.onload=function (){cImageTimeout=setTimeout(fun, 0)};
        genImage.onerror=new Function('alert(\'Could not load the image\')');
        genImage.src=s;
    }

   