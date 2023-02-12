const getCursorPosition = (element, event) => {
    if (!element) {
        return
    }
    let rect = element.getBoundingClientRect()
    let x = event.clientX - rect.left
    let y = event.clientY - rect.top
    return {x, y}

}