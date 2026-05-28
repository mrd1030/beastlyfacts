import React from 'react';
import { PortableText } from '@portabletext/react';
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
    // Image (using your existing component)
    image: (props) => <PortableTextImage {...props} />,

    // Amazon Product Recommendation
    productRecommendation: ({ value }) => (
      <div className="my-10 border border-orange-200 rounded-2xl p-8 bg-white shadow-sm">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {value.image && (
            <div className="w-full md:w-52 flex-shrink-0">
              <img
                src={urlFor(value.image).width(400).url()}
                alt={value.productName}
                className="rounded-xl object-cover w-full"
              />
            </div>
          )}

          <div className="flex-1">
            <h3 className="text-2xl font-bold text-foreground mb-2">{value.productName}</h3>
            
            {value.bestFor && (
              <p className="text-orange-600 font-medium mb-4">{value.bestFor}</p>
            )}

            <a
              href={value.affiliateUrl || `https://www.amazon.com/dp/${value.asin}?tag=beastlyfacts-20`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-orange-500 hover:bg-orange-600 text-white px-8 py-3.5 rounded-xl font-semibold transition-all"
            >
              Check Price on Amazon →
            </a>

            {value.priceRange && <p className="mt-4 text-2xl font-semibold text-foreground">{value.priceRange}</p>}
            {value.description && <p className="mt-5 text-muted-foreground">{value.description}</p>}
          </div>
        </div>
      </div>
    ),

    // Pros & Cons
    prosCons: ({ value }) => (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
        <div className="bg-green-50 border border-green-200 p-8 rounded-2xl">
          <h4 className="font-bold text-green-700 text-xl mb-6 flex items-center gap-2">✓ Pros</h4>
          <ul className="space-y-3 text-green-800">
            {value.pros?.map((item, i) => (
              <li key={i} className="flex gap-3">• {item}</li>
            ))}
          </ul>
        </div>
        <div className="bg-red-50 border border-red-200 p-8 rounded-2xl">
          <h4 className="font-bold text-red-700 text-xl mb-6 flex items-center gap-2">✗ Cons</h4>
          <ul className="space-y-3 text-red-800">
            {value.cons?.map((item, i) => (
              <li key={i} className="flex gap-3">• {item}</li>
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
      <div className="my-8 p-6 bg-amber-50 border-l-4 border-amber-400 rounded-r-xl text-sm text-amber-800">
        {value.text}
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