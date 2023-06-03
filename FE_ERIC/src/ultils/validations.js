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
    return `Vui lòng nhập hợp kệ: ${key}`;
  } else {
    return "";
  }
};

const checkSpace = (val, key) => {
  if (val.trim().includes(" ")) {
    return `${key}`;
  } else {
    return "";
  }
};

export function checkStringEmpty(val) {
  //true la rong, false la khong rong
  if (val !== undefined) {
    return validator.empty(val.trim());
  }
  return false;
}

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

export function validatorChangePass(data) {
  const { currentPass, newPass, confirmPass } = data;

  if (currentPass !== undefined) {
    let emptyValidationText = checkEmpty(
      currentPass,
      "Hãy nhập mật khẩu hiện tại"
    );

    if (emptyValidationText !== "") {
      return emptyValidationText;
    }

    let spaceValid = checkSpace(currentPass, "Không được chứa khoảng trống");
    if (spaceValid !== "") {
      return spaceValid;
    }
  }

  if (newPass !== undefined) {
    let newPassEmptyValid = checkEmpty(newPass, "Hãy nhập vào mật khẩu mới");
    if (newPassEmptyValid !== "") {
      return newPassEmptyValid;
    }

    let minLengthNewPass = checkMinLength(
      newPass,
      8,
      "Mật khẩu mới có ít nhất 8 ký tự"
    );
    if (minLengthNewPass !== "") {
      return "Mật khẩu mới có ít nhất 8 ký tự";
    }

    let spaceValidnewPass = checkSpace(newPass, "Không được chứa khoảng trống");
    if (spaceValidnewPass !== "") {
      return spaceValidnewPass;
    }
  }

  if (confirmPass !== newPass) {
    return "Mật khẩu mới không trùng khớp";
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
