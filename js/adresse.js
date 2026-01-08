function getLocation() {
  const result = document.getElementById("result");

  if (!navigator.geolocation) {
    result.innerText = "La géolocalisation n'est pas supportée.";
    return;
  }

  navigator.geolocation.getCurrentPosition(success, error);

  function success(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
      .then(response => response.json())
      .then(data => {
        const city = data.address.city || data.address.town || data.address.village;
        const country = data.address.country;
        result.innerText = ` ${city}, ${country}`;
      })
      .catch(() => {
        result.innerText = "Impossible d'obtenir la ville.";
      });
  }

  function error() {
    result.innerText = "Localisation refusée par l'utilisateur.";
  }
}
