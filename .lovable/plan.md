## What's wrong

The hero marquee bar (`Cookies Signature ✦ Dattes Farcies aux cajou ✦ …`) is visually hidden because the cinematic hero background video added recently sits in an `absolute inset-0` layer that covers the entire `<section>`, including the marquee strip at the bottom. The marquee wrapper has no positioning, so the video + its cream gradient overlay paint over it.

## Fix

In `src/components/Hero.tsx`, line 127:

- Add `relative z-10` to the marquee wrapper so it stacks above the absolute background video layer.
- No content, animation, or styling changes — purely a stacking fix.

That restores the ribbon as the solid cocoa band it used to be, while keeping the cinematic bg behind the hero copy and image.
