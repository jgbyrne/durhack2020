type BasicFlowItemConnection = { from: string, to: string };

export type Position = { left: number, top: number }

export const springLayout = (ids: string[], connections: BasicFlowItemConnection[], maxIter = 100, springLength = 400): Position[] =>
    ids.map(id => ({
        left: Math.random() * 1000,
        top: Math.random() * 1000
    }));

export const randomLayout = (amount: number, width: number, height: number): Position[] =>
    Array(amount).fill(0).map(_ => ({
        left: Math.random() * width,
        top: Math.random() * height
    }));
