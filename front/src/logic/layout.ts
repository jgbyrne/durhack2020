type BasicFlowItemConnection = { from: string, to: string };

export type Position = { left: number, top: number }

export const populate = (iterations: number, springLength = 400, ids: string[], width: number, height: number, connections: BasicFlowItemConnection[]): Record<string, Position> =>
    ids.reduce((acc, cur) => ({
        ...acc,
        [cur]: {
            left: Math.random() * 1000,
            top: Math.random() * 1000
        }
    }), {} as Record<string, Position>);

export const springLayout = (iterations: number, springLength = 400, ids: string[], width: number, height: number, connections: BasicFlowItemConnection[]): Record<string, Position> =>
    ids.reduce((acc, cur) => ({
        ...acc,
        [cur]: {
            left: Math.random() * 1000,
            top: Math.random() * 1000
        }
    }), {} as Record<string, Position>);

export const randomLayout = (ids: string[], width: number, height: number): Record<string, Position> =>
    ids.reduce((acc, cur) => ({
        ...acc,
        [cur]: {
            left: Math.random() * width,
            top: Math.random() * height
        }
    }), {} as Record<string, Position>);
