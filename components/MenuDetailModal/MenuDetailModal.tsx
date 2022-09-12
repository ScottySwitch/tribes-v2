import Album from "components/Album/Album";
import Modal from "components/Modal/Modal";
import get from "lodash/get";

interface MenuDetailModalProps {
  data?: { [key: string]: any };
  visible?: boolean;
  onClose: () => void;
}

const MenuDetailModal = (props: MenuDetailModalProps) => {
  const { visible, onClose, data = {} } = props;

  return (
    <Modal
      title={data.name}
      visible={visible}
      width="100%"
      height="101vh"
      mobilePosition="center"
      mobileFullHeight
      mobileFullWidth
      onClose={onClose}
    >
      <Album
        id="menu-album"
        key={get(data, "images.length")}
        images={data.images || []}
      />
    </Modal>
  );
};

export default MenuDetailModal;
