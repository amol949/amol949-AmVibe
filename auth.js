// Firebase config आधी define केलेलं पाहिजे
firebase.initializeApp(firebaseConfig);

let recaptchaVerifier;

window.onload = function () {
  recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
    size: 'normal',
    callback: (response) => {
      console.log("reCAPTCHA solved");
    },
    'expired-callback': () => {
      alert("reCAPTCHA expired. Please try again.");
    }
  });
  recaptchaVerifier.render().then(function (widgetId) {
    window.recaptchaWidgetId = widgetId;
  });
};

document.getElementById('sendOtp').onclick = () => {
  const phoneNumber = document.getElementById('phoneNumber').value;
  const appVerifier = recaptchaVerifier;

  firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      alert("OTP sent!");
    })
    .catch((error) => {
      alert(error.message);
    });
};

// ✅ Add this to verify OTP and redirect
document.getElementById('verifyOtp').onclick = () => {
  const otp = document.getElementById("otp").value;

  window.confirmationResult.confirm(otp)
    .then((result) => {
      alert("Login Success!");
      // 👉 Redirect to songs.html after login
      window.location.href = "songs.html";
    })
    .catch((error) => {
      alert("Invalid OTP: " + error.message);
    });
};
function emailLogin() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      alert("Login Success!");
      window.location.href = "songs.html";
    })
    .catch((error) => {
      alert("Login Error: " + error.message);
    });
}

function emailSignUp() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      alert("Account Created! Logged in.");
      window.location.href = "songs.html";
    })
    .catch((error) => {
      alert("Signup Error: " + error.message);
    });
}
let confirmationResult;

window.onload = function () {
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
    size: 'normal',
    callback: function(response) {
      console.log("reCAPTCHA Solved");
    },
    'expired-callback': function() {
      alert("reCAPTCHA expired. Try again.");
    }
  });

  recaptchaVerifier.render();
};

document.getElementById('sendOtp').onclick = function () {
  const phoneNumber = document.getElementById('phoneNumber').value;
  const appVerifier = window.recaptchaVerifier;

  firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
    .then(function (result) {
      confirmationResult = result;
      alert("OTP Sent Successfully!");
    }).catch(function (error) {
      alert("Error sending OTP: " + error.message);
    });
};

document.getElementById('verifyOtp').onclick = function () {
  const otpCode = document.getElementById('otpCode').value;

  confirmationResult.confirm(otpCode).then(function (result) {
    alert("Phone Login Success!");
    window.location.href = "songs.html";
  }).catch(function (error) {
    alert("Invalid OTP. Try again.");
  });
};


