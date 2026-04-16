import { useRef } from "react";
import { UploadCloud } from "lucide-react";

const UploadBox = ({ title, name, file, previewName, onFileChange, error, accept = "image/png,image/jpeg,image/jpg" }) => {
  const inputRef = useRef(null);

  const handleFile = (selectedFile) => {
    if (!selectedFile) return;
    onFileChange(name, selectedFile);
  };

  const handleChange = (event) => {
    handleFile(event.target.files?.[0]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    handleFile(droppedFile);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const displayLabel = file?.name || previewName || "Drop image here or";

  return (
    <div className="border border-border rounded-lg p-5 bg-card">
      <h4 className="text-sm font-semibold text-foreground mb-3">{title}</h4>
      <div
        className={`border-2 border-dashed rounded-lg bg-[hsl(var(--upload-bg))] py-8 px-4 flex flex-col items-center justify-center text-center cursor-pointer ${error ? "border-destructive" : "border-[hsl(var(--upload-border))]"}`}
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <UploadCloud className="w-9 h-9 text-link mb-2" strokeWidth={1.5} />
        <p className="text-sm text-foreground">
          {displayLabel} <span className="text-link font-medium">click to browse</span>
        </p>
        <p className="text-xs text-muted-foreground mt-1.5">Accepted: JPG, JPEG, PNG</p>
        <p className="text-xs text-muted-foreground">Image files only</p>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={handleChange}
        />
      </div>
      {error && <p className="text-sm text-destructive mt-2">{error}</p>}
    </div>
  );
};

export default UploadBox;
