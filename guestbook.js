// guestbook.js

document.getElementById('guestbook-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var name = document.getElementById('name').value;
    var message = document.getElementById('message').value;

    fetch('https://script.google.com/macros/s/AKfycbxLXe3T1CRbyE1KhyxofOYfI-RHVwHpScZ8MKQgXjxLKQfliX88RbXAK3EaNtiaK21J/exec', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'name=' + encodeURIComponent(name) + '&message=' + encodeURIComponent(message)
    })
    .then(response => response.text())
    .then(data => {
        if (data === 'Success') {
            alert('Message submitted successfully!');
            document.getElementById('guestbook-form').reset();
        } else {
            console.error('Error:', data);
        }
    })
    .catch(error => console.error('Error:', error));
});
