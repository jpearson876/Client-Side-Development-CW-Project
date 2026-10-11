// I use the jQuery ready function to ensure the DOM is fully loaded before executing any code
$(document).ready(function() {

    // I hide the login redirect button by default and only show it when the user has successfully registered
    $('#loginRedirect').hide();

    // The code within this block is only ran when the user actually submits the registration form
    $('#registrationForm').on('submit', function(event) {

        // I grab the value in the name field and store it in a variable, I also do this for all the other fields later above their functions
        var name = $('#fullName').val();

        // This function checks if the name variable is empty 
        function nameVal() {

            // I check if the name variable is empty, and if it is I replace the text in the nameError span with an error message and return false, which is used later during the submission logic
            if (name == '') {
                $('#nameError').text('Please enter your name');
                return false;
            } 
            else {
                // If the variable isn't empty, I clear the error message and return true
                $('#nameError').text('');
                return true;
            }
        }

        // I decided to add some regex validation for the email field to make sure the user enters a valid email,
        // I found this pattern in a textbook and made slight edits to make it case insensitive
        var email = $('#email').val();
        var emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9.-]+$/;

        // This function works the same as the nammeVal() function, except it has an extra else if to check if the email variable matches the regex pattern
        function emailVal() {
            if (email == '') {
                $('#emailError').text('Email cannot be empty');
                return false;
            } 

            // If the email variable isn't empty, I check if it doesn't match the regex pattern with the .match() jQuery method,
                // if it doesn't match, the method returns null, which is the value I compare it to
                // Again, If the variable doesn't match the pattern I display an error and return false
            else if (email.match(emailRegex) == null) {
                $('#emailError').text('Please enter a valid email address');
                return false;
            } 
            else {
                $('#emailError').text('');
                return true;
            }
        }

        // Like the email field, I also used a regex pattern to validate the password field,
        // this pattern is much simpler and just checks if there is at least 1 number
        var password = $('#password').val();
        var passwordRegex = /[0-9]/g;

        // This function is similar to the last one, I used another regex pattern defined above to ensure the password contains at least 1 number,
        // I also used another else if to check if the password is under 9 characters
        function passwordVal() {
            if (password == '') {
                $('#passwordError').text('Please enter a password');
                return false;
            } 

            // If the password isn't empty, I compare the length of the password variable to 9 using the .length() method, if it's under 9 characters,
            // I display an error and return false
            else if (password.length < 9) {
                $('#passwordError').text('Password must be atleast 9 characters long')
                return false; 
            } 

            // If the password isn't empty and is 9 characters or longer, I compare it to the regex pattern using the .match() method again,
            // if it returns null, there isn't any numbers in the password, so I display an error and return false
            else if (password.match(passwordRegex) == null) {
                $('#passwordError').text('Password must contain at least 1 number and be atleast 9 characters long');
                return false;
            } 
            else {
                $('#passwordError').text('');
                return true;
            }
        }

        // I grab the value in the confirm password field and store it in a variable
        var confirmPassword = $('#confirmPassword').val();

        // This function checks if the confirmPassword variable is empty, if not I check if it doesn't match the password variable, if not, I clear the errors
        function confPassVal() {
            if (confirmPassword == '') {
                $('#confirmPassError').text('Password cannot be empty');
                return false;
            } 
            
            // If the confirmPassword variable isn't empty, checks if it doesn't match the password variable and displays an error and returns fals if so
            else if (confirmPassword != password) {
                $('#confirmPassError').text('Passwords do not match');
                return false;
            } 
            else {
                $('#confirmPassError').text('');
                return true;
            }
        }

        // Grabs the value in the age field and stores it in a variable
        var age = $('#age').val();

        // This function checks if the age variable is empty, if it is under 16, or if it's over 120
        function ageVal() {
            if (age == '') {
                $('#ageError').text('Please enter your age');
                return false;
            }

            // If the age variable isn't empty, I compare it to 16, and if it's below that value I display an error and return false
            else if (age < 16) {
                $('#ageError').text('You must be 16 or over to register on this site');
                return false;
            } 
            
            // If the age is above 16, I compare it to 120, and if it's above I display an error and return false
            // I used multiple else if's for more specific error messages
            else if (age > 120) {
                $('#ageError').text('Please enter an actual age');
                return false;
            } 
            else {
                $('#ageError').text('');
                return true;
            }
        }

        // Grabs the value in the country field and stores it in a variable
        var country = $('#country').val();

        // This function just checks if the country variable is empty, since this element just uses hardcoded values in a dropdown menu
        function countryVal() {
            if (country == '') {
                $('#countryError').text('Please select your country');
                return false;
            } 
            else {
                $('#countryError').text('');
                return true;
            }
        }

        // I use the preventDefault() method to stop the form from submitting before I can save the registration details and redirect the user
        event.preventDefault();
        
        // I created these variables to make the boolean logic easier to work with, they just run the functions and store either true or false
        // depending on if the field is valid or not
        var nameT = nameVal();
        var emailT = emailVal();
        var passwordT = passwordVal();
        var confPassT = confPassVal();
        var ageT = ageVal();
        var countryT = countryVal();

        // I use an if statement to check if any of these variables are false,
        // I used the not operator on each variable and used the or operator between each one,
        // if any of the variables have the value of false, the form is prevented from submitting
        if (!nameT || !emailT || !passwordT || !confPassT || !ageT || !countryT ) {
            event.preventDefault();
        } 
        
        // If all of the variables are true, I use the preventDefault() method again to prevent the form from submitting,
        // and save the name so that I can display it when logged in, and the email and password for the login logic,
        // I stored them in localStorage using the setItem() method, which takes in a key which I can use to find the other value later
        
        // Note: This is one of the worst practices in web dev, since sensitive information is being stored in plaintext, but I don't want to set up a backend server / database for this project,
        // so this is the best way I can save the details as far as I could find
        // It still works for the purpose of the project though
        else {
            event.preventDefault();

            localStorage.setItem('name', name);
            localStorage.setItem('email', email.toLowerCase());
            localStorage.setItem('password', password);

            // After I save the details, I update the empty success message span and show the login redirect button
            $('#regSuccess').text('Your account has been created successfully, you can now log in!');
            $('#loginRedirect').show();

            $('#loginRedirect').on('click', function() {
                window.location.href = 'login.html';
            })
        }
    })

    // This code only runs when the user submits the login form
    $('#loginForm').on('submit', function(event) {
        // For the login form, I compare the email and password previously saved to localStorage with the new email and password fields in the login form,
        // if they don't match, an error message is displayed and the form is prevented from submitting

        // Retrieves the saved email and password from localStorage
        var savedEmail = localStorage.getItem('email');
        var savedPassword = localStorage.getItem('password');

        // Retrieves the email and password from the login form fields
        
        // I used the toLowerCase() method on the email field so that it isn't case sensitive
        var email = $('#loginEmail').val().toLowerCase();
        var password = $('#loginPassword').val();

        // This function is used to check if the email field is empty
        function loginEmailVal() {
            if (email == '') {

                // If email field is empty, an error is displayed and false is returned
                $('#loginEmailError').text('Email can not be empty');

                // For whatever reason the form kept submitting even with an error, so I used preventDefault() again here and in the other
                // else and if statemtents in the interest of not spending too much time troubleshooting
                event.preventDefault();
                return false;
            } 
            
            // Pretty much just like the registration form logic, if the email field isn't empty, the error is clear and true is returned
            else {
                $('#loginEmailError').text('');
                event.preventDefault();
                return true;
            }
        }

        // Like the previous function, this one checks is the password field is empty, displays an error, and prevents the form from being submitted
        function loginPassVal() {
            if (password == '') {

                // If the password field is empty, displays an error and returns false
                $('#loginPasswordError').text('Password can not be empty');
                event.preventDefault();
                return false;
            } else {
                $('#loginPasswordError').text('');
                event.preventDefault();
                return true;
            }
        }

        // Same as before with the registration form, I use variables to store the boolean values returned by the functions
        var emailValidation = loginEmailVal();
        var passValidation = loginPassVal();

        // Checks if both the email and the password is not empty
        if (emailValidation == true && passValidation == true) {

            // If they aren't, checks if either of them don't match the saved details I stored in localStorage,
            // If they don't match, an error is displayed and the form is prevented from submitting
            if (savedEmail != email || savedPassword != password) {
                $('#loginPasswordError').text('incorrect email or password');
                event.preventDefault();
            } 
            
             // If they both match, the form is prevented from submitting to allow the user to read the message,
            // the error's are cleared, the login state is saved in localStorage,
            // and the user is redirected back to the home page after reading the alert
            else {
                event.preventDefault();
                $('#loginEmailError').text('');
                $('#loginPasswordError').text('')
                localStorage.setItem('loggedIn', 'true');

                $('#loginSuccess').text('You are now logged in!');
                $('#loginRedirect').show();

                $('#loginRedirect').on('click', function() {
                    window.location.href = 'index.html';
                });
    
        }
    }})
})
