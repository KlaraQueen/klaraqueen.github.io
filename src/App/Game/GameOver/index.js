import { createElement, useRef, useState } from "react";
import { Capacitor } from "@capacitor/core";
import { recoveryCost } from "../useGameState/recoverBelt";
import watchAndroidRewardAd from "./watchAndroidRewardAd";
import {
  GameOverScreen,
  PlayAgainButton,
  ResultCard,
  ResultScore,
  ResultTitle,
} from "./styled";

export default function GameOver({
  round,
  coins,
  score,
  onContinue,
  onReward,
  onTestAd,
  onRestart,
}) {
  const [confirmRestart, setConfirmRestart] = useState(false);
  const [adPending, setAdPending] = useState(false);
  const [adMessage, setAdMessage] = useState("");
  const adInProgress = useRef(false);

  const canContinue = coins >= recoveryCost && Boolean(onContinue);
  const showAndroidAd =
    Capacitor.getPlatform() === "android" && Boolean(onReward);

  async function handleWatchAd() {
    if (adInProgress.current) {
      return;
    }

    adInProgress.current = true;
    setAdPending(true);
    setAdMessage("");

    let earnedReward = false;

    try {
      earnedReward = await watchAndroidRewardAd();

      if (!earnedReward) {
        setAdMessage("Ad closed before the reward.");
      }
    } catch (error) {
      console.error("Rewarded ad failed:", error);
      setAdMessage("Ad unavailable. Try again.");
    } finally {
      adInProgress.current = false;
      setAdPending(false);
    }

    if (earnedReward) {
      onReward();
    }
  }

  const actions = confirmRestart
    ? [
        createElement(
          PlayAgainButton,
          { key: "confirm", type: "button", onClick: onRestart },
          "Start new game",
        ),
        createElement(
          PlayAgainButton,
          {
            key: "back",
            type: "button",
            onClick: () => setConfirmRestart(false),
          },
          "Back",
        ),
      ]
    : [
        createElement(
          PlayAgainButton,
          {
            key: "continue",
            type: "button",
            disabled: adPending || !canContinue,
            onClick: onContinue,
          },
          `Continue · 🪙 ${recoveryCost}`,
        ),
        showAndroidAd
          ? createElement(
              PlayAgainButton,
              {
                key: "watch-ad",
                type: "button",
                disabled: adPending,
                onClick: handleWatchAd,
              },
              adPending ? "Loading ad…" : "Watch ad · Free continue",
            )
          : onTestAd
            ? createElement(
                PlayAgainButton,
                { key: "test-ad", type: "button", onClick: onTestAd },
                "Test ad · Free continue",
              )
            : null,
        createElement(
          PlayAgainButton,
          {
            key: "restart",
            type: "button",
            disabled: adPending,
            onClick: () => setConfirmRestart(true),
          },
          "Play again",
        ),
      ];

  return createElement(
    GameOverScreen,
    { "aria-labelledby": "game-over-title" },
    createElement(
      ResultCard,
      null,
      createElement(
        ResultTitle,
        { id: "game-over-title" },
        confirmRestart ? "Start a new game?" : "Game over",
      ),
      createElement(ResultScore, null, `Level ${round} · Score ${score}`),
      createElement(ResultScore, null, `Wallet · 🪙 ${coins}`),
      adMessage
        ? createElement(ResultScore, { role: "status" }, adMessage)
        : null,
      actions,
    ),
  );
}
