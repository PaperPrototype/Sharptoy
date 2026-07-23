import type { Diagnostic, CompletionItem, RunResult } from "./WasmCompiler.js";
import type { CharacterOperation, CompilationInterop } from "./CompilationInterop.js";
export declare class Compilation {
    private compilationId;
    private wasmHost;
    private constructor();
    static create(code: string, interop: CompilationInterop): Compilation;
    recompileAsync(code: string): Promise<void>;
    getDiagnosticsAsync(): Promise<Diagnostic[]>;
    getCompletions(caretPosition: number, filterText?: string): Promise<CompletionItem[]>;
    shouldTriggerCompletionsAsync(caretPosition: number): Promise<boolean>;
    shouldTriggerCompletionsAsync(caretPosition: number, character: string, operation: CharacterOperation): Promise<boolean>;
    run(): Promise<RunResult>;
}
