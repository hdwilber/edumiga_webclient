import React from 'react'
export const mobile = { minWidth: 320, maxWidth: 767 }
export const tablet = { minWidth: 768, maxWidth: 991 }
export const computer = { minWidth: 992 }
export const largeScreen = { minWidth: 1200, maxWidth: 1919 }
export const wideScreen = { minWidth: 1920 }

export const DeviceTypes = {
  mobile: 1,
  tablet: 2,
  computer: 3,
}

const withScreenSizes = (Component) => {
  const getScreenSize = () => {
    const width = window.innerWidth
    if (width >= computer.minWidth) {
      return DeviceTypes.mobile
    }
    if (width <= tablet.maxWidth && width >= tablet.minWidth) {
      return DeviceTypes.tablet
    }
    return DeviceTypes.mobile
  }
  return <Component device={getScreenSize()} />
}
export default withScreenSizes

