import { useEffect } from "react";

// Fades/slides in every [data-reveal] element the first time it scrolls into view.
// Elements stay visible if IntersectionObserver is missing (the hidden state only
// applies once `reveal-ready` is set on <html>).
export default function useReveal() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const root = document.documentElement;
    const els = document.querySelectorAll("[data-reveal]");

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );

    root.classList.add("reveal-ready");
    els.forEach((el) => io.observe(el));
    return () => {
      io.disconnect();
      root.classList.remove("reveal-ready");
    };
  }, []);
}
