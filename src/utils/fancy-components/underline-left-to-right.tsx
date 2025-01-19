import React, { useEffect, useRef, useState } from "react"
import cn from "clsx"
import {
  motion,
  useAnimationControls,
  ValueAnimationTransition,
} from "motion/react"

interface ComesInGoesOutUnderlineProps {
  label: string
  direction?: "left" | "right"
  className?: string
  onClick?: () => void
  underlineHeightRatio?: number
  underlinePaddingRatio?: number
  transition?: ValueAnimationTransition
}

const ComesInUnderline: React.FC<ComesInGoesOutUnderlineProps> = ({
  label,
  direction = "left",
  className,
  onClick,
  underlineHeightRatio = 0.1,
  underlinePaddingRatio = 0.01,
  transition = {
    duration: 0.4,
    ease: "easeInOut",
  },
  ...props
}) => {
  const controls = useAnimationControls()
  const [blocked, setBlocked] = useState(false)
  const [hovered, setHovered] = useState(false) // Track hover state
  const textRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const updateUnderlineStyles = () => {
      if (textRef.current) {
        const fontSize = parseFloat(getComputedStyle(textRef.current).fontSize)
        const underlineHeight = fontSize * underlineHeightRatio
        const underlinePadding = fontSize * underlinePaddingRatio
        textRef.current.style.setProperty(
          "--underline-height",
          `${underlineHeight}px`
        )
        textRef.current.style.setProperty(
          "--underline-padding",
          `${underlinePadding}px`
        )
      }
    }

    updateUnderlineStyles()
    window.addEventListener("resize", updateUnderlineStyles)

    return () => window.removeEventListener("resize", updateUnderlineStyles)
  }, [underlineHeightRatio, underlinePaddingRatio])

  const animateIn = async () => {
    if (blocked || hovered) return
    setBlocked(true)
    setHovered(true)

    await controls.start({
      width: "100%",
      transition,
      transitionEnd: {
        left: direction === "left" ? "auto" : 0,
        right: direction === "left" ? 0 : "auto",
      },
    })

    setBlocked(false)
  }

  const animateOut = async () => {
    if (!hovered) return
    setHovered(false)

    await controls.start({
      width: 0,
      transition,
      transitionEnd: {
        left: direction === "left" ? 0 : "",
        right: direction === "left" ? "" : 0,
      },
    })
  }

  return (
    <motion.span
      className={cn("relative inline-block cursor-pointer", className)}
      onHoverStart={animateIn}  // Trigger animation when hover starts
      onHoverEnd={animateOut}    // Trigger animation when hover ends
      onClick={onClick}
      ref={textRef}
      {...props}
    >
      <span>{label}</span>
      <motion.span
        className={cn("absolute bg-current w-0", {
          "left-0": direction === "left",
          "right-0": direction === "right",
        })}
        style={{
          height: "var(--underline-height)",
          bottom: "calc(1 * var(--underline-padding))",
        }}
        animate={controls}
      />
    </motion.span>
  )
}

export default ComesInUnderline

