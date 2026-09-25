export type LenisApi = {
  scrollTo: (target: string | number, immediate?: boolean) => void;
  stop: () => void;
  start: () => void;
};

let api: LenisApi | null = null;

export function setLenisApi(next: LenisApi | null) {
  api = next;
}

export function getLenisApi() {
  return api;
}

export function scrollToTarget(target: string | number, immediate = false) {
  const lenis = getLenisApi();
  if (lenis) {
    lenis.scrollTo(target, immediate);
    return;
  }

  if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: immediate ? "auto" : "smooth" });
    return;
  }

  document.querySelector(target)?.scrollIntoView({
    behavior: immediate ? "auto" : "smooth",
  });
}
