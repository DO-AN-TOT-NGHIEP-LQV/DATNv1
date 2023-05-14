import validator from "is_js";

const checkEmpty = (val, key) => {
  if (validator.empty(val.trim())) {
    return `${key}`;
  } else {
    return "";
  }
};

const checkMinLength = (val, minLength, key) => {
  if (val.trim().length < minLength) {
    return `Please enter valid ${key}`;
  } else {
    return "";
  }
};

export function validatorLogin(data) {
  const { username, email, password } = data;

  if (username !== undefined) {
    let emptyValidationText = checkEmpty(
      username,
      "Please enter your username"
    );
    if (emptyValidationText !== "") {
      return emptyValidationText;
    } else {
      let minLengthValidation = checkMinLength(username, 0, "username");
      if (minLengthValidation !== "") {
        return minLengthValidation;
      }
    }
  }

  if (email !== undefined) {
    let emptyValidationText = checkEmpty(email, "Please enter your email");
    if (emptyValidationText !== "") {
      return emptyValidationText;
    } else {
      if (!validator.email(email)) {
        return "Please enter valid email";
      }
    }
  }

  if (email !== undefined) {
    let emptyValidationText = checkEmpty(email, "Please enter your email");
    if (emptyValidationText !== "") {
      return emptyValidationText;
    } else {
      let minLengthValidation = checkMinLength(email, 0, "email");
      if (minLengthValidation !== "") {
        return minLengthValidation;
      }
    }
  }

  if (password !== undefined) {
    let emptyValidationText = checkEmpty(
      password,
      "Please enter your password"
    );
    if (emptyValidationText !== "") {
      return emptyValidationText;
    } else {
      let minLengthValidation = checkMinLength(password, 0, "password");
      if (minLengthValidation !== "") {
        return minLengthValidation;
      }
    }
  }
}

export function validatorCreatePost(data) {
  // picker file, content, size,type, count

  const { pickedImagePath, content, size, type, count } = data;

  if (pickedImagePath !== undefined) {
    let emptyImage = checkEmpty(pickedImagePath, "Image is required");
    if (emptyImage !== "") {
      return emptyImage;
    }
  }

  if (content !== undefined) {
    let emptyValidationText = checkEmpty(content, "Please enter content");
    if (emptyValidationText !== "") {
      return emptyValidationText;
    } else {
      let minLengthValidation = checkMinLength(content, 0, "content");
      if (minLengthValidation !== "") {
        return minLengthValidation;
      }
    }
  }
}
