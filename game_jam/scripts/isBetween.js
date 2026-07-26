function isBetween(pos, dir) {
  if (pos >= dir - 4 && pos <= dir + 4) return true
  else return false
}

export default isBetween
