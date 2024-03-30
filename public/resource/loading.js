function addThemeColorCssVars() {
  const key = '__THEME_COLOR__'
  const defaultColor = '#eb8004'
  const themeColor = localStorage.getItem(key) || defaultColor
  const cssVars = `--primary-color: ${themeColor}`
  document.documentElement.style.cssText = cssVars
}

addThemeColorCssVars()

