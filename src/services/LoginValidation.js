import Validations from "./Validations";

export default class LoginValidations {
  constructor(email, password) {
    this.email = email
    this.password = password
  }

  checkValidations() {
    let errors = [];

    if (!Validations.checkEmail(this.email)) {
      errors["email"] = "Email invalid";
    }

    if (!Validations.minLength(this.password, 8)) {
      errors["password"] = "Password must be at least 8 characters";
    }

    return errors;
  }
}