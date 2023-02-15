/* global data */
var $img = document.querySelector('.entry-img');
var $url = document.querySelector('#photo-url');
var $notes = document.querySelector('#notes');
var $title = document.querySelector('#title');
var $form = document.querySelector('form');
var $entryList = document.querySelector('.userEntries');
var $noEntry = document.querySelector('.noentry');
var $entries = document.querySelector('#entries');
var $anker = document.querySelector('.entries-nav');
var $newfrom = document.querySelector('.new-form');

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
  $entryList.prepend(renderEntry(inputs));
  viewSwap('entries');
  toggleNoEntries();
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
  $entryImg.setAttribute('src', entry.url);
  var $h2 = document.createElement('h2');
  $h2.textContent = entry.title;
  var $p = document.createElement('p');
  $p.textContent = entry.notes;
  $columnHalfLeft.appendChild($h2);
  $columnHalfLeft.appendChild($p);
  return $liEntry;
}

function appendEntries() {
  for (var i = 0; i < data.entries.length; i++) {
    $entryList.appendChild(renderEntry(data.entries[i]));
  }
}

function toggleNoEntries(entryId) {
  if (data.$entryImgnextEntryId === 1) {
    $noEntry.className = 'noentry';
  } else if (data.nextEntryId > 1) {
    $noEntry.className = 'noentry hidden';
  }
}

function viewSwap(view) {
  if (view === 'entries') {
    $form.className = 'hidden';
    $entries.className = 'view';
  } else if (view === 'entry-form') {
    $form.className = 'view';
    $entries.className = 'hidden';
  }
}

document.addEventListener('DOMContentLoaded', appendEntries());
$form.addEventListener('submit', submitForm);

$url.addEventListener('input', imageURL);
toggleNoEntries(data.nextEntryId.value);
$anker.addEventListener('click', function (event) {
  event.preventDefault();
  viewSwap('entries');
});
$newfrom.addEventListener('click', function (event) {
  event.preventDefault();
  viewSwap('entry-form');
});
