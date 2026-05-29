import React from 'react';
import { PortableText } from '@portabletext/react';
import { Info, CheckCircle2, XCircle } from 'lucide-react';
import { urlFor } from '../lib/sanityImage';
import PortableTextImage from './PortableTextImage';

const components = {
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-secondary underline underline-offset-2 hover:text-secondary/80 transition-colors"
      >
        {children}
      </a>
    ),
  },
  block: {
    h1: ({ children }) => <h1 className="text-4xl font-bold mt-12 mb-6 text-foreground">{children}</h1>,
    h2: ({ children }) => <h2 className="text-3xl font-semibold mt-10 mb-5 text-foreground">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl font-semibold mt-8 mb-4 text-foreground">{children}</h3>,
    normal: ({ children }) => <p className="mb-6 leading-relaxed text-muted-foreground">{children}</p>,
  },

  list: {
    bullet: ({ children }) => <ul className="list-disc pl-6 mb-6 space-y-2 text-muted-foreground">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-6 mb-6 space-y-2 text-muted-foreground">{children}</ol>,
  },

  types: {
    // Image — pass link and alt explicitly from the block value
    image: ({ value }) => (
      <PortableTextImage
        value={value}
        link={value?.link || value?.href}
        alt={value?.alt || value?.caption}
      />
    ),

    // Amazon Product Recommendation
    productRecommendation: ({ value }) => (
      <div className="my-10 border border-secondary/20 rounded-2xl p-6 bg-card shadow-sm">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {value.image && (
            <div className="w-full md:w-48 flex-shrink-0">
              <img
                src={urlFor(value.image).width(400).url()}
                alt={value.productName || 'Product image'}
                className="rounded-xl object-contain w-full"
              />
            </div>
          )}
          <div className="flex-1">
            <h3 className="font-display font-bold text-xl text-foreground mb-1">{value.productName}</h3>
            {value.bestFor && (
              <p className="text-secondary font-body text-sm font-semibold mb-3">{value.bestFor}</p>
            )}
            {value.description && (
              <p className="text-sm text-muted-foreground font-body mb-4 leading-relaxed">{value.description}</p>
            )}
            {value.priceRange && (
              <p className="text-lg font-display font-bold text-foreground mb-4">{value.priceRange}</p>
            )}
            <a
              href={value.affiliateUrl || `https://www.amazon.com/dp/${value.asin}?tag=beastlyfacts-20`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-secondary hover:bg-secondary/90 text-secondary-foreground px-6 py-2.5 rounded-xl font-display font-semibold text-sm transition-all"
            >
              Check Price on Amazon →
            </a>
          </div>
        </div>
      </div>
    ),

    // Pros & Cons
    prosCons: ({ value }) => (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
        <div className="bg-green-50 border border-green-200 p-6 rounded-2xl">
          <h4 className="font-display font-bold text-green-700 text-lg mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" /> Pros
          </h4>
          <ul className="space-y-2.5 font-body text-sm text-green-800">
            {value.pros?.map((item, i) => (
              <li key={i} className="flex gap-2 items-start"><span className="mt-0.5">•</span>{item}</li>
            ))}
          </ul>
        </div>
        <div className="bg-red-50 border border-red-200 p-6 rounded-2xl">
          <h4 className="font-display font-bold text-red-700 text-lg mb-4 flex items-center gap-2">
            <XCircle className="w-5 h-5" /> Cons
          </h4>
          <ul className="space-y-2.5 font-body text-sm text-red-800">
            {value.cons?.map((item, i) => (
              <li key={i} className="flex gap-2 items-start"><span className="mt-0.5">•</span>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    ),

    // Comparison Table
    comparisonTable: ({ value }) => (
      <div className="my-12 overflow-x-auto">
        {value.title && (
          <h3 className="text-xl font-semibold mb-4 text-foreground">{value.title}</h3>
        )}
        <table className="w-full border-collapse border border-border rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-muted">
              {value.headers?.map((header, i) => (
                <th key={i} className="border border-border px-6 py-3 text-left font-medium text-sm">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {value.rows?.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-muted/50">
                {row.cells?.map((cell, cellIndex) => (
                  <td key={cellIndex} className="border border-border px-6 py-4 text-sm align-top">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),

    // Affiliate Disclosure
    affiliateDisclosure: ({ value }) => (
      <div className="my-8 p-5 bg-amber-50 border border-amber-200 border-l-4 border-l-amber-400 rounded-r-2xl flex gap-3 items-start">
        <Info className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-amber-800 font-body leading-relaxed">
          <span className="font-semibold font-display">Affiliate Disclosure: </span>
          {value.text || 'This post may contain affiliate links. We may earn a commission if you make a purchase through these links at no extra cost to you.'}
        </p>
      </div>
    ),
  },
};

export default function PortableTextRenderer({ content }) {
  return (
    <div className="prose prose-lg max-w-none">
      <PortableText value={content} components={components} />
    </div>
  );
}