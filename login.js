const user = JSON.parse(localStorage.getItem('user'));

if (user) {
  if (user.logged) {
    if (window.location.pathname === '/password-manager/index.html') {
      null;
    } else {
      window.location.assign('/password-manager/index.html');
    }
  } else {
    if (window.location.pathname === '/password-manager/login.html') {
      null;
    } else {
      window.location.assign('/password-manager/login.html');
    }
  }
} else {
  null;
}
