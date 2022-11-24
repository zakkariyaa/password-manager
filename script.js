const icons = [
  '<i class="uil uil-asterisk"></i>',
  '<i class="uil uil-key-skeleton"></i>',
  '<i class="uil uil-padlock"></i>',
  '<i class="uil uil-lock"></i>',
  '<i class="uil uil-cloud-lock"></i>',
  '<i class="uil uil-shield-check"></i>',
  '<i class="uil uil-keyhole-circle"></i>',
];

// General functions
const updateLocalStorage = (feild, value) => {
  const user = JSON.parse(localStorage.getItem('user'));
  user[feild] = value;
  localStorage.removeItem('user');
  localStorage.setItem('user', JSON.stringify(user));
  location.reload();
};

const displayError = (button, errorText, className = false) => {
  const oldSpan = document.querySelector('form span');
  if (oldSpan) {
    null;
  } else {
    const span = document.createElement('span');
    span.textContent = errorText;
    span.className = className;
    button.parentElement.insertBefore(span, button);
  }
};

// ************************************************
// Register specific code
if (location.pathname === '/register.html') {
//   const submitButton = document.querySelector('.signup');
//   const registartionform = document.querySelector('form');

//   registartionform.addEventListener('submit', (event) => {
//     event.preventDefault();
//     const formElements = Array.from(event.target.children);
//     const inputs = formElements.filter((el, idx) => idx % 2 !== 0).slice(0, -1);

//     const firstName = inputs[0].value;
//     const lastName = inputs[1].value;
//     const username = inputs[2].value;
//     const password = inputs[3].value;
//     const confirmPassword = inputs[4].value;

//     const passwordsMatch = password === confirmPassword;
//     if (passwordsMatch) {
//       const user = {
//         firstName,
//         lastName,
//         username,
//         password,
//         logged: true,
//       };
//       localStorage.setItem('user', JSON.stringify(user));
//       location.reload();
//     } else {
//       displayError(submitButton, 'Passwords must match', 'wrong-password');
//     }
//   });
  console.log('hello world')
}

// ************************************************
// Login specific code
if (location.pathname === '/login.html') {
  const loginForm = document.querySelector('.login-form');
  const loginButton = document.querySelector('.login-button');

  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formElements = Array.from(event.target.children);
    const userName = formElements[1].value;
    const password = formElements[3].value;

    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      if (user.username === userName && user.password === password) {
        updateLocalStorage('logged', true);
      } else {
        displayError(loginButton, 'Incorrect credentials');
      }
    } else {
      displayError(loginButton, 'User does not exist');
    }
  });
}

