import React from "react";
import "./index.css";

import getPasswordStrength from "../utils/passwordStrength";
export default function PasswordStrength({ password }) {
  let strengthText = getPasswordStrength(password);

  return (
    <div className="password-strength">
      Strength: <span style={{ fontWeight: 600 }}>{strengthText}</span>
    </div>
  );
}
