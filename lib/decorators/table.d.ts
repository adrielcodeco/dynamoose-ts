export interface TableOptions {
    name: string;
}
export declare function Table<T extends {
    new (...args: any[]): {};
}>(name?: string): (constructor: T) => any;
export declare function Table<T extends {
    new (...args: any[]): {};
}>(options?: TableOptions): (constructor: T) => any;
//# sourceMappingURL=table.d.ts.map