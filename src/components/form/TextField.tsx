import React from "react";
import { makeStyles, InputBase, InputBaseProps } from "@material-ui/core";
import { Control, RegisterOptions, useController } from "react-hook-form";

const useStyles = makeStyles({
  input: {
    borderRadius: 8,
  },
});

interface ITextFieldProps {
  name: string;
  className?: string;
  control: Control<any>;
  textFieldProps?: InputBaseProps;
  rules?: Omit<RegisterOptions, "valueAsNumber" | "valueAsDate" | "setValueAs">;
}

const TextField: React.FC<ITextFieldProps> = (props) => {
  const { name, control, textFieldProps, rules } = props;
  const classes = useStyles();
  const {
    field: { ref, ...inputProps },
  } = useController({ name: name, control: control, rules: rules });

  return (
    <InputBase
      className={classes.input}
      fullWidth
      {...textFieldProps}
      {...inputProps}
      inputRef={ref}
    />
  );
};

export default TextField;
