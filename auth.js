const firebaseConfig = {
  apiKey: "AIzaSyCfejacT-dzHSA7rRAFyrVYVnmQ3eW1fRM",
  authDomain: "amvibe-56f84.firebaseapp.com",
  projectId: "amvibe-56f84",
  storageBucket: "amvibe-56f84.appspot.com",
  messagingSenderId: "791042962602",
  appId: "1:791042962602:web:9df59ee1e093a866a04cd3"
};

firebase.initializeApp(firebaseConfig);
function loginWithEmail() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  firebase.auth().signInWithEmailAndPassword(email, password)
  .then(() => {
    alert("Login successful!");
    // redirect नाही - याच पेजवर फॉर्म दिसतो
  })
  
}
function loginWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then(() => alert("Google login successful!"))
    .catch(error => alert("Google login failed: " + error.message));
}
// reCAPTCHA
window.onload = function () {
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
    size: 'normal',
    callback: () => console.log("reCAPTCHA solved"),
    'expired-callback': () => alert("reCAPTCHA expired")
  });
};

// Send OTP
function sendOTP() {
  const phoneNumber = "+91" + document.getElementById("phone").value;
  const appVerifier = window.recaptchaVerifier;

  firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
    .then(result => {
      window.confirmationResult = result;
      alert("OTP sent!");
    })
    .catch(error => alert("OTP send failed: " + error.message));
}

// Verify OTP
function verifyOTP() {
  const otp = document.getElementById("otp").value;

  window.confirmationResult.confirm(otp)
    .then(result => {
      alert("OTP verified!");
      window.location.href = "songs.html";
    })
    .catch(error => alert("Invalid OTP"));
}
