document.addEventListener('DOMContentLoaded', function () {
  const carousel = document.getElementById('carousel-about')
  if (!carousel) return

  const slides = carousel.querySelectorAll('.slide')
  const dots = carousel.querySelectorAll('.dot')
  let current = 0
  let timer = null

  function goTo(n) {
    slides[current].classList.add('hidden')
    dots[current].classList.remove('bg-sauge')
    dots[current].classList.add('bg-creme/30')
    current = (n + slides.length) % slides.length
    slides[current].classList.remove('hidden')
    dots[current].classList.remove('bg-creme/30')
    dots[current].classList.add('bg-sauge')
  }

  function startAutoplay() {
    timer = setInterval(function () { goTo(current + 1) }, 4000)
  }

  function resetAutoplay() {
    clearInterval(timer)
    startAutoplay()
  }

  document.getElementById('prev-about').addEventListener('click', function () { goTo(current - 1); resetAutoplay() })
  document.getElementById('next-about').addEventListener('click', function () { goTo(current + 1); resetAutoplay() })
  dots.forEach(function (dot, i) { dot.addEventListener('click', function () { goTo(i); resetAutoplay() }) })

  carousel.addEventListener('mouseenter', function () { clearInterval(timer) })
  carousel.addEventListener('mouseleave', startAutoplay)

  startAutoplay()
})
