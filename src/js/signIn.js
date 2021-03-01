//For the slider
import $ from  'jquery'

$("#login-more > div:gt(0)").hide();

setInterval(function() { 
  $('#login-more > div:first')
    .fadeOut(2000)
    .next()
    .fadeIn(2000)
    .end()
    .appendTo('#login-more');
},  4000);