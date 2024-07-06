const header = document.createElement('header');
header.classList.add('header');

// Add your header content here
// For example:
const logo = document.createElement('img');
logo.src = 'path/to/logo.png';
logo.alt = 'Logo';
header.appendChild(logo);

// Append the header to the document body or any other container element
document.body.appendChild(header);

export { header };