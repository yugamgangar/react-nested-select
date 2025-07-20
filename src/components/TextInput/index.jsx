import React from 'react';
import styles from './TextInput.module.css';

function TextInput({ selectedValue, searchQuery, onSearchChange, onFocus, onLeaveFocus }) {
    return (
        <input
            type="text"
            className={styles.inputBox}
            placeholder={'Select an option'}
            value={searchQuery || selectedValue}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={onFocus}
            // onBlur={onLeaveFocus}
        />
    );
};

export default TextInput;