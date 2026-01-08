// Message de bienvenue
document.addEventListener("DOMContentLoaded", function () {
    console.log("Bienvenue au Café Aroma ☕");
});


(function () {
  emailjs.init("email_passKey");
})();

const form = document.getElementById("contactForm");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    emailjs.sendForm(
      "service_cafearoma", 
      "template_contact",
      form
    ).then(
      function () {
        alert("Message envoyé avec succès ✅");
        form.reset();
      },
      function (error) {
        alert("Erreur lors de l'envoi ❌");
        console.error("EmailJS error:", error);
      }
    );
  });
}
const images = [
  "../images/menu-espresso.jpg",
  "../images/menu-cappuccino.jpg",
  "../images/menu-latte.jpg",
  "../images/menu-mocha.jpg",
  "../images/menu-americano.jpg",
  "../images/menu-macchiato.webp",
  "../images/menu-flatwhite.jpg",
  "../images/menu-caramel-latte.avif",
  "../images/menu-tea.webp"
];

let index = 0;
const imgElement = document.getElementById("carousel-image");

function showImage(i) {
  imgElement.style.opacity = 0;

  setTimeout(() => {
    imgElement.src = images[i];
    imgElement.style.opacity = 1;
  }, 300);
}

document.querySelector(".next").addEventListener("click", () => {
  index = (index + 1) % images.length;
  showImage(index);
});

document.querySelector(".prev").addEventListener("click", () => {
  index = (index - 1 + images.length) % images.length;
  showImage(index);
});

/* Auto-slide (optionnel) */
setInterval(() => {
  index = (index + 1) % images.length;
  showImage(index);
}, 4000);
