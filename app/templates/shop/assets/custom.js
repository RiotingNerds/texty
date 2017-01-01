jQuery(function($){

  $('.menu .sub-links').not($('.sub-menu .sub-links')).wrap('<div class="sub-menu" />');/* Fix for Custom Link only */
  
  $('.main-menu > ul > li > .sub-menu').each(function (index, element) {
    if ($(element).children().hasClass('sub-posts') && $(element).children().hasClass('sub-links')) {
      $(element).parent().addClass('sub-menu-two-columns');
    } else if ($(element).children().hasClass('sub-posts') && (!$(element).children().hasClass('sub-links'))) {
      $(element).parent().addClass('sub-menu-full-width');
    } else if ($(element).find('.sub-links').length > 2) {
      $(element).parent().addClass('sub-menu-columns');   
    } else {
      $(element).parent().addClass('sub-links-only');
    }
    
    if ($(element).children().length) {
      $(element).parent().addClass('link-arrow');
    }
  });
  
  $('.sub-menu-columns > .sub-menu > .sub-links').each(function (index, element) {
    var count = $(element).children().length;
    $(element).parents('.sub-menu-columns').addClass('sub-menu-columns-'+count);
  });

  $('.sub-menu').each(function (index, element) {
    if ($(element).children().length === 0) {
      $(element).remove();
    }
  });

  $('#pageslide .menu li').find('.sub-menu').before('<span class="plus"></span>');
  $('#pageslide .menu li .plus').on('click', function (e) {
    $(this).toggleClass("expanded");
    $(this).next().slideToggle();
  });
  var sidebar = $('#pageslide');
  $('.main-menu, #masthead:not(.hide-strip) .secondary-menu').children().clone().removeAttr('id').appendTo($(sidebar));
  $(sidebar).children().nextUntil().wrap('<div class="block" />');
  
  $('#open-pageslide').click(function(event) {
    event.preventDefault();
    $('body').toggleClass('st-menu-open');
  });
  
  $('#close-pageslide').click(function(event) {
    event.preventDefault();
    $('body').removeClass('st-menu-open');
  });
  
  //$( '.main-menu li:has(ul),.secondary-menu li:has(ul)' ).doubleTapToGo();
  
});