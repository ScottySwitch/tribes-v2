import classNames from "classnames";
import { ReactElement, useState } from "react";
import styles from "./Popover.module.scss";

export interface PopoverProps {
  children: any;
  content?: ReactElement | string;
  noneBgHover?: boolean;
  contentClassName?: string;
  onBeforePopUp?: () => boolean;
  hoverable?: boolean;
  position?:
    | "top"
    | "bottom"
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left";
}

const Popover = (props: PopoverProps) => {
  const {
    children,
    noneBgHover,
    contentClassName,
    content,
    onBeforePopUp = () => true,
    hoverable,
    position = "bottom-right",
  } = props;

  const [isPoppedUp, setIsPoppedUp] = useState(false);

  const contentClassNames = classNames(
    styles.content_container,
    styles[position],
    contentClassName,
    {
      [styles.show]: isPoppedUp,
    }
  );
  return (
    <div
      className={classNames(
        styles.popover,
        noneBgHover && styles.none_bg_hover
      )}
      tabIndex={1}
      onBlur={() => setIsPoppedUp(false)}
      onMouseOut={() => hoverable && setIsPoppedUp(false)}
    >
      <div
        onMouseOver={() => hoverable && setIsPoppedUp(true)}
        onClick={() =>
          !hoverable && onBeforePopUp() && setIsPoppedUp(!isPoppedUp)
        }
        className={styles.children}
      >
        {children}
      </div>
      <div
        className={contentClassNames}
        onMouseOver={() => hoverable && setIsPoppedUp(true)}
        onMouseOut={() => hoverable && setIsPoppedUp(false)}
        onClick={() => setIsPoppedUp(false)}
      >
        <div className={styles.content}>{content}</div>
      </div>
    </div>
  );
};

export default Popover;
