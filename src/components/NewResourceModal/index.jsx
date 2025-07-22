import React, { useState } from "react";
import styles from "./NewResourceModal.module.css";
import {OPTION_TYPES} from '../../utils/constants';

const NewResourceModal = ({ categories, onSave, onClose }) => {
  const [resourceType, setResourceType] = useState(OPTION_TYPES.OPTION);
  const [resourceName, setResourceName] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [error, setError] = useState("");

  const isOption = resourceType === OPTION_TYPES.OPTION;

  const handleSubmit = () => {
    if (!resourceName.trim() || resourceName.trim().length < 4) {
      setError("Resource name must be at least 4 characters long.");
      return;
    }
    if (isOption && !selectedCategoryId) {
      setError("Please select a category.");
      return;
    }
    // onSave(resourceName, selectedCategoryId);
    setError("");
    onSave({
      name: resourceName,
      categoryId: isOption ? selectedCategoryId : null,
      type: resourceType,
    });
    setResourceName("");
    setSelectedCategoryId("");
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3 className={styles.title}>Add New {isOption ? 'Option' : 'Category'}</h3>

        <div className={styles.fieldGroup}>
                    <label>Resource Type: </label>
                    <select value={resourceType} onChange={(e) => setResourceType(e.target.value)}>
                        <option value={OPTION_TYPES.OPTION}>Option</option>
                        <option value={OPTION_TYPES.CATEGORY}>Category</option>
                    </select>
                </div>

        <input
          type='text'
          placeholder='Enter resource name'
          value={resourceName}
          onChange={(e) => {
            setResourceName(e.target.value);
            setError("");
          }}
          className={styles.input}
        />

         {isOption && (
                    <div className={styles.categoryList}>
                        <span className={styles.radioTitle}>Select Category:</span>
                        {categories.map((cat) => (
                            <label key={cat.id} className={styles.radioLabel}>
                                <input
                                    type="radio"
                                    name="category"
                                    value={cat.id}
                                    checked={selectedCategoryId === cat.id}
                                    onChange={() => {
                                      setSelectedCategoryId(cat.id);
                                      setError("");
                                    }}
                                />
                                {cat.name}
                            </label>
                        ))}
                    </div>
                )}

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
