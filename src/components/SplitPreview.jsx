import React, { useState, useEffect } from 'react';
import PortableTextRenderer from '../components/PortableTextRenderer';
import { urlFor } from '../lib/sanityImage';

const LIGHT = {
  bg: '#F8F1E9',
  fg: '#0D2B1A',
  muted: '#6B8070',
  card: '#FDFAF6',
  border: '#E2D8CC',
  secondary: '#FF8C42',
  secondaryBg: 'rgba(255,140,66,0.10)',
  accent: '#00B8A9',
};

const DARK = {
  bg: '#0C1F13',
  fg: '#F5EFE6',
  muted: '#8FAF9A',
  card: '#111F17',
  border: '#1E3828',
  secondary: '#FF8C42',
  secondaryBg: 'rgba(255,140,66,0.12)',
  accent: '#00D4C3',
};

export default function SplitPreview(props) {
  const [isDark, setIsDark] = useState(() => {
    try { return localStorage.getItem('splitpreview_dark') === 'true'; } catch { return false; }
    try { return localStorage.getItem('splitpreview_dark') === 'true'; } catch { return false; }
  });

  const c = isDark ? DARK : LIGHT;

  const c = isDark ? DARK : LIGHT;

  const document = props.document?.displayed || props.document?.draft || props.document;

  useEffect(() => {
    try { localStorage.setItem('splitpreview_dark', String(isDark)); } catch {}
    try { localStorage.setItem('splitpreview_dark', String(isDark)); } catch {}
  }, [isDark]);

  const mainImageUrl = document?.mainImage?.asset
    ? urlFor(document.mainImage).width(800).url()
    : document?.mainImage?.asset?.url || null;

  return (
    <div style={{
      minHeight: '100vh',
      overflowY: 'auto',
      backgroundColor: c.bg,
      fontFamily: "'Nunito', 'Segoe UI', sans-serif",
      padding: '40px 24px',
      transition: 'background-color 0.2s, color 0.2s',
    }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
    <div style={{
      minHeight: '100vh',
      overflowY: 'auto',
      backgroundColor: c.bg,
      fontFamily: "'Nunito', 'Segoe UI', sans-serif",
      padding: '40px 24px',
      transition: 'background-color 0.2s, color 0.2s',
    }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>

        {/* Header bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: 16,
          marginBottom: 32,
          borderBottom: `1px solid ${c.border}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: c.secondary }} />
            <span style={{ fontFamily: "'Fredoka','Nunito',sans-serif", fontWeight: 700, fontSize: 18, color: c.fg }}>
              Live Preview
            </span>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: 16,
          marginBottom: 32,
          borderBottom: `1px solid ${c.border}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: c.secondary }} />
            <span style={{ fontFamily: "'Fredoka','Nunito',sans-serif", fontWeight: 700, fontSize: 18, color: c.fg }}>
              Live Preview
            </span>
          </div>

          <button
            onClick={() => setIsDark(d => !d)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 12,
              fontWeight: 600,
              color: c.muted,
              backgroundColor: c.card,
              border: `1px solid ${c.border}`,
              borderRadius: 999,
              padding: '6px 12px',
              cursor: 'pointer',
              fontFamily: "'Fredoka','Nunito',sans-serif",
              transition: 'color 0.15s',
            }}
          >
            {isDark ? '☀️' : '🌙'} {isDark ? 'Light mode' : 'Dark mode'}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 12,
              fontWeight: 600,
              color: c.muted,
              backgroundColor: c.card,
              border: `1px solid ${c.border}`,
              borderRadius: 999,
              padding: '6px 12px',
              cursor: 'pointer',
              fontFamily: "'Fredoka','Nunito',sans-serif",
              transition: 'color 0.15s',
            }}
          >
            {isDark ? '☀️' : '🌙'} {isDark ? 'Light mode' : 'Dark mode'}
          </button>
        </div>

        {/* Content */}
        {!document ? (
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            height: 240, color: c.muted, fontSize: 14,
          }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            height: 240, color: c.muted, fontSize: 14,
          }}>
            Start writing to see a preview…
          </div>
        ) : (
          <>
            {/* Category + date */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              {document.category && (
                <span style={{
                  fontSize: 11, fontWeight: 700,
                  fontFamily: "'Fredoka','Nunito',sans-serif",
                  color: c.secondary,
                  backgroundColor: c.secondaryBg,
                  padding: '2px 10px',
                  borderRadius: 999,
                }}>
                <span style={{
                  fontSize: 11, fontWeight: 700,
                  fontFamily: "'Fredoka','Nunito',sans-serif",
                  color: c.secondary,
                  backgroundColor: c.secondaryBg,
                  padding: '2px 10px',
                  borderRadius: 999,
                }}>
                  {document.category}
                </span>
              )}
              {document.publishedAt && (
                <span style={{ fontSize: 12, color: c.muted }}>
                <span style={{ fontSize: 12, color: c.muted }}>
                  {new Date(document.publishedAt).toLocaleDateString()}
                </span>
              )}
            </div>

            {/* Title */}
            {document.title && (
              <h1 style={{
                fontFamily: "'Fredoka','Nunito',sans-serif",
                fontWeight: 700,
                fontSize: 32,
                color: c.fg,
                marginBottom: 24,
                lineHeight: 1.25,
              }}>
              <h1 style={{
                fontFamily: "'Fredoka','Nunito',sans-serif",
                fontWeight: 700,
                fontSize: 32,
                color: c.fg,
                marginBottom: 24,
                lineHeight: 1.25,
              }}>
                {document.title}
              </h1>
            )}

            {/* Excerpt */}
            {document.excerpt && (
              <p style={{
                fontSize: 14,
                color: c.muted,
                marginBottom: 32,
                lineHeight: 1.7,
                borderLeft: `4px solid ${c.secondary}`,
                paddingLeft: 16,
                fontStyle: 'italic',
              }}>
              <p style={{
                fontSize: 14,
                color: c.muted,
                marginBottom: 32,
                lineHeight: 1.7,
                borderLeft: `4px solid ${c.secondary}`,
                paddingLeft: 16,
                fontStyle: 'italic',
              }}>
                {document.excerpt}
              </p>
            )}

            {/* Main image */}
            {mainImageUrl && (
              <img
                src={mainImageUrl}
                alt={document.title || 'Post image'}
                style={{
                  width: '100%',
                  borderRadius: 16,
                  marginBottom: 40,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                  display: 'block',
                }}
                style={{
                  width: '100%',
                  borderRadius: 16,
                  marginBottom: 40,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                  display: 'block',
                }}
              />
            )}

            {/* Body */}
            {document.body ? (
              <div style={{ color: c.fg }}>
              <div style={{ color: c.fg }}>
                <PortableTextRenderer content={document.body} />
              </div>
            ) : (
              <p style={{ textAlign: 'center', color: c.muted, fontSize: 14, padding: '80px 0' }}>
              <p style={{ textAlign: 'center', color: c.muted, fontSize: 14, padding: '80px 0' }}>
                Start writing in the Editor tab to see the preview here…
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}