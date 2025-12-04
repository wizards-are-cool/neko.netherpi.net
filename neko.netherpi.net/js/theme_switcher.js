// modified from Emma Moore

const theme_sw_butt = document.querySelector("#theme_toggler button")
let theme1 = localStorage.getItem("theme");

if (theme1 === "dark") {
    if (theme_sw_butt) theme_sw_butt.querySelector("span").innerHTML = "<img class='pixel_but' src='/assets/img/sun.gif' alt='sun'/><span class='butt-text'>switch to light theme</span>"
}
else {
    if (theme_sw_butt) theme_sw_butt.querySelector("span").innerHTML = "<img class='pixel' src='/assets/img/moon.gif' alt='moon'/> <span class='butt-text'>switch to dark theme</span>"
}

theme_sw_butt.addEventListener("click", () => {
    let theme = localStorage.getItem("theme");
    if (theme === "light") {
        setDarkTheme();
        if (theme_sw_butt) theme_sw_butt.querySelector("span").innerHTML = "<img class='pixel' src='/assets/img/sun.gif' alt='sun'/> <span class='butt-text'>switch to light theme</span>"
    } else {
        setLightTheme();
        if (theme_sw_butt) theme_sw_butt.querySelector("span").innerHTML = "<img class='pixel' src='/assets/img/moon.gif' alt='moon'/> <span class='butt-text'>switch to dark theme</span>"
    }
});
    function setDarkTheme() {
        localStorage.setItem("theme", "dark");
        document.documentElement.setAttribute("data-theme", "dark");
    }
    function setLightTheme() {
        localStorage.setItem("theme", "light");
        document.documentElement.setAttribute("data-theme", "light");
    }
