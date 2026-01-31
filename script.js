/* ================== RECHERCHE PRODUITS ================== */
function searchProducts() {
  let input = document.getElementById("searchInput");
  let filter = input.value.toLowerCase();
  let items = document.querySelectorAll("#produits .product-list li");

  items.forEach(item => {
    let text = item.textContent.toLowerCase();
    item.style.display = text.includes(filter) ? "" : "none";
  });
}

/* ================== AVIS CLIENTS ================== */
let currentRating = 0;

function setRating(rating) {
  currentRating = rating;
  const stars = document.querySelectorAll(".star-input span");
  stars.forEach((star, index) => {
    if (index < rating) {
      star.classList.add("selected");
    } else {
      star.classList.remove("selected");
    }
  });
}

function addReview() {
  let name = document.getElementById("name").value;
  let message = document.getElementById("message").value;

  if (name === "" || message === "") {
    alert("Merci de remplir votre nom et votre avis");
    return;
  }

  let reviews = document.getElementById("reviews");

  let div = document.createElement("div");
  div.className = "review";
  div.innerHTML = "<strong>" + name + "</strong><p>" + message + "</p>" +
                  "<div class='stars' data-rating='" + currentRating + "'>" +
                  "★".repeat(currentRating) + "☆".repeat(5 - currentRating) +
                  "</div>";

  reviews.appendChild(div);

  document.getElementById("name").value = "";
  document.getElementById("message").value = "";
  currentRating = 0;
  document.querySelectorAll(".star-input span").forEach(star => star.classList.remove("selected"));

  updateAverageRating();
}

function updateAverageRating() {
  let allStars = document.querySelectorAll("#reviews .stars");
  if(allStars.length === 0) return;

  let total = 0;
  allStars.forEach(star => {
    total += parseInt(star.getAttribute("data-rating"));
  });
  let average = (total / allStars.length).toFixed(1);
  document.getElementById("average-rating").textContent = average;
}

// Calculer moyenne au chargement
updateAverageRating();

/* ================== INSCRIPTION / CONNEXION ================== */
function showSignup() {
  document.getElementById("signup-box").style.display = "block";
  document.getElementById("login-box").style.display = "none";
  document.getElementById("welcome-box").style.display = "none";
}

function showLogin() {
  document.getElementById("signup-box").style.display = "none";
  document.getElementById("login-box").style.display = "block";
  document.getElementById("welcome-box").style.display = "none";
}

function signup() {
  let name = document.getElementById("signup-name").value;
  let email = document.getElementById("signup-email").value;
  let password = document.getElementById("signup-password").value;

  if(!name || !email || !password){
    alert("Merci de remplir tous les champs");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users") || "[]");
  if(users.some(u => u.email === email)){
    alert("Email déjà utilisé !");
    return;
  }

  users.push({name, email, password});
  localStorage.setItem("users", JSON.stringify(users));

  alert("Compte créé avec succès !");
  showLogin();
}

function login() {
  let email = document.getElementById("login-email").value;
  let password = document.getElementById("login-password").value;

  let users = JSON.parse(localStorage.getItem("users") || "[]");
  let user = users.find(u => u.email === email && u.password === password);

  if(user){
    document.getElementById("signup-box").style.display = "none";
    document.getElementById("login-box").style.display = "none";
    document.getElementById("welcome-box").style.display = "block";
    document.getElementById("user-name").textContent = user.name;
  } else {
    alert("Email ou mot de passe incorrect !");
  }
}

function logout(){
  document.getElementById("signup-box").style.display = "block";
  document.getElementById("login-box").style.display = "none";
  document.getElementById("welcome-box").style.display = "none";
}

/* ================== BOUTON RETOUR EN HAUT ================== */
window.onscroll = function() {
  let topBtn = document.getElementById("topBtn");
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    topBtn.style.display = "block";
  } else {
    topBtn.style.display = "none";
  }
};

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
