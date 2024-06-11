export const STARTQUOTE = "“"
export const ENDQUOTE = "”"
export const APIURL = "http://localhost:3000"

// SIGNUP
export const NOT_AN_EMAIL = "NOT_AN_EMAIL"
export const EMAIL_ALREADY_EXISTS = "EMAIL_ALREADY_EXISTS"
export const TEMP_MAIL_DETECTED = "TEMP_MAIL_DETECTED"

export const INVALID_USERNAME_FORMAT = "INVALID_USERNAME_FORMAT"
export const UNAME_ALREADY_EXISTS = "UNAME_ALREADY_EXISTS"

export const PW_CRITERIA_FAILURE = "PW_CRITERIA_FAILURE"
export const PW_LENGTH_INVALID = "PW_LENGTH_INVALID"

export const NotAnEmailText = "Invalid email format."
export const AccEmailAlreadyExists = "An account with this email already exists."
export const DisposableMailsNotAllowed = "Disposable emails are not allowed!"

export const InvalidUnameText = "Usernames can only contain letters, numbers, underscores, dashes and dots. Usernames should be 3-20 characters in length."
export const AccUnameAlreadyExists = "An account with this username already exists."

export const PassCriteriaFailureText = "Passwords must contain uppercase and lowercase characters and should also include numbers and special symbols like !@#$%^&*()_+-=[]{}|\\:;\"'<>.,.?/";
export const PassLengthFailureText = "Passwords should be a minimum length of 8 characters. The maximum is 256 characters."

// LOGIN

export const INVALID_PASSWORD = "INVALID_PASSWORD"
export const USER_NOT_FOUND = "USER_NOT_FOUND"

export const InvalidPassText = "Password entered was not correct."
export const UserNotFoundText = "An user associated with this email or username was not found!"

// VERIFICATION
export const VERIFIED_SUCCESS = "VERIFIED_SUCCESS"
export const AccVerifiedText = "Your account has successfully been verified."

export const ALREADY_VERIFIED = "ALREADY_VERIFIED"
export const AlreadyVerifiedText = "Your account has already been verified."

export const User404Token = "An user associated with the token was not found!"
export const TOKEN_NOT_FOUND = "TOKEN_NOT_FOUND"
export const TokenNotFoundText = "A verification token was not found!"