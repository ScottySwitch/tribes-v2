import classNames from "classnames";
import { ReactNode } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import styles from "./TextArea.module.scss";

export interface TextAreaProps
  extends Omit<
    React.HTMLProps<HTMLTextAreaElement>,
    "size" | "prefix" | "className"
  > {
  register?: UseFormRegisterReturn;
  className?: string;
  required?: boolean;
  width?: string | number;
  variant?: "filled" | "outlined";
  rows?: number;
}

const TextArea = (props: TextAreaProps) => {
  const {
    label,
    required = false,
    className,
    readOnly,
    variant = "outlined",
    id,
    width,
    form,
    disabled,
    register,
    rows = 5,
    ...rest
  } = props;

  const textareaClassName = classNames(className, styles.textarea, {
    [styles.filled]: variant === "filled",
    [styles.disabled]: disabled,
  });

  return (
    <textarea
      className={textareaClassName}
      readOnly={readOnly}
      disabled={disabled}
      id={id}
      {...register}
      {...rest}
      rows={rows}
    />
  );
};

export default TextArea;
