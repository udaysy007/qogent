"use client"

import createGlobe, { COBEOptions } from "cobe"
import { useCallback, useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"

const darkModeConfig: Partial<COBEOptions> = {
  baseColor: [0.3, 0.3, 0.3] as [number, number, number],
  glowColor: [0.1, 0.5, 1] as [number, number, number],
  markerColor: [0.1, 0.5, 1] as [number, number, number],
  dark: 1,
  diffuse: 1.2,
  mapBrightness: 6,
}

const lightModeConfig: Partial<COBEOptions> = {
  baseColor: [1, 1, 1] as [number, number, number],
  glowColor: [0.3, 0.6, 1] as [number, number, number],
  markerColor: [0.3, 0.6, 1] as [number, number, number],
  dark: 0,
  diffuse: 2,
  mapBrightness: 4,
}

export function Globe({
  className,
  config: userConfig = {},
}: {
  className?: string
  config?: Partial<COBEOptions>
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerInteracting = useRef<number | null>(null)
  const pointerInteractionMovement = useRef(0)
  const [r, setR] = useState(0)
  const [width, setWidth] = useState(0)
  const phiRef = useRef(0)
  const { theme } = useTheme()

  const baseConfig: COBEOptions = {
    width: 800,
    height: 800,
    devicePixelRatio: 2,
    phi: 0,
    theta: 0.3,
    mapSamples: 16000,
    mapBrightness: 6,
    baseColor: [0.3, 0.3, 0.3] as [number, number, number],
    glowColor: [0.1, 0.5, 1] as [number, number, number],
    markerColor: [0.1, 0.5, 1] as [number, number, number],
    dark: 1,
    diffuse: 1.2,
    onRender: () => {},
    markers: [
      { location: [51.5074, -0.1278], size: 0.1 },  // London
      { location: [40.7128, -74.0060], size: 0.1 }, // New York
      { location: [48.1351, 11.5820], size: 0.08 }, // Munich
      { location: [53.3498, -6.2603], size: 0.08 }, // Dublin
      { location: [52.2297, 21.0122], size: 0.08 }, // Warsaw
      { location: [35.6762, 139.6503], size: 0.08 }, // Tokyo
      { location: [1.3521, 103.8198], size: 0.07 }, // Singapore
      { location: [48.8566, 2.3522], size: 0.09 },  // Paris
      { location: [45.4642, 9.1900], size: 0.08 },  // Milan
      { location: [-33.8688, 151.2093], size: 0.09 }, // Sydney
    ],
    ...userConfig,
    ...(theme === 'dark' ? darkModeConfig : lightModeConfig),
  }

  const updatePointerInteraction = useCallback((value: number | null) => {
    pointerInteracting.current = value
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value ? "grabbing" : "grab"
    }
  }, [])

  const updateMovement = useCallback((clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current
      pointerInteractionMovement.current = delta
      setR(delta / 200)
    }
  }, [])

  const onRender = useCallback((state: Record<string, any>) => {
    if (!pointerInteracting.current) {
      phiRef.current += 0.005
    }
    state.phi = phiRef.current + r
    state.width = width * 2
    state.height = width * 2
  }, [r, width])

  useEffect(() => {
    const onResize = () => {
      if (canvasRef.current) {
        const newWidth = canvasRef.current.offsetWidth
        setWidth(newWidth)
      }
    }

    onResize()
    window.addEventListener("resize", onResize)

    if (width > 0 && canvasRef.current) {
      const globe = createGlobe(canvasRef.current, {
        ...baseConfig,
        width: width * 2,
        height: width * 2,
        onRender,
      })

      requestAnimationFrame(() => {
        if (canvasRef.current) {
          canvasRef.current.style.opacity = "1"
        }
      })

      return () => {
        globe.destroy()
        window.removeEventListener("resize", onResize)
      }
    }

    return () => window.removeEventListener("resize", onResize)
  }, [baseConfig, width, onRender, theme])

  return (
    <div className={cn("relative h-full w-full", className)}>
      <canvas
        ref={canvasRef}
        className="h-full w-full opacity-0 transition-opacity duration-500"
        style={{ aspectRatio: "1/1" }}
        onPointerDown={(e) => updatePointerInteraction(e.clientX - pointerInteractionMovement.current)}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) => e.touches[0] && updateMovement(e.touches[0].clientX)}
      />
    </div>
  )
} 