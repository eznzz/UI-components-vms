# Component Standards — VMS v0.5

All interactive components must support visible keyboard focus, semantic HTML, and readable text in both themes. The demos are examples, not production-certified accessibility implementations.

## Buttons
- Variants: **Primary**, **Secondary**, **Ghost**. Use Primary for the main action; avoid competing primary buttons.
- Sizes: S **32px**, M **40px** (default), L **48px**.
- States: default, hover, active, focus-visible, disabled, loading.
- Loading actions must be temporarily unavailable for re-submission and show progress via text, not just a spinner.
- Prefer short verb-based action labels.

## Text Fields
- Variant: **Outlined**. Sizes: default **40px**; radius **6px**; font **14px**; horizontal padding **12px**.
- States: default, filled, focus, error, success, disabled, read-only, required.
- Always use a visible label. Connect help/error text with `aria-describedby`. Set `aria-invalid="true"` for invalid controls.
- Success is a demonstration of validated content; do not infer success merely from non-empty input.

## Select
- Use a native HTML `select` while options fit a simple list.
- States: default, selected, focus, disabled, error.
- Avoid placeholder options with indistinguishable styling when a real choice is required.
- Errors require visible explanatory text.

## Checkbox
- Use a native checkbox with an associated label.
- States: checked, unchecked, disabled, focus, and indeterminate (for mixed nested choices).
- Set the mixed state via `HTMLInputElement.indeterminate`; clicking resolves it to a binary value.

## Global rules
- Shared colors and input sizes: [`tokens/tokens.css`](../tokens/tokens.css).
- Mouse and keyboard interactions should preserve semantic focus behavior.
- Validate contrast combinations and target sizes before claiming WCAG conformance.
- Check both light and dark modes and reduced-motion preferences.

## Remaining work
Component-level automated tests, responsive touch target auditing, validation patterns, and full keyboard screen-reader QA are planned for v0.9.


## Data Table — v0.6
- Columns: selection, vessel name, IMO, status, last update.
- Supported: client-side search, status filter, ascending/descending sort, selection and pagination (four rows per page).
- Accessible table semantics: headers, caption, live result count, labeled checkboxes, selected sort direction.
- The horizontal scroll area is keyboard-focusable on narrow layouts.
- Empty filtered results display an explicit empty state.
- All records are fictional demonstration data, not a live vessel feed.
- Selection persists when filters or pages change; select-all applies only to the current visible page.
- Out of scope: server-side fetching, bulk action execution, virtualization, persisted sorting and data export.


## Tabs — v0.6.3
- Use tabs for parallel views at the same level; not for a sequence of steps.
- Automatic activation, with Left/Right/Home/End navigation and visible keyboard focus.
- `role=tablist/tab/tabpanel` with associated controls and `aria-selected`.

## Modal Dialog — v0.6.3
- Native `<dialog>` using `showModal()`; browser manages modal focus, inert background and Escape close.
- Do not open a modal for information that fits directly into the page.
- The current confirmation is a demonstration: no backend actions.

## Toast — v0.6.3
- Success, error, info with semantic color and explanatory text.
- Accessible polite live region for noncritical messages; dismiss button and 7-second automatic timeout.
- Critical failures requiring immediate intervention should use an alert or inline message rather than a short-lived toast.

## Essential Components — v0.6.4
- Search & Filters: independent input, native select, reset button, live filter summary. This is a reusable UI demo; it does not alter the Data Table filters.
- Date Range: native date controls with mutually restricted date bounds. Date validation should also happen on form submission.
- Status Badge: semantic colored dots plus descriptive labels; vessel states reuse the Data Table tokens.
- Switch & Radio: labeled native inputs, keyboard operation and live state description.
- Alert & Inline Validation: persistent information/warning messages and a minimal code-length demonstration; validate again on the backend in real products.
- Tooltip: hover and keyboard focus support; use for supplementary explanation only.
- Skeleton & Empty State: loading placeholder and explicit no-results explanation.

More standalone patterns such as uploads, breadcrumbs and dedicated pagination will be addressed as v0.7 page needs are established. Data visualization components (Line, Bar, Donut, Area, KPI/Sparkline) are scheduled for v0.6.5.

## Data Visualization — v0.6.5
- **Line**: monthly trend; **Bar**: categorical comparison; **Donut**: part-to-whole; **Area**: accumulated/continuous trend; **KPI/Sparkline**: compact metric summary.
- Implemented with self-contained responsive SVG; no external chart library or network data feed.
- All charts derive colors from shared semantic CSS tokens at render time and redraw when the light/dark theme changes.
- Every chart has a descriptive accessible label; detailed chart values are provided as adjacent expandable HTML tables (sparkline uses a compact description).
- Donut categories also have a textual color legend; information is never conveyed by color alone.
- Demo data are fictional. No chart should be interpreted as real fleet or port operational statistics.
- Next QA: cross-browser rendering, screen-reader testing, threshold contrast, localization and integration with real data APIs.
