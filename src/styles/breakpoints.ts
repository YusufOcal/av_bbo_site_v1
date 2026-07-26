export const breakpoints = {
  mobile: 480,
  tablet: 760,
  desktop: 1080,
  wide: 1320
} as const;

export type Breakpoint = keyof typeof breakpoints;
