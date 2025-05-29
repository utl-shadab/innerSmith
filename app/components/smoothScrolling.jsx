"use client"
import { ReactLenis } from 'lenis/react'

function SmoothScrolliing({children}) {
  const lenisOptions = {
    lerp: 0.06,
    duration: 2,
    syncTouch: false,
    smooth: true,
    smoothTouch: true,
    easing: (t) => 1 - Math.pow(1 - t, 4),
  }
  return (
    <ReactLenis 
      root 
      options={lenisOptions}
    >
      {children}
    </ReactLenis>
  )
}

export default SmoothScrolliing
