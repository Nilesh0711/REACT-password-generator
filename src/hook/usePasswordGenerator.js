import { useState } from "react";

const usePasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const generatePassword = (checkboxes, length) => {
    let generatePassword = "",
      charset = "";

    const selectedOption = checkboxes.filter((checkbox) => checkbox.state);

    if (selectedOption.length === 0) {
      setErrorMessage("Select at least one option!");
      setPassword("");
      return;
    }


    selectedOption.forEach((option) => {
      switch (option.title) {
        case "Include Uppercase Letters":
          charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
          break;
        case "Include Lowercase Letters":
          charset += "abcdefghijklmnopqrstuvwxyz";
          break;
        case "Include Numbers":
          charset += "0123456789";
          break;
        case "Include Symbols":
          charset += "!@#$%^&*()";
          break;
      }
    });


    for (let index = 0; index < length; index++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      generatePassword += charset[randomIndex];
    }
    setErrorMessage("");
    setPassword(generatePassword);
  };
  return { password, errorMessage, generatePassword };
};

export default usePasswordGenerator;
