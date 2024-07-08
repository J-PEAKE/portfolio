import HeaderLink from './buttons.js';

class Header {
  constructor(buttonLabels) {
    // Initialize header properties here
    this.buttonLabels = buttonLabels; // Array of button labels
  }

  // Add methods for header functionality here
  render() {
    // Create header element
    const header = document.createElement('header');
    header.id = 'header';
    header.classList.add('header');

    // Create a div to hold content
    const container = document.createElement('div');
    container.classList.add('header-container'); // Add a class 

    // Create a div to hold the buttons
    const links = document.createElement('div');
    links.classList.add('links-container'); // Add a class 

    // Create a div to hold the buttons
    const logo = document.createElement('div');
    logo.classList.add('logo'); // Add a class 
    logo.innerText = 'JP.';

    // Create buttons and append to the div
    this.buttonLabels.forEach(label => {
      const button = new HeaderLink(label);
      if (label === 'contact') {
        button.element.classList.add('contact'); // Apply 'contact' class to the button
      } else {
        button.element.classList.add('header-button'); // Apply 'header-button' class to the button
      }
      button.render(links);
    });

    // Add div to header
    container.appendChild(logo);
    container.appendChild(links);
    header.appendChild(container);

    // Append header to the body
    document.body.appendChild(header);
  }
}

// Export the Header class
export default Header;
