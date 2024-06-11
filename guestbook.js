<script>
  document.getElementById('guestbook-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var name = document.getElementById('name').value;
    var message = document.getElementById('message').value;

    var url = 'https://script.google.com/macros/s/AKfycby_lGOaP6s241-4PKi92FmR-urCo8ifSKCLgneOZod-c-7mv7v6tE8UlZE36IMstYLqjQ/exec';  // 여기서 YOUR_SCRIPT_URL을 실제 URL로 변경합니다.

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
