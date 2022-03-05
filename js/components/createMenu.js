export default function createMenu() {
    const {
        pathname
    } = document.location;

    const container = document.querySelector(".navbar-nav");

    let authLink = `<li class="nav-item">
        <a href="login.html" class="${pathname === "/login.html" ? "hide" : ""}">Login</a>
        </li>`;

    container.innerHTML = `
    <li class="nav-item">
        <a href="/" class="${pathname === "/" || pathname === "/index.html" ? "active" : ""}">Home</a>
    </li>
    <li class="nav-item">
        ${authLink}
    </li>`;
}