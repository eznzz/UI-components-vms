# Foundations — VMS Design System v0.4

The canonical design tokens live in [`tokens/tokens.css`](../tokens/tokens.css). Both the Dashboard and the component catalog load it **before** their own layout and component stylesheets.

## Shared tokens

| Token | Light | Dark |
| --- | --- | --- |
| `--vms-color-primary` | `#24518F` | `#81B4F1` |
| `--vms-color-primary-hover` | `#1B4074` | `#A4CAFA` |
| `--vms-color-on-primary` | `#FFFFFF` | `#111827` |
| `--vms-color-canvas` | `#EEF2F6` | `#111827` |
| `--vms-color-surface` | `#FFFFFF` | `#1F2937` |
| `--vms-color-border` | `#CBD5E1` | `#4B5563` |
| `--vms-color-focus` | `#24518F` | `#81B4F1` |
| `--vms-color-error` | `#B42330` | `#FFA8AE` |

## Input
Outlined; height `--vms-input-height: 40px`, radius `--vms-input-radius: 6px`, font size `14px`, horizontal padding `12px`. Keep a visible label above each field. Support focus, error, read-only and disabled with accessible explanations.

## Usage
```html
<link rel="stylesheet" href="tokens/tokens.css">
<link rel="stylesheet" href="style.css">
```

The catalog uses `../tokens/tokens.css` instead. Set `body.dark` to switch the theme in both experiences; existing JavaScript manages and persists it. Change a shared token in the canonical file rather than in either component stylesheet.

## Scope
Component-specific geometry (sidebar width, card shadow) remains local to the Dashboard. This is an early implementation and not a full accessibility compliance audit.

## Dark-theme implementation (v0.6.2)

Shared semantic values are defined in `tokens/tokens.css` on `:root` for light mode and `body.dark` for dark mode. **Component aliases that reference semantic values must be declared on `body` (or directly on the consuming component), not only on `:root`.** CSS custom properties on `:root` are resolved there; aliases resolved against light tokens can otherwise be inherited unchanged even when `body.dark` overrides the underlying tokens. Dashboard and catalog now resolve their aliases on `body`, and primary-colored marks use `--vms-color-on-primary` for readable dark-mode text.

Smoke-test both pages: switch Light → Dark → Light, reload, follow Dashboard ↔ Catalog links, and confirm that theme selection persists; check primary button contrast, sidebar active item, input backgrounds, status indicators and table rows. Full browser and assistive-technology testing remains pending.
