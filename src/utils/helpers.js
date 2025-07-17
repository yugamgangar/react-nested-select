export const getOptionsAtPath = (tree, path) => {
    let current = tree;
    for (let id of path) {
        const found = current.find((node) => node.optionId === id);
        current = found?.nestedOptions || [];
    }
    return current;
};

export const updateOptionsAtPath = (tree, path, newItem) => {
    if (path.length === 0) return [...tree, newItem];

    const updatedTree = tree.map((node) => {
        if (node.optionId === path[0]) {
            return {
                ...node,
                nestedOptions: updateOptionsAtPath(node.nestedOptions, path.slice(1), newItem),
            };
        }
        return node;
    });

    return updatedTree;
};

// `${path.join('.')}.${node.value}`

export function buildOptionMap(options) {
    const map = new Map();

    function traverse(nodes, path = '') {
        for (const node of nodes) {
            if (node.type === 'OPTION') {
                const fullPath = path ? `${path}.${node.value}` : node.value;
                map.set(node.id, {
                    node,
                    fullPath,
                });
                if (Array.isArray(node.options)) {
                    traverse(node.options, fullPath);
                }
            } else if (node.type === 'CATEGORY') {
                traverse(node.options || [], path);
            }
        }
    }

    traverse(options);
    return map;
}