// ************************************************
// Homepage specific code
if (location.pathname === '/index.html') {
  // create passwords object and store it in the localStorage
  if (JSON.parse(localStorage.getItem('passwords'))) {
    null;
  } else {
    const passwords = {};
    localStorage.setItem('passwords', JSON.stringify(passwords));
  }

  // go to homepage when logo or passwords is clicked
  document.querySelector('header > h2').addEventListener('click', () => {
    location.assign('./index.html');
  });
  document.querySelector('.main-header > h3').addEventListener('click', () => {
    location.assign('./index.html');
  });

  // check if user is logged in
  const userIsLogged = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      return user.logged;
    } else {
      return null;
    }
  };

  // logout user
  const logOutUser = () => {
    updateLocalStorage('logged', false);
  };

  // change login/logout button depending if user is logged in
  if (userIsLogged()) {
    const header = document.querySelector('header');
    const loginLink = document.querySelector('header > a');
    const logoutLink = document.createElement('a');
    logoutLink.textContent = 'Log Out';
    logoutLink.href = '#';

    header.replaceChild(logoutLink, loginLink);

    logoutLink.addEventListener('click', logOutUser);
  }

  // login restricted functionalities
  const main = document.querySelector('main');
  const mainBody = document.querySelector('.main-body');
  const generatePasswordButton = document.querySelector('.generate-password');
  const addPasswordButton = document.querySelector('.add');

  // generate form to add passwords
  const generateForm = () => {
    const form = document.createElement('form');
    form.className = 'generated-form';

    const addPassword = document.createElement('h4');
    addPassword.textContent = 'Add Password';

    const serviceLabel = document.createElement('label');
    serviceLabel.textContent = 'Service name';
    const serviceInput = document.createElement('input');
    serviceInput.id = 'service-name';
    serviceInput.required = true;

    const emailLabel = document.createElement('label');
    emailLabel.textContent = 'Email';
    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.id = 'email';
    emailInput.required = true;

    const passwordLabel = document.createElement('label');
    passwordLabel.textContent = 'Password';
    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.id = 'password';
    passwordInput.required = true;

    const submitButton = document.createElement('button');
    submitButton.textContent = 'Submit';
    submitButton.type = 'submit';
    submitButton.className = 'submit';

    form.append(addPassword);
    form.append(serviceLabel);
    form.append(serviceInput);
    form.append(emailLabel);
    form.append(emailInput);
    form.append(passwordLabel);
    form.append(passwordInput);
    form.append(submitButton);

    return form;
  };

  // store password in the localStorage
  // prettier-ignore
  const storePassword = (serviceName, email, password, newServiceName = false) => {
    const passwords = JSON.parse(localStorage.getItem('passwords'));
    localStorage.removeItem('passwords');

    if (newServiceName) {
      delete passwords[serviceName];
      passwords[newServiceName] = { email, password };
    } else {
      passwords[serviceName] = { email, password };
    }

    localStorage.setItem('passwords', JSON.stringify(passwords));
    location.reload();
  };

  // display stored passwords on the page
  const displayPasswords = (passwordObject = false) => {
    let passwords = '';
    if (passwordObject) {
      passwords = passwordObject;
    } else {
      passwords = JSON.parse(localStorage.getItem('passwords'));
    }

    for (let password of Object.keys(passwords)) {
      const randomIcon = Math.floor(Math.random() * (icons.length - 1));
      const article = document.createElement('article');
      article.className = 'password-item';

      const span = document.createElement('span');
      span.innerHTML = icons[randomIcon];
      const h4 = document.createElement('h4');
      h4.textContent = password;
      const p = document.createElement('p');
      p.textContent = passwords[password]['email'];

      article.append(span);
      article.append(h4);
      article.append(p);

      mainBody.append(article);
    }
  };

  // display stored passwords only if user is logged in
  if (userIsLogged()) displayPasswords();

  // expanded password article section
  // delete iteam
  const deleteArticle = (deleteButtonEl) => {
    // prettier-ignore
    const serviceName = deleteButtonEl.parentElement.parentElement.children[0].textContent;
    const passwords = JSON.parse(localStorage.getItem('passwords'));
    localStorage.removeItem('passwords');
    delete passwords[serviceName];
    localStorage.setItem('passwords', JSON.stringify(passwords));
    location.reload();
  };

  // edit item
  const editArticle = (editButtonEl) => {
    // prettier-ignore
    const serviceName = editButtonEl.parentElement.parentElement.children[0].textContent;
    const password = JSON.parse(localStorage.getItem('passwords'))[serviceName];

    const editForm = generateForm();
    const articleDetails = document.querySelector('.article-details');

    editForm.children[0].textContent = 'Edit Password';
    editForm.children[2].value = serviceName;
    editForm.children[4].value = password['email'];
    editForm.children[6].value = password['password'];

    main.replaceChild(editForm, articleDetails);
    addPasswordButton.style.display = 'none';

    const editFormElement = document.querySelector('main form');
    editFormElement.addEventListener('submit', (event) => {
      event.preventDefault();
      const editFormInputs = Array.from(event.target.children);

      const newServiceName = editFormInputs[2].value;
      const email = editFormInputs[4].value;
      const password = editFormInputs[6].value;

      storePassword(serviceName, email, password, newServiceName);
    });
  };

  const showPassword = (password, button) => {
    const passwordP = document.querySelector('.article-details > div p');
    passwordP.textContent = password;
    button.innerHTML = '<i class="uil uil-eye"></i>';
  };

  const hidePassword = (text, button) => {
    const passwordP = document.querySelector('.article-details > div p');
    passwordP.textContent = text;
    button.innerHTML = '<i class="uil uil-eye-slash"></i>';
  };

  // expand articles that display passwords on the page
  const expandPasswordArticle = (article) => {
    const serviceName = article.children[1].textContent;
    // prettier-ignore
    const articleDetails = JSON.parse(localStorage.getItem('passwords'))[serviceName];

    const div = document.createElement('div');
    div.className = 'article-details';
    const h4 = document.createElement('h4');
    h4.textContent = serviceName;
    const emailP = document.createElement('p');
    emailP.textContent = articleDetails['email'];
    // for grouping password paragraph with the showPasswordButton
    const showPasswordDiv = document.createElement('div');
    showPasswordDiv.className = 'show-password';

    const passwordP = document.createElement('p');
    passwordP.textContent = '********';
    const showPasswordButton = document.createElement('button');
    showPasswordButton.className = 'show-hide-password';
    showPasswordButton.innerHTML = '<i class="uil uil-eye-slash"></i>';

    // for grouping bottom buttons
    const bottomButtons = document.createElement('div');
    bottomButtons.className = 'bottom-buttons';
    const editButton = document.createElement('button');
    editButton.className = 'edit-button';
    editButton.textContent = 'Edit';
    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    deleteButton.textContent = 'Delete';

    div.append(h4);
    div.append(emailP);

    showPasswordDiv.append(passwordP);
    showPasswordDiv.append(showPasswordButton);
    div.append(showPasswordDiv);

    bottomButtons.append(editButton);
    bottomButtons.append(deleteButton);
    div.append(bottomButtons);

    main.replaceChild(div, mainBody);
    addPasswordButton.style.display = 'none';

    // show/hide password with button click
    let passwordShown = false;
    const showHidePassword = document.querySelector('.show-hide-password');
    showHidePassword.addEventListener('click', () => {
      if (passwordShown) {
        hidePassword('********', showHidePassword);
        passwordShown = false;
      } else {
        showPassword(articleDetails['password'], showHidePassword);
        passwordShown = true;
      }
    });

    // delete button
    const deleteButtonEl = document.querySelector('.delete-button');
    deleteButtonEl.addEventListener('click', () => {
      deleteArticle(deleteButtonEl);
    });

    // edit button
    const editButtonEl = document.querySelector('.edit-button');
    editButtonEl.addEventListener('click', () => {
      editArticle(editButtonEl);
    });
  };

  for (let article of document.querySelectorAll('.password-item')) {
    article.addEventListener('click', () => {
      expandPasswordArticle(article);
    });
  }

  // display the form on the page
  addPasswordButton.addEventListener('click', () => {
    if (userIsLogged()) {
      // need to extract this code into function - DRY
      const addForm = generateForm();
      main.replaceChild(addForm, mainBody);
      addPasswordButton.style.display = 'none';

      const addFormElement = document.querySelector('main form');
      addFormElement.addEventListener('submit', (event) => {
        event.preventDefault();
        const addFormInputs = Array.from(event.target.children);

        const serviceName = addFormInputs[2].value;
        const email = addFormInputs[4].value;
        const password = addFormInputs[6].value;

        storePassword(serviceName, email, password);
      });
    } else {
      location.assign('./login.html');
    }
  });

  // generate password generating form
  const passwordGeneratorForm = () => {
    const form = document.createElement('form');
    form.className = 'password-generator-form';

    const lengthDiv = document.createElement('div');
    const lengthLabel = document.createElement('label');
    lengthLabel.textContent = 'Length';
    const lengthInput = document.createElement('input');
    lengthInput.type = 'number';
    lengthInput.min = '6';
    lengthInput.max = '16';
    lengthInput.required = true;

    const upperCaseDiv = document.createElement('div');
    const uppercaseInput = document.createElement('input');
    uppercaseInput.id = 'uppercase';
    uppercaseInput.type = 'checkbox';
    const uppercaseLabel = document.createElement('label');
    uppercaseLabel.htmlFor = 'uppercase';
    uppercaseLabel.textContent = 'Uppercase';

    const numbersDiv = document.createElement('div');
    const numbersInput = document.createElement('input');
    numbersInput.id = 'numbers';
    numbersInput.type = 'checkbox';
    const numbersLabel = document.createElement('label');
    numbersLabel.htmlFor = 'numbers';
    numbersLabel.textContent = 'Numbers';

    const symbolsDiv = document.createElement('div');
    const symbolsInput = document.createElement('input');
    symbolsInput.id = 'symbols';
    symbolsInput.type = 'checkbox';
    const symbolsLabel = document.createElement('label');
    symbolsLabel.htmlFor = 'symbols';
    symbolsLabel.textContent = 'Symbols';

    const generateButton = document.createElement('button');
    generateButton.textContent = 'Generate';
    generateButton.type = 'submit';
    generateButton.className = 'submit';

    lengthDiv.append(lengthLabel);
    lengthDiv.append(lengthInput);
    upperCaseDiv.append(uppercaseInput);
    upperCaseDiv.append(uppercaseLabel);
    numbersDiv.append(numbersInput);
    numbersDiv.append(numbersLabel);
    symbolsDiv.append(symbolsInput);
    symbolsDiv.append(symbolsLabel);
    form.append(lengthDiv);
    form.append(upperCaseDiv);
    form.append(numbersDiv);
    form.append(symbolsDiv);
    form.append(generateButton);

    return form;
  };

  const generatePasswordHelper = (length, letters, elements) => {
    const amount = [];
    for (let i = 1; i <= Math.round(length * 0.1); i++) {
      const randomEl = Math.floor(Math.random() * elements.length);
      amount.push(elements[randomEl]);
    }
    for (let el of amount) {
      const randomChar = Math.floor(Math.random() * letters.length);
      letters = letters.replace(letters[randomChar], el);
    }

    return letters;
  };

  const generatePassword = (length, uppercase, numbers, symbols) => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const nums = '1234567890';
    const syms = "~`!@#$%^&*()_-+={[}]|:;'<,>.?/";
    let letters = '';

    // generate random letters from alphabet
    for (let i = 0; i < length; i++) {
      const randomChar = Math.floor(Math.random() * (alphabet.length - 1));
      letters += alphabet[randomChar];
    }

    // 20% of the pass length will be capital letters by default
    // if numbers is checked, 10% of pass will be numbers
    // if symbols is checked, 10% of pass will be symbols
    const capitalLetterAmount = [];
    for (let i = 1; i <= Math.round(length * 0.2); i++) {
      const randomChar = Math.floor(Math.random() * letters.length);
      capitalLetterAmount.push(randomChar);
    }
    for (let char of capitalLetterAmount) {
      letters = letters.replace(letters[char], letters[char].toUpperCase());
    }

    if (numbers) {
      letters = generatePasswordHelper(length, letters, nums);
    }

    if (symbols) {
      letters = generatePasswordHelper(length, letters, syms);
    }

    if (uppercase) {
      letters = letters.toUpperCase();
    }

    return letters;
  };

  // GENERATE PASSWORD SECTION
  generatePasswordButton.addEventListener('click', () => {
    if (userIsLogged()) {
      const form = passwordGeneratorForm();
      main.replaceChild(form, mainBody);
      addPasswordButton.style.display = 'none';
      generatePasswordButton.style.display = 'none';

      // select the password generator div
      const generatorForm = document.querySelector(
        'main .password-generator-form'
      );
      generatorForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const length = event.target.children[0].children[1].value;
        const uppercase = event.target.children[1].children[0].checked;
        const numbers = event.target.children[2].children[0].checked;
        const symbols = event.target.children[3].children[0].checked;

        const password = generatePassword(length, uppercase, numbers, symbols);

        // a div to display the generated pass on the page
        // with copy to clipboard functionality
        const oldDiv = document.querySelector('form .display-password');

        const displayPasswordDiv = document.createElement('div');
        displayPasswordDiv.className = 'display-password';
        const passwordSpan = document.createElement('span');
        passwordSpan.className = 'password-span';
        const copySpan = document.createElement('span');
        copySpan.className = 'copy-span';
        copySpan.innerHTML = '<i class="uil uil-copy"></i>';

        displayPasswordDiv.append(passwordSpan);
        displayPasswordDiv.append(copySpan);

        // delay the value showing on the page for 3 seconds
        for (let i = 1; i <= 3; i++) {
          setTimeout(() => {
            passwordSpan.textContent = password;
          }, i * 1000);
        }

        if (oldDiv) {
          form.replaceChild(displayPasswordDiv, oldDiv);
        } else {
          form.insertBefore(
            displayPasswordDiv,
            document.querySelector('form .submit')
          );
        }

        // copy text to clipboard
        const copyButton = document.querySelector('form .copy-span');
        const inputField = document.querySelector('form .password-span');

        copyButton.addEventListener('click', () => {
          navigator.clipboard.writeText(inputField.textContent);
        });
      });
    } else {
      location.assign('./login.html');
    }
  });

  // SEARCH PASSWORD SECTION
  const searchInput = document.querySelector('.search input');
  searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      const searchText = event.target.value;
      const passwords = JSON.parse(localStorage.getItem('passwords'));
      const foundPassword = passwords[searchText];

      // check search is not empt and password exists
      if (searchText && foundPassword) {
        event.target.value = '';

        // remove the already exisiting elements to display found password
        for (let child of document.querySelectorAll('.main-body article')) {
          mainBody.removeChild(child);
        }

        displayPasswords({ [searchText]: foundPassword });
      } else {
        event.target.value = '';
        for (let child of document.querySelectorAll('.main-body article')) {
          mainBody.removeChild(child);
        }

        const h3 = document.createElement('h3');
        h3.textContent = 'No such password found';
        mainBody.append(h3);
      }
    }
  });
}
