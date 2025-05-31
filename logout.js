
// Logout function
function logoutUser() {
  firebase.auth().signOut().then(() => {
    alert("Logged out successfully!");
    window.location.href = "index.html"; // back to welcome screen
  }).catch((error) => {
    alert("Logout error: " + error.message);
  });
}
