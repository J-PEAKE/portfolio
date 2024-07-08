class HeaderLink {
    constructor(label) {
      this.label = label;
      this.element = document.createElement('a');
      this.element.innerText = this.label;
    }
  
    render(parentElement) {
      this.element.classList.add('header-button'); // Default class
      parentElement.appendChild(this.element);
    }
  }
  
  export default HeaderLink;
  