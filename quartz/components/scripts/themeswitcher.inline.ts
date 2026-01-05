const themeSwitcherUserPref = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"
const themeSwitcherCurrentTheme = localStorage.getItem("theme") ?? themeSwitcherUserPref
const currentColorScheme = localStorage.getItem("color-scheme") ?? "default"

document.documentElement.setAttribute("saved-theme", themeSwitcherCurrentTheme)
document.documentElement.setAttribute("color-scheme", currentColorScheme)

const emitColorSchemeChangeEvent = (scheme: string) => {
  const event = new CustomEvent("colorschemechange", {
    detail: { scheme },
  })
  document.dispatchEvent(event)
}

document.addEventListener("nav", () => {
  const themeDropdown = document.querySelector(".theme-switcher")
  const dropdownContent = document.querySelector(".theme-dropdown")
  const themeButtons = document.querySelectorAll(".theme-dropdown button")

  if (!themeDropdown || !dropdownContent) return

  // Toggle dropdown visibility
  const toggleButton = themeDropdown.querySelector(".theme-dropdown-toggle")
  toggleButton?.addEventListener("click", (e) => {
    e.stopPropagation()
    dropdownContent.classList.toggle("show")
  })

  // Close dropdown when clicking outside
  const closeDropdown = (e: MouseEvent) => {
    if (!themeDropdown.contains(e.target as Node)) {
      dropdownContent.classList.remove("show")
    }
  }
  document.addEventListener("click", closeDropdown)
  window.addCleanup(() => document.removeEventListener("click", closeDropdown))

  // Handle theme selection
  themeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const theme = button.getAttribute("data-theme")
      if (theme) {
        document.documentElement.setAttribute("color-scheme", theme)
        localStorage.setItem("color-scheme", theme)
        emitColorSchemeChangeEvent(theme)
        dropdownContent.classList.remove("show")

        // Update active state
        themeButtons.forEach((btn) => btn.classList.remove("active"))
        button.classList.add("active")
      }
    })

    // Set initial active state
    const currentScheme = document.documentElement.getAttribute("color-scheme")
    if (button.getAttribute("data-theme") === currentScheme) {
      button.classList.add("active")
    }
  })

  window.addCleanup(() => {
    toggleButton?.removeEventListener("click", () => {})
    themeButtons.forEach((button) => {
      button.removeEventListener("click", () => {})
    })
  })
})
