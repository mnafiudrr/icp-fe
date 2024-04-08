import Validations from "./Validations";

export default class RegisterValidations {
  constructor(name, email, password, password_confirmation) {
    this.email = email
    this.password = password
    this.name = name
    this.password_confirmation = password_confirmation
  }

  checkValidations() {
    let errors = [];

    if (!Validations.minLength(this.name, 1)) {
      errors["name"] = "Name is required";
    }

    if (!Validations.checkEmail(this.email)) {
      errors["email"] = "Email invalid";
    }

    if (!Validations.minLength(this.password, 8)) {
      errors["password"] = "Password must be at least 8 characters";
    }

    if (this.password !== this.password_confirmation) {
      errors["password_confirmation"] = "Passwords don't match";
    }

    return errors;
  }
}