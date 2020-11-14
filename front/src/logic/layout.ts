type FlowItemConnection = { from: string, to: string };

export const springLayout = (ids: string[], connections: FlowItemConnection[], maxIter = 100, springLength = 400) => {
    return ids.map(id => ({x: Math.random() * 1000, y: Math.random() * 1000}));
};
