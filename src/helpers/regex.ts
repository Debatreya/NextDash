// Email Regex
// Description: Email regex to validate email address.

const emailregex : RegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

// Password Regex
// Description: Password regex to validate password. Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character.

const passwordregex : RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;

// Username Regex
// Description: Username can only contain letters, numbers, and underscores.

const usernameregex : RegExp = /^[a-zA-Z0-9_]+$/;

export {emailregex, passwordregex, usernameregex};