import { Compilation } from "./Compilation";
export declare class WasmSharpWebWorker {
    #private;
    private interop;
    constructor();
    initializeAsync(options?: any): Promise<void>;
    createCompilationAsync(code: string): Compilation;
}
