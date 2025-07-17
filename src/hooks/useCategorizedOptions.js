import { useMemo } from 'react';

const useCategorizedOptions = (options, optionMap, selectedPath, searchQuery) => {
    const currentNode = useMemo(() => {
        if (selectedPath.length === 0) return options[0];
        const lastId = selectedPath[selectedPath.length - 1];
        return optionMap.get(lastId)?.node;
    }, [selectedPath, options, optionMap]);

    const breadcrumb = useMemo(() => {
        return selectedPath.map(id => optionMap.get(id)?.node?.name || '');
    }, [selectedPath, optionMap]);

    const filteredCategories = useMemo(() => {
        const rawCategories = currentNode?.options?.filter(node => node.type === 'CATEGORY') || [];
        console.log('checkk ---', rawCategories)
        return rawCategories.map(cat => ({
            ...cat,
            options: cat.options.filter(opt =>
                opt.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
        })).filter(cat => cat.options.length > 0);
    }, [currentNode, searchQuery]);

    return { breadcrumb, filteredCategories };
};

export default useCategorizedOptions;
