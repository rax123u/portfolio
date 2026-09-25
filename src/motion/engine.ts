import { createHeroIntro } from "../animations/heroAnimations";
import { createScrollAnimations } from "../animations/scrollAnimations";

export type MotionController = {
  playIntro: () => void;
  destroy: () => void;
};

export function mountMotion(root: HTMLElement): MotionController {
  const hero = createHeroIntro(root);
  const destroyScroll = createScrollAnimations(root);

  return {
    playIntro() {
      hero.play();
    },
    destroy() {
      hero.kill();
      destroyScroll();
      document.documentElement.classList.remove("motion-ok");
    },
  };
}
