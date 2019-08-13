$(document).ready(function() {
  
  $("textarea").keydown(function() {
    // decrement counter
    const charMax = 140;
    let length = $(this).val().length;
    length = charMax - length;
    $(".counter").text(length);

    // change color of text to red when < charMax
    if ($(this).val().length > charMax - 1) {
      $(".counter").addClass("red");
    } else if ($(this).val().length < charMax) {
      $(".counter").removeClass("red");
    }
    
  });
   
  
});