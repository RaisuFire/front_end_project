import Mini, {HTMLElementProps, HTMLTags} from "../../types";

type MiniNode = TextElement | MiniElement | HTMLElementProps

interface TextElement {
    type: "textNode",
    props: {
        children ?: Array<MiniNode>,
        nodeValue: string
    }
}

interface MiniElement {
    type: HTMLTags,
    props: {
        children ?: Array<MiniNode>
    } | HTMLElementProps
}

function isMiniElement(object: any): object is MiniElement {
    return 'type' in object && 'props' in object && object.type != "textNode"
}

const validChildren = (children: any) => {
    return !(children === undefined || children === null || typeof children === 'boolean')
}

function render(element: TextElement, container: HTMLElement): void
function render(element: MiniElement, container: HTMLElement): void
function render(element: MiniElement | TextElement, container: HTMLElement): void {
    const {type, props} = element
    let dom = isMiniElement(element) ? document.createElement(type) : document.createTextNode("")

    // Add event listeners
    const isListener = (name: string) => {
        name.startsWith("on")
    }
    Object.keys(props).filter(isListener).forEach(name => {
        const eventType = name.toLowerCase().substring(2);
        // @ts-ignore
        dom.addEventListener(eventType, props[name]);
    });

    // Set properties
    // const isAttribute = name => !isListener(name) && name != "children";
    // Object.keys(props).filter(isAttribute).forEach(name => {
    //     dom[name] = props[name];
    // });


    if (Array.isArray(props.children)) {
        let children = (props.children || []).filter(validChildren)
        children.forEach(child => {
            // @ts-ignore
            render(child, dom)
        })
    }

    container.appendChild(dom)
}


function createElement(type: string, props: any, ...children: MiniNode[]) {

}



export {
    render,
    MiniElement,
}




// import Mini, {HTMLElementProps, HTMLTags} from "../../types";
//
// type MiniNode = TextElement | MiniElement | HTMLElementProps
//
// interface TextElement {
//     type: "textNode",
//     props: {
//         children ?: Array<MiniNode>,
//         nodeValue: string
//     }
// }
//
// interface MiniElement {
//     type: HTMLTags,
//     props: {
//         children ?: Array<MiniNode>
//     } | HTMLElementProps
// }
//
// function isMiniElement(object: any): object is MiniElement {
//     return 'type' in object && 'props' in object && object.type != "textNode"
// }
//
// const validChildren = (children: any) => {
//     return !(children === undefined || children === null || typeof children === 'boolean')
// }
//
// function render(element: TextElement, container: HTMLElement): void
// function render(element: MiniElement, container: HTMLElement): void
// function render(element: MiniElement | TextElement, container: HTMLElement): void {
//     const {type, props} = element
//     let dom = isMiniElement(element) ? document.createElement(type) : document.createTextNode("")
//
//     // Add event listeners
//     const isListener = (name: string) => {
//         name.startsWith("on")
//     }
//     Object.keys(props).filter(isListener).forEach(name => {
//         const eventType = name.toLowerCase().substring(2);
//         // @ts-ignore
//         dom.addEventListener(eventType, props[name]);
//     });
//
//     // Set properties
//     // const isAttribute = name => !isListener(name) && name != "children";
//     // Object.keys(props).filter(isAttribute).forEach(name => {
//     //     dom[name] = props[name];
//     // });
//
//
//     if (Array.isArray(props.children)) {
//         let children = (props.children || []).filter(validChildren)
//         children.forEach(child => {
//             // @ts-ignore
//             render(child, dom)
//         })
//     }
//
//     container.appendChild(dom)
// }
//
// export {
//     render,
//     MiniElement,
// }
//
// //
// // function __main() {
// //     let textDemo: MiniElement = {
// //         type: "span",
// //         props: {
// //             children: [
// //                 {type: "textNode", props: { nodeValue: "Foo" }}
// //             ]
// //         }
// //     }
// //
// //     // let root = document.querySelector("#root") as HTMLElement
// //     render(textDemo, null)
// // }
// //
// //
// // __main()
