import { useContext, useRef, useState } from "react";
import { motion } from "framer-motion";

import { ChallengesContext } from "../store/challenges-context.jsx";
import Modal from "./Modal.jsx";
import images from "../assets/images.js";

export default function NewChallenge({ onDone }) {
  const title = useRef();
  const description = useRef();
  const deadline = useRef();

  const [selectedImage, setSelectedImage] = useState(null);
  const { addChallenge } = useContext(ChallengesContext);

  function handleSelectImage(image) {
    setSelectedImage(image);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const challenge = {
      title: title.current.value,
      description: description.current.value,
      deadline: deadline.current.value,
      image: selectedImage,
    };

    if (
      !challenge.title.trim() ||
      !challenge.description.trim() ||
      !challenge.deadline.trim() ||
      !challenge.image
    ) {
      return;
    }

    onDone();
    addChallenge(challenge);
  }

  return (
    <Modal title="New Challenge" onClose={onDone}>
      <form id="new-challenge" onSubmit={handleSubmit}>
        <p>
          <label htmlFor="title">Title</label>
          <input ref={title} type="text" name="title" id="title" />
        </p>

        <p>
          <label htmlFor="description">Description</label>
          <textarea ref={description} name="description" id="description" />
        </p>

        <p>
          <label htmlFor="deadline">Deadline</label>
          <input ref={deadline} type="date" name="deadline" id="deadline" />
        </p>

        <motion.ul 
          id="new-challenge-images" 
          variants={{
            // set transition to staggerChildren a valve other than 0, will give a delay(secends) on each children animation
              visible: { transition: { staggerChildren: 0.05 } }
          }}
          >
          {images.map((image) => (
            <motion.li
              // initail exit and animate is already paired hidden, visible valve in variants, so we can just change the variantes and all atrribute will auto assign to the new value, attribute can be overwrite like 'exit', but have to re-asign a new value to this attribute, cant use varible in variants
              variants={{
                hidden: { opacity: 0, scale: 0.5 },
                // array define animate value as keyframs, first is 0.5 then 0.8 then 1.3 last stay on 1
                visible: { opacity: 1, scale: [0.8, 1.3, 1] },
              }}
              exit={{ opacity: 1, y: 0 }}
              transition={{ type: "spring" }}
              key={image.alt}
              onClick={() => handleSelectImage(image)}
              className={selectedImage === image ? "selected" : undefined}
            >
              <img {...image} />
            </motion.li>
          ))}
        </motion.ul>

        <p className="new-challenge-actions">
          <button type="button" onClick={onDone}>
            Cancel
          </button>
          <button>Add Challenge</button>
        </p>
      </form>
    </Modal>
  );
}
