$(document).ready(function() {

    // Function to show or hide content when button is pressed
    function infoReveal() {
        // Runs code on button click
        $('.infoButton').click(function() {
            
            // Assigns the value associated with the button clicked to a variable
            var id = $(this).val();

            // Checks if content is visible, fades out if so
            if ($(id).is(':visible')) {
                $(id).fadeOut();

            // If content is hidden, fades in
            } else {
                $(id).fadeIn();
            }
        });
    }

    // Calls functions
    infoReveal();
});
