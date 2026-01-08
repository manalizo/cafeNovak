fetch("https://ipapi.co/json/")
  .then(res => res.json())
  .then(data => {
    document.getElementById("ip").textContent = data.ip;
    document.getElementById("country").textContent = data.country_name;
    document.getElementById("city").textContent = data.city;

    // compteur visiteurs avec localStorage
    let count = localStorage.getItem("visitors");

    if (!count) {
      count = 1;
    } else {
      count = parseInt(count) + 1;
    }

    localStorage.setItem("visitors", count);
    document.getElementById("count").textContent = count;
  });
