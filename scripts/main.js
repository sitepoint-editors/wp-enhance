'use strict';

const $editorToolbar = $('#ed_toolbar');
const $mainTextArea = $('#content');
const $timeStampDiv = $('#timestampdiv');
const $wpSchedulePostDropdown = $('.timestamp-wrap');
let $datepicker;

// WP default datetime field IDs
// mm = month / 01 - 12
// jj = day
// aa = year 4 digit
// hh = hour
// mn = min
const $dd = $('#jj');
const $mm = $('#mm');
const $yyyy = $('#aa');
const $hh = $('#hh');
const $mn = $('#mn');

function getShowdownConverter() {
  const converter = new showdown.Converter();

  // Set any options here, for example to add table support
  converter.setOption('tables', true);

  return converter;
}

function addMDButton() {
  const mdConverter = getShowdownConverter();
  const $convertButton = $('<input />', {
    type: 'button',
    value: 'MD',
    class: 'ed_button button button-small',
    title: 'Convert MD to HTML',
    click() {
      const md = $mainTextArea.val();
      const html = mdConverter.makeHtml(md);
      $mainTextArea.val(html);
    },
  });
  $editorToolbar.append($convertButton);
}

function addDatePicker() {
  $datepicker = $('<input />', {
    id: 'bandaid-datepicker',
    type: 'text',
    placeholder: 'Date and time',
  });

  $datepicker.datetimepicker();
  $timeStampDiv.prepend($datepicker);
}

addMDButton();

$wpSchedulePostDropdown.hide();
addDatePicker();

$datepicker.on('change', function updateDateFields() {
  // String in format yyyy/mm/dd hh:mm
  const dateString = this.value;

  $yyyy.val(dateString.substr(0, 4));
  $mm.val(dateString.substr(5, 2));
  $dd.val(dateString.substr(8, 2));
  $hh.val(dateString.substr(11, 2));
  $mn.val(dateString.substr(14, 2));
});
