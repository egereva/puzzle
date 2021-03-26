// 10x10
// solvePuzzle
// каждый тип (edgeTypeId) ушка встречается в массиве фрагментов паззла ровно два раза (один выступ и один вырез)

const items = [
    {
      id: 1,
      edges: {
          top: null,
          right: { edgeTypeId: 7, type: "outside" },
          bottom: { edgeTypeId: 5, type: "inside" },
          left: null,
      },
    },
    {
      id: 9,
      edges: {
        top: { edgeTypeId: 8, type: "inside" },
        right: { edgeTypeId: 15, type: "inside" },
        bottom: null,
        left: { edgeTypeId: 5, type: "outside" },
      },
    },
    {
      id: 5,
      edges: {
        top: null,
        right: { edgeTypeId: 2, type: "inside" },
        bottom: { edgeTypeId: 1, type: "inside" },
        left: null,
      },
    },
    {
      id: 4,
      edges: {
        top: { edgeTypeId: 34, type: "inside" },
        right: { edgeTypeId: 11, type: "outside" },
        bottom: { edgeTypeId: 7, type: "inside" },
        left: null,
      },
    },
    {
      id: 3,
      edges: {
        top: { edgeTypeId: 2, type: "outside" },
        right: null,
        bottom: { edgeTypeId: 4, type: "outside" },
        left: { edgeTypeId: 6, type: "inside" },
      },
    },
    {
      id: 2,
      edges: {
        top: { edgeTypeId: 3, type: "outside" },
        right: { edgeTypeId: 34, type: "outside" },
        bottom: null,
        left: null,
      },
    },
    {
      id: 8,
      edges: {
        top: null,
        right: { edgeTypeId: 15, type: "outside" },
        bottom: { edgeTypeId: 4, type: "inside" },
        left: null,
      },
    },
    {
      id: 7,
      edges: {
        top: { edgeTypeId: 3, type: "inside" },
        right: null,
        bottom: { edgeTypeId: 1, type: "outside" },
        left: { edgeTypeId: 10, type: "inside" },
      },
    },
    {
      id: 6,
      edges: {
        top: { edgeTypeId: 11, type: "inside" },
        right: { edgeTypeId: 10, type: "outside" },
        bottom: { edgeTypeId: 6, type: "outside" },
        left: { edgeTypeId: 8, type: "outside" },
      },
    },
  ];

const result = []

console.log(items)
solvePuzzle()



function solvePuzzle() {
    const itemsInRow = Math.trunc(Math.sqrt(items.length)) - 1
    result[0] = Object.assign({}, items[0])
    const keys =  Object.keys(result[0].edges)

    toTurnPuzzle(keys, 0)

    for(let row = 0; row < itemsInRow+1; row++) {
        for(let i = row * itemsInRow; i < (itemsInRow*(row+1)); i++) {
            if(row > 0 && !(i % itemsInRow)) {
                const bottom = result[i - itemsInRow].edges.bottom.edgeTypeId
                const bottomType = result[i - itemsInRow].edges.bottom.type
                console.log(result[i - (itemsInRow)])
                console.log(bottom)

                const item = findEdgesId(bottom, bottomType)
                result.push(items[item])
                toTurnPuzzleBottom(keys,i+1, bottom)
            } else {
                const right = result[i].edges.right.edgeTypeId
                const rightType = result[i].edges.right.type
                const item = findEdgesId(right, rightType)
                result.push(items[item])
                console.log(result)
                toTurnPuzzleRight(keys,i+1, right)
            }
            row++
        }
        console.log(row)

    }

}

// если top и left не null, присваиваем им следующие ключи

function toTurnPuzzle (keys, indexEl) {
    const edges = Object.values(result[indexEl].edges)
    let isFirstItem = result[indexEl].edges.top === null && result[indexEl].edges.left === null

    while(!isFirstItem) {
        edges.push(edges.shift())
        for(let i =  0; i < keys.length; i++) {
            result[indexEl].edges[keys[i]] = edges[i]
        }
        isFirstItem = result[indexEl].edges.top === null && result[indexEl].edges.left === null
    }
}

function toTurnPuzzleRight (keys, indexEl, conditions) {
    const edges = Object.values(result[indexEl].edges)
    let isRight = result[indexEl].edges.left && result[indexEl].edges.left.edgeTypeId === conditions

    while(!isRight) {
        edges.push(edges.shift())
        for(let i =  0; i < keys.length; i++) {
            result[indexEl].edges[keys[i]] = edges[i]
        }
        isRight = result[indexEl].edges.left && result[indexEl].edges.left.edgeTypeId === conditions
    }
}

function toTurnPuzzleBottom (keys, indexEl, conditions) {
    const edges = Object.values(result[indexEl].edges)
    let isBottom = result[indexEl].edges.top && result[indexEl].edges.top.edgeTypeId === conditions
    console.log(result[indexEl])
    console.log(isBottom)
    while(!isBottom) {
        edges.push(edges.shift())
        for(let i =  0; i < keys.length; i++) {
            result[indexEl].edges[keys[i]] = edges[i]
        }
        isBottom = result[indexEl].edges.top && result[indexEl].edges.top.edgeTypeId === conditions
    }
}

function findEdgesId(edgeTypeId, type) {
    for(let i = 0; i < items.length; i++) {

        for (let key in items[i].edges) {
            if(items[i].edges[key] && items[i].edges[key].edgeTypeId === edgeTypeId && items[i].edges[key].type !== type) {
                return i
            }
        }
    }
}

// правильно ставим первый элемент (верх 0, право 0)
// строим верхний ряд:

// для элемента получаем правое ушко и ищем во всем массиве совпадение по id edgeTypeId
// поворачиваем элемент так, чтобы этот edgeTypeId был слева

// повторяем два последних действия столько раз, сколько элементов в ряду пазла

//далее
