import type { WasmSharpModuleOptions, WasmSharpModuleCallbacks } from "./WasmCompiler.js";
export declare function initializeWasmSharpModule(options: WasmSharpModuleOptions | undefined, callbacks: WasmSharpModuleCallbacks | undefined): Promise<import("./CompilationInterop.js").CompilationInterop>;
