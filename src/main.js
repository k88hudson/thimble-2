requirejs.config({
  baseUrl: '../bower_components',
  paths: {
    main: '../src/main',
    jade: 'jade/runtime',
    templates: '../templates',
    jquery: 'jquery/jquery',
    ace: 'ace/lib/ace',
    lodash: 'lodash/lodash'
  }
});

require([
  'jquery',
  'templates',
  'ace/ace',
  'lodash'
], function ($, templates, ace, _) {

  var $content = $('#content');
  var $body = $('body');
  var $wrapper = $('.wrapper');

  // PERSONA
  $body.attr('data-logged-in', false);
  $('#persona').on('click', function() {
    $body.attr('data-logged-in', true);
  });

  // SENDDATA
  function saveToDB() {
    var data = {};
    $('[name]').each(function(i, el) {
      var val = $(el).val();
      if (val) {
        data[$(el).attr('name')] = val;
      }
    });
    var raw = editor.getValue();
    data.content = _.escape(raw);

    console.log('saving...', data);

    $.ajax({
      type: 'POST',
      url: data.id ? '/update' : '/create',
      id: data.id,
      data: data,
      success: function(result) {
        var data = result.data;
        history.pushState({}, data.title, '/project/' + data.id);
        console.log(data);
      },
      error: function( jqXHR, textStatus, errorThrown ) {
        console.log( textStatus, errorThrown );
      }
    });
  }

  var $saveButton = $('#save');
  function doSave() {
    $saveButton.attr('data-save', 'pending');
    saveToDB();
    setTimeout(function () {
      $saveButton.attr('data-save', 'complete');
    }, 1000);
  }

  function highlightSave() {
    $saveButton.attr('data-save', 'dirty');
  }

  // SAVE
  $saveButton.on('click', function() {
    if ( $saveButton.attr('data-save') === 'dirty') {
      doSave();
    } else {
      $('.panel-button.active').removeClass('active');
      $('#project').addClass('active');
      $content.addClass('expanded');
      $('.panel').removeClass('active');
      $('#project-panel').addClass('active');
    }

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
    $this.attr('data-save', 'pending');
    setTimeout(function () {
      $this.attr('data-save', 'complete');
      $this.off('click', onSaveClick);
      $this.siblings('label').attr('data-save', 'complete');
      $this.siblings('input').on('keyup', showSaveBtn);
    }, 2000);
  }

  function showSaveBtn(e) {
    var $this = $(this);
    var $saveBtn = $this.siblings('.save');

    $saveBtn.attr('data-save', 'dirty');
    $this.siblings('label').attr('data-save', 'dirty');
    $saveBtn.on('click', onSaveClick);
    $this.off('keyup', showSaveBtn);
  }
  $('input').on('keyup', showSaveBtn);

  var previewFrame = document.getElementById('preview');
  var preview = previewFrame.contentDocument || previewFrame.contentWindow.document;

  var content = _.unescape($('#editor').html());
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
  editor.on('change', highlightSave);

  updatePreview();
  setTimeout(function() {
    $body.removeAttr('data-loading');
  }, 200);
});
