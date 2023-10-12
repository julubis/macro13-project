window.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form')
  form.addEventListener('submit', (event) => {
    event.preventDefault()
    window.location.href = 'home.html'
  })
})