import React, { useState, useEffect, useReducer } from "react";
import TextInput from "../TextInput";
import OptionsPanel from "../OptionsPanel";
import NewResourceModal from "../NewResourceModal";
import { buildOptionMap, loadInitialOptions } from "../../utils/helpers";
import useCategorizedOptions from "../../hooks/useCategorizedOptions";
import dropdownReducer, { initialState } from "../../reducers/dropdownReducer";
import { OPTION_TYPES } from "../../utils/constants";
import styles from "./DropdownContainer.module.css";

function DropdownContainer() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [availableCategories, setAvailableCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [state, dispatch] = useReducer(dropdownReducer, initialState);
  const {
    options,
    selectedPath,
    searchQuery,
    selectedValue,
    optionMap,
  } = state;

  useEffect(() => {
    const initialOptions = loadInitialOptions();
    const optionMap = buildOptionMap(initialOptions);
    const selectedPath = [initialOptions[0]?.id]; // Adding base node as selected by default.
    
    dispatch({
      type: "INITIALIZE_OPTIONS",
      payload: { options: initialOptions, optionMap, selectedPath },
    });
  }, []);

  const { currentNode, breadcrumb, filteredCategories } = useCategorizedOptions(
    options,
    optionMap,
    selectedPath,
    searchQuery
  );

  useEffect(() => {
    if (isModalOpen && currentNode?.options.length) {
      const categories = currentNode.options
        .filter((opt) => opt.type === OPTION_TYPES.CATEGORY)
        .map((cat) => ({ id: cat.id, name: cat.name }));
      setAvailableCategories(categories);
    }
  }, [isModalOpen, currentNode]);

  function handleSelect(option) {
    const { type, options: nestedOptions, id } = option;

    if (
      type === OPTION_TYPES.OPTION &&
      (!nestedOptions || nestedOptions.length === 0)
    ) {
      const path = `!{${optionMap.get(id)?.fullPath}}` || "";
      dispatch({ type: "SET_SELECTED_VALUE", payload: path });
      setIsDropdownOpen(false);
    }
    if (type === OPTION_TYPES.OPTION && nestedOptions?.length) {
      const path = `!{${optionMap.get(id)?.fullPath}.}` || "";
      dispatch({ type: "NAVIGATE_FORWARD", payload: { id, path } });
    }
  }

  function handleBreadcrumbClick(index) {
    dispatch({ type: "NAVIGATE_TO_BREADCRUMB", payload: index });
  }

  function handleAddResource(name, categoryId) {
    dispatch({ type: "ADD_RESOURCE", payload: { name, categoryId } });
  }

  function setSearchQuery(value) {
    dispatch({ type: "SET_SEARCH_QUERY", payload: value });
  }

  return (
    <div className={styles.dropdownContainer}>
      <span
        className={`${styles.selectedValue} ${
          selectedValue ? styles.selectedValueVisible : ""
          }`}>
        Selected: {selectedValue}
      </span>
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
          onAddNew={() => setIsModalOpen(true)}
          searchQuery={searchQuery}
        />
      )}
      {isModalOpen && (
        <NewResourceModal
          categories={availableCategories}
          onSave={handleAddResource}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default DropdownContainer;
