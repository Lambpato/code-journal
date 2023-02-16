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
var $newform = document.querySelector('.new-form');
var $editButton = document.querySelector('.fa-pencil');
var $secondHead = document.querySelector('h1');

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

  if (data.editing === null) {
    data.nextEntryId++;
    data.entries.unshift(inputs);
    $img.setAttribute('src', 'images/placeholder-image-square.jpg');
    e.target.reset();
    toggleNoEntries();
    $entryList.prepend(renderEntry(inputs));
  } else if (data.editing !== null) {
    inputs.entryId = data.editing.entryId;
    for (var i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === data.editing.entryId) {
        data.entries[i] = inputs;
      }
    }
    var $li = document.querySelectorAll('li');
    for (var y = 0; y < $li.length; y++) {
      if (Number($li[y].getAttribute('data-entry-id')) === data.editing.entryId) {
        $li[y].replaceWith(renderEntry(inputs));
      }
    }
    data.editing = null;
  }
  viewSwap('entries');
  $form.reset();
}

function renderEntry(entry) {
  var $liEntry = document.createElement('li');
  $liEntry.setAttribute('data-entry-id', entry.entryId);
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
  var $titleHeader = document.createElement('div');
  $titleHeader.className = 'title-header';
  var $h2 = document.createElement('h2');
  $h2.textContent = entry.title;
  var $editPencil = document.createElement('i');
  $editPencil.className = 'fa-solid fa-pencil';
  var $p = document.createElement('p');
  $p.textContent = entry.notes;
  $titleHeader.appendChild($h2);
  $titleHeader.appendChild($editPencil);
  $columnHalfLeft.appendChild($titleHeader);
  $columnHalfLeft.appendChild($p);
  return $liEntry;
}

function appendEntries() {
  for (var i = 0; i < data.entries.length; i++) {
    $entryList.appendChild(renderEntry(data.entries[i]));
  }
  viewSwap(data.view);
  toggleNoEntries();
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
    data.view = 'entries';
    $form.className = 'hidden';
    $entries.className = 'view';
  } else if (view === 'entry-form') {
    data.view = 'entry-form';
    $form.className = 'view';
    $entries.className = 'hidden';
  }
}

function editEntry(e) {
  if (e.target && e.target.matches('i')) {
    e.target.closest($editButton);
    viewSwap('entry-form');
    var $entryId = Number(e.target.closest('li').getAttribute('data-entry-id'));
    for (var i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === $entryId) {
        data.editing = data.entries[i];
      }
    }
    $img.setAttribute('src', data.editing.url);
    $title.value = data.editing.title;
    $url.value = data.editing.url;
    $notes.value = data.editing.notes;
    $secondHead.textContent = 'Edit Entry';
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
$newform.addEventListener('click', function (event) {
  event.preventDefault();
  viewSwap('entry-form');
  $secondHead.textContent = 'New Entry';
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
});
$entryList.addEventListener('click', editEntry);
