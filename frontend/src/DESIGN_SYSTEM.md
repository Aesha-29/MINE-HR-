# MINE-HR Design System

A unified, professional design system powering consistent styling across all modules and submodules.

## Table of Contents
1. [Overview](#overview)
2. [Design Tokens](#design-tokens)
3. [Component Library](#component-library)
4. [Usage Guidelines](#usage-guidelines)
5. [Migration Guide](#migration-guide)

---

## Overview

This design system provides a centralized source of truth for:
- **Colors** - Semantic color palette with grayscale, semantic, and brand colors
- **Typography** - Consistent font stacks and sizing
- **Spacing** - Predictable spacing scale  
- **Border Radius** - Rounded corner standards
- **Shadows** - Elevation system
- **Transitions** - Animation timing functions

All modules now import from `tokens.css` and follow a consistent naming convention.

---

## Design Tokens

### Location
`frontend/src/tokens.css`

### Typography
```css
/* Font Families */
--font-family-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-family-display: 'Outfit', 'Inter', sans-serif;
--font-family-mono: 'Monaco', 'Courier New', monospace;
```

**Usage:**
```css
font-family: var(--font-family-primary);  /* Body text, UI */
font-family: var(--font-family-display);  /* Headings */
font-family: var(--font-family-mono);     /* Code snippets */
```

### Color Palette

#### Primary (Brand - Indigo)
- `--color-primary-50` → `#eef2ff`  (Lightest)
- `--color-primary-500` → `#6366f1` (Main)
- `--color-primary-600` → `#4f46e5` (Darker)
- `--color-primary-700` → `#4338ca`
- `--color-primary-900` → `#312e81` (Darkest)

#### Semantic Colors
- **Success** (Green): `--color-success-500`, `--color-success-600`, `--color-success-100`
- **Warning** (Amber): `--color-warning-500`, `--color-warning-600`, `--color-warning-100`
- **Danger** (Red): `--color-danger-500`, `--color-danger-600`, `--color-danger-100`
- **Gray**: `--color-gray-50` through `--color-gray-900`

#### Semantic Aliases (Shortcuts)
```css
--primary                /* → --color-primary-600 */
--success               /* → --color-success-500 */
--danger                /* → --color-danger-500 */
--text-main             /* → --color-text-primary */
--text-muted            /* → --color-text-muted */
--bg-app                /* → --color-bg-app */
```

### Spacing Scale
```css
--space-1: 0.25rem (4px)
--space-2: 0.5rem  (8px)
--space-3: 0.75rem (12px)
--space-4: 1rem    (16px)
--space-6: 1.5rem  (24px)
--space-8: 2rem    (32px)
--space-12: 3rem   (48px)
--space-16: 4rem   (64px)
--space-24: 6rem   (96px)
```

**Usage Example:**
```css
.card {
  padding: var(--space-6);
  margin-bottom: var(--space-8);
  gap: var(--space-4);
}
```

### Border Radius
```css
--radius-sm: 6px
--radius-md: 10px
--radius-lg: 12px
--radius-xl: 16px
--radius-full: 9999px (circles)
```

### Shadows
```css
--shadow-xs, --shadow-sm, --shadow-md, --shadow-lg, --shadow-xl, --shadow-2xl
--shadow-focus    /* Input focus state */
--shadow-focus-alt /* Alternative focus state */
```

### Transitions
```css
--transition-fast: all 0.15s cubic-bezier(...)
--transition-base: all 0.3s cubic-bezier(...)
--transition-slow: all 0.5s cubic-bezier(...)
```

---

## Component Library

### Buttons

#### Variants
- `.btn-primary` - Filled, gradient, primary action
- `.btn-secondary` - Outlined, subtle
- `.btn-success` - Green, affirmative action
- `.btn-warning` - Amber, cautionary action
- `.btn-danger` - Red, destructive action
- `.btn-outline` - Bordered, secondary
- `.btn-ghost` - Transparent, minimal

#### Sizes
- `.btn-sm` - 32px height, 13px font
- `.btn-md` - 40px height, 14px font (default)
- `.btn-lg` - 48px height, 15px font

**Example:**
```html
<button class="btn btn-primary btn-md">Save Changes</button>
<button class="btn btn-secondary btn-sm">Cancel</button>
<button class="btn btn-danger">Delete</button>
```

### Cards
```html
<div class="card">
  <div class="card-header">
    <span class="card-header-icon">📊</span>
    <h2 class="card-header-title">Analytics</h2>
  </div>
  <div class="card-body">
    <!-- Content -->
  </div>
</div>
```

### Forms
```html
<div class="form-group">
  <label class="form-group-label">Email Address</label>
  <input type="email" class="form-group-input" placeholder="you@example.com">
</div>
```

**Grid Layout:**
```html
<div class="form-grid">
  <div class="form-group"><!-- field --></div>
  <div class="form-group"><!-- field --></div>
  <div class="form-group form-grid-full"><!-- full-width field --></div>
</div>
```

### Status Badges
```html
<span class="status-badge status-active">Active</span>
<span class="status-badge status-inactive">Inactive</span>
<span class="status-badge status-pending">Pending</span>
<span class="status-badge status-completed">Completed</span>
```

### Alerts
```html
<div class="alert alert-info">
  <span>ℹ️</span>
  <p>This is an informational message</p>
</div>

<div class="alert alert-success">✓ Operation successful</div>
<div class="alert alert-warning">⚠ Warning message</div>
<div class="alert alert-danger">✕ Error occurred</div>
```

### Empty States
```html
<div class="empty-state">
  <div class="empty-state-icon">📭</div>
  <h3 class="empty-state-title">No Data Yet</h3>
  <p class="empty-state-text">Create your first entry to get started</p>
</div>
```

---

## Usage Guidelines

### 1. **Always Import Tokens**
```css
/* At the top of your module CSS */
@import '../tokens.css';
```

### 2. **Use CSS Variables, Not Hardcoded Colors**
```css
/* ✅ Good */
.header {
  background: var(--primary);
  color: var(--color-text-primary);
  padding: var(--space-4);
}

/* ❌ Avoid */
.header {
  background: #4f46e5;
  color: #0f172a;
  padding: 16px;
}
```

### 3. **Namespace Module-Specific Classes**
```css
/* ❌ Avoid generic names */
.form-card { /* Conflicts across modules */ }

/* ✅ Use namespaced selectors */
.survey-page .form-card { /* Scoped to Survey module */ }
.poll-page .form-card { /* Scoped to Poll module */ }
```

### 4. **Component Constructor Pattern**
```css
/* Clear, hierarchical structure */
.card {}
  .card-header {}
    .card-header-title {}
    .card-header-icon {}
  .card-body {}
    .card-body-section {}
```

### 5. **Semantic Color Usage**
```css
/* Use semantic colors for meaning */
.delete-btn { background: var(--danger); }      /* Red = destructive */
.save-btn { background: var(--primary); }       /* Indigo = primary action */
.export-btn { background: var(--success); }     /* Green = positive action */
.warning-msg { background: var(--warning); }    /* Amber = caution */
```

---

## Migration Guide

### For Existing Modules

1. **Remove Local `:root {}` Token Definitions**
   ```css
   /* Delete this */
   :root {
     --module-bg: #f8fafc;
     --module-primary: #6366f1;
     /* ... etc */
   }
   ```

2. **Replace All Hardcoded Colors with Tokens**
   ```css
   /* Before */
   .header { background: #6366f1; color: #0f172a; }
   
   /* After */
   .header { background: var(--primary); color: var(--color-text-primary); }
   ```

3. **Replace Spacing with Token Variables**
   ```css
   /* Before */
   padding: 24px; margin-bottom: 16px; gap: 12px;
   
   /* After */
   padding: var(--space-6); margin-bottom: var(--space-4); gap: var(--space-3);
   ```

4. **Namespace Module Classes**
   ```css
   /* Before */
   .form-card { }
   .btn-primary { }
   
   /* After */
   .module-name-page .form-card { }
   .module-name-page .btn-primary { } /* Only if module-specific override needed */
   ```

5. **Use Global Component Classes**
   Instead of redefining .card, .btn-primary, .form-group, reference the global definitions in `index.css`

---

## Color Reference Chart

| Token | Value | Use Case |
|-------|-------|----------|
| `--color-primary-600` | #4f46e5 | Primary buttons, links, active states |
| `--color-success-500` | #10b981 | Success messages, confirmation |
| `--color-warning-500` | #f59e0b | Warnings, caution alerts |
| `--color-danger-500` | #ef4444 | Errors, destructive actions |
| `--color-text-primary` | #0f172a | Body text, main content |
| `--color-text-muted` | #64748b | Secondary text, metadata |
| `--color-gray-200` | #e5e7eb | Borders, dividers |
| `--color-gray-50` | #f9fafb | Background, subtle fills |

---

## Quick Start Template

```css
/* my-module.css */
@import '../tokens.css';

.my-module-page {
  padding: var(--space-6);
  background: var(--color-bg-app);
  font-family: var(--font-family-primary);
}

.my-module-page .card {
  background: var(--color-bg-surface);
  border: 1px solid var(--color-gray-200);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  box-shadow: var(--shadow-md);
  transition: var(--transition-base);
}

.my-module-page .btn-primary {
  background: linear-gradient(135deg, var(--color-primary-600), var(--color-primary-500));
  color: white;
  padding: var(--btn-padding-x-md) var(--space-6);
  font-weight: 700;
  transition: var(--transition-fast);
}
```

---

## File Structure

```
frontend/src/
├── tokens.css              ← Centralized design tokens
├── index.css              ← Global component library  
├── pages/
│   ├── Survey/
│   │   └── Survey.css     ← Uses tokens (namespaced)
│   ├── AppBanner/
│   │   └── AppBanner.css  ← Uses tokens (namespaced)
│   └── ...
└── components/
    ├── header.css
    ├── sidebar.css
    └── ...
```

---

## Support & Questions

For design system updates or clarifications:
1. Check `tokens.css` for available variables
2. Review `index.css` for global component definitions
3. Reference this `DESIGN_SYSTEM.md` guide

---

**Last Updated:** April 6, 2026  
**Version:** 1.0.0
