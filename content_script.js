const svgSelector = '#react-root > div > div > div.css-1dbjc4n.r-18u37iz.r-13qz1uu.r-417010 > header > div > div > div > div:nth-child(1) > div.css-1dbjc4n.r-dnmrzs.r-1vvnge1 > h1 > a > div'
const loadingSelector = '#placeholder'
const faviconSelector = 'link[rel*="shortcut icon"]'
const whiteBird = chrome.runtime.getURL('bird.svg')
const darkBird = chrome.runtime.getURL('darkbird.svg')
const whiteIco = chrome.runtime.getURL('twitter-ico.ico')
// Depending on the theme, the body has a different background color
const isDarkMode = document.querySelector('body').getAttribute('style') === 'background-color: #000000;'

const fetchSvg = async (svgRoute) => {
  const res = await fetch(svgRoute)
  const svgContent = await res.text()
  return svgContent
}

// This is supposed to replace the loading icon, but it doesn't work
document.querySelector(faviconSelector).href = whiteIco
const loading = document.querySelector(loadingSelector)
if (loading) {
  const svgRoute = isDarkMode ? whiteBird : darkBird
  fetchSvg(svgRoute).then(svgContent => loading.innerHTML = svgContent)
}

window.addEventListener('load', async () => {
  const observer = new MutationObserver(mutations => {
    mutations.forEach(() => {
      const iconContainer = document.querySelector(svgSelector)
      if (!iconContainer) return
      const svgRoute = isDarkMode ? whiteBird : darkBird
      fetchSvg(svgRoute).then(svgContent => iconContainer.innerHTML = svgContent)
    })
  })
  const config = { attributes: true, childList: true, characterData: true }
  observer.observe(document.body, config)
})