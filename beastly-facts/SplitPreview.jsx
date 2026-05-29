import React, { useState } from 'react';
import PortableTextRenderer from '../src/components/PortableTextRenderer';

export default function SplitPreview(props) {
  const [isDark, setIsDark] = useState(true);
  const document = props.document?.displayed || props.document?.draft || props.document;

  // Exact colors from your index.css
  const darkColors = {
    background: '#0F3A1F',    // Your forest green from tailwind.config.js
    card: '#0d2e1b',
    text: '#f5f5f0',          // Off-white from --foreground
    muted: '#99998f',
    border: '#1a3a2a',
    orange: '#FF8C42',
  };

  const lightColors = {
    background: '#F8F1E9',    // Your cream from tailwind.config.js
    card: '#ffffff',
    text: '#1a2e1a',          // Dark green from --foreground
    muted: '#5a6b5a',
    border: '#d4d0c8',
    orange: '#FF8C42',
  };

  const colors = isDark ? darkColors : lightColors;

  return (
    <div style={{ 
      height: '100%', 
      overflow: 'auto', 
      padding: '40px', 
      backgroundColor: colors.background,
      fontFamily: "'Nunito', sans-serif"
    }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        
        {/* Header with Toggle */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          marginBottom: '32px',
          paddingBottom: '16px',
          borderBottom: `1px solid ${colors.border}`
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: colors.orange }}></div>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: colors.text, fontFamily: "'Fredoka', sans-serif" }}>
              Live Preview
            </h2>
          </div>
          
          <button
            onClick={() => setIsDark(!isDark)}
            style={{
              padding: '8px 16px',
              backgroundColor: colors.card,
              border: `1px solid ${colors.border}`,
              borderRadius: '8px',
              color: colors.text,
              fontSize: '14px',
              cursor: 'pointer',
              fontFamily: "'Nunito', sans-serif"
            }}
          >
            {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>

        {/* Title */}
        {document?.title && (
          <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: colors.text, marginBottom: '24px', lineHeight: '1.2', fontFamily: "'Fredoka', sans-serif" }}>
            {document.title}
          </h1>
        )}

        {/* Excerpt */}
        {document?.excerpt && (
          <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
            <div style={{ width: '4px', backgroundColor: colors.orange, borderRadius: '4px' }}></div>
            <p style={{ color: colors.muted, fontSize: '18px', fontStyle: 'italic', lineHeight: '1.6' }}>
              {document.excerpt}
            </p>
          </div>
        )}

        {/* Main Image */}
        {document?.mainImage && (
          <img 
            src={document.mainImage.asset?.url} 
            alt={document.title}
            style={{ maxWidth: '400px', maxHeight: '400px', objectFit: 'contain', borderRadius: '16px', marginBottom: '40px' }}
          />
        )}

        {/* Body Content */}
        <div style={{ color: colors.text, fontSize: '16px', lineHeight: '1.7' }}>
          {document?.body ? (
            <PortableTextRenderer content={document.body} />
          ) : (
            <div style={{ textAlign: 'center', padding: '80px 0', color: colors.muted }}>
              Start writing in the Editor tab to see the preview here...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}