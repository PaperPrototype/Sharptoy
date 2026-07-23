import type { MonoConfig } from "./dotnet.js";
import type { Span } from "./Roslyn/Text.js";
import { type Remote } from "https://unpkg.com/comlink/dist/esm/comlink.mjs";
import { WasmSharpWorker } from "./WasmSharpWorker.js";
import { Compilation } from "./WasmCompiler.js";
import type { WasmSharpWebWorker } from "./worker.js";
import type { CompilationInterop } from "./CompilationInterop.js";
import { WellKnownTagArray } from "./Roslyn/WellKnownTags.js";
export interface WasmSharpModuleOptions {
    canvas: () => HTMLCanvasElement | undefined;
    /**
     * URL to resolve assemblies from.
     * @default import.meta.url
     */
    assembliesUrl?: string;
    /**
     * @default false
     */
    enableDiagnosticTracing?: boolean;
    /**
     * https://github.com/dotnet/runtime/blob/a270140281a13ab82a4401dff3da6d27fe499087/src/mono/wasi/runtime/driver.c#L470
     * * debug_level > 0 enables debugging and sets the debug log level to debug_level
     * * debug_level == 0 disables debugging and enables interpreter optimizations
     * * debug_level < 0 enabled debugging and disables debug logging.
     *
     * Note: when debugging is enabled interpreter optimizations are disabled.
     *
     * @default 0
     */
    debugLevel?: number;
}
export interface WasmSharpModuleCallbacks {
    onConfigLoaded?(config: MonoConfig): void;
    onDownloadResourceProgress?(loadedResources: number, totalResources: number): void;
}
export type WasmSharpOptions = {
    /**
     * Disable the web worker. Web workers provide a large performance boost as compilation and
     * execution can happen in the background. However Web Workers require a HTTPS URL.
     */
    disableWebWorker?: boolean;
} & WasmSharpModuleOptions & WasmSharpModuleCallbacks;
export declare class WasmSharpModule {
    private worker;
    constructor(worker: WasmSharpWorker | Remote<WasmSharpWebWorker>);
    static initializeAsync(options?: WasmSharpOptions): Promise<WasmSharpModule>;
    createCompilationAsync: (code: string) => Promise<Compilation>;
}
export type CompletionItem = {
    displayText: string;
    filterText: string;
    sortText: string;
    inlineDescription: string;
    tags: WellKnownTagArray;
    span: Span;
};
export interface AssemblyExports {
    Input: {
        Reset: () => void;
        CallMouseUp: (button: number) => void;
        CallMouseDown: (button: number) => void;
        CallMouseMove: (x: number, y: number) => void;
    };
    Screen: {
        CallUpdate: (deltaTime: number) => void;
        CallResize: (w: number, h: number) => void;
        CallPixelRatio: (pixelRatio: number) => void;
    };
    WasmSharp: {
        Core: {
            CompilationInterop: CompilationInterop;
        };
    };
}
export type DiagnosticSeverity = "Error" | "Warning" | "Info" | "Hidden";
export interface Diagnostic {
    id: string;
    message: string;
    location: Span;
    severity: DiagnosticSeverity;
}
interface RunResultSuccess {
    stdOut: string;
    stdErr: string;
    success: true;
    diagnostics: [];
}
interface RunResultFailure {
    stdOut: null;
    stdErr: null;
    success: false;
    diagnostics: Diagnostic[];
}
export type RunResult = RunResultSuccess | RunResultFailure;
export * from "./Roslyn/Text.js";
export * from "./Roslyn/WellKnownTags.js";
export * from "./WasmSharpWorker.js";
export { Compilation } from "./Compilation.js";
