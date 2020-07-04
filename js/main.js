"use strict";

//Our Services
$('.services-menu li').click(function () {
  $('.services-menu li').removeClass('active');
  $(this).addClass('active');
  const index = $(this).index();
  $('.service').removeClass('active');
  $(`.service:eq(${index})`).addClass('active');
});

//Our Amazing Work 
$(document).ready(function () {
  let $gallery = $('.our-work-gallery').isotope({
    itemSelector: '.our-work-gallery li',
    layoutMode: 'fitRows'
  });

  // bind filter button click
  $('.work-menu').on('click', 'li', function () {
    let filterValue = $(this).attr('data-filter');       
    $gallery.isotope({
      filter: filterValue
    });
  });

  // change is-checked class on buttons
  $('.work-menu').each(function (i, buttonGroup) {
    let $buttonGroup = $(buttonGroup);
    $buttonGroup.on('click', 'li', function () {
      $buttonGroup.find('.active').removeClass('active');
      $(this).addClass('active');
    });
  });

  // Isotope Load more button   
  const initShow = 12; 
  let counter = initShow; 
  let iso = $gallery.data('isotope'); 

  loadMore(initShow); 

  function loadMore(toShow) {
    $gallery.find(".hidden").removeClass("hidden");

    let hiddenElems = iso.filteredItems.slice(toShow, iso.filteredItems.length).map(function (item) {
      return item.element;
    });
    $(hiddenElems).addClass('hidden');
    $gallery.isotope('layout');

    //when no more to load, hide show more button
    if (hiddenElems.length == 0) {
      $("#load-more").hide();
    } 
  }

  //when load more button clicked
  $("#load-more").click(function () {
    if ($('.work-menu').data('active')) {
      //when filter button clicked, set initial value for counter
      counter = initShow;
      $('.work-menu').data('active', false);
    } else {
      counter = counter;
    };

    counter = counter + initShow;

    //show loading bar
    $('.lds-facebook').addClass('show');
    
    setTimeout(() => { $('.lds-facebook').removeClass('show'); loadMore(counter); }, 2 * 1000);
  });

  //when filter button clicked
  $(".work-menu").click(function () {
    $(this).data('active', true);
    loadMore(initShow);
  });
});

//What People Say
$('.circle-medium').click(function () {
  $('.circle-medium').removeClass('active');
  $(this).addClass('active');
  $('.review').removeClass('active');
  $(".circle-medium").each(function (i) {
    if ($(this).hasClass('active')) {
      $(`.review:eq(${i})`).addClass('active');
    }
  });
});

//Slick Slider
$('.reviwers').slick({
  infinite: false,
  slidesToShow: 4,
  slidesToScroll: 1,
  prevArrow: '<div class = "slider__button--prev"><i class="fas fa-chevron-left"></i></div>',
  nextArrow: '<div class = "slider__button--next"><i class="fas fa-chevron-right"></i></div>',
});