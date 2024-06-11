<script>
  document.getElementById('guestbook-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var name = document.getElementById('name').value;
    var message = document.getElementById('message').value;

    var url = 'https://script.google.com/macros/s/AKfycbzHaVpjrB5eITALDzHM9V6gih7Hyq9yQ7sfNrdtJN2yaH0GIP17x5M0aN9VYrNpTnONTg/exec';  // 여기서 YOUR_SCRIPT_URL을 실제 URL로 변경합니다.

    fetch(url, {
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
