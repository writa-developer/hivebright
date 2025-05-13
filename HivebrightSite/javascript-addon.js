//This code needs to go in between the <scrip> tags in the "Additional JavaScript" section of the Hivebright site.
function submitForm(event) {
    event.preventDefault(); // Prevent default form submission

    // Mapping topics to encrypted email addresses
    const emailMapping = {
        "General Inquiry": "admin[at]writa.us",
        "Cybersecurity": "admin[at]writa.us",
        "AI & Emerging Tech": "admin[at]writa.us",
        "Legislation & Policy": "admin[at]writa.us",
        "Vendor Partnerships": "admin[at]writa.us",
        "Committee Interest": "admin[at]writa.us",
        "Website": "admin[at]writa.us"
    };

    // Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;
    const topic = document.getElementById("topic").value;
    
    // Retrieve the masked email and format it properly
    let recipient = emailMapping[topic].replace("[at]", "@");

    // Construct mailto link
    let mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=Name: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0A%0A${encodeURIComponent(message)}`;

    // Open email client
    window.location.href = mailtoLink;
}

// Function to hide both types of headers
function hideGroupHeaders() {
// Find and hide the expanded header
const expandedHeader = document.querySelector('[data-testid="group-header-cover-picture"]');
if (expandedHeader && expandedHeader.parentElement) {
expandedHeader.parentElement.style.display = 'none';
console.log('Expanded header parent hidden');
}

// Find and hide the collapsed header
const collapsedHeader = document.querySelector('[data-testid="collapsed-group-header"]');
if (collapsedHeader) {
collapsedHeader.style.display = 'none';
console.log('Collapsed header hidden');
}
}

// Run function immediately for the current state
hideGroupHeaders();

// Set up a resize listener to handle window resizing
window.addEventListener('resize', function() {
setTimeout(hideGroupHeaders, 100);
});

// Use MutationObserver to detect DOM changes
const observer = new MutationObserver(function(mutations) {
hideGroupHeaders();
});

// Start observing the document with configured parameters
observer.observe(document.body, { 
childList: true,      // Watch for changes to direct children
subtree: true,        // Watch the entire subtree
attributes: false,    // Don't watch attribute changes
characterData: false  // Don't watch text content changes
});

// For safety, set an interval to check periodically (every 1 second)
const intervalId = setInterval(hideGroupHeaders, 1000);

// Stop the interval after 10 seconds to avoid performance issues
setTimeout(function() {
clearInterval(intervalId);
console.log('Periodic checking stopped');
}, 10000);

// Set up a handler for page load completion
window.addEventListener('load', hideGroupHeaders);
document.addEventListener('DOMContentLoaded', hideGroupHeaders);
 