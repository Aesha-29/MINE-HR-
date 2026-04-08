# 🎨 Professional CSS Styling System

## Overview
A comprehensive, production-ready CSS styling system designed for the MINE-HR application. All files use CSS variables for consistency and maintainability.

## 📁 CSS Files Created

### 1. **globals.css** (Foundation)
- Global design tokens and theme variables
- Color system with primary, success, danger, warning, and info colors
- Spacing scale (--space-1 through --space-12)
- Typography system with font sizes and weights
- Border radius, shadows, and transitions
- Common utility classes
- **Import this first in your main app file**

```css
/* In your main.tsx or index.css */
import './pages/globals.css';
```

### 2. **components.css** (Common Components)
- Page containers and headers
- Alert messages (success/error)
- Card styling
- Form fields and inputs
- Buttons (primary, secondary, danger, success)
- Badges with multiple variants
- Tables with responsive design
- Modals and overlays
- Stat cards
- Empty states and loading indicators

**Usage:** Include after globals.css for base component styling

### 3. **leaveGroups.css** (Leave Management)
- Leave Groups page styling
- Header section with tabs
- Table styling for groups list
- Form grids and fields
- Section headers and checkboxes
- Responsive mobile design

**Component:** `leaveGroups.tsx`
**Import:** `import './leaveGroups.css';`

### 4. **holidayManagement.css** (Holiday Module)
- Holiday card grid layout
- Card type badges (Public/Optional)
- Alert messages
- Modal styling for Add/Assign dialogs
- Form field styling
- Empty state display
- Smooth animations

**Component:** `holidayManagement.tsx`
**Import:** `import './holidayManagement.css';`

### 5. **holidayExchangeRequests.css** (Holiday Exchange)
- Table layout for exchange requests
- Status badges (Approved/Rejected/Pending)
- Action buttons with color coding
- Form fields and textareas
- Modal styling
- Empty state for no requests

**Component:** `holidayExchangeRequests.tsx`
**Import:** `import './holidayExchangeRequests.css';`

### 6. **templates.css** (Templates Module)
- Template list and search bar
- Table styling with actions
- Add Template form styling
- Manage Template Questions card
- Pagination controls
- Form actions and buttons
- Responsive design

**Components:** `Templates.tsx`, `AddTemplate.tsx`, `ManageTemplate.tsx`
**Import:** `import './templates.css';`

### 7. **orderSettings.css** (Order Settings)
- Settings header with save button
- Tab navigation system
- Alert styling
- Form grid layout
- Checkbox and radio groups
- Info boxes
- Section dividers
- Responsive tabs for mobile

**Component:** `OrderSettings.tsx`
**Import:** `import './orderSettings.css';`

---

## 🎯 Design System Features

