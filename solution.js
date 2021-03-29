// const items = [
//     {
//         id: 1,
//         edges: {
//             top: null,
//             right: {edgeTypeId: 7, type: "outside"},
//             bottom: {edgeTypeId: 5, type: "inside"},
//             left: null,
//         },
//     },
//     {
//         id: 9,
//         edges: {
//             top: {edgeTypeId: 8, type: "inside"},
//             right: {edgeTypeId: 15, type: "inside"},
//             bottom: null,
//             left: {edgeTypeId: 5, type: "outside"},
//         },
//     },
//     {
//         id: 5,
//         edges: {
//             top: null,
//             right: {edgeTypeId: 2, type: "inside"},
//             bottom: {edgeTypeId: 1, type: "inside"},
//             left: null,
//         },
//     },
//     {
//         id: 4,
//         edges: {
//             top: {edgeTypeId: 34, type: "inside"},
//             right: {edgeTypeId: 11, type: "outside"},
//             bottom: {edgeTypeId: 7, type: "inside"},
//             left: null,
//         },
//     },
//     {
//         id: 3,
//         edges: {
//             top: {edgeTypeId: 2, type: "outside"},
//             right: null,
//             bottom: {edgeTypeId: 4, type: "outside"},
//             left: {edgeTypeId: 6, type: "inside"},
//         },
//     },
//     {
//         id: 2,
//         edges: {
//             top: {edgeTypeId: 3, type: "outside"},
//             right: {edgeTypeId: 34, type: "outside"},
//             bottom: null,
//             left: null,
//         },
//     },
//     {
//         id: 8,
//         edges: {
//             top: null,
//             right: {edgeTypeId: 15, type: "outside"},
//             bottom: {edgeTypeId: 4, type: "inside"},
//             left: null,
//         },
//     },
//     {
//         id: 7,
//         edges: {
//             top: {edgeTypeId: 3, type: "inside"},
//             right: null,
//             bottom: {edgeTypeId: 1, type: "outside"},
//             left: {edgeTypeId: 10, type: "inside"},
//         },
//     },
//     {
//         id: 6,
//         edges: {
//             top: {edgeTypeId: 11, type: "inside"},
//             right: {edgeTypeId: 10, type: "outside"},
//             bottom: {edgeTypeId: 6, type: "outside"},
//             left: {edgeTypeId: 8, type: "outside"},
//         },
//     },
// ];
//
// console.log(solvePuzzle(items))

function solvePuzzle(items) {
    const result = []
    const itemsInRow = Math.trunc(Math.sqrt(items.length))
    result[0] = Object.assign({}, items[0])
    const keys = Object.keys(result[0].edges)

    toTurnFirstPuzzle(keys, result, 0)

    for (let row = 0; row < itemsInRow; row++) {
        for (let i = 0; i < itemsInRow; i++) {
            let idx = i + row * itemsInRow
            if (row > 0 && i === 0) {
                const bottom = result[idx - itemsInRow].edges.bottom.edgeTypeId
                const bottomType = result[idx - itemsInRow].edges.bottom.type
                const item = findNextPuzzle(items, bottom, bottomType)
                result.push(items[item])
                toTurnFirstInRow(keys, result, idx, bottom)
            }
            if (i < (itemsInRow - 1)) {
                const right = result[idx].edges.right.edgeTypeId
                const rightType = result[idx].edges.right.type
                const item = findNextPuzzle(items, right, rightType)
                result.push(items[item])
                toTurnNextPuzzle(keys, result, idx + 1, right)
            }
        }
    }

    return result.map(item => item.id)
}

function toTurnFirstPuzzle(keys, result, indexEl) {
    const edges = Object.values(result[indexEl].edges)
    let isFirstItem = result[indexEl].edges.top === null && result[indexEl].edges.left === null

    while (!isFirstItem) {
        edges.push(edges.shift())
        for (let i = 0; i < keys.length; i++) {
            result[indexEl].edges[keys[i]] = edges[i]
        }
        isFirstItem = result[indexEl].edges.top === null && result[indexEl].edges.left === null
    }
}

function toTurnNextPuzzle(keys, result, indexEl, conditions) {
    const edges = Object.values(result[indexEl].edges)
    let isRight = result[indexEl].edges.left && result[indexEl].edges.left.edgeTypeId === conditions

    while (!isRight) {
        edges.push(edges.shift())
        for (let i = 0; i < keys.length; i++) {
            result[indexEl].edges[keys[i]] = edges[i]
        }
        isRight = result[indexEl].edges.left && result[indexEl].edges.left.edgeTypeId === conditions
    }
}

function toTurnFirstInRow(keys, result, indexEl, conditions) {
    const edges = Object.values(result[indexEl].edges)
    let isBottom = result[indexEl].edges.top && result[indexEl].edges.top.edgeTypeId === conditions
    while (!isBottom) {
        edges.push(edges.shift())
        for (let i = 0; i < keys.length; i++) {
            result[indexEl].edges[keys[i]] = edges[i]
        }
        isBottom = result[indexEl].edges.top && result[indexEl].edges.top.edgeTypeId === conditions
    }
}

function findNextPuzzle(items, edgeTypeId, type) {
    for (let i = 0; i < items.length; i++) {
        for (let key in items[i].edges) {
            if (items[i].edges[key] && items[i].edges[key].edgeTypeId === edgeTypeId && items[i].edges[key].type !== type) {
                return i
            }
        }
    }
}
