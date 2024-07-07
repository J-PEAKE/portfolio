class Header {
    constructor(logoSrc, logoAlt) {
      this.header = document.createElement('header');
      this.header.classList.add('header');
  
      // Add the logo
      this.logo = document.createElement('img');
      this.logo.src = logoSrc;
      this.logo.alt = logoAlt;
      this.header.appendChild(this.logo);
  
      // Append the header to the document body or any other container element
      document.body.appendChild(this.header);
    }
  
    // Method to add more elements if needed
    addElement(element) {
      this.header.appendChild(element);
    }
  
    // Method to get the header element
    getHeader() {
      return this.header;
    }
  }



export { Header };