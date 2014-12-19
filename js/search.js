//search visualisation
function addSearchPanel() {
    var state = true;
    var frm='';

    $('<div>').attr('id', 'searchWrapper').addClass('search-wrapper').insertAfter('#header');

    frm='<form><input id="searchField" type="text" placeholder="Search..." class="search-input">' +
    '<input type="radio" name="factor" value="Title" class="search-radio" id="movieTitle" checked="checked">' +
    '<label class="search-radio-label" id="SOME" for="movieTitle">Movie title</label>' +

    '<input type="radio" name="factor" class="search-radio" id="actors">' +
    '<label class="search-radio-label" for="actors">Actors</label>' +

    '<input type="radio" name="factor" class="search-radio" id="advanced">' +
    '<label class="search-radio-label" id="advSearch" for="advanced">Advanced</label>' +

    '<button class="search-button">GO!</button> </form>';

    $('#searchWrapper').append(frm);
    $('form').submit(function (event) {
        event.preventDefault();
    });
    searchBy();
    var labels = document.getElementsByTagName('label');
    labels[0].style.borderRight = '1px solid rgba(238, 238, 238, 0.34)';
    labels[1].style.borderRight = '1px solid rgba(238, 238, 238, 0.34)';

    //advanced search
    $('input[name="factor"]:radio').click(function () {
        controlAdvanced();
    });

}



//toggle div for adv search and move properly fav section
function controlAdvanced() {
    var searchWrap = $('#searchWrapper'),
        expH = 250,
        collapsH = 100;
    if ($('#advanced').prop('checked') == true) {
        return (function () {
            searchWrap.animate({
                'height': expH + 'px'
            }, 300);
            favSectionTop(expH);
            addAdvanced();
        })();
    } else {
        return (function () {
            searchWrap.animate({
                'height': collapsH + 'px'
            }, 300);
            favSectionTop(collapsH);
            $('#advancedWrapper').remove();
        })();
    }
}
//Toggle visibility of search block
/*$('#callSearch').click(function () {
    var expandedHight = 100,
        collapsedHeight = 0;
    if (state) {

        $('#searchWrapper').animate({
            'height': expandedHight + 'px',
            'opacity': '1'
        }, 300);
        favSectionTop(expandedHight);
        controlAdvanced();
    } else {
        $('#searchWrapper').animate({
            'height': collapsedHeight + 'px',
            'opacity': '0',
            'margin-bottom': '0px'
        }, 300);
        favSectionTop(collapsedHeight);
    }
    state = !state;


});*/

