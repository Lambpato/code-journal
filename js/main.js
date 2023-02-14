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

function renderEntry(entry) {
  var $liEntry = document.createElement('li');
  var $row = document.createElement('div');
  $row.className = 'row';
  $liEntry.appendChild($row);
  var $columnHalf = document.createElement('div');
  $columnHalf.className = 'column-half';
  $row.appendChild($columnHalf);
  var $columnHalfLeft = document.createElement('div');
  $columnHalfLeft.className = 'column-half';
  $row.appendChild($columnHalfLeft);
  var $entryImg = document.createElement('img');
  $columnHalf.appendChild($entryImg);
  $entryImg.setAttribute('src', $url.value);
  var $h2 = document.createElement('h2');
  $h2.textContent = $title.value;
  var $p = document.createElement('p');
  $p.textContent = $notes.value;
  $columnHalfLeft.appendChild($h2);
  $columnHalfLeft.appendChild($p);
  return $liEntry;
}

$form.addEventListener('submit', submitForm);
$url.addEventListener('input', imageURL);
