let apiUrl
const apiUrls = {
  production: 'https://git.heroku.com/immense-thicket-14716.git',
  development: 'http://localhost:8000'
}

if (window.location.hostname === 'localhost') {
  apiUrl = apiUrls.development
} else {
  apiUrl = apiUrls.production
}

export default apiUrl