function addAdvanced() {
    var searchwrap = document.getElementById('searchWrapper');
    var advwrap = document.getElementById('advancedWrapper');
    var actors = {500 : 'Tom Cruise',31 : 'Tom Hanks',85 : 'Johny Depp',1158 : 'Al Pacino',819 : 'Edward Norton',56731 : 'Jessica Alba',38406 : 'Paris Hilton',4173:'Anthony Hopkins',
        206 : 'Jim Carrey',9642 : 'Jude Law',2461 : 'Mel Gibson',2231 : 'Samuel L. Jackson',5292 : 'Denzel Washington',3131 : 'Antonio Banderas',287 : 'Brad Pitt',1892 : 'Matt Damon',
        6193 : 'Leonardo DiCaprio',6949 : 'John Malkovich',11856 : 'Daniel Day-Lewis',1532 : 'Bill Murray',2228 : 'Sean Penn',3223 : 'Robert Downey Jr.',3084 : 'Marlon Brando',
        4483 : 'Dustin Hoffman',1979 : 'Kevin Spacey',204 : 'Kate Winslet',139 : 'Uma Thurman',1245 : 'Scarlett Johansson',11701 : 'Angelina Jolie',8891 : 'John Travolta',
        18897 : 'Jackie Chan',12835: 'Vin Diesel',2888 : 'Will Smith',62 : 'Bruce Willis',2963 : 'Nicolas Cage',4491 : 'Jennifer Aniston',16483 : 'Sylvester Stallone',
        17276 : 'Gerard Butler',13240 : 'Mark Wahlberg',8167: 'Paul Walker',6384 : 'Keanu Reeves',6885 : 'Charlize Theron',3896 : 'Liam Neeson',1003 : 'Jean Reno',
        380 : 'Robert De Niro',934 : 'Russell Crowe',72466 : 'Colin Farrell',1844 : 'Til Schweiger',10980 : 'Daniel Radcliffe',192: 'Morgan Freeman',1100 : 'Arnold Schwarzenegger',
        109 : 'Elijah Wood',57755 : 'Woody Harrelson',63312 : 'Yvonne Strahovski',19292 : 'Adam Sandler'};
    if ($.contains(searchwrap, advwrap)) {
        return false;
    } else {
        $.ajax({
            url: 'http://api.themoviedb.org/3/genre/movie/list?api_key=7a135ff2c408f8e138e4645f83b30222',
            dataType: 'json',
            success: callback
        });

        function callback(data) {
            var list = '';
            // genres
            $.each(data.genres, function (num, el) {
                list += '<div class ="genre"><input type="checkbox" id="' + el.id +
                '" value="' + el.name + '"><label for="' + el.id + '">' + el.name + '</label></div>';
            });
            ///

            //actors
            list += '<select id="actorSelect"><option class="selActors"></option>';
            for (var actor in actors) {
                list += '<option class="selActors" id="' + actor + '">' + actors[actor] + '</option>';
            }
            list +='</select>';
            //////

            // relise year
            list += '<select id="yearSelect"><option class="selAYear"></option>';
            for (var i=1960; i < 2015; i++ ) {
                list +='<option class="selYear" id="' + i + '">' + i + '</option>'
            }

            // sorting radios
            list += '<label>Sort by popularity. descending<input value="popularity.desc" type="radio" name="sort" checked></label>'+
            '<label>Sort by popularity. ascending<input value="popularity.asc" type="radio" name="sort"></label>'+
            '<label>Sort by vote average. descending<input value="vote_average.desc" type="radio" name="sort"></label>'+
            '<label>Sort by vote average. ascending<input value="vote_average.asc" type="radio" name="sort"></label>';
            /////


            $('#searchWrapper').find(':first-child').remove();
            list += '<button id="advSearchBtn">SEARCH</button>';
            $('<div>', {
                id: 'advancedWrapper',
                style: 'clear: both;',
                html: list
            }).appendTo('#searchWrapper');
            searchBtnEvents();
        }
    }

}

function searchBtnEvents() {
    $('#advSearchBtn').on('click', function(){
        var checkBoxes = $('.genre');
        var checked=[];
        var selectedActor=$('#actorSelect option:selected').attr('id');
        var selectYear=$('#yearSelect option:selected').attr('id')
        var url='discover/movie';
        // checking genres
        for (var i=0; i < checkBoxes.length; i++) {
            if($(checkBoxes[i]).find(':first-child').prop('checked') == true) {
                checked.push($(checkBoxes[i]).find(':first-child').attr('id'));
            }
        }

        if(checked.length != 0) {
            url +='?with_genres=' + checked.join(',');
        }
        /////


        // checking actor
        if(selectedActor) {
            url +='&with_cast=' + selectedActor;
        }
        //
        //year
        if(selectYear){
            url +='&primary_release_year=' + selectYear;
        }
        ///
        url +='&sort_by='+$('input[name=sort]:checked').val();
        $('#mainContent').find(':first-child').remove();
        sendRequest(url,'ganres');
    });
}

 //correct a top position of favSection due to searchWpapper height
    function favSectionTop(height) {
        var totalHight, headerHeight = document.getElementById('header').offsetHeight;
        totalHight = headerHeight + height + 'px';
        if ($('#favSection')) {
            $('#favSection').animate({
                'top': totalHight
            }, 300);
        }
    }