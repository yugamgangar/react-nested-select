import { v4 as uuidv4 } from "uuid";
import data from "../initialOptions.json";
import { OPTION_TYPES } from "./constants";

function assignUniqueIds(options, parentCategoryId = null) {
    return options.map((option) => {
        const uniqueId = uuidv4();
        if (option.type === OPTION_TYPES.CATEGORY) {
            return {
                ...option,
                id: uniqueId,
                options: option.options?.length
                    ? assignUniqueIds(option.options, uniqueId)
                    : [],
            };
        } else {
            return {
                ...option,
                id: uniqueId,
                categoryId: parentCategoryId,
                options: option.options ? assignUniqueIds(option.options, null) : [],
            };
        }
    });
}

export function loadInitialOptions() {
    const saved = localStorage.getItem("dropdownOptions");
    if (saved && saved.length) {
        return JSON.parse(saved);
    } else {
        const optionsData = assignUniqueIds(data.initialOptions);
        return optionsData;
    }
}

export function buildOptionMap(options) {
    const map = new Map();

    function traverse(nodes, path = "") {
        for (const node of nodes) {
            if (node.type === OPTION_TYPES.OPTION) {
                const fullPath = path ? `${path}.${node.value}` : node.value;
                map.set(node.id, {
                    id: node.id,
                    categoryId: node.categoryId,
                    fullPath,
                    node,
                });
                if (Array.isArray(node.options)) {
                    traverse(node.options, fullPath);
                }
            } else if (node.type === OPTION_TYPES.CATEGORY) {
                traverse(node.options || [], path);
            }
        }
    }

    traverse(options);
    return map;
}

export const generateOptionValue = (text) => text.trim().replace(/\s+/g, '');
