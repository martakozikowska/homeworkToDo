// DARK MODE - Funkcja odpowiadająca za zmianę kolorystyki na tryb ciemny

//Zmień na tryb ciemny po kliknięciu na przycisk
const button = document.querySelector("#btnDark");

function darkmode() {
  const body = document.querySelector("body");
  const currentColor = getComputedStyle(body).backgroundColor;
  const btnDark = document.querySelector(".btn-dark");
  const mainStudy = document.querySelector(".main-study");
  const mainHome = document.querySelector(".main-home");
  const mainOther = document.querySelector(".main-other");
  const listStudy = document.querySelector(".list-study");
  const listHome = document.querySelector(".list-home");
  const listOther = document.querySelector(".list-other");
  const inputs = document.querySelectorAll(".input");

  // Sprawdź, aktualny kolor tła, jeśli to rgb(27, 27, 27) zmieniaj kolory elementów
  if (currentColor === "rgb(27, 27, 27)") {
    body.style.backgroundColor = "rgb(244, 244, 244)";
    body.style.color = "rgb(0, 0, 0)";
    document.querySelector(".logo").src = "./assets/logo.png";
    
    btnDark.style.backgroundColor = "rgb(0, 0, 0)";
    btnDark.style.color = "rgb(255, 255, 255)";
    btnDark.textContent = "+";

    mainStudy.style.backgroundColor = "rgb(133, 166, 218)";
    mainHome.style.backgroundColor = "rgb(133, 208, 218)";
    mainOther.style.backgroundColor = "rgb(173, 166, 228)";
    listStudy.style.backgroundColor = "rgb(254, 254, 254)";
    listHome.style.backgroundColor = "rgb(254, 254, 254)";
    listOther.style.backgroundColor = "rgb(254, 254, 254)";
    
    inputs.forEach(input => {
      input.style.backgroundColor = "rgb(255, 255, 255)";
      input.style.borderColor = "rgb(202, 202, 202)";
      input.style.color = "rgb(0, 0, 0)";
    });

  } else {
    body.style.backgroundColor = "rgb(27, 27, 27)";
    body.style.color = "rgb(255, 255, 255)";
    document.querySelector(".logo").src = "./assets/logo_white.png";
    
    btnDark.style.backgroundColor = "rgb(255, 255, 255)";
    btnDark.style.color = "rgb(0, 0, 0)";
    btnDark.textContent = "-";
    
    mainStudy.style.backgroundColor = "rgb(0, 0, 0)";
    mainHome.style.backgroundColor = "rgb(0, 0, 0)";
    mainOther.style.backgroundColor = "rgb(0, 0, 0)";
    listStudy.style.backgroundColor = "rgb(49, 49, 49)";
    listHome.style.backgroundColor = "rgb(49, 49, 49)";
    listOther.style.backgroundColor = "rgb(49, 49, 49)";
    
    inputs.forEach(input => {
      input.style.backgroundColor = "rgb(73, 73, 73)";
      input.style.borderColor = "rgb(73, 73, 73)";
      input.style.color = "rgb(255, 255, 255)";
    });

  }
}

button.addEventListener("click", darkmode);
