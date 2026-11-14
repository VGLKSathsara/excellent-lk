import { useEffect } from "react";

// Pauses endless CSS animations inside any [data-live] block while it is off screen,
// so the browser isn't animating things nobody can see. (See .is-offscreen in global.css.)
export default function useOffscreenPause() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.toggle("is-offscreen", !e.isIntersecting)),
      { rootMargin: "120px" }
    );
    document.querySelectorAll("[data-live]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
