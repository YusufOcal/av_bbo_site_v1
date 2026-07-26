import { useEffect, useState } from "react";
import { breakpoints } from "@/styles/breakpoints";

/**
 * A hook that matches a raw media query string.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    // Safely check during SSR/initial render
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const media = window.matchMedia(query);
    setMatches(media.matches);

    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}

/**
 * A semantic hook that matches one of the design tokens breakpoints.
 * Default type is 'max' (i.e. mobile-first max-width check).
 */
export function useBreakpoint(
  breakpoint: keyof typeof breakpoints,
  type: "max" | "min" = "max"
): boolean {
  const width = breakpoints[breakpoint];
  const query = `(${type}-width: ${width}px)`;
  return useMediaQuery(query);
}
