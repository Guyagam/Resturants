const Bgroup32 = 'users'
var Users = []

function signUp(ev) {
  ev.preventDefault();
  const user = document.querySelector('.userInput').value
  const pass = document.querySelector('.userPass').value
  if (user && pass) {
    const userObj = { id: makeId(), name: user, password: pass }
    console.log(userObj)
    Users.push(userObj)
    saveToStorage(Bgroup32, Users)
    alert('cool! please sign in')
    document.querySelector('.userInput').value = ''
    document.querySelector('.userPass').value = ''
  } else {
    alert('somthing went wrong :(')

  }
}


function logIn(ev) {
  ev.preventDefault();
  const userName = document.querySelector('.userInputLog').value;
  const pass = document.querySelector('.userPassLog').value;
  const loggedUsers = loadFromStorage(Bgroup32);
  var foundUser;
  var foundPassword;
  console.log(loggedUsers);
  if (loggedUsers) {
    foundUser = loggedUsers.find((user) => {
      return user.name === userName;
    });
    foundPassword = loggedUsers.find((user) => {
      return user.password === pass;
    });
  }
  if (foundUser && foundPassword) {
    showPopupMessage(`Welcome ${foundUser.name}`);
    setTimeout(function () {
      window.location.href = 'FinalTar.html';
    }, 3000);
  } else {
    showPopupMessage('Please sign up to the website');
  }
}




function saveToStorage(key, val) {
  localStorage.setItem(key, JSON.stringify(val))
}


function loadFromStorage(key) {
  var val = localStorage.getItem(key)
  return JSON.parse(val)
}
function makeId(length = 3) {
  const possible = '0123456789'
  var txt = ''
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return txt
}

function showPopupMessage(message) {
  const popup = document.getElementById('popup');
  const popupMessage = document.getElementById('popup-message');
  popupMessage.textContent = message;
  popup.style.display = 'block';

  const closeBtn = document.querySelector('.close');
  closeBtn.addEventListener('click', function () {
    popup.style.display = 'none';
  });
}