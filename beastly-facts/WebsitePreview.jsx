import React from 'react';

export default function WebsitePreview(props) {
  const { document } = props;
  
  // Replace this with your actual website preview URL
  const previewUrl = document?.slug?.current 
    ? `http://localhost:5173/blog/${document.slug.current}?preview=true`
    : 'http://localhost:5173/blog?preview=true';

  return (
    <div className="h-full overflow-hidden">
      <iframe 
        src={previewUrl}
        className="w-full h-full border-0"
        title="Website Preview"
      />
    </div>
  );
}