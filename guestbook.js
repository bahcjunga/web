<!DOCTYPE html>
<html>
  <head>
    <base target="_top">
    <link rel="stylesheet" href="styles.html">
  </head>
  <body>
    <div class="container">
      <h1>Guestbook</h1>
      <form id="guestbook-form">
        <input type="text" id="name" placeholder="Your Name" required>
        <textarea id="message" placeholder="Your Message" required></textarea>
        <button type="submit">Submit</button>
      </form>
      <div id="guestbook-entries"></div>
    </div>
    <script>
      document.getElementById('guestbook-form').addEventListener('submit', function(event) {
        event.preventDefault();

        var name = document.getElementById('name').value;
        var message = document.getElementById('message').value;

        fetch('https://script.google.com/macros/s/AKfycbwbVMKkxiU50FLmcrZGOjrSD_kOBw3Ttula3-pWD-Usrb6817VgCaJWBqJwmz4F798P/exec', {
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
    </script>
  </body>
</html>
