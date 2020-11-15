type BasicFlowItemConnection = { from: string, to: string };

export type Position = { left: number, top: number }

export const populate = (
    ids: string[],
    existing: Record<string, Position>,
    width: number,
    height: number
): Record<string, Position> =>
    ids.reduce((acc, cur) => ({
        ...acc,
        [cur]: existing[cur] ?? {
            left: (Math.random() - .5) * width,
            top: (Math.random() - .5) * height
        }
    }), {} as Record<string, Position>)


export const springLayout = (
    iterations: number,
    springLength = 200,
    ids: string[],
    width: number,
    height: number,
    connections: BasicFlowItemConnection[],
    rec: Record<string, Position>
): Record<string, Position> => {

    const lambda = 0.001;

    for (let i = 0; i < iterations; i++) {
        Object.keys(rec).forEach(k1 => Object.keys(rec).forEach(k2 => {
            if (k1 != k2) {
                const sprung = connections.findIndex(c => c.from === k1 && c.to === k2) !== -1;

                let dx = rec[k1].left - rec[k2].left;
                let dy = rec[k1].top - rec[k2].top;

                let d = Math.sqrt(dx * dx + dy * dy);
                let a = Math.atan2(dy, dx);

                let dd;
                if (sprung) {
                    dd = springLength - d;
                } else {
                    dd = d;
                }

                let cx = dd * Math.cos(a) * lambda;
                let cy = dd * Math.sin(a) * lambda;

                rec[k1].left += cx;
                rec[k1].top += cy;

            }
        }));
    }

    return rec;
};


export const randomLayout = (ids: string[], width: number, height: number): Record<string, Position> =>
    ids.reduce((acc, cur) => ({
        ...acc,
        [cur]: {
            left: (Math.random() - .5) * width,
            top: (Math.random() - .5) * height
        }
    }), {} as Record<string, Position>);
