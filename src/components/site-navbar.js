class SiteNavbar extends HTMLElement {
  constructor() {
    super();
    this.renderNavbar();
  }

  renderNavbar() {
    this.innerHTML = `
    <!--Footer Icons and Buttons-->
    <div class="fixed-bottom">
            <footer class="app-footer header-custom">

                <!--Chat Icon | chat.png-->
                <a class="footer-icon-link" href="#" aria-label="Saved">
                  <img class="footer-icon" src="images/chat.png" alt="Profile icon">
                  <span>find squad</span>
                </a>

                <!--profile Icon | account.png-->
                <a class="footer-icon-link" href="#" aria-label="Profile">
                  <img class="footer-icon" src="images/account.png" alt="Profile icon">
                  <span>profile</span>
                </a>
            </footer>
    </div>
    `;
  }
}

customElements.define("site-navbar", SiteNavbar);
