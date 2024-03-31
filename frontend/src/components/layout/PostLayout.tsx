import React from "react";

export default function PostLayout({forhome = false, view = "Card", children}: PostLayoutProps) {
  return (
    <>
      {children && children.map((child, index) => {
        return React.cloneElement(child as React.ReactElement<any>, { forhome, view, key: index });
      })}
    </>
  )
}