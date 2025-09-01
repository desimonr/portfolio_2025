/**
 * Toggles the visibility of the dropdown menu in the navigation.
 * This function is called by the `onclick` attribute in the HTML.
 */
function toggleDropdown() {
  const dropdownContent = document.getElementById('dropdown-menu');
  const dropdownIcon = document.querySelector('.dropdown-btn i');

  if (dropdownContent && dropdownIcon) {
    dropdownContent.classList.toggle('show');
    dropdownIcon.classList.toggle('rotated');
  }
}

// Close the dropdown if the user clicks outside of it
window.addEventListener('click', (event) => {
  // Ensure the click is not on the dropdown button or inside it
  if (!event.target.closest('.dropdown-btn')) {
    const openDropdown = document.querySelector('.dropdown-content.show');
    const openIcon = document.querySelector('.dropdown-btn i.rotated');

    if (openDropdown) {
      openDropdown.classList.remove('show');
    }
    if (openIcon) {
      openIcon.classList.remove('rotated');
    }
  }
});

/**
 * Page transition logic
 */
document.addEventListener('DOMContentLoaded', () => {
  // Create transition elements
  const transitionElement = document.createElement('div');
  transitionElement.className = 'page-transition';
  document.body.appendChild(transitionElement);

  // Wrap page content
  const mainContent = document.createElement('div');
  mainContent.className = 'page-content';
  while (document.body.firstChild !== transitionElement) {
    mainContent.appendChild(document.body.firstChild);
  }
  document.body.insertBefore(mainContent, transitionElement);

  // Get current page theme color
  const currentTheme = getComputedStyle(document.documentElement)
    .getPropertyValue('--primary-surface').trim();

  // Set initial transition element color
  transitionElement.style.background = currentTheme;

  // Show page content
  document.body.style.opacity = 1;

  // Handle navigation
  const allLinks = document.querySelectorAll('a');

  allLinks.forEach(link => {
    link.addEventListener('click', function(event) {
      const href = this.getAttribute('href');

      // Let the browser handle links with no href, new tabs, or on-page anchors
      if (!href || this.target === '_blank' || href.startsWith('#')) {
        return;
      }

      // Use the URL object to safely check if the link is internal
      try {
        const targetUrl = new URL(href, window.location.origin);
        if (targetUrl.origin !== window.location.origin) {
          return; // It's an external link, do nothing.
        }
      } catch (err) {
        return; // Invalid URL, do nothing.
      }

      event.preventDefault();

      // Start transition sequence
      const pageContent = document.querySelector('.page-content');
      pageContent.classList.add('transitioning');

      // Animate transition element
      transitionElement.style.transform = 'scaleX(1)';
      transitionElement.style.opacity = '1';

      setTimeout(() => {
        window.location.href = href;
      }, 500);
    });
  });
});