/**
 * HelloViki Analytics & Tracking Wrapper
 * Pushes events to the GTM dataLayer in a structured format.
 */

window.dataLayer = window.dataLayer || [];

const Analytics = {
    /**
     * Helper to push an event to the dataLayer
     * @param {string} eventName - The name of the event (snake_case)
     * @param {object} payload - Additional properties
     */
    track: function(eventName, payload = {}) {
        try {
            const eventData = {
                event: eventName,
                page_title: document.title,
                page_url: window.location.href,
                page_path: window.location.pathname,
                referrer: document.referrer,
                ...payload
            };
            window.dataLayer.push(eventData);
            
            // Debug logging (disable in prod or rely on GTM preview)
            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.search.includes('debug=true')) {
                console.log(`[Analytics] ${eventName}`, eventData);
            }
        } catch (e) {
            console.error('[Analytics] Error tracking event', e);
        }
    },

    /**
     * Initializes core automatic tracking (e.g. outbound links)
     */
    init: function() {
        // Track initial page view (GTM usually handles this, but good practice if relying on custom events)
        this.track('page_view');

        // General click listener for buttons and outbound links
        document.addEventListener('click', (e) => {
            const target = e.target.closest('a, button');
            if (!target) return;

            // Outbound links
            if (target.tagName === 'A' && target.href && !target.href.startsWith('javascript:')) {
                const url = new URL(target.href);
                if (url.hostname !== window.location.hostname) {
                    this.track('outbound_link_click', {
                        link_url: target.href,
                        link_text: target.innerText || target.textContent,
                        link_classes: target.className
                    });
                }
            }

            // Buttons or generalized click tracking
            const buttonText = target.innerText || target.textContent || target.value;
            const actionType = target.getAttribute('data-action') || 'click';
            
            if (target.tagName === 'BUTTON' || target.classList.contains('btn') || target.getAttribute('role') === 'button') {
                this.track('button_click', {
                    button_text: buttonText.trim(),
                    button_id: target.id,
                    button_classes: target.className,
                    action: actionType
                });
            }
        });

        // Track form submissions
        document.addEventListener('submit', (e) => {
            const form = e.target;
            this.track('form_submit', {
                form_id: form.id,
                form_name: form.getAttribute('name') || '',
                form_action: form.getAttribute('action') || '',
                form_classes: form.className
            });
        });
    }
};

// Initialize after DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => Analytics.init());
} else {
    Analytics.init();
}

// Ensure it's available globally for manual calls
window.HelloVikiAnalytics = Analytics;
