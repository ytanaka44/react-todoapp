import { TextField } from "@mui/material";
import React from "react";

interface CustomTextFieldProps {
  id: string;
  value: string;
  label?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onBlur: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  name: string;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  variant?: "outlined" | "filled" | "standard";
}

export const CustomTextField: React.FC<CustomTextFieldProps> = ({
  id,
  value,
  label,
  onChange,
  onBlur,
  name,
  disabled,
  error,
  helperText,
  variant = "filled",
}) => (
  <TextField
    id={id}
    name={name}
    margin="dense"
    label={label}
    type="text"
    fullWidth
    disabled={disabled}
    value={value}
    onChange={onChange}
    onBlur={onBlur}
    error={error}
    helperText={helperText}
    variant={variant}
  />
);

export default CustomTextField;
