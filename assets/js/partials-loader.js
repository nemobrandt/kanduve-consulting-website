/**
 * partials-loader.js
 * Fetches and injects shared header and footer into every page.
 * Just include this script in every page and it handles the rest.
 */
async function loadPartial(selector, url) {
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Failed to load ${url}`);
        const html = await res.text();
        const target = document.querySelector(selector);
        if (target) target.outerHTML = html;
    } catch (err) {
        console.error('Partial load error:', err);
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    await Promise.all([
        loadPartial('#header-placeholder', '/partials/header.html'),
        loadPartial('#footer-placeholder', '/partials/footer.html'),
    ]);

    // Re-highlight the active nav link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('#nav .nav-item a').forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });

    // Re-init WOW animations after partials are injected
    if (typeof WOW !== 'undefined') new WOW().init();
});