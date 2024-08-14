import {MiniElement, render} from "./package/Element";

function __main() {
    let demo: MiniElement = {
        type: "div",
        props: {
            children: [
                { type: "input", props: { value: "foo", type: "text" } },
                { type: "a", props: { href: "/bar" } },
                { type: "span", props: {} }
            ]
        }
    }

    let textDemo: MiniElement = {
        type: "span",
        props: {
            children: [
                {type: "textNode", props: { nodeValue: "Foo" }}
            ]
        }
    }

    let root = document.querySelector("#root") as HTMLElement
    render(textDemo, root)
}

__main()
