import React, { useState } from "react";
import EyeIcon from "../svg/EyeIcon";
import EyeOffIcon from "../svg/EyeOffIcon";

interface FormItemProps {
  id: string;
  name: string;
  placeholder?: string;
  type?: string;
  value?: string;
  label?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormItem({
  id,
  name,
  placeholder,
  type = "text",
  value,
  label,
  onChange,
}: FormItemProps) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="form-item">
      <label htmlFor="password">
        {label && <div className="form-item__label">{label}</div>}
        <div className="form-item__input">
          <input
            id={id}
            name={name}
            placeholder={placeholder}
            type={showPassword ? "text" : type}
            value={value}
            onChange={onChange}
          />
          {type === "password" && (
            <div
              className="form-item__icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {!showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </div>
          )}
        </div>
      </label>
    </div>
  );
}
