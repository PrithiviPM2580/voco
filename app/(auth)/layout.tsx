import React from "react"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-center min-h-dvh w-full p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-xl">{children}</div>
    </div>
  )
}
