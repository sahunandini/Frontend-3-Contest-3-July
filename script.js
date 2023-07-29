// Helper function to generate a random 16-byte string (access token)
function generateAccessToken() {
    // ... (implement the logic to generate a random 16-byte string here)
}

// Signup page logic
const signupForm = document.getElementById('signupForm');
const signupMessage = document.getElementById('signupMessage');

signupForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Perform basic validation
    if (!username || !email || !password || !confirmPassword) {
        signupMessage.textContent = 'Error: All fields are mandatory!';
        return;
    }

    // Additional validation for password match
    if (password !== confirmPassword) {
        signupMessage.textContent = 'Error: Passwords do not match!';
        return;
    }

    // Check if the user is already signed up (using Local Storage)
    if (localStorage.getItem(email)) {
        signupMessage.textContent = 'User already exists. Please use a different email.';
        return;
    }

    // Generate an access token and store user details in Local Storage
    const accessToken = generateAccessToken();
    const userData = { username, email, password, accessToken };
    localStorage.setItem(email, JSON.stringify(userData)); // Store the user data under the email as the key

    signupMessage.textContent = 'Signup successful. Redirecting to the Profile page...';
    setTimeout(() => {
        window.location.href = 'profile.html';
    }, 2000);
});

// Profile page logic
const fullNameElement = document.getElementById('fullName');
const emailElement = document.getElementById('email');
const tokenElement = document.getElementById('token');
const passwordElement = document.getElementById('password');
const logoutButton = document.getElementById('logoutButton');

const currentUserData = JSON.parse(localStorage.getItem('currentUser'));

if (!currentUserData) {
    // No access token found, redirect to Signup page
    window.location.href = 'index.html';
} else {
    // Access token found, show user profile
    fullNameElement.textContent = 'Full Name: ' + currentUserData.username;
    emailElement.textContent = 'Email: ' + currentUserData.email;
    tokenElement.textContent = 'Token: ' + currentUserData.accessToken;
    passwordElement.textContent = 'Password: ' + currentUserData.password;
}

logoutButton.addEventListener('click', () => {
    // Clear Local Storage and redirect to Signup page on logout
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
});