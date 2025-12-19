export const validateForm = (name, value) => {
  const reText = /^[a-zA-Z-а-яА-ЯёЁ\s'-]+$/;
  const reEmail =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

  switch (name) {
    case "firstName":
      if (value.trim() === "") {
        return "Это поле обязательно";
      } else if (!reText.test(value.trim())) {
        return "Имя может состоять только из букв, пробелов, тире и апострофов";
      } else if (value.trim().length < 2) {
        return "Имя не может быть меньше 2 символов";
      }
      break;

    case "lastName":
      if (value.trim() === "") {
        return "Это поле обязательно";
      } else if (!reText.test(value.trim())) {
        return "Фамилия может состоять только из букв, пробелов, тире и апострофов";
      } else if (value.trim().length < 2) {
        return "Фамилия не может быть меньше 2 символов";
      }
      break;

    case "phone":
      if (value.trim() === "") {
        return "Это поле обязательно";
      } else if (value.trim()[0] !== "7") {
        return "Номер должен начинаться с 7";
      } else if (value.length < 11) {
        return "Номер телефона должен содержать 11 цифр";
      }
      break;

    case "email":
      if (value.trim() && !reEmail.test(value.trim())) {
        return "Введите корректный email";
      }
      break;
    default:
      break;
  }

  return null;
};

export const initialValues = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
};
