// external js: masonry.pkgd.js
// var $grid = $('.grid').masonry({
//   fitWidth: true,
//   itemSelector: '.grid-item'
// });

var photosets = []

var flickerAPI = "https://api.flickr.com/services/rest/?&method=flickr.photosets.getList&api_key=41dd3aff041c00c52febdef9786a9ca0&user_id=139169754@N02&format=json&nojsoncallback=1&privacy_filter=1";
$.getJSON(flickerAPI, {
  format: "json"
})
.done(function( data ) {
  photosets = data.photosets.photoset
  $.each( photosets, function(i, photoset){
    getphotos(photoset)
  })
  // while ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
  //   var elems = [ getItemElement(), getItemElement(), getItemElement() ];
  //   var $elems = $( elems );
  //   $grid.append( $elems ).masonry( 'appended', $elems );
  // }

});

var all_photos = []
var all_photos_index = 0

var getphotos = function( photoset ){
  call = "https://api.flickr.com/services/rest/?&method=flickr.photosets.getPhotos&api_key=41dd3aff041c00c52febdef9786a9ca0&user_id=139169754@N02&format=json&nojsoncallback=1&privacy_filter=1&photoset_id=" + photoset.id;
  $.getJSON(call, {
    format: "json"
  })
  .done(function( data ) {
    $.each( data.photoset.photo, function( i, p ) {
      var url = "https://farm" + p.farm + ".staticflickr.com/" + p.server + "/" + p.id + "_" + p.secret + "_z.jpg"
      all_photos.push(url)
    })
  })
};




// create <div class="grid-item"></div>
function getItemElement() {
  var elem = document.createElement('div');
  elem.className = 'grid-item ';
  var img = document.createElement("img");
  img.setAttribute("src", all_photos[all_photos_index]);
  all_photos_index += 1;
  elem.appendChild(img)
  return elem;
}


function getItems(){
  return $( [getItemElement(), getItemElement(), getItemElement()])
}


$( function() {

  var $grid = $('#grid').masonry({
    itemSelector: '.item',
    fitWidth: true,
  });

  $('#load-images').click( function() {
    var $items = getItems();
    $grid.append( $items ).masonry( 'appended', $items );

    // // hide by default
    // $items.hide();
    // // append to container
    // $container.append( $items );
    // $items.imagesLoaded().progress( function( imgLoad, image ) {
    //   // get item
    //   // image is imagesLoaded class, not <img>
    //   // <img> is image.img
    //   var $item = $( image.img ).parents('.item');
    //   // un-hide item
    //   $item.show();
    //   // masonry does its thing
    //   $container.masonry( 'appended', $item );
    // });
  });
  
});









// window.onscroll = function(ev) {
//     if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
//       var elems = [ getItemElement(), getItemElement(), getItemElement() ];
//       // make jQuery object
//       var $elems = $( elems );
//       $grid.append( $elems ).masonry( 'appended', $elems );
//     }
// };

// $('.append-button').on( 'click', function() {
//   var elems = [ getItemElement(), getItemElement(), getItemElement() ];
//   // make jQuery object
//   var $elems = $( elems );
//   $grid.append( $elems ).masonry( 'appended', $elems );
// });
