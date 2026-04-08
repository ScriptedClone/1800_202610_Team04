// ./src/components/site-navbar.js
// -------------------------------------------------------------
// Generates footer navbar for each page that requires it. This function
// is used on other-threads and profile page.
// -------------------------------------------------------------

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
                  <span>chats</span>
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
