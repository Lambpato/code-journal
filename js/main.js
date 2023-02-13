var $img = document.querySelector('.entry-img');
var $url = document.querySelector('#Photo-URL');
function imageURL(e) {
  $img.setAttribute('src', $url.value);
}

$url.addEventListener('input', imageURL);
