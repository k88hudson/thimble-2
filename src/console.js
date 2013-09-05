requirejs.config({
  baseUrl: '../bower_components',
  paths: {
    main: '../src/main',
    jade: 'jade/runtime',
    templates: '../templates',
    jquery: 'jquery/jquery',
    ace: 'ace/lib/ace'
  }
});

require(['jquery'], function ($) {
  var $form = $('form');

  $('#submit').click(function(e) {
    e.preventDefault();

    var values = {};
    $('.input').each(function(i, el) {
      var name = $(el).attr('name');
      var val = $(el).val();
      if (val) {
        values[name] = val;
      }
    });

    $.ajax({
      type: 'POST',
      url: '/create',
      data: values,
      success: function( data, textStatus ) {
        console.log( data, textStatus );
      },
      error: function( jqXHR, textStatus, errorThrown ) {
        console.log( textStatus, errorThrown );
      }
    });

  });
});
