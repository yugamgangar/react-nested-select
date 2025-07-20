import React, { useState } from 'react';
import styles from './NewResourceModal.module.css';

const NewResourceModal = ({ categories, onSave, onClose }) => {
  const [resourceName, setResourceName] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!resourceName.trim() || resourceName.trim().length < 4) {
      setError('Resource name must be at least 4 characters long.');
      return;
    }
    if (!selectedCategoryId) {
      setError('Please select a category.');
      return;
    }
    onSave(resourceName, selectedCategoryId);
    setResourceName('');
    setSelectedCategoryId('');
    onClose();
  };

   return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3 className={styles.title}>Add New Resource</h3>

        <input
          type="text"
          placeholder="Enter resource name"
          value={resourceName}
          onChange={(e) => {
            setResourceName(e.target.value);
            setError('');
          }}
          className={styles.input}
        />

        <div className={styles.categoryList}>
          {categories.map((category) => (
            <label key={category.name} className={styles.radioLabel}>
              <input
                type="radio"
                name="category"
                value={category.id}
                checked={selectedCategoryId === category.id}
                onChange={() => {
                  setSelectedCategoryId(category.id);
                  setError('');
                }}
              />
              {category.name}
            </label>
          ))}
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.buttonGroup}>
          <button className={styles.cancelBtn} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.confirmBtn} onClick={handleSubmit}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewResourceModal;