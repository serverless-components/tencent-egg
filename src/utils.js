function deepClone(source) {
  if (source instanceof Array) {
    return source.map((x) => deepClone(x))
  }

  if (source && typeof source === 'object') {
    const target = {}

    Object.keys(source).forEach((key) => {
      /* eslint-disable no-use-before-define */
      target[key] = deepClone(source[key])
    })
    return target
  }

  return source
}

module.exports = {
  deepClone
}
