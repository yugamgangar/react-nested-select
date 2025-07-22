import { v4 as uuidv4 } from "uuid";
import { OPTION_TYPES } from "../utils/constants";
import { buildOptionMap, generateOptionValue } from "../utils/helpers";

export const initialState = {
    options: [],
    selectedPath: [],
    searchQuery: "",
    selectedValue: "",
    optionMap: new Map()
};

function cloneAndInsert(nodes, parentId, newResource) {

    return nodes.map((node) => {
        if (node.id === parentId) {
            return {
                ...node,
                options: [...(node.options || []), newResource],
            };
        }
        if (node.options) {
            return {
                ...node,
                options: cloneAndInsert(node.options, parentId, newResource),
            };
        }
        return node;
    });
}

function updateTreeAndMapWithNewOption(options, categoryId, newOption) {
    const updatedOptions = cloneAndInsert(options, categoryId, newOption);
    const updatedOptionMap = buildOptionMap(updatedOptions);
    return { updatedOptions, updatedOptionMap };
}

const dropdownReducer = (state, action) => {
    switch (action.type) {
        case "INITIALIZE_OPTIONS":
            return {
                ...state,
                ...action.payload,
            };
        case "NAVIGATE_FORWARD":
            return {
                ...state,
                selectedPath: [...state.selectedPath, action.payload.id],
                searchQuery: action.payload.path,
            };
        case "NAVIGATE_TO_BREADCRUMB":
            return {
                ...state,
                ...action.payload
            };
        case "SET_SEARCH_QUERY":
            return {
                ...state,
                searchQuery: action.payload,
            };
        case "SET_SELECTED_VALUE":
            return {
                ...state,
                selectedValue: action.payload,
                searchQuery: action.payload
            };
        case "RESET_SEARCH":
            return {
                ...state,
                selectedPath: [state.options[0].id],
                searchQuery: "",
                selectedValue: "",
            }
        case "ADD_RESOURCE": {
            const { name, categoryId } = action.payload;
            const newOption = {
                id: uuidv4(),
                name: name.trim(),
                value: generateOptionValue(name),
                type: OPTION_TYPES.OPTION,
                icon: "default",
                categoryId,
            };
            const {
                updatedOptions,
                updatedOptionMap,
            } = updateTreeAndMapWithNewOption(state.options, categoryId, newOption);

            localStorage.setItem("dropdownOptions", JSON.stringify(updatedOptions));
            return {
                ...state,
                options: updatedOptions,
                optionMap: updatedOptionMap,
            };
        }
        case 'ADD_CATEGORY': {
            const { name } = action.payload;
            const parentId = state.selectedPath[state.selectedPath.length - 1];
            const newCategory = {
                id: uuidv4(),
                name: name.trim(),
                type: OPTION_TYPES.CATEGORY,
                options: []
            };

            const updatedOptions = cloneAndInsert(state.options, parentId, newCategory);
            const updatedOptionMap = buildOptionMap(updatedOptions);

            localStorage.setItem("dropdownOptions", JSON.stringify(updatedOptions));
            return {
                ...state,
                options: updatedOptions,
                optionMap: updatedOptionMap,
            };
        }
        default:
            return state;
    }
};

export default dropdownReducer;
