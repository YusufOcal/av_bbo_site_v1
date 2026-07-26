# Animation-Ready Architecture Guidelines

This document outlines the architecture and markup conventions built into the BBO Legal codebase to support premium animations (e.g., GSAP, ScrollTrigger, CSS transitions) without needing future layout refactoring.

## Core Concepts

1. **CSS Modules & Animation State**:
   - Prefer CSS transition tokens (`--ease-standard`, `--duration-medium`) for micro-interactions, hover states, and small transitions.
   - Use custom `data-*` attributes (e.g., `data-state="active"`, `data-in-view="true"`) to trigger CSS-based entry animations via intersection observers.

2. **GSAP & ScrollTrigger Targeting**:
   - Keep structural containers independent of animating elements.
   - Use clear class names or dedicated attributes on child components to animate them sequentially (e.g., `.title`, `.card`, `.item`).
   - Use standard React `useRef` hooks to scope GSAP selectors:
     ```typescript
     const containerRef = useRef<HTMLDivElement>(null);
     
     useEffect(() => {
       // Scope selectors to avoid global selection issues
       const ctx = gsap.context(() => {
         gsap.from(".animate-item", { opacity: 0, y: 20, stagger: 0.1 });
       }, containerRef);
       
       return () => ctx.revert();
     }, []);
     ```

3. **Staggered Items Structure**:
   - For grids/lists (like in `PracticeFocus` or `SelectedMatters`), elements are cleanly mapped dynamically with unique keys and consistent markup.
   - Example:
     ```html
     <div className={styles.grid}>
       {practiceAreas.map((area) => (
         <article className={styles.card} key={area.title}>
           {/* animatable items inside */}
         </article>
       ))}
     </div>
     ```

4. **Avoiding Layout Shift (CLS)**:
   - For text reveal effects (e.g. splitting text into characters/words/lines), ensure container blocks have fixed heights or appropriate styling (like `overflow: hidden`) to prevent page jumpiness when GSAP wraps text in nested `div`s.

5. **Responsive Animations**:
   - Use the `useMediaQuery` / `useBreakpoint` React hooks to load or modify animations based on the viewport:
     ```typescript
     const isTablet = useBreakpoint("tablet");
     
     useEffect(() => {
       if (isTablet) {
         // Load simplified or touch-optimized animations
       } else {
         // Load rich, desktop scroll-driven timelines
       }
     }, [isTablet]);
     ```
