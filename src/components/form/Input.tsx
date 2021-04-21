import React from "react";
import { TextField, TextFieldProps } from "@material-ui/core";
import { Control, FieldValues, useController } from "react-hook-form";

interface IInput {
  name: string;
  className?: string;
  control: Control<FieldValues>;
  textFieldProps?: TextFieldProps;
}

const Input: React.FC<IInput> = (props) => {
  const { name, control, textFieldProps } = props;
  const {
    field: { ref, ...inputProps },
  } = useController({ name: name, control: control });

  return <TextField {...textFieldProps} {...inputProps} inputRef={ref} />;
};

export default Input;
