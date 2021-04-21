import React from "react";
import { makeStyles, TextField, TextFieldProps } from "@material-ui/core";
import { Control, RegisterOptions, useController } from "react-hook-form";

const useStyles = makeStyles({
  input: {
    borderRadius: 8,
  },
});

interface IInput {
  name: string;
  className?: string;
  control: Control<any>;
  textFieldProps?: TextFieldProps;
  rules?: Omit<RegisterOptions, "valueAsNumber" | "valueAsDate" | "setValueAs">;
}

const Input: React.FC<IInput> = (props) => {
  const { name, control, textFieldProps, rules } = props;
  const classes = useStyles();
  const {
    field: { ref, ...inputProps },
  } = useController({ name: name, control: control, rules: rules });

  return (
    <TextField
      className={classes.input}
      fullWidth
      {...textFieldProps}
      {...inputProps}
      inputRef={ref}
    />
  );
};

export default Input;
