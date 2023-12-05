import { useState } from "react";
import "./App.css";
import usePasswordGenerator from "./hook/usePasswordGenerator";

import getPasswordStrength from "./utils/passwordStrength";
import PasswordStrength from "./components/passwordStrength";

function App() {
  const [length, setLength] = useState(4);
  const [copied, setCopied] = useState(false);
  const { password, errorMessage, generatePassword } = usePasswordGenerator();
  const [checkbox, setCheckbox] = useState([
    {
      title: "Include Uppercase Letters",
      state: false,
    },
    {
      title: "Include Lowercase Letters",
      state: false,
    },
    {
      title: "Include Numbers",
      state: false,
    },
    {
      title: "Include Symbols",
      state: false,
    },
  ]);

  const handleCopy = () => {
    setCopied(true);
    navigator.clipboard.writeText(password);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleCheckboxChange = (index) => {
    let updatedCheckboxData = [...checkbox];
    updatedCheckboxData[index].state = !updatedCheckboxData[index].state;
    setCheckbox(updatedCheckboxData);
  };

  return (
    <div className="App">
      <section className="container">
        {password && (
          <div className="header">
            <h1 className="title">{password}</h1>
            <button onClick={handleCopy} className="copyBtn" type="button">
              {copied ? "copied" : "copy"}
            </button>
          </div>
        )}

        <div className="characterLength">
          <span>
            <label>Character Length : </label>
            <label>{length}</label>
          </span>
          <input
            type="range"
            min={4}
            max={20}
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
        </div>

        <div className="checkboxes">
          {checkbox.map((checkbox, index) => {
            return (
              <div key={index}>
                <input
                  type="checkbox"
                  className="checkbox"
                  onChange={() => handleCheckboxChange(index)}
                  checked={checkbox.state}
                />
                <label>{checkbox.title}</label>
              </div>
            );
          })}
        </div>

        {!errorMessage && <PasswordStrength password={password} />}

        {errorMessage && <div className="errorMessage">{errorMessage}</div>}

        <button
          onClick={() => generatePassword(checkbox, length)}
          className="copyBtn generateBtn"
          type="button"
        >
          Generate Button
        </button>
      </section>
    </div>
  );
}

export default App;
