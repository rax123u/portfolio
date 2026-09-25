import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const REVEAL = { toggleActions: "play none none none" } as const;

/** Image inside a panel drifts toward the pointer (desktop only). */
function bindPan(root: ParentNode) {
  const stops: Array<() => void> = [];

  root.querySelectorAll<HTMLElement>("[data-pan]").forEach((panel) => {
    const image = panel.querySelector<HTMLElement>("[data-pan-target]") ?? panel.querySelector("img");
    if (!image) return;

    let rx = 0;
    let ry = 0;
    let tx = 0;
    let ty = 0;
    let frame = 0;

    const loop = () => {
      tx += (rx - tx) * 0.14;
      ty += (ry - ty) * 0.14;
      image.style.translate = `${tx.toFixed(2)}px ${ty.toFixed(2)}px`;
      if (Math.abs(rx - tx) > 0.2 || Math.abs(ry - ty) > 0.2) {
        frame = requestAnimationFrame(loop);
      } else {
        frame = 0;
      }
    };

    const kick = () => {
      if (!frame) frame = requestAnimationFrame(loop);
    };

    const onMove = (event: PointerEvent) => {
      const rect = panel.getBoundingClientRect();
      rx = ((event.clientX - rect.left) / rect.width - 0.5) * 22;
      ry = ((event.clientY - rect.top) / rect.height - 0.5) * 14;
      kick();
    };

    const onLeave = () => {
      rx = 0;
      ry = 0;
      kick();
    };

    panel.addEventListener("pointermove", onMove);
    panel.addEventListener("pointerleave", onLeave);

    stops.push(() => {
      panel.removeEventListener("pointermove", onMove);
      panel.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
      image.style.translate = "";
    });
  });

  return () => stops.forEach((stop) => stop());
}

/** Sections declare data-theme; the document picks up the theme of the section at the viewport centre. */
function bindThemes(root: HTMLElement) {
  const html = document.documentElement;
  const sections = [...root.querySelectorAll<HTMLElement>("[data-theme]")];

  const triggers = sections.map((section) =>
    ScrollTrigger.create({
      trigger: section,
      start: "top 50%",
      end: "bottom 50%",
      onToggle: (self) => {
        if (self.isActive) html.dataset.theme = section.dataset.theme ?? "dark";
      },
    }),
  );

  const current = triggers.find((trigger) => trigger.isActive);
  if (current && current.trigger instanceof HTMLElement) {
    html.dataset.theme = current.trigger.dataset.theme ?? "dark";
  }

  return () => {
    triggers.forEach((trigger) => trigger.kill());
    html.dataset.theme = "dark";
  };
}

