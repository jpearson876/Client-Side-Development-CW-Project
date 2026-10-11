// A message is logged to confirm the page has loaded
console.log("about.js loaded");

// No code will be run until the document is fully loaded
document.addEventListener("DOMContentLoaded", function () {

    // Makes an element clickable and redirect to the relevant URL
    function go(id, url) {
        const el = document.getElementById(id);

        // Checks the element exists to avoid errors
        if (el) {
            // Add a click event listener to the element
            el.addEventListener("click", function () {
                // Redirect the browser to the specified URL
                window.location.href = url;
            });
        }
    }

    // Gets the "back to top" button by its ID
    const topBtn = document.getElementById("topBtn");

    // IF statement checks if the button exists
    if (topBtn) {
        topBtn.addEventListener("click", function () {

            // When clicked, the website will slowly scroll to the top
            window.scrollTo({
                top: 0,             
                behavior: "smooth"   
            });
        });
    }

});
