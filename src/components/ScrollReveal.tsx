import {
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

type ScrollRevealProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
  disabled?: boolean;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export default function ScrollReveal<T extends ElementType = "div">({
  as,
  children,
  className = "",
  delay = 0,
  threshold = 0.12,
  disabled = false,
  style,
  ...props
}: ScrollRevealProps<T>) {
  const Component = (as || "div") as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(disabled);

  useEffect(() => {
    if (disabled) {
      setVisible(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [disabled, threshold]);

  return (
    <Component
      ref={ref}
      className={`scroll-reveal${visible ? " is-visible" : ""}${className ? ` ${className}` : ""}`}
      style={{
        ...style,
        transitionDelay: delay ? `${delay}ms` : undefined,
      }}
      {...props}
    >
      {children}
    </Component>
  );
}
