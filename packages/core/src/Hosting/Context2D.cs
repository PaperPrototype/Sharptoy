//https://github.com/dotnet/aspnetcore/blob/da6c314d76628c1f130f76ed3e55f1d39057e091/src/Components/WebAssembly/WebAssembly/src/Services/WebAssemblyConsoleLogger.cs

// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

using System.Runtime.InteropServices.JavaScript;
using System.Text;
using Microsoft.Extensions.Logging;

// namespace Microsoft.AspNetCore.Components.WebAssembly.Services;

public static partial class Context2D
{
    // SETTERS
    [JSImport("context2D.globalAlpha", "main.js")] public static partial void GlobalAlpha(double a);
    [JSImport("context2D.fillStyle", "main.js")] public static partial void FillStyle(string color);
    [JSImport("context2D.lineWidth", "main.js")] public static partial void LineWidth(double w);
    [JSImport("context2D.font", "main.js")] public static partial void Font(string font);

    // FILL SHAPE
    [JSImport("context2D.fillText", "main.js")] public static partial void FillText(string text, double x, double y);
    // [JSImport("context2D.strokeText", "main.js")] public static partial void StrokeText(string text, double x, double y); // TODO
    // [JSImport("context2D.measureText", "main.js")] public static partial void MeasureText(string text); // this returns a jsObject with weird fields
    [JSImport("context2D.fillRect", "main.js")] public static partial void FillRect(double x, double y, double w, double h);
    [JSImport("context2D.strokeRect", "main.js")] public static partial void StrokeRect(double x, double y, double w, double h);
    [JSImport("context2D.beginPath", "main.js")] public static partial void BeginPath();
    [JSImport("context2D.moveTo", "main.js")] public static partial void MoveTo(double x, double y);
    [JSImport("context2D.lineTo", "main.js")] public static partial void LineTo(double x, double y);
    [JSImport("context2D.closePath", "main.js")] public static partial void ClosePath();
    [JSImport("context2D.stroke", "main.js")] public static partial void Stroke();
    [JSImport("context2D.fill", "main.js")] public static partial void Fill();

    // TRANSFORM
    [JSImport("context2D.clip", "main.js")] public static partial void Clip();
    [JSImport("context2D.rotate", "main.js")] public static partial void Rotate(double angle);
    [JSImport("context2D.scale", "main.js")] public static partial void Scale(double x, double y);
    [JSImport("context2D.translate", "main.js")] public static partial void Translate(double x, double y);
    [JSImport("context2D.transform", "main.js")] public static partial void Transform(double a, double b, double c, double d, double e, double f);
    [JSImport("context2D.setTransform", "main.js")] public static partial void SetTransform(double a, double b, double c, double d, double e, double f);
    // [JSImport("context2D.getTransform", "main.js")] public static partial void GetTransform(double a, double b, double c, double d, double e, double f);
    [JSImport("context2D.resetTransform", "main.js")] public static partial void ResetTransform();

    // CONTEXT
    [JSImport("context2D.save", "main.js")] public static partial void Save();
    [JSImport("context2D.restore", "main.js")] public static partial void Restore();
    [JSImport("context2D.reset", "main.js")] public static partial void Reset();
}
