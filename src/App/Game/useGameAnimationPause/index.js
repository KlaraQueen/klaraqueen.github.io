import { useLayoutEffect } from "react";

export default function useGameAnimationPause(gameRef, paused) {
  useLayoutEffect(() => {
    const game = gameRef.current;

    if (!paused || !game || typeof document.getAnimations !== "function") {
      return;
    }

    const pausedAnimations = document.getAnimations().filter((animation) => {
      const target = animation.effect?.target;

      if (!(target instanceof Element) || animation.playState !== "running") {
        return false;
      }

      return (
        game.contains(target) || Boolean(target.closest("[data-game-flight]"))
      );
    });

    pausedAnimations.forEach((animation) => animation.pause());

    return () => {
      pausedAnimations.forEach((animation) => {
        if (animation.playState === "paused") {
          animation.play();
        }
      });
    };
  }, [gameRef, paused]);
}
