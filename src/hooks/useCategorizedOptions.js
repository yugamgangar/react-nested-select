import { useMemo } from "react";
import { OPTION_TYPES } from "../utils/constants";

const extractRawSearchTerm = (searchQuery) => {
    if (!searchQuery.trim().startsWith("!{") || !searchQuery.endsWith("}")) return "";
    const cleaned = searchQuery.slice(2, -1); // remove !{ and }
    const parts = cleaned.split(".");
    const isIncomplete = cleaned.endsWith(".");
    return isIncomplete ? "" : parts.at(-1).trim();
};

const useCategorizedOptions = (
    options,
    optionMap,
    selectedPath,
    searchQuery
) => {
    const currentNode = useMemo(() => {
        const lastId = selectedPath[selectedPath.length - 1];
        return optionMap.get(lastId)?.node;
    }, [selectedPath, options, optionMap]);

    const breadcrumb = useMemo(() => {
        return selectedPath.map((id) => optionMap.get(id)?.node?.name || "");
    }, [selectedPath, optionMap]);

    const filteredCategories = useMemo(() => {
        const rawCategories =
            currentNode?.options?.filter(
                (node) => node.type === OPTION_TYPES.CATEGORY
            ) || [];

        const searchTerm = extractRawSearchTerm(searchQuery).toLowerCase();

        if (searchTerm.length > 2) {
            return rawCategories
                .map((category) => ({
                    ...category,
                    options: category.options.filter((opt) =>
                        opt.name.toLowerCase().includes(searchTerm)
                    ),
                }))
                .filter((category) => category.options.length > 0);
        } else {
            return rawCategories.filter((category) => category.options.length > 0);
        }
    }, [currentNode, searchQuery]);

    return { currentNode, breadcrumb, filteredCategories };
};

export default useCategorizedOptions;
