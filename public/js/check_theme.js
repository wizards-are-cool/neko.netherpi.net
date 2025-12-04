// code modified from Emma Moore

// initially set theme


const storedTheme = localStorage.getItem("theme");
const darkPreference = window.matchMedia(
    "(prefer-color-scheme: dark)"
).matches;
const theme = storedTheme || (darkPreference ? "dark" : "light");
document.documentElement.setAttribute("data-theme", theme);

