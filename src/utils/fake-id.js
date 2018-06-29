export function fakeId() {
  function code() {
    return Math.floor((1 + Math.random()) * 0x100)
    .toString(16)
    .subString(1)
  }
  return 'fake'+code()
}

