document.getElementById('guestbook-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the input values
    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;

    // Create a new entry element
    const entry = document.createElement('div');
    entry.classList.add('entry');
    entry.innerHTML = `<strong>${name}</strong><p>${message}</p>`;

    // Add the new entry to the guestbook entries
    document.getElementById('guestbook-entries').appendChild(entry);

    // Clear the form inputs
    document.getElementById('guestbook-form').reset();
});
