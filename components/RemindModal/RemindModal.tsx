import { classNames } from "react-select/dist/declarations/src/utils";
import { useState } from "react";
import styles from "./RemindModal.module.scss";
import Button from "components/Button/Button";
import Image from "next/image";
import Modal from "components/Modal/Modal";
interface RemindModalComponentProps {
  className?: string;
  visible?: boolean;
  onClose?: () => void;
  onClick?: () => void;
}

const RemindModal = (props: RemindModalComponentProps) => {
  const { className, visible, onClose, onClick } = props;
  const [close, setClose] = useState(true);
  return (
    <Modal
      visible={visible}
      width="100%"
      maxWidth={578}
      mobilePosition="center"
      onClose={onClose}
    >
      <div className={styles.modal_contaier}>
        <div className={styles.folder}>
          <Image alt="" src={require("public/images/save_changes.svg")} />
        </div>
        <div className={styles.content}>
          <p className={styles.title}>Did you save?</p>
          <p className={styles.text}>
            Don't forget to save change before you go.
          </p>
        </div>
        <div className={styles.action_buttons}>
          <Button
            onClick={onClose}
            size="small"
            text="Cancel"
            variant="secondary"
            className={styles.button}
          />
          <Button
            onClick={onClick}
            size="small"
            text="Yes, I have saved"
            variant="primary"
            className={styles.button}
          />
        </div>
      </div>
    </Modal>
  );
};

export default RemindModal;
