const user = JSON.parse(localStorage.getItem('user'));

if (user) {
  if (user.logged) {
    if (window.location.pathname.slice(1) === 'index.html') {
      null;
    } else {
      window.location.assign('./index.html');
    }
  } else {
    if (window.location.pathname.slice(1) === 'login.html') {
      null;
    } else {
      window.location.assign('./login.html');
    }
  }
} else {
  null;
}
