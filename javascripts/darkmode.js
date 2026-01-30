const themeSwitch = document.getElementById('theme-switch');
const root =document.documentElement;

const  storedTheme = localStorage.getItem('theme');
if (storedTheme) {
    root.setAttribute('data-theme', storedTheme);
    themeSwitch.checked = storedTheme === 'light';
}

themeSwitch.addEventListener('change', () => {
    const newTheme = themeSwitch.checked ? 'light' : 'dark';
    root.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

