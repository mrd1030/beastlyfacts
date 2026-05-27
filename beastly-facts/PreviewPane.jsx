import React, { useState, useEffect } from 'react';
import PortableTextRenderer from '../src/components/PortableTextRenderer';   // ← Default import (no curly braces)

export default function PreviewPane(props) {
  const { document } = props;
  const [previewData, setPreviewData] = useState(null);

  useEffect(() => {
    if (document) {
      setPreviewData(document);
    }
  }, [document]);

  if (!previewData) {
    return <div className="p-8 text-center text-muted-foreground">Loading preview...</div>;
  }

  return (
    <div className="h-full overflow-auto bg-background p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">{previewData.title}</h1>

        {previewData.mainImage && (
          <img 
            src={previewData.mainImage.asset?.url || previewData.mainImage} 
            alt={previewData.title}
            className="w-full rounded-2xl mb-10"
          />
        )}

        <PortableTextRenderer content={previewData.body} />
      </div>
    </div>
  );
}