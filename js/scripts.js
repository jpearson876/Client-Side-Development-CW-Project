// Just like the validation file, I use the jQuery ready function to make sure the DOM is loaded before executing any functions
$(document).ready(function() {

    // I wrapped my login state code inside a function for readability sake
    function logInState() {

        // I retrieve the login state and name from localStorage (obtained from validation.js)
        var isLoggedIn = localStorage.getItem('loggedIn');
        var name = localStorage.getItem('name');

        // I check if the user is already logged in by checking if the loggedIn item in localStorage has the value 'true'
        if (isLoggedIn === 'true') {

            // If they are, I unhide the elements with the loggedIn class using the show() method
            $('.loggedIn').addClass('unhideLoggedIn');

            // I inject the name previously retrieved into the welcome message in the navbar
            $('#welcomeMessage').text('Welcome, ' + name + '!');

            // To allow the user to log out, I used the jQuery click() method to run the code below when the logout button is clicked
            $('#logOutButton').click(function(event) {
                // Again, I use the preventDefault() method to stop the page from reloading before the user can read the alert
                event.preventDefault();

                // I set the loggedIn item in localStorage to 'false' to end the session
                localStorage.setItem('loggedIn', 'false');

                // I inject a message to inform the user that they have been logged out
                $('.loggedOut').addClass('unhideLoggedOut');
                $('.loggedIn').removeClass('unhideLoggedIn');

                $('.logOutMessage').fadeIn().delay(3000).fadeOut();
            });
        } 

        else {
            // If the user isn't logged in, I show the elements with the loggedOut class
            $('.loggedOut').addClass('unhideLoggedOut');
        }
    }

    // Here I call the function to run the code
    logInState();
});
