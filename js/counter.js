
  fetch('http://localhost:3000/ipinfo')
    .then(res => res.json())
    .then(data => {
      document.getElementById('count').textContent = data.totalVisitors;
      document.getElementById('location').textContent =
        `${data.city}, ${data.country}`;
    })
    .catch(() => {
      document.getElementById('location').textContent = 'Unknown';
    });
