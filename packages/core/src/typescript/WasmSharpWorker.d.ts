import type { WasmSharpModuleCallbacks, WasmSharpModuleOptions } from "./WasmCompiler.js";
import { CompilationInterop } from "./CompilationInterop.js";
import { Compilation } from "./Compilation.js";
export declare class WasmSharpWorker {
    private interop;
    constructor(interop: CompilationInterop);
    static initializeAsync(options?: WasmSharpModuleOptions, callbacks?: WasmSharpModuleCallbacks): Promise<WasmSharpWorker>;
    createCompilationAsync(code: string): Promise<Compilation>;
}
