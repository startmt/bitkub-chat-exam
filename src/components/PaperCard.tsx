import React from "react";
import { makeStyles, Paper } from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles({
  root: {
    boxShadow: "0px 4px 24px rgb(0 0 0 / 8%)",
  },
});

interface IPaperCardProps {
  className?: string;
}
const PaperCard: React.FC<IPaperCardProps> = (props) => {
  const { children, className } = props;
  const classes = useStyles();
  return (
    <Paper className={clsx([classes.root, { [className ?? ""]: className }])}>
      {children}
    </Paper>
  );
};

export default PaperCard;
