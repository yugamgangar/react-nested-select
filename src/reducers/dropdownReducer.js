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

function cloneAndInsert(nodes, categoryId, newOption) {
    return nodes.map((node) => {
        if (node.type === OPTION_TYPES.CATEGORY && node.id === categoryId) {
            return {
                ...node,
                options: [...(node.options || []), newOption],
            };
        }
        if (node.options) {
            return {
                ...node,
                options: cloneAndInsert(node.options, categoryId, newOption),
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
                selectedValue: action.payload.path,
                searchQuery: action.payload.path,
            };
        case "NAVIGATE_TO_BREADCRUMB":
            return {
                ...state,
                selectedPath: state.selectedPath.slice(0, action.payload + 1),
                searchQuery: "",
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
                searchQuery: action.payload,
                selectedPath: [],
            };
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
        default:
            return state;
    }
};

export default dropdownReducer;
