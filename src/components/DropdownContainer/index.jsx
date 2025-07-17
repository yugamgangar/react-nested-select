import React, { useState, useMemo } from 'react';
import TextInput from '../TextInput';
import OptionsPanel from '../OptionsPanel';
import NewResourceModal from '../NewResourceModal';
import data from '../../utils/data';
import { buildOptionMap } from '../../utils/helpers';
import useCategorizedOptions from '../../hooks/useCategorizedOptions';

function DropdownContainer() {
  const [options, setOptions] = useState(data);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPath, setCurrentPath] = useState(['all_res']);
  const [selectedValue, setSelectedValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const optionMap = useMemo(() => buildOptionMap(options), [options]);

 const { breadcrumb, filteredCategories } = useCategorizedOptions(
    options,
    optionMap,
    currentPath,
    searchQuery
  );

  const handleSelect = (option) => {
    const {type, options: nestedOptions, id} = option
     
    if (type === 'OPTION' && (!nestedOptions || !nestedOptions.length)) {
      setSelectedValue(optionMap.get(id)?.fullPath || '');
      setCurrentPath([]);
      setIsDropdownOpen(false);
      setSearchQuery(selectedValue);
    }
    if (type === 'OPTION' && nestedOptions?.length) {
      setCurrentPath([...currentPath, id]);
      setSearchQuery('');
    }
  };

  const handleBreadcrumbClick = (index) => {
    const newPath = currentPath.slice(0, index + 1);
    setCurrentPath(newPath);
    setSearchQuery('');
  };

  const handleAddNew = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const handleSaveNew = (newItem) => {
    // const updated = updateOptionsAtPath(optionsTree, path, newItem);
    // setOptionsTree(updated);
    // setIsModalOpen(false);
  };

  const selectedLabel = currentPath.length ? `{${currentPath.join('.')}}` : '';

  return (
    <div style={{ position: 'relative', width: '300px' }}>
      <TextInput
        selectedValue={selectedValue}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onFocus={() => setIsDropdownOpen(true)}
        onLeaveFocus={() => setIsDropdownOpen(false)}
      />
      {isDropdownOpen && (
      <OptionsPanel
        breadcrumbPath={breadcrumb}
        categorizedOptions={filteredCategories}
        onSelect={handleSelect}
        onBreadcrumbClick={handleBreadcrumbClick}
        onAddNew={handleAddNew}
        // searchQuery={searchQuery}
      />
      )}
      {selectedValue && (
        <div>Selected: {selectedValue}</div>
      )}
      {isModalOpen && (
        <NewResourceModal onSave={handleSaveNew} onClose={handleModalClose} />
      )}
    </div>
  );
};

export default DropdownContainer;