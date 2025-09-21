# PLM Viewer - AI Coding Instructions

## Project Overview
This is a **Process Landscape Management (PLM) Viewer** - a Next.js application that visualizes software development lifecycle processes across three organizational layers: Core Business, Support, and Management processes. Built for academic/consulting purposes to demonstrate process modeling concepts.

## Architecture & Key Components

### Core Data Structure
- **Process Landscape Model**: Defined in `ProcessLandscape.tsx` with hierarchical data structure:
  - `Landscape` contains `flow` (macro sequence) + categorized processes (`core`, `support`, `management`)
  - Each `Proc` has `name`, `icon`, and optional `subprocesses`
  - Each `Subprocess` contains `name` and optional `activities` (3-level detail hierarchy)

### Navigation Pattern
- **Homepage** (`src/app/page.tsx`): Displays both `ProcessLandscape` and `ProcessPortfolioMatrix` components
- **Detail Pages** (`src/app/[process-name]/page.tsx`): 7 clickable core processes have dedicated detail pages:
  - `gestao-portfolio-demanda`, `engenharia-requisitos`, `arquitetura-design`
  - `desenvolvimento`, `testes-qa`, `entrega-deploy`, `suporte-manutencao`
- Use **kebab-case URLs** matching folder names, displayed as "Process Name" in UI

### Component Architecture
- **ProcessLandscape**: Main interactive visualization with 3-level detail toggle, search/highlight, PNG export
- **ProcessPortfolioMatrix**: Scatter plot matrix showing strategic impact vs. improvement feasibility 
- **ClientOnly**: SSR hydration wrapper for client-side only features (like html-to-image export)

## Development Patterns

### Styling Conventions
- **TailwindCSS v4** with utilities-first approach
- **Color coding by category**: 
  - Core processes: `indigo` variants (`border-indigo-200`, `bg-indigo-50`)
  - Support processes: `emerald` variants
  - Management processes: `amber` variants
- **Responsive design**: Use `max-w-5xl mx-auto` containers, `grid gap-X` layouts

### State Management
- **React hooks**: `useState` for UI state (detail levels, search, export loading)
- **useMemo**: For search filtering/highlighting performance
- **useRef**: For DOM element export functionality

### Icon Usage
- **Lucide React**: Consistent icon library across all components
- **Process-specific icons**: Each process type has a semantic icon (Code2, FileText, Rocket, etc.)
- **8x8 icon containers** with category-based background colors

## Technical Setup

### Dependencies
- **Next.js 15.5.2** with App Router (not Pages Router)
- **React 19.1.0** with latest patterns
- **TypeScript 5** with strict typing
- **html-to-image**: Dynamic import to avoid SSR issues
- **Turbopack**: Enabled for dev and build (`--turbopack` flag)

### Development Commands
```bash
npm run dev       # Start dev server with Turbopack
npm run build     # Production build with Turbopack  
npm start         # Start production server
```

## Data Extension Guidelines

### Adding New Processes
1. **Update DATA constant** in `ProcessLandscape.tsx` following the 3-level hierarchy
2. **Add corresponding icon** from Lucide React
3. **Create detail page** if process should be clickable (`src/app/[process-slug]/page.tsx`)
4. **Update ProcCard component** to include navigation logic for new clickable processes
5. **Add to ProcessPortfolioMatrix** with strategic positioning (x/y coordinates, feasibility, health)

### Detail Page Structure
- Follow existing pattern in `desenvolvimento/page.tsx`:
  - Client component with state management
  - Icon grid layout for subprocess visualization  
  - Export functionality using html-to-image
  - Breadcrumb navigation back to main landscape

### Search & Export Features
- **Search**: Case-insensitive matching across process names, subprocesses, and activities
- **Highlight**: Uses `ring-2 ring-offset-2 ring-indigo-300` for matches
- **PNG Export**: Target specific DOM elements with `useRef`, handle loading states

## Common Tasks

### Adding Process Details
- Extend `subprocesses` array with descriptive `activities` 
- Follow 3-5 activities per subprocess pattern
- Use business/technical terminology consistent with software development context

### Styling New Components
- Use `Section` component wrapper for consistent category-based styling
- Apply `ProcCard` pattern for process visualization
- Maintain responsive grid layouts (`grid gap-3 md:grid-cols-2 lg:grid-cols-3`)

### Navigation Updates
- Update `isClicavel` logic in `ProcCard` component
- Add route mapping in component's return statement
- Create corresponding app route directory structure