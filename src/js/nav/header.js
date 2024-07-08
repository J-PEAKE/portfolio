class Header {
  constructor(elementId, elementClass) {
    // Initialize header properties here
    this.elementId = elementId;
    this.elementClass = elementClass;
  }

  // Add methods for header functionality here
  render() {
    // Create header element
    const header = document.createElement('header');
    header.id = this.elementId;
    header.classList.add(this.elementClass);
    // header.innerHTML = '<h1>My Header</h1>';
    document.body.appendChild(header);
  }
}

// Export the Header class
export default Header;
const myHeader = new Header('my-header', 'header-class');
myHeader.render();
