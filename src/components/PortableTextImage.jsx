import React from 'react';
import { urlFor } from '../lib/sanityImage';

export default function PortableTextImage({ value, link, alt, onPostClick }) {
  if (!value?.asset) return null;

  const imageUrl = urlFor(value.asset).width(800).url();
  const altText = alt || value.alt || value.caption || 'Blog image';
  const linkUrl = link || value.link || value.href || null;

  const imageEl = (
    <img
      src={imageUrl}
      alt={altText}
      className={`rounded-2xl shadow-md w-full max-w-lg max-h-80 object-contain transition-shadow ${linkUrl ? 'cursor-pointer hover:shadow-xl' : ''}`}
    />
  );

  return (
    <figure className="my-8 flex justify-center">
      {linkUrl ? (
        <a href={linkUrl} target="_blank" rel="noopener noreferrer">
          {imageEl}
        </a>
      ) : (
        imageEl
      )}
    </figure>
  );
}