import { AnimatePresence, motion } from "framer-motion";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

type Props = StyleableWithChildren<{
  content: React.ReactNode;
  contentClasses?: string;
  placement?: "top" | "bottom" | "left" | "right";
  delay?: number;
  distance?: number;
  allowOpen?: boolean;
  forceOpen?: boolean;
  showArrow?: boolean;
  enablePointerEvents?: boolean;
  onChange?: (open: boolean) => void;
  openMechanism?: "click" | "hover";
}>;

export function Tooltip({
  children,
  contentClasses,
  content,
  placement = "top",
  delay = 800,
  distance = 8,
  allowOpen = true,
  forceOpen = false,
  showArrow = true,
  enablePointerEvents = false,
  className,
  onChange,
  openMechanism = "hover",
}: Props) {
  const [show, setShow] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [leaveTimer, setLeaveTimer] = useState<NodeJS.Timeout | null>(null);
  const [position, setPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback(() => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();

    switch (placement) {
      case "top":
        setPosition({
          top: rect.top + window.scrollY - distance,
          left: rect.left + rect.width / 2,
        });
        break;
      case "bottom":
        setPosition({
          top: rect.top + window.scrollY + rect.height + distance,
          left: rect.left + rect.width / 2,
        });
        break;
      case "left":
        setPosition({
          top: rect.top + window.scrollY + rect.height / 2,
          left: rect.left - distance,
        });
        break;
      case "right":
        setPosition({
          top: rect.top + window.scrollY + rect.height / 2,
          left: rect.left + rect.width + distance,
        });
        break;
    }
  }, [placement, distance]);

  useLayoutEffect(() => {
    if (!containerRef.current || !(show || forceOpen)) return;

    updatePosition();
  }, [placement, distance, show, content, forceOpen, updatePosition]);

  const onMouseEnter = useCallback(() => {
    if (openMechanism !== "hover") return;
    if (timer) clearTimeout(timer);

    updatePosition();

    if (delay) {
      setTimer(setTimeout(() => setShow(true), delay));
    } else {
      setShow(true);
    }
  }, [openMechanism, timer, updatePosition, delay]);

  const onMouseLeave = useCallback(() => {
    if (openMechanism !== "hover") return;
    if (timer) clearTimeout(timer);

    if (enablePointerEvents) {
      if (leaveTimer) clearTimeout(leaveTimer);
      setLeaveTimer(setTimeout(() => setShow(false), 200));
    } else {
      setShow(false);
    }
  }, [enablePointerEvents, leaveTimer, openMechanism, timer]);

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (openMechanism !== "click") return;

      updatePosition();

      e.stopPropagation();
      setShow(true);
    },
    [openMechanism, updatePosition]
  );

  // Update the position when the window is scrolled
  useEffect(() => {
    if (!show && !forceOpen) return;

    const handleScroll = () => {
      if (!show && !forceOpen) return;
      updatePosition();
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [show, forceOpen, updatePosition]);

  const portal = useMemo(() => document.getElementById("tooltip-root"), []);

  useEffect(() => {
    if (onChange) onChange((show || forceOpen) && allowOpen);
  }, [show, onChange, forceOpen, allowOpen]);

  if (!portal) return <>{children}</> ?? null;

  const tooltip = createPortal(
    <AnimatePresence>
      {((show && !isMobileDevice()) || forceOpen) && allowOpen && (
        <>
          {showArrow && (
            <motion.div
              className={classes(
                "absolute z-[999999] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 border-zinc-700 bg-zinc-900",
                placement === "top" && "border-b border-r",
                placement === "bottom" && "border-l border-t",
                placement === "left" && "border-r border-t",
                placement === "right" && "border-b border-l"
              )}
              style={{
                top: `${position.top}px`,
                left: `${position.left}px`,
              }}
              initial={{
                opacity: 0,
              }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                type: "tween",
                duration: 0.05,
              }}
            />
          )}
          <motion.div
            ref={tooltipRef}
            style={{
              top: `${position.top}px`,
              left: `${Math.min(
                position.left,
                window.innerWidth - (tooltipRef.current?.offsetWidth ?? 0) + 64
              )}px`,
            }}
            className={classes(
              "absolute z-[999998] block shrink-0 whitespace-nowrap rounded-md bg-zinc-900 px-3 py-1.5 text-sm text-white ring-[1px] ring-inset ring-zinc-700",
              placement === "top" &&
                "-translate-x-1/2 -translate-y-full transform",
              placement === "bottom" && "-translate-x-1/2 transform",
              placement === "left" &&
                "-translate-x-full -translate-y-1/2 transform",
              placement === "right" && "-translate-y-1/2 transform",
              enablePointerEvents
                ? "pointer-events-auto"
                : "pointer-events-none",
              contentClasses
            )}
            initial={{
              opacity: 0,
            }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              type: "tween",
              duration: 0.05,
            }}
            css={css`
              filter: drop-shadow(0 0 0.5rem rgba(0, 0, 0, 0.5));
            `}
            onMouseEnter={() => {
              if (timer) clearTimeout(timer);
              if (leaveTimer) clearTimeout(leaveTimer);
            }}
          >
            {content}
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    portal
  );

  return (
    <div
      ref={containerRef}
      className={classes("relative inline-block", className)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseDown={onClick}
    >
      {children}
      {tooltip}
    </div>
  );
}

function isMobileDevice() {
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}
