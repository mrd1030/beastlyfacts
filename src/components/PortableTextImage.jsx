import { urlFor } from '@/lib/sanity';

export default function PortableTextImage({ value, onPostClick }) {
  if (!value?.asset?._ref) {
    return null;
  }

  const { alt, caption, link } = value;
  const hasLink = link?.urlType !== 'none' && (link?.externalUrl || link?.internalRef);

  const ImageElement = (
    <img 
      src={urlFor(value).width(600).url()} 
      alt={alt || 'Pet image'} 
      className="max-w-300 max-h-[300px] w-full mx-auto object-contain rounded-2xl my-8 shadow-lg" 
    />
  );

  // Handle Click
  const handleClick = () => {
    if (link?.urlType === 'external' && link?.externalUrl) {
      window.open(link.externalUrl, '_blank');
    } 
    else if (link?.urlType === 'internal' && link?.internalRef?.slug?.current && onPostClick) {
      onPostClick(link.internalRef.slug.current);
    }
  };

  // Has Link → clickable + hover effect
  if (hasLink) {
    return (
      <div 
        onClick={handleClick} 
        className="block group cursor-pointer"
      >
        <img 
          src={urlFor(value).width(600).url()} 
          alt={alt || 'Pet image'} 
          className="max-w-300 max-h-[300px] w-full mx-auto object-contain rounded-2xl my-8 shadow-lg hover:scale-105 transition-transform duration-300" 
        />
        {caption && (
          <p className="text-center text-sm text-gray-500 mt-3 italic">
            {caption}
          </p>
        )}
      </div>
    );
  }

  // No Link → plain image, no hover
  return (
    <figure className="my-8">
      {ImageElement}
      {caption && (
        <figcaption className="text-center text-sm text-gray-500 mt-3 italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}