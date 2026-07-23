/**
 * Tracks changes in window.devicePixelRatio reactively.
 *
 * @param callback The function to call when the devicePixelRatio changes.
 * @returns A cleanup function to stop listening for changes.
 */
export function trackPixelRatioChange(callback) {
    // The media query listener for 'change' events provides the event object, 
    // but we can just check window.devicePixelRatio inside the handler.
    const handler = () => {
        callback(window.devicePixelRatio);
    };
    // Modern browsers support listening for 'change' events directly on the matchMedia result, 
    // but we must use the correct query that will always match the current state to be notified of *any* change.
    // The 'resolution' media feature can't be used to match the current value to be notified when it changes from it.
    // The recommended approach is to use the `change` event on a broad matchMedia query (though this event is primarily for when the *matching status* of a query changes).
    // Let's use the widely accepted recursive method with a slight improvement for cleanup:
    let mediaQueryList;
    const setupListener = (initialRatio) => {
        if (mediaQueryList) {
            mediaQueryList.removeEventListener('change', listener);
        }
        mediaQueryList = window.matchMedia(`screen and (resolution: ${initialRatio}dppx)`);
        mediaQueryList.addEventListener('change', listener);
    };
    const listener = () => {
        const newRatio = window.devicePixelRatio;
        callback(newRatio);
        // Recursively set up for the new ratio
        setupListener(newRatio);
    };
    // Initial setup
    setupListener(window.devicePixelRatio);
    // Return the cleanup function
    return () => {
        if (mediaQueryList) {
            mediaQueryList.removeEventListener('change', listener);
        }
    };
}
// Example Usage:
// const cleanup = trackPixelRatioChange((newRatio) => {
//   console.log('Device Pixel Ratio changed to:', newRatio);
// });
// To stop tracking: cleanup();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGl4ZWxSYXRpb1V0aWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9waXhlbFJhdGlvVXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTs7Ozs7R0FLRztBQUNILE1BQU0sVUFBVSxxQkFBcUIsQ0FBQyxRQUF3QztJQUM1RSwyRUFBMkU7SUFDM0Usb0VBQW9FO0lBQ3BFLE1BQU0sT0FBTyxHQUFHLEdBQUcsRUFBRTtRQUNuQixRQUFRLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDcEMsQ0FBQyxDQUFDO0lBRUYsNEZBQTRGO0lBQzVGLDZHQUE2RztJQUM3RyxrSEFBa0g7SUFFbEgsd0tBQXdLO0lBRXhLLHdGQUF3RjtJQUV4RixJQUFJLGNBQThCLENBQUM7SUFDbkMsTUFBTSxhQUFhLEdBQUcsQ0FBQyxZQUFvQixFQUFFLEVBQUU7UUFDN0MsSUFBSSxjQUFjLEVBQUUsQ0FBQztZQUNuQixjQUFjLENBQUMsbUJBQW1CLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3pELENBQUM7UUFDRCxjQUFjLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQywyQkFBMkIsWUFBWSxPQUFPLENBQUMsQ0FBQztRQUNuRixjQUFjLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3RELENBQUMsQ0FBQztJQUVGLE1BQU0sUUFBUSxHQUFHLEdBQUcsRUFBRTtRQUNwQixNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUM7UUFDekMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ25CLHVDQUF1QztRQUN2QyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDMUIsQ0FBQyxDQUFDO0lBRUYsZ0JBQWdCO0lBQ2hCLGFBQWEsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUV2Qyw4QkFBOEI7SUFDOUIsT0FBTyxHQUFHLEVBQUU7UUFDVixJQUFJLGNBQWMsRUFBRSxDQUFDO1lBQ25CLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDekQsQ0FBQztJQUNILENBQUMsQ0FBQztBQUNKLENBQUM7QUFFRCxpQkFBaUI7QUFDakIsd0RBQXdEO0FBQ3hELDZEQUE2RDtBQUM3RCxNQUFNO0FBQ04sK0JBQStCIiwic291cmNlc0NvbnRlbnQiOlsidHlwZSBEZXZpY2VQaXhlbFJhdGlvQ2hhbmdlQ2FsbGJhY2sgPSAobmV3UmF0aW86IG51bWJlcikgPT4gdm9pZDtcblxuLyoqXG4gKiBUcmFja3MgY2hhbmdlcyBpbiB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyByZWFjdGl2ZWx5LlxuICogXG4gKiBAcGFyYW0gY2FsbGJhY2sgVGhlIGZ1bmN0aW9uIHRvIGNhbGwgd2hlbiB0aGUgZGV2aWNlUGl4ZWxSYXRpbyBjaGFuZ2VzLlxuICogQHJldHVybnMgQSBjbGVhbnVwIGZ1bmN0aW9uIHRvIHN0b3AgbGlzdGVuaW5nIGZvciBjaGFuZ2VzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gdHJhY2tQaXhlbFJhdGlvQ2hhbmdlKGNhbGxiYWNrOiBEZXZpY2VQaXhlbFJhdGlvQ2hhbmdlQ2FsbGJhY2spOiAoKSA9PiB2b2lkIHtcbiAgLy8gVGhlIG1lZGlhIHF1ZXJ5IGxpc3RlbmVyIGZvciAnY2hhbmdlJyBldmVudHMgcHJvdmlkZXMgdGhlIGV2ZW50IG9iamVjdCwgXG4gIC8vIGJ1dCB3ZSBjYW4ganVzdCBjaGVjayB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyBpbnNpZGUgdGhlIGhhbmRsZXIuXG4gIGNvbnN0IGhhbmRsZXIgPSAoKSA9PiB7XG4gICAgY2FsbGJhY2sod2luZG93LmRldmljZVBpeGVsUmF0aW8pO1xuICB9O1xuXG4gIC8vIE1vZGVybiBicm93c2VycyBzdXBwb3J0IGxpc3RlbmluZyBmb3IgJ2NoYW5nZScgZXZlbnRzIGRpcmVjdGx5IG9uIHRoZSBtYXRjaE1lZGlhIHJlc3VsdCwgXG4gIC8vIGJ1dCB3ZSBtdXN0IHVzZSB0aGUgY29ycmVjdCBxdWVyeSB0aGF0IHdpbGwgYWx3YXlzIG1hdGNoIHRoZSBjdXJyZW50IHN0YXRlIHRvIGJlIG5vdGlmaWVkIG9mICphbnkqIGNoYW5nZS5cbiAgLy8gVGhlICdyZXNvbHV0aW9uJyBtZWRpYSBmZWF0dXJlIGNhbid0IGJlIHVzZWQgdG8gbWF0Y2ggdGhlIGN1cnJlbnQgdmFsdWUgdG8gYmUgbm90aWZpZWQgd2hlbiBpdCBjaGFuZ2VzIGZyb20gaXQuXG4gIFxuICAvLyBUaGUgcmVjb21tZW5kZWQgYXBwcm9hY2ggaXMgdG8gdXNlIHRoZSBgY2hhbmdlYCBldmVudCBvbiBhIGJyb2FkIG1hdGNoTWVkaWEgcXVlcnkgKHRob3VnaCB0aGlzIGV2ZW50IGlzIHByaW1hcmlseSBmb3Igd2hlbiB0aGUgKm1hdGNoaW5nIHN0YXR1cyogb2YgYSBxdWVyeSBjaGFuZ2VzKS5cbiAgXG4gIC8vIExldCdzIHVzZSB0aGUgd2lkZWx5IGFjY2VwdGVkIHJlY3Vyc2l2ZSBtZXRob2Qgd2l0aCBhIHNsaWdodCBpbXByb3ZlbWVudCBmb3IgY2xlYW51cDpcbiAgXG4gIGxldCBtZWRpYVF1ZXJ5TGlzdDogTWVkaWFRdWVyeUxpc3Q7XG4gIGNvbnN0IHNldHVwTGlzdGVuZXIgPSAoaW5pdGlhbFJhdGlvOiBudW1iZXIpID0+IHtcbiAgICBpZiAobWVkaWFRdWVyeUxpc3QpIHtcbiAgICAgIG1lZGlhUXVlcnlMaXN0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGxpc3RlbmVyKTtcbiAgICB9XG4gICAgbWVkaWFRdWVyeUxpc3QgPSB3aW5kb3cubWF0Y2hNZWRpYShgc2NyZWVuIGFuZCAocmVzb2x1dGlvbjogJHtpbml0aWFsUmF0aW99ZHBweClgKTtcbiAgICBtZWRpYVF1ZXJ5TGlzdC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBsaXN0ZW5lcik7XG4gIH07XG5cbiAgY29uc3QgbGlzdGVuZXIgPSAoKSA9PiB7XG4gICAgY29uc3QgbmV3UmF0aW8gPSB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbztcbiAgICBjYWxsYmFjayhuZXdSYXRpbyk7XG4gICAgLy8gUmVjdXJzaXZlbHkgc2V0IHVwIGZvciB0aGUgbmV3IHJhdGlvXG4gICAgc2V0dXBMaXN0ZW5lcihuZXdSYXRpbyk7IFxuICB9O1xuXG4gIC8vIEluaXRpYWwgc2V0dXBcbiAgc2V0dXBMaXN0ZW5lcih3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyk7XG5cbiAgLy8gUmV0dXJuIHRoZSBjbGVhbnVwIGZ1bmN0aW9uXG4gIHJldHVybiAoKSA9PiB7XG4gICAgaWYgKG1lZGlhUXVlcnlMaXN0KSB7XG4gICAgICBtZWRpYVF1ZXJ5TGlzdC5yZW1vdmVFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBsaXN0ZW5lcik7XG4gICAgfVxuICB9O1xufVxuXG4vLyBFeGFtcGxlIFVzYWdlOlxuLy8gY29uc3QgY2xlYW51cCA9IHRyYWNrUGl4ZWxSYXRpb0NoYW5nZSgobmV3UmF0aW8pID0+IHtcbi8vICAgY29uc29sZS5sb2coJ0RldmljZSBQaXhlbCBSYXRpbyBjaGFuZ2VkIHRvOicsIG5ld1JhdGlvKTtcbi8vIH0pO1xuLy8gVG8gc3RvcCB0cmFja2luZzogY2xlYW51cCgpO1xuIl19