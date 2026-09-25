import gsap from "gsap";

export function createHeroIntro(root: ParentNode) {
  const lines = root.querySelectorAll<HTMLElement>("[data-hero-line]");
  const fades = root.querySelectorAll<HTMLElement>("[data-hero-fade]");

  const letterReveal = lines.length > 3;

  gsap.set(lines, { yPercent: letterReveal ? 120 : 110 });
  gsap.set(fades, { autoAlpha: 0, y: 18 });

  const timeline = gsap.timeline({ paused: true });
  timeline
    .to(lines, {
      yPercent: 0,
      duration: letterReveal ? 1.15 : 1.2,
      stagger: letterReveal ? 0.045 : 0.11,
      ease: "power4.out",
    })
    .to(
      fades,
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.06,
        ease: "power3.out",
      },
      0.36,
    );

  return {
    play() {
      timeline.play(0);
    },
    kill() {
      timeline.kill();
    },
  };
}
