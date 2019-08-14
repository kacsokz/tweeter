$(() => {
  
  $("textarea").keyup(function() {
    // decrement counter
    const charMax = 140;
    const charLength = $(this).val().length;
    const char = charMax - charLength;
    const $counter = $(".counter");
    $counter.text(char);

    // change color of text to red when < charMax
    if (charLength > charMax - 1) {
      $counter.addClass("overMaxChar");
    } else if (charLength < charMax) {
      $counter.removeClass("overMaxChar");
    }
    
  });
   
  
});