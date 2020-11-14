type BasicFlowItemConnection = { from: string, to: string };

export const springLayout = (ids: string[], connections: BasicFlowItemConnection[], maxIter = 100, springLength = 400) => {
    return ids.map(id => ({x: Math.random() * 1000, y: Math.random() * 1000}));
};
