import React, { Dispatch } from 'react'

export = Mini;
export as namespace Mini;

declare namespace Mini {
    type FunctionComponent<P = {}> = (props: P & {
        children?: MiniNode;
    }) => MiniNode;

    type HTMLTags = keyof React.ReactHTML
    type HTMLElementProps = React.AllHTMLAttributes<HTMLElement>
    type MiniNode = string | number | boolean | undefined | null | MiniElement
    type SyntheticEvent = React.SyntheticEvent
    // type EventHandler = React.EventHandler

    interface NewLifecycle<P, S, SS> {
        /**
         * Runs before React applies the result of `render` to the document, and
         * returns an object to be given to componentDidUpdate. Useful for saving
         * things such as scroll position before `render` causes changes to it.
         *
         * Note: the presence of getSnapshotBeforeUpdate prevents any of the deprecated
         * lifecycle events from running.
         */
        getSnapshotBeforeUpdate?(
            prevProps: Readonly<P>,
            prevState: Readonly<S>
        ): SS | null;
        /**
         * Called immediately after updating occurs. Not called for the initial render.
         *
         * The snapshot is only present if getSnapshotBeforeUpdate is present and returns non-null.
         */
        componentDidUpdate?(
            prevProps: Readonly<P>,
            prevState: Readonly<S>,
            snapshot?: SS
        ): void;
    }

    interface ComponentLifecycle<P, S, SS = any>
        extends NewLifecycle<P, S, SS> {
        /**
         * Called immediately after a component is mounted. Setting state here will trigger re-rendering.
         */
        componentDidMount?(): void;
        /**
         * Called to determine whether the change in props and state should trigger a re-render.
         *
         * `Component` always returns true.
         * `PureComponent` implements a shallow comparison on props and state and returns true if any
         * props or states have changed.
         *
         * If false is returned, `Component#render`, `componentWillUpdate`
         * and `componentDidUpdate` will not be called.
         */
        shouldComponentUpdate?(
            nextProps: Readonly<P>,
            nextState: Readonly<S>,
            nextContext: any
        ): boolean;
        /**
         * Called immediately before a component is destroyed. Perform any necessary cleanup in this method, such as
         * cancelled network requests, or cleaning up any DOM elements created in `componentDidMount`.
         */
        componentWillUnmount?(): void;

        componentWillUpdate?(): void;
        /**
         * Catches exceptions generated in descendant components. Unhandled exceptions will cause
         * the entire component tree to unmount.
         */
        componentDidCatch?(error: Error, errorInfo: any): void;
    }

    interface StaticLifecycle<P, S> {
        getDerivedStateFromProps?: React.GetDerivedStateFromProps<P, S>;
        getDerivedStateFromError?: React.GetDerivedStateFromError<P, S>;
    }

    interface Component<P = {}, S = {}> extends ComponentLifecycle<P, S> {}

    class Component<P, S> {
        static contextType?: any;
        static isClassComponent?: boolean;

        context: any;

        constructor(props: Readonly<P>);
        /**
         * @deprecated
         * @see https://reactjs.org/docs/legacy-context.html
         */
        constructor(props: P, context?: any);

        // We MUST keep setState() as a unified signature because it allows proper checking of the method return type.
        // See: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/18365#issuecomment-351013257
        // Also, the ` | S` allows intellisense to not be dumbisense
        setState<K extends keyof S>(
            state:
                | ((
                prevState: Readonly<S>,
                props: Readonly<P>
            ) => Pick<S, K> | S | null)
                | (Pick<S, K> | S | null),
            callback?: () => void
        ): void;

        forceUpdate(callback?: () => void): void;
        render(): MiniNode;

        // React.Props<T> is now deprecated, which means that the `children`
        // property is not available on `P` by default, even though you can
        // always pass children as variadic arguments to `createElement`.
        // In the future, if we can define its call signature conditionally
        // on the existence of `children` in `P`, then we should remove this.
        readonly props: Readonly<P> & Readonly<{ children?: MiniNode }>;
        state: Readonly<S>;
    }

    interface ComponentClass<P = {}, S = {}>
        extends StaticLifecycle<P, S> {
        new (props: P, context?: any): Component<P, S>;
        // propTypes?: WeakValidationMap<P>;
        // contextType?: Context<any>;
        // contextTypes?: ValidationMap<any>;
        // childContextTypes?: ValidationMap<any>;
        // defaultProps?: Partial<P>;
        // displayName?: string;
    }

    interface MiniElement {
        key: any;
        type: HTMLTags | FunctionComponent<any> | ComponentClass<any>;
        props: any;
    }


    /** hook */
    type HookReducer<S, A> = (state: S, action: A) => S;
    interface HookQueue<S = {}, A = {}> {
        last: HookUpdate<A> | null;
        dispatch: ((action: A) => void) | null;
        lastRenderedReducer: HookReducer<S, A>;
        lastRenderedState: S;
    }
    interface Hook<S = {}, A = {}> {
        memoizedState: S | null;
        baseState: S | null;
        queue: HookQueue<S, A> | null;
        baseUpdate: HookUpdate<A> | null;
        next: Hook<S, A> | null;
    }
    interface HookUpdate<A = {}> {
        next: HookUpdate<A> | null;
        action: A;
    }
    type Dispatch<A> = (action: A) => void;

    type useState<S> = (inititalState: S | (() => S)) => [S, Dispatch<S>]
    type useReducer<S, A>= (reducer: HookReducer<S, A>, initialState: S) => [S, Dispatch<A>]
}
