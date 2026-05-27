import React from 'react';
import { PortableText } from '@portabletext/react';

const components = {
  block: {
    h1: ({ children }) => <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginTop: '48px', marginBottom: '24px', color: '#f5f5f0', fontFamily: "'Fredoka', sans-serif" }}>{children}</h1>,
    h2: ({ children }) => <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginTop: '40px', marginBottom: '20px', color: '#f5f5f0', fontFamily: "'Fredoka', sans-serif" }}>{children}</h2>,
    h3: ({ children }) => <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '32px', marginBottom: '16px', color: '#f5f5f0', fontFamily: "'Fredoka', sans-serif" }}>{children}</h3>,
    normal: ({ children }) => <p style={{ marginBottom: '24px', lineHeight: '1.7', color: '#ddd', fontSize: '16px', fontFamily: "'Nunito', sans-serif" }}>{children}</p>,
    blockquote: ({ children }) => <blockquote style={{ borderLeft: '4px solid #ff8c42', paddingLeft: '24px', margin: '32px 0', fontStyle: 'italic', color: '#aaa', fontSize: '18px' }}>{children}</blockquote>,
  },

  list: {
    bullet: ({ children }) => <ul style={{ marginBottom: '24px', paddingLeft: '24px', color: '#ddd' }}>{children}</ul>,
    number: ({ children }) => <ol style={{ marginBottom: '24px', paddingLeft: '24px', color: '#ddd' }}>{children}</ol>,
  },

  listItem: {
    bullet: ({ children }) => <li style={{ marginBottom: '8px', lineHeight: '1.6' }}>{children}</li>,
    number: ({ children }) => <li style={{ marginBottom: '8px', lineHeight: '1.6' }}>{children}</li>,
  },

  types: {
    image: ({ value }) => {
      if (!value?.asset?.url) return null;
      return (
        <img 
          src={value.asset.url} 
          alt={value.alt || ''} 
          style={{ maxWidth: '400px', maxHeight: '400px', objectFit: 'contain', borderRadius: '16px', margin: '32px 0' }}
        />
      );
    },

    productRecommendation: ({ value }) => (
      <div style={{ margin: '40px 0', padding: '32px', border: '1px solid #ff8c42', borderRadius: '16px', backgroundColor: '#0d140d' }}>
        <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '12px', color: '#f5f5f0' }}>{value.productName}</h3>
        {value.bestFor && <p style={{ color: '#ff8c42', marginBottom: '16px' }}>⭐ Best for: {value.bestFor}</p>}
        <a href={value.affiliateUrl} target="_blank" style={{ color: '#ff8c42', textDecoration: 'underline' }}>
          Check on Amazon →
        </a>
      </div>
    ),

    prosCons: ({ value }) => (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', margin: '40px 0' }}>
        <div style={{ backgroundColor: '#0d2e1b', border: '1px solid #22c55e', padding: '24px', borderRadius: '16px' }}>
          <h4 style={{ color: '#22c55e', fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>✓ Pros</h4>
          <ul style={{ color: '#ddd' }}>
            {value.pros?.map((item, i) => <li key={i} style={{ marginBottom: '8px' }}>• {item}</li>)}
          </ul>
        </div>
        <div style={{ backgroundColor: '#2d1515', border: '1px solid #ef4444', padding: '24px', borderRadius: '16px' }}>
          <h4 style={{ color: '#ef4444', fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>✗ Cons</h4>
          <ul style={{ color: '#ddd' }}>
            {value.cons?.map((item, i) => <li key={i} style={{ marginBottom: '8px' }}>• {item}</li>)}
          </ul>
        </div>
      </div>
    ),

    comparisonTable: ({ value }) => (
      <div style={{ margin: '40px 0', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #333' }}>
          <thead>
            <tr style={{ backgroundColor: '#1a2a1a' }}>
              {value.headers?.map((header, i) => (
                <th key={i} style={{ padding: '16px', textAlign: 'left', border: '1px solid #333', color: '#f5f5f0' }}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {value.rows?.map((row, i) => (
              <tr key={i} style={{ backgroundColor: i % 2 === 0 ? '#0d140d' : '#0a0f0a' }}>
                {row.cells?.map((cell, j) => (
                  <td key={j} style={{ padding: '16px', border: '1px solid #333', color: '#ddd' }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),

    affiliateDisclosure: ({ value }) => (
      <div style={{ margin: '32px 0', padding: '24px', backgroundColor: '#1a241a', borderLeft: '4px solid #ffd93d', borderRadius: '0 8px 8px 0' }}>
        <p style={{ color: '#ffd93d', fontSize: '14px' }}>{value.text}</p>
      </div>
    ),
  },
};

export default function PortableTextRenderer({ content }) {
  if (!content || content.length === 0) {
    return <p style={{ color: '#999', padding: '40px 0' }}>No content yet...</p>;
  }

  return <PortableText value={content} components={components} />;
}