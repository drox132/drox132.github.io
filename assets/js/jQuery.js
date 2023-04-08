$(function () {
    // Hide an element
    $(".red-box").hide();
   
    // Show it again
    $(".red-box").show();
   
    // Just toggle visibility depending on whether element is shown or hidden
    $(".red-box").toggle();  // hides
   
    // Up until this point, you can't even see what happens in the browser
    // because it happens in a matter of milliseconds.
   
    // Use show/hide as animations (not very commonly used)
    $(".green-box").hide(2000);
    $(".green-box").show(2000);


    //-------------------------------------------------------------------
    // Fade out red box immediately to 50% opacity (over 1 second)
  $(".red-box").fadeTo(3000, 0.5);
 
  // Wait 1 second, then fade out green box to 50% opacity (over 1 second)
  // This already using function chaining to call .fadeTo() directly on the
  // return value of .delay()
  $(".green-box").delay(3000).fadeTo(1000, 0.5);
 
  // Chaining even more function calls to create animation
  $(".blue-box").delay(3000).fadeTo(1000, 0.5).fadeTo(1000, 1.0).delay(1000).fadeOut();



  $(".red-box").fadeTo(4000, 0, function() {
 
    // This callback function is executed once outer animation finishes.
    // So the green box starts fading out once the red box finished fading out.
    $(".green-box").fadeTo(1000, 0, function() {
 
      // Similarly, any code inside this function will start executing only once
      // the green box finishes fading out (after 2 seconds)
      $(".blue-box").fadeTo(1000, 0);
    });
  });
 
    // Fade in lightbox after half a second
  $(".lightbox").delay(500).fadeIn(1000);

  $(".blue-box").mouseenter(function() {
    $(this).stop().fadeTo(500, 0.5);
  });
 
  $(".blue-box").mouseleave(function() {
    $(this).stop().fadeTo(500, 1);
  });
 
  // However, you can achieve the same with hover() as well. For this, you must
  // pass in two callback functions: first the one for mouseenter, then the one
  // for mouseleave.
  // So the following does the same as  the above, but for the red box:
  $(".red-box").hover(function() {
    $(this).stop().fadeTo(500, 0.5);
  }, function() {
    $(this).stop().fadeTo(500, 1);
  });






  
    // You can attach the same handler (callback function) for multiple events
  // using jQuery's on() function.
  // For instance, the following logs to the console whenever you click anywhere
  // on the page or press any key while the page/browser is focused.
  $("html").on("click keydown", function() {
    console.log("Mouse was clicked or key was pressed.");
  });
 
  // Let's use this to add a gallery that switches to the next image on click.
  var images = [
    "../../images/thumbs/01.jpg",
    "../../images/thumbs/02.jpg",
    "../../images/thumbs/03.jpg"
  ];
 
  // The following is the same as in the image slideshow code, except we now
  // use a click event instead of setTimeout().
  var i = 0;
  $(".gallery").find("img").on("click", function() {
    i = (i + 1) % images.length;
    $(this).fadeOut(function() {
      $(this).attr("src", images[i]).fadeIn();
    });
  });


//validacion del formulario

  // When the submit event comes in, we first validate all form fields
  // and abort submission if one of them is invalid. Also, we highlight all
  // invalid fields so that the user knows what to fix.
  $("#form").submit(function(event) {
    // First, read out all entered values.
    var name = $("#name").val();
    var password = $("#password").val();
    var message = $("#message").val();
    var checked = $("#checkbox").is(":checked");
 
    // Then we use our validation functions (defined below) to check each input.
    validateNameField(name, event);
    validatePasswordField(password, event);
    validateMessageField(message, event);
    validateCheckboxField(checked, event);
  });
 
  // == NEW PART ==
  // In addition to the previous form validation code, we now provide faster
  // feedback to the user, namely when moving to the next input element.
  enableFastFeedback($("#form"));
 
  function enableFastFeedback(formElement) {
    var nameInput = formElement.find("#name");
    var passwordInput = formElement.find("#password");
    var messageInput = formElement.find("#message");
    var checkboxInput = formElement.find("#checkbox");
 
    nameInput.blur(function() {
      var name = $(this).val();
      highlight($(this), isValidName(name));
    });
 
    passwordInput.blur(function() {
      var password = $(this).val();
      highlight($(this), isValidPassword(password));
    });
 
    messageInput.blur(function() {
      var message = $(this).val();
      highlight($(this), isValidMessage(message));
    });
 
    checkboxInput.change(function() {
      var isChecked = $(this).is(":checked");
      highlight($(this), isChecked);
    });
  }
 
  function highlight(element, isValid) {
    var color = "#811";  // red
    if (isValid) {
      color = "#181";  // green
    }
 
    element.css("box-shadow", "0 0 4px " + color);
  }
 
  // In the following, we define helper functions that each validate
  // one of the inputs. These will be used further down by our validation
  // functions.
 
  function isValidName(name) {
    return name.trim().length >= 2;
  }
 
  function isValidPassword(password) {
    return password.length >= 6 && /.*[0-9].*/.test(password);
  }
 
  function isValidMessage(message) {
    return message.trim() !== "";
  }
 
  // Next, we define the actual validation functions which use the helpers from
  // above. These validation functions add a hint for the user for each invalid
  // input and prevent the form from submitting if the input is invalid.
 
  // First, show a hint if the name is not valid or remove the hint if it's
  // now valid.
  function validateNameField(name, event) {
    if (!isValidName(name)) {
      $("#name-feedback").text("Por favor ingrese minimo dos caracteres");
      event.preventDefault();
    } else {
      $("#name-feedback").text("");
    }
  }
 
  // Do the same for the other inputs.
  function validatePasswordField(password, event) {
    if (!isValidPassword(password)) {
      $("#password-feedback").text("La pasword deberia tener 6 caracteres y contener 1 numero");
      event.preventDefault();
    } else {
      $("#password-feedback").text("");
    }
  }
 
  function validateMessageField(message, event) {
    if (!isValidMessage(message)) {
      $("#message-feedback").text("Por favor ingrese un mensaje.");
      event.preventDefault();
    } else {
      $("#message-feedback").text("");
    }
  }
 
  function validateCheckboxField(isChecked, event) {
    if (!isChecked) {
      $("#checkbox-feedback").text("Debe seleccionar esto.");
      event.preventDefault();
    } else {
      $("#checkbox-feedback").text("");
    }
  }




});
 