export function createScrollAnimations(root: HTMLElement) {
  ScrollTrigger.config({ ignoreMobileResize: true });

  const unbindThemes = bindThemes(root);

  root.querySelectorAll<HTMLElement>("[data-line]").forEach((line) => {
    gsap.from(line, {
      yPercent: 115,
      duration: 1.1,
      ease: "power4.out",
      scrollTrigger: { trigger: line, start: "top 92%", ...REVEAL },
    });
  });

  root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((item) => {
    gsap.from(item, {
      y: 34,
      autoAlpha: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: { trigger: item, start: "top 88%", ...REVEAL },
    });
  });

  root.querySelectorAll<HTMLElement>("[data-stagger]").forEach((group) => {
    gsap.from(Array.from(group.children), {
      y: 28,
      autoAlpha: 0,
      duration: 0.9,
      stagger: 0.06,
      ease: "power3.out",
      scrollTrigger: { trigger: group, start: "top 86%", ...REVEAL },
    });
  });

  root.querySelectorAll<HTMLElement>("[data-mask]").forEach((mask) => {
    const image = mask.querySelector("img");
    const timeline = gsap.timeline({
      scrollTrigger: { trigger: mask, start: "top 84%", ...REVEAL },
    });
    timeline.fromTo(
      mask,
      { clipPath: "inset(14% 10% 14% 10%)" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: 1.25, ease: "power4.inOut" },
      0,
    );
    if (image && !image.hasAttribute("data-zoom")) {
      timeline.fromTo(image, { scale: 1.18 }, { scale: 1.06, duration: 1.5, ease: "power3.out" }, 0);
    }
  });

  root.querySelectorAll<HTMLElement>("[data-chars]").forEach((group) => {
    const chars = group.querySelectorAll<HTMLElement>("[data-char]");
    if (!chars.length) return;
    gsap.from(chars, {
      yPercent: 115,
      duration: 1.1,
      stagger: 0.035,
      ease: "power4.out",
      scrollTrigger: { trigger: group, start: "top 88%", ...REVEAL },
    });
  });

  root.querySelectorAll<HTMLElement>("[data-draw]").forEach((item) => {
    gsap.from(item, {
      scaleY: 0,
      transformOrigin: "top center",
      duration: 1.2,
      ease: "power3.inOut",
      scrollTrigger: { trigger: item.parentElement ?? item, start: "top 88%", ...REVEAL },
    });
  });

  root.querySelectorAll<HTMLElement>("[data-draw-x]").forEach((item) => {
    gsap.from(item, {
      scaleX: 0,
      transformOrigin: "left center",
      duration: 1.2,
      ease: "power3.inOut",
      scrollTrigger: { trigger: item.parentElement ?? item, start: "top 90%", ...REVEAL },
    });
  });

  /* Words brighten one after another as the block moves up the viewport. */
  root.querySelectorAll<HTMLElement>("[data-words]").forEach((block) => {
    const words = block.querySelectorAll<HTMLElement>("[data-word]");
    if (!words.length) return;
    gsap.fromTo(
      words,
      { opacity: 0.12 },
      {
        opacity: 1,
        duration: 1,
        stagger: 0.14,
        ease: "none",
        scrollTrigger: { trigger: block, start: "top 78%", end: "bottom 42%", scrub: 0.4 },
      },
    );
  });

  /* Stacked case studies: the panel underneath recedes as the next one slides over it. */
  root.querySelectorAll<HTMLElement>("[data-stack]").forEach((stack) => {
    const panels = [...stack.querySelectorAll<HTMLElement>("[data-panel]")];
    panels.forEach((panel, index) => {
      const next = panels[index + 1];
      if (!next) return;
      const inner = panel.querySelector<HTMLElement>("[data-panel-inner]") ?? panel;
      gsap.to(inner, {
        scale: 0.9,
        yPercent: -8,
        autoAlpha: 0.2,
        ease: "none",
        scrollTrigger: { trigger: next, start: "top bottom", end: "top top", scrub: true },
      });
    });
  });

  /* A wrapper that lifts and fades while its section scrolls away. */
  root.querySelectorAll<HTMLElement>("[data-exit]").forEach((item) => {
    const section = item.closest("section") ?? item;
    gsap.to(item, {
      yPercent: -28,
      autoAlpha: 0,
      ease: "none",
      scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: 0.5 },
    });
  });

  root.querySelectorAll<HTMLElement>("[data-zoom]").forEach((item) => {
    const scope = item.closest<HTMLElement>("[data-panel]") ?? item.closest("section") ?? item;
    gsap.fromTo(
      item,
      { scale: 1.22 },
      {
        scale: 1,
        ease: "none",
        scrollTrigger: { trigger: scope, start: "top bottom", end: "top top", scrub: 0.6 },
      },
    );
  });

  const mm = gsap.matchMedia();

  mm.add("(min-width: 1024px) and (pointer: fine)", () => {
    const removePan = bindPan(root);

    root.querySelectorAll<HTMLElement>("[data-parallax]").forEach((item) => {
      const amount = Number(item.dataset.parallax || 6);
      const scope = item.closest<HTMLElement>("[data-panel]") ?? item.closest("section, footer") ?? item;
      gsap.fromTo(
        item,
        { yPercent: -amount },
        {
          yPercent: amount,
          ease: "none",
          scrollTrigger: { trigger: scope, start: "top bottom", end: "bottom top", scrub: 0.6 },
        },
      );
    });

    root.querySelectorAll<HTMLElement>("[data-drift]").forEach((item) => {
      const amount = Number(item.dataset.drift || 8);
      const section = item.closest("section, footer");
      const pinned = section?.id === "top";
      gsap.fromTo(
        item,
        { xPercent: 0 },
        {
          xPercent: amount,
          ease: "none",
          scrollTrigger: {
            trigger: section ?? item,
            start: pinned ? "top top" : "top bottom",
            end: "bottom top",
            scrub: 0.7,
          },
        },
      );
    });

    return () => removePan();
  });

  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
  });

  return () => {
    mm.revert();
    unbindThemes();
    [...ScrollTrigger.getAll()].forEach((trigger) => {
      const element = trigger.trigger;
      if (element instanceof Element && root.contains(element)) trigger.kill();
    });
  };
}
