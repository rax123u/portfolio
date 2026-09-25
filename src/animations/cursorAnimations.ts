export function attachCursor(scope: ParentNode) {
  const root = scope.querySelector<HTMLElement>(".cursor-root");
  const dot = scope.querySelector<HTMLElement>(".cursor-dot");
  const ring = scope.querySelector<HTMLElement>(".cursor-ring");
  const label = scope.querySelector<HTMLElement>(".cursor-label");

  if (!root || !dot || !ring || !label) return () => {};

  document.documentElement.classList.add("has-cursor");

  const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const current = { x: target.x, y: target.y };
  let frame = 0;
  let running = false;
  let active = "";

  const render = () => {
    const dx = target.x - current.x;
    const dy = target.y - current.y;
    current.x += dx * 0.22;
    current.y += dy * 0.22;
    root.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;

    const speed = Math.min(16, Math.hypot(dx, dy));
    const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
    dot.style.transform = `rotate(${angle}deg) scaleX(${(1 + speed * 0.04).toFixed(3)}) scaleY(${Math.max(0.7, 1 - speed * 0.018).toFixed(3)})`;

    if (Math.abs(dx) > 0.15 || Math.abs(dy) > 0.15) {
      frame = requestAnimationFrame(render);
    } else {
      dot.style.transform = "rotate(0deg) scale(1)";
      running = false;
    }
  };

  const kick = () => {
    if (running) return;
    running = true;
    frame = requestAnimationFrame(render);
  };

  const setMode = (next: string) => {
    if (next === active) return;
    active = next;
    const on = next.length > 0;
    ring.style.transform = on ? "scale(1)" : "scale(0.15)";
    ring.style.opacity = on ? "1" : "0";
    dot.style.opacity = on ? "0" : "1";
    label.style.opacity = on ? "1" : "0";
    label.textContent = next;
  };

  const onMove = (event: PointerEvent) => {
    target.x = event.clientX;
    target.y = event.clientY;
    root.style.opacity = "1";
    kick();
  };

  const onOver = (event: Event) => {
    const origin = event.target instanceof Element ? event.target : null;
    const control = origin?.closest<HTMLElement>("[data-cursor]");
    setMode(control?.dataset.cursor ?? "");
  };

  const onLeave = () => {
    root.style.opacity = "0";
  };

  window.addEventListener("pointermove", onMove, { passive: true });
  document.addEventListener("pointerover", onOver);
  document.documentElement.addEventListener("pointerleave", onLeave);

  return () => {
    if (frame) cancelAnimationFrame(frame);
    window.removeEventListener("pointermove", onMove);
    document.removeEventListener("pointerover", onOver);
    document.documentElement.removeEventListener("pointerleave", onLeave);
    document.documentElement.classList.remove("has-cursor");
  };
}
