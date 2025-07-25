import React, { useState, useEffect, useReducer, useRef } from "react";
import TextInput from "../TextInput";
import OptionsPanel from "../OptionsPanel";
import NewResourceModal from "../NewResourceModal";
import { buildOptionMap, loadInitialOptions } from "../../utils/helpers";
import useCategorizedOptions from "../../hooks/useCategorizedOptions";
import dropdownReducer, { initialState } from "../../reducers/dropdownReducer";
import { OPTION_TYPES } from "../../utils/constants";
import styles from "./DropdownContainer.module.css";

function DropdownContainer() {
  const containerRef = useRef(null);
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

  useEffect(() => {
    function handleOutsideClick(event) {
      if (
        isDropdownOpen &&
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isDropdownOpen]);

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
    const updatedSelectedPath = selectedPath.slice(0, index + 1);
    const clickedOption = optionMap.get(selectedPath[index]);
    const updatedSearchQuery = `!{${clickedOption.fullPath}.}` || "";
    let updatedSelectedValue = selectedValue;

    if(clickedOption.node?.options){
      updatedSelectedValue = "";
    }
    
    dispatch({ type: "NAVIGATE_TO_BREADCRUMB", payload: {selectedPath: updatedSelectedPath, searchQuery: updatedSearchQuery, selectedValue: updatedSelectedValue } });
  }

  function handleAddResource({ name, categoryId, type }) {
    if (type === OPTION_TYPES.CATEGORY) {
        dispatch({ type: 'ADD_CATEGORY', payload: { name } });
    } else {
        dispatch({ type: 'ADD_RESOURCE', payload: { name, categoryId } });
    }
  }

  function setSearchQuery(value) {
    const trimmedValue = value.trim();
    if(!trimmedValue.length){
      dispatch({ type: "RESET_SEARCH" });
    }
    else {
      dispatch({ type: "SET_SEARCH_QUERY", payload: trimmedValue });
    }
  }

  return (
    <div ref={containerRef} className={styles.dropdownContainer}>
      <span
        className={`${styles.selectedValue} ${
          selectedValue ? styles.selectedValueVisible : ""
          }`}>
        Selected: {selectedValue}
      </span>
      <TextInput
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onFocus={() => setIsDropdownOpen(true)}
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
