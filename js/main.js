var $img = document.querySelector('.entry-img');
var $url = document.querySelector('#Photo-URL');
var $notes = document.querySelector('#Notes');
var $title = document.querySelector('#Title');
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
  data.entries.push(inputs);
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
}

$form.addEventListener('submit', submitForm);
$url.addEventListener('input', imageURL);
