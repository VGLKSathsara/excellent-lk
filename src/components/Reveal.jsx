// Wrapper that animates its children in on scroll (see useReveal + global.css).
// variant: "" (rise) | "zoom" | "left"
export default function Reveal({ as: Tag = "div", variant = "", delay = 0, className = "", children, ...rest }) {
  return (
    <Tag data-reveal={variant} style={{ "--d": `${delay}ms` }} className={className} {...rest}>
      {children}
    </Tag>
  );
}
