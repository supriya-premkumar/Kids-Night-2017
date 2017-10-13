$(#image img).click(function() {
  //set the form value
  $('#image-value').val($(this).attr('data-value'));

  //Unhighlight all the images
  $('#select-form img').removeClass('highlighted');

  // Highlight the newly selected image
  $(this).addClass('highlighted');

});
