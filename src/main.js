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

require([
  'jquery',
  'templates',
  'ace/ace'
], function (
  $,
  templates,
  ace
) {

  var $content = $('#content');
  var $body = $('body');
  var $wrapper = $('.wrapper');

  // PERSONA
  $body.attr('data-logged-in', false);
  $('#persona').on('click', function() {
    $body.attr('data-logged-in', true);
  });

  // SAVE
  $('#save').on('click', function () {
    $('#save').addClass('light');
    $('#save .icon').removeClass('icon-save');
    $('#save .icon').addClass('icon-spin icon-spinner');
    setTimeout(function () {
      $('#save .icon').removeClass('icon-spin icon-spinner')
        .addClass('icon-ok')
        .closest('.button').addClass('saved');
    }, 1000);
  });

  // TOOLBAR
  $('.panel-button').on('click', function () {
    var $this = $(this);
    if ( !$this.hasClass('active') ) {
      $('.panel-button.active').removeClass('active');
      $this.addClass('active');
      $content.addClass('expanded');
      $('.panel').removeClass('active');
      $('#' + $this.attr('id') + '-panel').addClass('active');
    } else {
      $content.removeClass('expanded');
      $('.panel').removeClass('active');
      $('.panel-button').removeClass('active');
    }
  });
  $('.close-button').on('click', function () {
    $content.removeClass('expanded');
    $('.buttons .active').removeClass('active');
    $('.panel').removeClass('active');
  });

  // INFO
  $('#info').on('click', function() {
    $('#info').toggleClass('active');
    $content.toggleClass('info-mode');
  });

  // INPUTS
  function onSaveClick() {
    var $this = $(this);
    $this.addClass('light');
    $this.attr('data-save', 'pending');
    setTimeout(function () {
      $this.attr('data-save', 'complete');
      $this.off('click', onSaveClick);
      $this.removeClass('light');
      $this.siblings('input').on('keyup', showSaveBtn);
    }, 2000);
  }

  function showSaveBtn(e) {
    var $this = $(this);
    var $saveBtn = $this.siblings('.save');

    $saveBtn.attr('data-save', 'dirty');
    $saveBtn.on('click', onSaveClick);
    $this.off('keyup', showSaveBtn);
  }
  $('input').on('keyup', showSaveBtn);

  var previewFrame = document.getElementById('preview');
  var preview = previewFrame.contentDocument || previewFrame.contentWindow.document;

  var editor = ace.edit('editor');
  editor.setTheme('ace/theme/dreamweaver');
  editor.getSession().setMode('ace/mode/html');
  editor.getSession().setTabSize(2);
  editor.setShowPrintMargin(false);

  function updatePreview() {
    var raw = editor.getValue();
    preview.open();
    preview.write(raw);
    preview.close();
  }

  editor.on('change', updatePreview);
  updatePreview();
  setTimeout(function() {
    $body.removeAttr('data-loading');
  }, 200);
});
