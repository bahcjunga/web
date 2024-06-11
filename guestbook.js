document.getElementById('guestbook-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var name = document.getElementById('name').value;
    var message = document.getElementById('message').value;

    fetch('https://script.google.com/macros/s/AKfycbzL65Xa2BcBDcF07CAp40tMGf5mGLnK7NRaNGfa4D7gI32mLEhzYnAGSZ5zSdHk0NVj0Q/exec', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'name=' + encodeURIComponent(name) + '&message=' + encodeURIComponent(message)
    })
    .then(response => response.text())
    .then(data => {
        if (data === 'Success') {
            var entry = document.createElement('div');
            entry.classList.add('entry');
            entry.innerHTML = `<strong>${name}</strong><p>${message}</p>`;
            document.getElementById('guestbook-entries').appendChild(entry);
            document.getElementById('guestbook-form').reset();
        } else {
            console.error('Error:', data);
        }
    })
    .catch(error => console.error('Error:', error));
});
