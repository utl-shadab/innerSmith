"use client"
import { ReactLenis } from 'lenis/react'

function SmoothScrolliing({children}) {
  const lenisOptions = {
    lerp: 0.05,
    duration: 1.5,
    syncTouch: false,
    smooth: true,
      smoothTouch: true,
      easing: (t) => 1 - Math.pow(1 - t, 3),
  }

  // Log when smooth scrolling is initialized
  console.log('Smooth scrolling initialized with options:', lenisOptions)

  return (
    <ReactLenis 
      root 
      options={lenisOptions}
      onFrame={(e) => {
        console.log('Scroll progress:', e)
      }}
    >
      {children}
    </ReactLenis>
  )
}

export default SmoothScrolliing
