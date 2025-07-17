import React from 'react';
import styles from './Breadcrumb.module.css';

function Breadcrumb({ path, onBreadcrumbClick }) {
  return (
    <div className={styles.breadcrumbContainer}>
      <div className={styles.breadcrumb}>
      {path.map((name, index) => (
          <>
        <span key={Date.now()} onClick={() => onBreadcrumbClick(index)} className={styles.crumb}>
          {name}</span>
          <span className={styles.separator}>{index < path.length - 1 && ' / '}</span>
          </>
      ))}
      </div>
    </div>
  );
};

export default Breadcrumb;