// Needed for React 16
global.requestAnimationFrame = function (callback) {
  setTimeout(callback, 0)
}
