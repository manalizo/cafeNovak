document.addEventListener("DOMContentLoaded", function () {

  console.log("Carousel JS loaded ");

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

  const img = document.getElementById("carousel-image");
  const next = document.querySelector(".next");
  const prev = document.querySelector(".prev");

  if (!img || !next || !prev) {
    console.error("Carousel elements NOT found ");
    return;
  }

  function showImage() {
    img.style.opacity = "0";
    setTimeout(() => {
      img.src = images[index];
      img.style.opacity = "1";
    }, 200);
  }

  next.onclick = () => {
    index = (index + 1) % images.length;
    showImage();
  };

  prev.onclick = () => {
    index = (index - 1 + images.length) % images.length;
    showImage();
  };

  setInterval(() => {
    index = (index + 1) % images.length;
    showImage();
  }, 4000);

});
