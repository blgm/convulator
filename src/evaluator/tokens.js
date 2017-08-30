export function operator (value) {
  const type = 'operator'
  return {type, value}
}

export function appendDigit (initial, addition) {
  const type = 'number'
  const value = (initial && typeof initial.value === 'string' ? initial.value : '') + addition
  return {type, value}
}

export function removeDigit (initial) {
  const type = 'number'
  if (initial && typeof initial.value === 'string' && initial.value.length > 1) {
    const value = initial.value.slice(0, initial.value.length - 1)
    return {type, value}
  } else {
    return undefined
  }
}
