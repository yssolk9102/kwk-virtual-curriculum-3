let relativeURL = window.location.pathname;

document.addEventListener("DOMContentLoaded", function() {
  const logOutForm = document.querySelector('.logout-form');
  const logInForm = document.querySelector('.login-form');

  function checkLocation() {
    const check = true; 
    const isStaff = true; 

    if (relativeURL === '/kwk-virtual-curriculum/login/' && check === 'true') {
      showLinks(isStaff);
      displayLogout();
    } else if (relativeURL === '/kwk-virtual-curriculum/login/' && check === 'false') {
      displayLogin();
      var loginBtn = document.querySelector("#login-submit");
      loginBtn.addEventListener('click', logIn);
    } else if (relativeURL !== '/kwk-virtual-curriculum/login/' && check === 'true') {
      showLinks(isStaff);
    } else if (relativeURL !== '/kwk-virtual-curriculum/login/' && check === 'false') {
      window.location.replace('/kwk-virtual-curriculum/login/');
    }

  }

  checkLocation();

  function displayLogin() {
    logOutForm.style.display = 'none';
    logInForm.style.display = 'block';
  }

  function displayLogout() {
    logOutForm.style.display = 'block';
    logInForm.style.display = 'none';
    logOutForm.addEventListener('submit', logOut);
  }

  function showLinks(isStaff) {
    var links = document.querySelectorAll(".navbar-navigation--links .curriculum-links");

    if (isStaff === 'true') {
      for (var i = 0; i < links.length; i++) {
        links[i].style.display = 'block';
      }
    } else {
      links[0].style.display = 'none';
      links[1].style.display = 'block';
      links[2].style.display = 'block';
    }
  }

  function logIn(event) {
    event.preventDefault();

    let login = document.getElementById("login").value.trim();
    let password = document.getElementById("password").value.trim();

    if (checkLogin(login) && checkPassword(password)) {
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('isStaff', 'false');
      window.location.replace("/kwk-virtual-curriculum/");
      showLinks(false);
    } else if (checkStaffLogin(login) && checkStaffPassword(password)) {
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('isStaff', 'true');
      window.location.replace("/kwk-virtual-curriculum/");
      showLinks(true);
    } else {
      alert("Sorry! Try again.");

    }
  }

  function hideLinks() {
    var links = document.querySelectorAll(".navbar-navigation--links .curriculum-links");
    for (var i = 0; i < links.length; i++) {
      links[i].style.display = 'none';
    }
  }

  function checkLogin(login) {
    return login === "kwk";
  }

  function checkPassword(password) {
    return password === "boss";
  }

  function checkStaffLogin(login) {
    return login === "kwk2020";
  }

  function checkStaffPassword(password) {
    return password === "campteam";
  }

  function logOut(event) {
    event.preventDefault();
    localStorage.setItem('loggedIn', 'false');
    localStorage.setItem('isStaff', 'false');
    window.location.replace("/kwk-virtual-curriculum/login/");
    hideLinks();
  }

});
