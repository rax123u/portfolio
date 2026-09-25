export type WipePhase = "idle" | "in" | "out";

export function focusSection(id: string) {
  const section = document.getElementById(id);
  if (!section) return;
  section.focus({ preventScroll: true });
}