### Color Palette
- **Primary:** Blue (#4f46e5) - Main actions
- **Success:** Green (#16a34a) - Positive actions
- **Danger:** Red (#dc2626) - Destructive actions
- **Warning:** Amber (#d97706) - Warnings
- **Info:** Sky Blue (#0284c7) - Information
- **Neutral:** Gray scale for borders and backgrounds

### Spacing
Consistent 4px-based spacing system:
- space-1: 0.25rem (4px)
- space-2: 0.5rem (8px)
- space-3: 0.75rem (12px)
- space-4: 1rem (16px)
- space-6: 1.5rem (24px)
- space-8: 2rem (32px)
- space-12: 3rem (48px)

### Typography
- **Font Families:** System fonts (San Francisco, Segoe UI, Helvetica)
- **Font Weights:** Normal (400), Semibold (600), Bold (700)
- **Font Sizes:** From xs (12px) to 3xl (30px)
- **Line Heights:** Tight, Normal, Relaxed

### Transitions
- **Fast:** 150ms - Quick feedback
- **Base:** 250ms - Standard interactions
- **Slow:** 350ms - Complex animations

---

## 🚀 Integration Guide

### Step 1: Import Global CSS
In your main app file (e.g., `main.tsx` or `index.tsx`):
```typescript
import './pages/globals.css';
import './pages/components.css';
```

### Step 2: Update Component Files
Add CSS imports to each component:

**leaveGroups.tsx:**
```typescript
import './leaveGroups.css';
```

**Holiday Components:**
```typescript
// holidayManagement.tsx
import './holidayManagement.css';

// holidayExchangeRequests.tsx
import './holidayExchangeRequests.css';
```

**Template Components:**
```typescript
// In Templates.tsx, AddTemplate.tsx, ManageTemplate.tsx
import './templates.css';
```

**OrderSettings:**
```typescript
import './orderSettings.css';
```

### Step 3: Use CSS Classes
Replace inline styles with CSS classes:

**Before:**
```jsx
<div style={{ padding: "2rem", background: "#fff", borderRadius: "8px" }}>
  <h2 style={{ fontSize: "1.5rem", color: "#1e293b" }}>Title</h2>
</div>
```

**After:**
```jsx
<div className="lm-card">
  <h2 className="lm-page-title">Title</h2>
</div>
```

---

## 📋 Common Class Naming Conventions

### Prefix System
- `lm-` : Leave/Leave Management modules
- `holiday-` : Holiday Management modules
- `exchange-` : Holiday Exchange modules
- `templates-` : Templates modules
- `os-` : Order Settings modules
- `btn-` : Button components
- `badge-` : Badge components
- `stat-` : Stat card components

### Examples
```jsx
/* Buttons */
<button className="btn-primary">Save</button>
<button className="btn-secondary">Cancel</button>
<button className="btn-danger">Delete</button>

/* Cards */
<div className="lm-card">Content</div>
<div className="stat-card">Stats</div>

/* Forms */
<div className="lm-field">
  <label className="lm-label">Field Label</label>
  <input className="lm-input" />
</div>

/* Tables */
<div className="lm-table-wrapper">
  <table className="lm-table">...</table>
</div>

/* Badges */
<span className="badge badge-success">Approved</span>
<span className="badge badge-danger">Rejected</span>
```

---

## 🎨 CSS Variable Usage

Access design tokens using CSS variables:

```css
/* Colors */
color: var(--color-primary-600);
background: var(--color-bg-secondary);
border: 1px solid var(--color-border);

/* Spacing */
padding: var(--space-4);
gap: var(--space-6);
margin-bottom: var(--space-8);

/* Typography */
font-size: var(--font-size-sm);
font-weight: var(--font-weight-bold);

/* Radius */
border-radius: var(--radius-lg);

/* Shadows */
box-shadow: var(--shadow-md);

/* Transitions */
transition: all var(--transition-fast);
```

---

## 📱 Responsive Design

All CSS files include responsive breakpoints:
- **Desktop:** 1024px+
- **Tablet:** 768px - 1023px
- **Mobile:** 640px - 767px
- **Small Mobile:** < 640px

Example:
```css
@media (max-width: 768px) {
  .lm-two-col {
    grid-template-columns: 1fr;
  }
}
```

---

## 🔍 Customization

### Change Primary Color
Edit `globals.css`:
```css
--color-primary-600: #your-color;
/* All other shades update automatically */
```

### Adjust Spacing
Edit `globals.css`:
```css
--space-6: 2rem; /* Change default spacing */
```

### Update Border Radius
Edit `globals.css`:
```css
--radius-lg: 1rem; /* More rounded corners */
```

---

## ✅ Best Practices

1. **Use CSS Variables** - Don't hardcode colors or spacing
2. **Follow Naming Conventions** - Use established class prefixes
3. **Mobile First** - Design for mobile, enhance for desktop
4. **Semantic HTML** - Use meaningful class names
5. **DRY Principle** - Reuse classes instead of duplicating styles
6. **Performance** - Minimize inline styles for faster rendering

---

## 🐛 Troubleshooting

### Styles not applying?
1. Ensure `globals.css` is imported first
2. Check CSS file is imported in React component
3. Verify class names match exactly (case-sensitive)
4. Clear browser cache (Ctrl+Shift+Del)

### Colors looking different?
1. Check browser theme settings
2. Verify CSS variables are set in `globals.css`
3. Check for conflicting CSS rules
4. Use DevTools Inspector to debug

### Layout issues on mobile?
1. Check responsive breakpoints in CSS
2. Verify grid/flex settings
3. Test with browser DevTools mobile view
4. Check for overflow issues

---

## 📚 File Organization

```
frontend/src/pages/
├── globals.css                    # Foundation & tokens
├── components.css                 # Common components
├── leaveGroups.css               # Leave management
├── holidayManagement.css         # Holiday module
├── holidayExchangeRequests.css   # Holiday exchange
├── templates.css                  # Templates module
├── orderSettings.css              # Order settings
├── leaveGroups.tsx               # Comment current styles
├── holidayManagement.tsx         # Comment current styles
├── holidayExchangeRequests.tsx   # Comment current styles
└── ... other components
```

---

## 🎓 Learning Resources

For more information about CSS variables, visit:
- [MDN: CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)
- [CSS Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout)

---

## 📝 Quick Reference

### Most Used Classes
```
.lm-container      - Main page container
.lm-page-header    - Page header section
.lm-card           - Card component
.lm-field          - Form field
.lm-input          - Input field
.lm-button         - Button element
.lm-table          - Table element
.lm-modal-overlay  - Modal background
.btn-primary       - Primary button
.badge             - Badge element
```

---

**Last Updated:** 2024
**Version:** 1.0
**Status:** Production Ready ✅
