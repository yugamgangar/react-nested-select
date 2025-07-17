import React, { useState } from 'react';
import styles from './NewResourceModal.module.css';

const NewResourceModal = ({ onSave, onClose }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newItem = {
      optionId: input.trim().toLowerCase().replace(/\s+/g, '-'),
      optionName: input.trim(),
      nestedOptions: [],
    };
    onSave(newItem);
    setInput('');
  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <h3 className={styles.title}>Create New Resource</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter resource name"
            className={styles.inputField}
          />
          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.saveButton}>Save</button>
            <button type="button" onClick={onClose} className={styles.cancelButton}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewResourceModal;