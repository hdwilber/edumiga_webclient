export function fakeId() {
  function code() {
    return Math.floor((1 + Math.random()) * 0x10000000).toString(16).substring(1)
  }
  return 'fake'+code()
}

