// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery/dist/jquery.min
//= require activestorage
//= require turbolinks
//= require libs/monthly
//= require moment/moment
//= require libs/palette-color-picker.min
//= require jquery-datetimepicker/build/jquery.datetimepicker.full
//= require sweetalert2/dist/sweetalert2.all.min

//= require_tree .

$(document).on('turbolinks:load', function () {
  $('#calendar').monthly({
    mode: 'event',
    dataType: 'json',
    jsonUrl: '/api/v1/meetings.json',
    locale: 'en'
  });

  $('#add-event').on('click', showAddEventModal);
  $('#add-event-highlight').on('click', showAddEventHighlightModal);

  function showAddEventModal() {
    var html = '<div class="form-group">' +
        '<input id="title" type="text" class="form-control" placeholder="Title" />' +
        '</div>' +
        '<div class="form-group">' +
        '<input id="organizer_email" type="email" class="form-control" placeholder="Organizer Email" />' +
        '</div>' +
        '<div class="form-group">' +
        '<input id="start_time" type="datepicker" class="form-control" placeholder="Start Time" />' +
        '</div>' +
        '<div class="form-group">' +
        '<input id="end_time" type="datepicker" class="form-control" placeholder="End Time" />' +
        '</div>' +
        '<div class="form-group">' +
        '<input type="text" id="color-input" name="color" class="form-control picker" data-palette=\'["#0F8DFC","rgba(135,1,101)","#F00285","hsla(190,41%,95%,1)","#94B77E","#4C060A","#053F32","#ED8074","#788364"]\' value="#053F32">' +
        '</div>';

    swal({
      title: 'Add Event',
      html: html,
      showCancelButton: true,
      confirmButtonClass: 'btn btn-outline-primary m-right',
      cancelButtonClass: 'btn btn-outline-danger',
      buttonsStyling: false,
      showLoaderOnConfirm: true,
      onOpen: () => {
        $('[data-palette]').paletteColorPicker();

        $('#start_time').datetimepicker({
          format: 'Y-m-d H:i'
        });

        $('#end_time').datetimepicker({
          format: 'Y-m-d H:i'
        });
      },
      preConfirm: () => {
        var url = '/api/v1/meetings?meeting[title]='+ $('#title').val() +
            '&meeting[organizer_email]=' + $('#organizer_email').val() +
            '&meeting[start_time]=' + $('#start_time').val() +
            '&meeting[end_time]=' + $('#end_time').val() +
            '&meeting[color]=' + encodeURIComponent($('#color-input').val());

        return fetch(url, {
          method: 'POST',
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
          },
          credentials: "same-origin",
        }).then((response) => {
          return response.json();
        }).then((response) => {
          console.log(response)
          if (response.message) {
            swal.showValidationError(
                response.message
            )
          } else {
            window.location.reload(true) // TODO
          }
        })
      }
    })
  }

  function showAddEventHighlightModal() {
    var meetingId = $('#meeting-id').val();

    var html = '<div class="form-group">' +
        '<textarea id="highlight_text" class="form-control" placeholder="Highlight Text"></textarea>' +
        '</div>' +
        '<div class="form-group">' +
        '<input id="start_time" type="datepicker" class="form-control" placeholder="Start Time" />' +
        '</div>' +
        '<div class="form-group">' +
        '<input id="end_time" type="datepicker" class="form-control" placeholder="End Time" />' +
        '</div>';

    swal({
      title: 'Add Highlight',
      html: html,
      showCancelButton: true,
      confirmButtonClass: 'btn btn-outline-primary m-right',
      cancelButtonClass: 'btn btn-outline-danger',
      buttonsStyling: false,
      showLoaderOnConfirm: true,
      onOpen: () => {
        $('#start_time').datetimepicker({
          format: 'Y-m-d H:i'
        });

        $('#end_time').datetimepicker({
          format: 'Y-m-d H:i'
        });
      },
      preConfirm: () => {
        var url = '/api/v1/meetings/' + meetingId + '/highlights?highlight[highlight_text]='+ $('#highlight_text').val() +
            '&highlight[start_time]=' + $('#start_time').val() +
            '&highlight[end_time]=' + $('#end_time').val();

        return fetch(url, {
          method: 'POST',
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
          },
          credentials: "same-origin",
        }).then((response) => {
          return response.json();
        }).then((response) => {
          console.log(response)
          if (response.message) {
            swal.showValidationError(
                response.message
            )
          } else {
            window.location.reload(true) // TODO
          }
        })
      }
    })
  }
});
