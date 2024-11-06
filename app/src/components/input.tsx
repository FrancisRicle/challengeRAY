import { forwardRef, InputHTMLAttributes } from "react";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(({ className, ...props }, ref) => {
  return <input className={`focus:outline-2 p-3, ${className ?? ""}`} {...props} ref={ref} />
})
