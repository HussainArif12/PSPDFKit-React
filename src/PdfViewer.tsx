import { useEffect, useRef } from "react";

export default function PdfViewer(props: any) {
  const containerRef = useRef(null);

  async function createTextAnnotation(instance: any, PSPDFKit: any) {
    const annotation = new PSPDFKit.Annotations.TextAnnotation({
      pageIndex: 0, // Which page should have this annotation.
      text: {
        format: "plain",
        value: "Welcome to\nPSPDFKit",
      }, // Text to embed in the annotation.
      font: "Helvetica",
      isBold: true,
      horizontalAlign: "center", // Align your text to the center of the page.
      boundingBox: new PSPDFKit.Geometry.Rect({
        // The position of your annotation.
        left: 50,
        top: 200,
        width: 100,
        height: 80,
      }),
      fontColor: PSPDFKit.Color.BLACK, // Color of your chosen text.
    });
    const createdAnnotation = await instance.create(annotation); // In the end, attach this annotation to your PDF.
    return createdAnnotation;
  }

  useEffect(() => {
    const container = containerRef.current;
    let instance, PSPDFKit: any;

    (async function () {
      PSPDFKit = await import("pspdfkit");
      PSPDFKit.unload(container);

      instance = await PSPDFKit.load({
        // Container where PSPDFKit should be mounted.
        container: container,
        // The document to open.
        document: props.document,
        // Use the public directory URL as a base URL. PSPDFKit will download its library assets from here.
        baseUrl: `${window.location.protocol}//${window.location.host}/public/`,
      });

      createTextAnnotation(instance, PSPDFKit);
    })();

    return () => PSPDFKit && PSPDFKit.unload(container);
  }, []);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100vh" }}></div>
  );
}
