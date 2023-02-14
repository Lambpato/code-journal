/* global data */
var $img = document.querySelector('.entry-img');
var $url = document.querySelector('#photo-url');
var $notes = document.querySelector('#notes');
var $title = document.querySelector('#title');
var $form = document.querySelector('form');

function imageURL(e) {
  $img.setAttribute('src', $url.value);
}

function submitForm(e) {
  e.preventDefault();
  var inputs = {
    title: $title.value,
    url: $url.value,
    notes: $notes.value,
    entryId: data.nextEntryId
  };
  data.nextEntryId++;
  data.entries.unshift(inputs);
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  e.target.reset();
}

$form.addEventListener('submit', submitForm);
$url.addEventListener('input', imageURL);
