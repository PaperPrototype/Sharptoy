type DevicePixelRatioChangeCallback = (newRatio: number) => void;
/**
 * Tracks changes in window.devicePixelRatio reactively.
 *
 * @param callback The function to call when the devicePixelRatio changes.
 * @returns A cleanup function to stop listening for changes.
 */
export declare function trackPixelRatioChange(callback: DevicePixelRatioChangeCallback): () => void;
export {};
