$(document).ready(function () {

    // Toggle navbar na klik
    $('#navbar-toggler').click(function () {
        $('.navbar-collapse').slideToggle(400);
    });

    // Menjanje klase navbar na scroll
    $(window).scroll(function () {
        let pos = $(window).scrollTop();
        if (pos >= 100) {
            $('.navbar').addClass('cng-navbar');
        }
        else {
            $('.navbar').removeClass('cng-navbar');
        }
    });

    // Inicijalizacija Magnific Popup za YouTube linkove
    $(document).ready(function () {
        $('.popup-youtube').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });
    });

    // Owl Carousel za knjige
    $('.books .owl-carousel').owlCarousel({
        loop: true,
        margin: 10,
        autoplay: true,
        dots: true,
        nav: false,
        responsiveClass: true,
        responsive: {
            0: { items: 1 },
            600: { items: 2 },
            1000: { items: 3 }
        }
    });

    // FAQ accordion
    $('.faq-head').each(function () {
        $(this).click(function () {
            $(this).next().toggleClass('show-faq-content');
            let icon = $(this).children('span').children('i').attr('class');
            if (icon == 'fas fa-plus') {
                $(this).children('span').html('<i class="fas fa-minus"></i>');
            } else {
                $(this).children('span').html('<i class="fas fa-plus"></i>');
            }
        });
    });

    // Provera prilikom učitavanja stranice da li je korisnik već ulogovan
    if (localStorage.getItem('loggedInUser')) {
        showUserInfo();  
    }
});

function login() {
    document.getElementById("login-form").style.display = "block";
    document.getElementById("register-form").style.display = "none";
    document.getElementById("btn").style.left = "0";
}

function register() {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("register-form").style.display = "block";
    document.getElementById("btn").style.left = "110px";
}

// Funkcija za čuvanje podataka o korisniku prilikom registracije
function saveFormData() {
    const firstName = document.querySelector('#register-form input[placeholder="First Name"]').value;
    const lastName = document.querySelector('#register-form input[placeholder="Last Name"]').value;
    const email = document.querySelector('#register-form input[placeholder="Email Id"]').value;
    const password = document.querySelector('#register-form input[placeholder="Enter Password"]').value;

    const formData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
    };

    const formDataJSON = JSON.stringify(formData);
    localStorage.setItem('formData', formDataJSON);
    alert('Vaši podaci su sačuvani u LocalStorage!');
}

// Funkcija za prijavu korisnika
function loginUser() {
    const email = document.querySelector('#login-form input[placeholder="Email Id"]').value;
    const password = document.querySelector('#login-form input[placeholder="Enter Password"]').value;

    const formDataJSON = localStorage.getItem('formData');

    if (formDataJSON) {
        const formData = JSON.parse(formDataJSON);

        if (formData.email === email && formData.password === password) {
            alert('Dobrodošli u svet knjiga');
            localStorage.setItem('loggedInUser', email);  
            showUserInfo();  
        } else {
            alert('Pogrešan email ili lozinka');
        }
    } else {
        alert('Nema registrovanih korisnika');
    }
}

// Funkcija za prikazivanje podataka o korisniku
function showUserInfo() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        document.getElementById("login-register-info").style.display = "none";
        document.getElementById("user-info").style.display = "block";
        document.getElementById("user-email").textContent = loggedInUser;

        // Promeniti tekst u linku sa Login na Logout
        document.getElementById("auth-link").textContent = "Logout";
        document.getElementById("auth-link").setAttribute("href", "#login");
    }
}

// Funkcija za odjavu korisnika
function logoutUser() {
    localStorage.removeItem('loggedInUser');  // Brisanje podataka o ulogovanom korisniku
    document.getElementById("login-register-info").style.display = "block";
    document.getElementById("user-info").style.display = "none";
    
    // Promeniti tekst nazad na Login
    document.getElementById("auth-link").textContent = "Login";
    document.getElementById("auth-link").setAttribute("href", "#login");
}

// Event listener za odjavu
document.getElementById("logout-btn")?.addEventListener("click", logoutUser);

// Event listener za registraciju
const registerForm = document.getElementById('register-form');
if (registerForm) {
    registerForm.addEventListener('submit', function (e) {
        e.preventDefault();
        saveFormData();
        registerForm.reset();
    });
}

// Event listener za login
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        loginUser();
        loginForm.reset();
    });
}
