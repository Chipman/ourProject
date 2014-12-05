//search visualisation
$(function() { 
    var state = true, frm;
    $('<div>').attr('id', 'searchWrapper').addClass('search-wrapper').insertAfter('#header');
    
    frm = $('<form>');
    
    frm.append('<input type="text" placeholder="Search..." class="search-input"><span class="by">by</span><input type="radio" name="factor" value="" class="search-radio" id="movieTitle"> <label for="movieTitle">Movie title</label><input type="radio" name="factor" value="" class="search-radio" id="actors"> <label for="actors">Actors</label><input type="radio" name="factor" value="" class="search-radio" id="advanced"> <label for="advanced">Advanced search</label><button class="search-button">GO!</button>');
    
    $('#searchWrapper').append(frm);
    
    var labels = document.getElementsByTagName('label');
    labels[0].style.borderRight = '1px solid rgba(238, 238, 238, 0.34)';
    labels[1].style.borderRight = '1px solid rgba(238, 238, 238, 0.34)';    
    
//    $('label').click(function() {
//      if (this.attr('checked', 'checked')) {
//          this.addClass('menuButtonHovered');
//      } else {
//          this.removeClass('menuButtonHovered');
//      }
//    });
//    
    
    
    //Toggle visibility of search block
    $('#callSearch').click(function() {
    if (state) {
        $('#searchWrapper').animate({
            'height': '100px',
            'opacity': '1',
        }, 300);
        if ( $('#favSection') ) {
            $('#favSection').animate({'top': '300px'}, 300);
        }
    } else {
         $('#searchWrapper').animate({
            'height': '0px',
            'opacity': '0',
             'margin-bottom': '0px'
        }, 300);
        if ( $('#favSection') ) {
            $('#favSection').animate({'top': '200px'}, 300);
        }
    }
    state = !state;
    });
});
 

$('.search-radio-text').click(function() {
    
});















