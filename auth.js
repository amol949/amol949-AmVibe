// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCfejacT-dzHSA7rRAFyrVYVnmQ3eW1fRM",
  authDomain: "amvibe-56f84.firebaseapp.com",
  projectId: "amvibe-56f84",
  storageBucket: "amvibe-56f84.appspot.com",
  messagingSenderId: "791042962602",
  appId: "1:791042962602:web:9df59ee1e093a866a04cd3"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Show/hide sections
function showEmailForm() {
  document.getElementById('emailForm').classList.remove('hidden');
  document.getElementById('phoneForm').classList.add('hidden');
}
function showPhoneForm() {
  document.getElementById('phoneForm').classList.remove('hidden');
  document.getElementById('emailForm').classList.add('hidden');
}

// Email login
function emailLogin() {
  const email = document.getElementById('emailInput').value;
  const password = document.getElementById('passwordInput').value;

  auth.signInWithEmailAndPassword(email, password)
    .then(user => alert("Login Success!"))
    .catch(error => alert("Login Error: " + error.message));
}

// OTP login
window.onload = function () {
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
    size: 'normal',
    callback: (response) => {
      console.log("reCAPTCHA solved");
    },
    'expired-callback': () => {
      alert("reCAPTCHA expired. Try again.");
    }
  });
  recaptchaVerifier.render();
};

function sendOtp() {
  const phone = document.getElementById('phoneNumber').value;
  const appVerifier = window.recaptchaVerifier;

  auth.signInWithPhoneNumber(phone, appVerifier)
    .then(confirmationResult => {
      window.confirmationResult = confirmationResult;
      alert("OTP Sent!");
    })
    .catch(error => alert(error.message));
}

function verifyOtp() {
  const code = document.getElementById('otpCode').value;
  window.confirmationResult.confirm(code)
    .then(result => alert("Phone Login Success!"))
    .catch(error => alert("OTP Error: " + error.message));
}

// Google Login
function googleLogin() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then(result => alert("Google Login Success!"))
    .catch(error => alert("Google Login Error: " + error.message));
}

// Facebook Login
function facebookLogin() {
  const provider = new firebase.auth.FacebookAuthProvider();
  auth.signInWithPopup(provider)
    .then(result => alert("Facebook Login Success!"))
    .catch(error => alert("Facebook Login Error: " + error.message));
}
