import { createPortal } from "react-dom";
import { motion } from "framer-motion";

export default function Modal({ title, children, onClose }) {
// save animation value in constants to reuse it or use variants attribute
  // const modalPopup = {opacity: 0, y: 30 }

  return createPortal(
    <>
      <motion.div animate={{opacity: 1}} exit={{opacity: 0}} className="backdrop" onClick={onClose} />
      {/* initial allow set starting animate when it add to the dom exit is opposite */}
      <motion.dialog
      //variants can predefine value use in animation key as string
        variants={{
          hidden:{opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 }
        }}
        initial='hidden'
        animate='visible'
        exit='hidden'
        open
        className="modal"
      >
        <h2>{title}</h2>
        {children}
      </motion.dialog>
    </>,
    document.getElementById("modal")
  );
}
