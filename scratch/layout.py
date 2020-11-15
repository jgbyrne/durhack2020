import networkx as nx
import matplotlib.pyplot as plt

def layout(graph):
    edgemap = {n: graph.edges(n) for n in graph}
    positions = {}
    out_nodes = list(graph.nodes())
    in_nodes = []
    while out_nodes:
        out_neighs = {}
        
        in_neigh_max = -1
        in_neigh_nodes = set()

        for n, edges in edgemap.items():
            if n not in out_nodes:
                continue
            out_neigh = 0
            in_neigh = 0
            for edge in edges:
                other = edge[0] if edge[1] == n else edge[1]
                if other in in_nodes:
                    in_neigh += 1
                else:
                    out_neigh += 1

            out_neighs[n] = out_neigh

            if in_neigh > in_neigh_max:
                in_neigh_max = in_neigh
                in_neigh_nodes = {n}
            elif in_neigh == in_neigh_max:
                in_neigh_nodes.add(n)

        if len(in_neigh_nodes) > 1:
            best = max(in_neigh_nodes, key = lambda n: out_neighs[n])
        else:
            best = in_neigh_nodes.pop()

        if len(positions) == 0:
            positions[best] = (0, 0)
        else:
            xs = {}
            ys = {}
            for edge in edgemap[best]:
                other = edge[0] if edge[1] == n else edge[1] 
                if other in in_nodes:
                    x, y = positions[other]
                    if x not in xs:
                        xs[x] = 1
                    else:
                        xs[x] += 1
                    if y not in ys:
                        ys[y] = 1
                    else:
                        ys[y] += 1
            xs = [x[0] for x in sorted(xs.items(), key=lambda x: -x[1])]
            ys = [y[0] for y in sorted(ys.items(), key=lambda y: -y[1])]

            for i in range(min(len(xs), len(ys))):
                if (xs[i], ys[i]) not in positions.values():
                    positions[best] = (xs[i], ys[i])
                    break
                if (xs[i]+1, ys[i]) not in positions.values():
                    positions[best] = (xs[i]+1, ys[i])
                    break
                if (xs[i]-1, ys[i]) not in positions.values():
                    positions[best] = (xs[i]-1, ys[i])
                    break
                if (xs[i], ys[i]+1) not in positions.values():
                    positions[best] = (xs[i], ys[i]+1)
                    break
                if (xs[i], ys[i]-1) not in positions.values():
                    positions[best] = (xs[i]-1, ys[i]-1)
                    break

            if best not in positions:
                x = xs[0]
                y = 2
                while (xs[0], ys[0]+y) in positions.values():
                    y += 1
                positions[best] = (xs[0], ys[0]+y)

            out_nodes.remove(best)
            in_nodes.append(best)
    return positions

if __name__ == "__main__":
    G = nx.Graph()
    for i in range(1, 8):
        G.add_node(i)
    G.add_edge(1, 2)
    G.add_edge(1, 3)
    G.add_edge(2, 3)
    G.add_edge(2, 4)
    G.add_edge(3, 4)
    G.add_edge(4, 5)
    G.add_edge(4, 6)
    G.add_edge(5, 7)
    G.add_edge(6, 7)
    nx.draw(G)
    plt.draw()
    plt.show()
    print(layout(G))
