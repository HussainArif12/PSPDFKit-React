import PdfViewerComponent from "./PdfViewer";
import document from "./document.pdf";
function App() {
  return (
    <div className="App">
      <div className="PDF-viewer">
        <PdfViewerComponent document={document} />
      </div>
    </div>
  );
}

export default App;
