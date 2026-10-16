/** VMS Dashboard Template — v0.2.0 */
(function () {
  'use strict';
  const STORAGE_KEY = 'vms-theme';
  function getStoredTheme() { try { return localStorage.getItem(STORAGE_KEY); } catch (_) { return null; } }
  function setStoredTheme(theme) { try { localStorage.setItem(STORAGE_KEY, theme); } catch (_) {} }
  function applyTheme(dark) {
    document.body.classList.toggle('dark', dark);
    const icon = document.getElementById('themeIcon');
    const label = document.getElementById('themeLabel');
    const toggle = document.getElementById('themeToggle');
    if (icon) icon.className = dark ? 'fa-solid fa-sun icon' : 'fa-solid fa-moon icon';
    if (label) label.textContent = dark ? 'Светлая тема' : 'Тёмная тема';
    if (toggle) toggle.setAttribute('aria-pressed', String(dark));
  }
  function initTheme() {
    const stored = getStoredTheme();
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(stored === 'dark' || (stored !== 'light' && prefersDark));
    if (!stored) setStoredTheme(prefersDark ? 'dark' : 'light');
    const toggle = document.getElementById('themeToggle');
    if (toggle) toggle.addEventListener('click', () => {
      const dark = !document.body.classList.contains('dark');
      applyTheme(dark);
      setStoredTheme(dark ? 'dark' : 'light');
    });
  }
  function initSidebar() {
    const burger = document.getElementById('burger');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    if (!burger || !sidebar || !overlay) return;
    function close(restoreFocus) {
      const wasOpen = sidebar.classList.contains('open');
      sidebar.classList.remove('open');
      overlay.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      if (restoreFocus && wasOpen) burger.focus();
    }
    burger.addEventListener('click', () => {
      const open = sidebar.classList.toggle('open');
      overlay.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', String(open));
    });
    overlay.addEventListener('click', () => close(false));
    sidebar.addEventListener('click', (e) => {
      if (e.target.closest('a') && window.innerWidth <= 900) close(false);
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && sidebar.classList.contains('open')) close(true);
    });
    window.addEventListener('resize', () => { if (window.innerWidth > 900) close(false); });
  }
  function initUserMenu() {
    const menu = document.getElementById('userMenu');
    const trigger = document.getElementById('userTrigger');
    if (!menu || !trigger) return;
    function close(restoreFocus) {
      const wasOpen = menu.classList.contains('open');
      menu.classList.remove('open');
      trigger.setAttribute('aria-expanded', 'false');
      if (restoreFocus && wasOpen) trigger.focus();
    }
    trigger.addEventListener('click', e => {
      e.stopPropagation();
      const open = menu.classList.toggle('open');
      trigger.setAttribute('aria-expanded', String(open));
    });
    document.addEventListener('click', e => { if (!menu.contains(e.target)) close(false); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(true); });
  }
  function init() { initTheme(); initSidebar(); initUserMenu(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
  window.addEventListener('storage', e => { if (e.key === STORAGE_KEY) applyTheme(e.newValue === 'dark'); });
})();