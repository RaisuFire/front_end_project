const BlockType = [
    [[0, 0], [1, 0], [2, 0], [3, 0]],
    [[0, 0], [0, 1], [1, 0], [1, 1]],
    [[0, 1], [1, 0], [1, 1], [2, 1]],
    [[0, 0], [0, 1], [1, 1], [2, 1]],
    [[0, 1], [1, 1], [2, 0], [2, 1]],
    [[0, 0], [1, 0], [1, 1], [2, 1]],
    [[0, 1], [1, 0], [1, 1], [2, 0]],
]

const KeySettings = {
    rotate: {
        keyCode: 38,            // 方向键向上
        sel: '#rotate_btn',
    },
    speedUp: {
        keyCode: 40,            // 方向键向下
        sel: '#down_btn',
    },
    left: {
        keyCode: 37,            // 方向键向左
        sel: '#left_btn',
    },
    right: {
        keyCode: 39,            // 方向键向右
        sel: '#right_btn',
    },
    drop: {
        keyCode: 32,            // 空格
        sel: '#drop_btn',
    },
    pause: {
        keyCode: 80,            // P键
        sel: '#pause_btn',
    },
    reset: {
        keyCode: 82,            // R键
        sel: '#reset_btn',
    },
}

const BlockCol = 10
const BlockRow = 20

const BlockColor = {
    default: 'rgb(135, 147, 100)',
    occupied: 'rgb(0, 0, 0)',
    indicate: 'rgb(180, 0, 0)',
}

export {
    BlockType,
    KeySettings,
    BlockRow,
    BlockCol,
    BlockColor
}
