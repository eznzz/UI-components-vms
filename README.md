# UI components for VMS

A lightweight, framework-free dashboard template and a growing design system for enterprise interfaces.

## Preview

The live demo can be deployed with GitHub Pages from the repository root (`main` / `/`).

## Component catalog

[Open interactive component catalog](components/index.html) — Buttons, Text Fields, Select, Checkbox, light/dark preview and usage guidelines.

When GitHub Pages is enabled, visit `/components/` on the published site.

## Included

- Responsive sidebar and topbar
- Profile dropdown and persisted light/dark theme
- Primary action button and outlined text input
- Foundations and component documentation

## Design decisions (v0.4)

| Token | Light | Dark |
| --- | --- | --- |
| Primary | `#24518F` | `#81B4F1` |
| Primary hover | `#1B4074` | `#A4CAFA` |
| Input background | `#FFFFFF` | `#111827` |
| Input border | `#CBD5E1` | `#4B5563` |
| Input focus | `#24518F` | `#81B4F1` |

Outlined input: 40px minimum height, 6px radius, 14px text. More states and variants are planned.

## Data Visualization (v0.6.5)

Responsive Line, Bar, Donut, Area and KPI/Sparkline examples are now included in the [catalog](components/index.html#charts). The charts use standalone SVG, shared light/dark tokens and accompanying accessible data summaries; all values are demo data.

## Essential Components (v0.6.4)

Search/Filters, Date Range, Status Badge, Switch/Radio, Alert/Validation, Tooltip, Skeleton and Empty State are documented in [Component Catalog](components/index.html). Data visualization is the next planned increment (v0.6.5).

## Advanced Components (v0.6)

Interactive Data Table, Tabs, Modal Dialog and Toast notifications; the table provides search, sorting, status filtering, row selection and pagination in the [catalog](components/index.html). Demo data only. See [component documentation](docs/components.md).

## Component standards (v0.5)

Documented variants, sizes and states for Button, Text Field, Select and Checkbox, including loading, success, error and mixed checkbox states. See [Component standards](docs/components.md).

## Shared token architecture

Both the Dashboard and the component catalog import [`tokens/tokens.css`](tokens/tokens.css) as the single source of truth for light/dark colors, focus, and input dimensions. Component-specific CSS remains separate. See [Foundations](docs/foundations.md) for the canonical token table.

## Run locally

Open `index.html` in a browser. Fonts and Font Awesome icons load from third-party CDNs when online.

## Documentation

- [Foundations](docs/foundations.md)
- [Components](docs/components.md)

## Project status

Early work in progress. This is a UI demo, not a production-ready component library or completed accessibility audit.
