'use client'
import { ThemeProvider } from "next-themes";
import { useState, useEffect } from "react";

const Providers = (props) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true)
  }, []);

  if (!mounted) {
    return <>{props.children}</>
  }
  return <ThemeProvider enableSystem={true} attribute="class">{props.children}</ThemeProvider>;
};

export default Providers;
