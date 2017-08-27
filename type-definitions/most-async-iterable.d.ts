declare module "most-async-iterable" {
    import { Stream } from 'most'
    
    export function fromAsyncIterable<A>(asyncIterable: AsyncIterable<A>): Stream<A>;
    export function asyncGenerate<A>(generator: Function, ...args: any[]): Stream<A>;
}
