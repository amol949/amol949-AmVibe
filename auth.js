// ✅ Firebase Config (already in your project)
const firebaseConfig = {
  apiKey: "AIzaSyCfejacT-dzHSA7rRAFyrVYVnmQ3eW1fRM",
  authDomain: "amvibe-56f84.firebaseapp.com",
  databaseURL: "https://amvibe-56f84-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "amvibe-56f84",
  storageBucket: "amvibe-56f84.appspot.com",
  messagingSenderId: "791042962602",
  appId: "1:791042962602:web:9df59ee1e093a866a04cd3",
  measurementId: "G-XDLSW7NL1G"
};
firebase.initializeApp(firebaseConfig);

let confirmationResult;

// ✅ reCAPTCHA for Phone Login
window.addEventListener('load', function () {
  if (document.getElementById('recaptcha-container')) {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      size: 'normal',
      callback: function (response) {
        console.log("reCAPTCHA verified");
      },
      'expired-callback': function () {
        alert("reCAPTCHA expired. Please reload.");
      }
    });

    recaptchaVerifier.render().then(function (widgetId) {
      window.recaptchaWidgetId = widgetId;
    });
  }
});

// ✅ Phone OTP Send
if (document.getElementById('sendOtp')) {
  document.getElementById('sendOtp').onclick = function () {
    const phoneNumber = document.getElementById('phoneNumber').value;
    const appVerifier = window.recaptchaVerifier;

    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
      .then(function (result) {
        confirmationResult = result;
        alert("OTP Sent!");
      }).catch(function (error) {
        alert("Error: " + error.message);
      });
  };
}

// ✅ Phone OTP Verify
if (document.getElementById('verifyOtp')) {
  document.getElementById('verifyOtp').onclick = function () {
    const otpCode = document.getElementById('otpCode').value;

    confirmationResult.confirm(otpCode).then(function (result) {
      alert("Phone Login Success!");
      window.location.href = "songs.html";
    }).catch(function (error) {
      alert("Invalid OTP. Try again.");
    });
  };
}

// ✅ Email Login
function isValidEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

function emailLogin() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!isValidEmail(email)) {
    alert("Invalid email format");
    return;
  }

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      alert("Login Success!");
      window.location.href = "songs.html";
    })
    .catch((error) => {
      alert("Login Error: " + error.message);
    });
}

// ✅ Email Signup
function emailSignUp() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!isValidEmail(email)) {
    alert("Invalid email format");
    return;
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters");
    return;
  }

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      alert("Signup Success!");
      window.location.href = "songs.html";
    })
    .catch((error) => {
      alert("Signup Error: " + error.message);
    });
}

// ✅ Google Login
function googleLogin() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      alert("Google Login Success!");
      window.location.href = "songs.html";
    })
    .catch((error) => {
      alert("Google Login Error: " + error.message);
    });
}

// ✅ Logout
function logout() {
  firebase.auth().signOut().then(() => {
    alert("Logged out");
    window.location.href = "index.html";
  }).catch((error) => {
    alert("Logout Error: " + error.message);
  });
}

// ✅ Auth Check (songs.html)
if (window.location.pathname.includes("songs.html")) {
  firebase.auth().onAuthStateChanged(function (user) {
    if (!user) {
      window.location.href = "index.html";
    } else {
      const emailDisplay = document.getElementById("userEmail");
      if (emailDisplay) {
        emailDisplay.innerText = "Logged in as: " + (user.email || user.phoneNumber);
      }
    }
  });
}
