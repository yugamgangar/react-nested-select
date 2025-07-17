import React from 'react';
import styles from './OptionsPanel.module.css';
import Breadcrumb from '../Breadcrumb';
import OptionList from '../OptionsList';
// import CreateNewResource from './CreateNewResource';

const OptionsPanel = ({ breadcrumbPath, categorizedOptions, onSelect, onBreadcrumbClick, onAddNew }) => {
  return (
    <div className={styles.dropdownContainer}>
      <div className={styles.dropdownBox}>
        <Breadcrumb path={breadcrumbPath} onBreadcrumbClick={onBreadcrumbClick} />
        <OptionList categorizedOptions={categorizedOptions} onSelect={onSelect} />
        {/* <CreateNewResource onClick={onAddNew} /> */}
      </div>
    </div>
  );
};

export default OptionsPanel;