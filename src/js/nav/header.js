class Header {
  constructor(containerId) {
    this.containerId = containerId;
  }

  create() {
    const container = document.getElementById(this.containerId);
    if (!container) {
      throw new Error(`Container with id ${this.containerId} not found`);
    }

    const header = document.createElement('header');
    header.classList.add('header');

    // Add your header content here
    const logo = document.createElement('img');
    logo.src = 'assets/images/logo.png'; // Ensure the path is correct
    logo.alt = 'Logo';
    header.appendChild(logo);

    container.appendChild(header);
  }
}

export default Header;
