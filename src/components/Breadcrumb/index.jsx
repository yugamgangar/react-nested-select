import React from 'react';
import styles from './Breadcrumb.module.css';

function Breadcrumb({ path, onBreadcrumbClick }) {
  return (
    <div className={styles.breadcrumbContainer}>
      <div className={styles.breadcrumb}>
      {path.map((name, index) => (
          <React.Fragment key={index}>
        <span onClick={() => onBreadcrumbClick(index)} className={styles.crumb}>
          {name}</span>
          <span className={styles.separator}>{index < path.length - 1 && ' / '}</span>
          </React.Fragment>
      ))}
      </div>
    </div>
  );
};

export default Breadcrumb;