"use client"

import * as React from "react"
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"

const AspectRatio = ({
  ratio = 16 / 9,
  className,
  ...props
}: AspectRatioPrimitive.AspectRatioProps) => (
  <AspectRatioPrimitive.Root
    ratio={ratio}
    className={className}
    {...props}
  />
)
AspectRatio.displayName = "AspectRatio"

export { AspectRatio } 