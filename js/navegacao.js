/* =========================================================
   MENU HAMBÚRGUER
   ========================================================= */

export function iniciarMenu() {
    const menuToggle =
        document.querySelector(
            ".menu-toggle"
        );

    const menuPrincipal =
        document.querySelector(
            "#menu-principal"
        );

    if (
        !menuToggle ||
        !menuPrincipal
    ) {
        return;
    }

    if (
        menuToggle.dataset.menuAtivo ===
        "true"
    ) {
        return;
    }

    menuToggle.dataset.menuAtivo =
        "true";

    menuToggle.addEventListener(
        "click",
        () => {

            const menuAberto =
                menuToggle.getAttribute(
                    "aria-expanded"
                ) === "true";

            menuToggle.setAttribute(
                "aria-expanded",
                String(!menuAberto)
            );

            menuPrincipal.classList.toggle(
                "menu-aberto",
                !menuAberto
            );
        }
    );
}


/* =========================================================
   SUBMENU DROPDOWN
   ========================================================= */

export function iniciarSubmenu() {
    const submenuToggle =
        document.querySelector(
            ".submenu-toggle"
        );

    const itemDropdown =
        document.querySelector(
            ".item-dropdown"
        );

    if (
        !submenuToggle ||
        !itemDropdown
    ) {
        return;
    }

    if (
        submenuToggle.dataset
            .submenuAtivo ===
        "true"
    ) {
        return;
    }

    submenuToggle.dataset.submenuAtivo =
        "true";

    submenuToggle.addEventListener(
        "click",
        () => {

            const submenuAberto =
                submenuToggle.getAttribute(
                    "aria-expanded"
                ) === "true";

            submenuToggle.setAttribute(
                "aria-expanded",
                String(!submenuAberto)
            );

            itemDropdown.classList.toggle(
                "submenu-aberto",
                !submenuAberto
            );
        }
    );
}