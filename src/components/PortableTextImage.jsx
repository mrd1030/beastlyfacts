import React from 'react';
import { urlFor } from '../lib/sanityImage';

export default function PortableTextImage({ value, onPostClick }) {
  if (!value?.asset) return null;

  const imageUrl = urlFor(value.asset).width(800).url();
  const altText = value.alt || value.caption || '';
  const linkUrl = value.link || value.href || null;

  const handleClick = () => {
    if (linkUrl) {
      window.open(linkUrl, '_blank', 'noopener,noreferrer');
    } else if (onPostClick) {
      onPostClick(value);
    }
  };

  const ImageElement = (
    <img
      src={imageUrl}
      alt={altText}
      style={{ maxWidth: '400px', maxHeight: '300px', objectFit: 'contain' }}
      className={`rounded-2xl shadow-md transition-shadow ${linkUrl ? 'cursor-pointer hover:shadow-xl' : ''}`}
      onClick={handleClick}
    />
  );

  return (
    <figure className="my-8 flex justify-center">
      {linkUrl ? (
        <a href={linkUrl} target="_blank" rel="noopener noreferrer">
          {ImageElement}
        </a>
      ) : (
       ImageElement
      )}
      {/* NO VISIBLE CAPTION - alt text is still in the img tag for SEO */}
    </figure>
  );
}