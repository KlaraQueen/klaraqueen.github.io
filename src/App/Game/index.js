import {
  createElement,
  Fragment,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Capacitor } from "@capacitor/core";
import Customer from "./Customer";
import CustomerProgress from "./Customer/Progress";
import Feeder from "./Feeder";
import GameHud from "./GameHud";
import GameOver from "./GameOver";
import watchAndroidRewardAd from "./GameOver/watchAndroidRewardAd";
import { FeederCounter, GameLayout } from "./Layout/styled";
import MainBelt from "./MainBelt";
import PlateDelivery from "./PlateDelivery";
import Tutorial from "./Tutorial";
import useTutorial from "./Tutorial/useTutorial";
import {
  CustomerBoard,
  PauseDialog,
  PauseMenuButton,
  PauseMenuTitle,
} from "./styled";
import useBestScore from "./useBestScore";
import useGameAnimationPause from "./useGameAnimationPause";
import useGameState from "./useGameState";
import { hammerCost } from "./useGameState/gameReducer";

const testAdsEnabled = process.env.NODE_ENV === "development";
const bonusCoins = 100;

export default function Game() {
  const gameRef = useRef(null);
  const pauseDialogRef = useRef(null);
  const rewardAdInProgress = useRef(false);

  const [hammerRound, setHammerRound] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmMenuRestart, setConfirmMenuRestart] = useState(false);
  const [rewardAdBusy, setRewardAdBusy] = useState(false);
  const [rewardAdMessage, setRewardAdMessage] = useState("");

  const paused = hammerRound !== null || menuOpen;

  const {
    round,
    coins,
    score,
    belt,
    beltStep,
    loadingQueue = [],
    moveIntervalMs,
    orders,
    feeders,
    deliveries = [],
    servedCustomers,
    totalCustomers,
    gameOver,
    finishDelivery,
    loadFromFeeder,
    useHammerOnSlot: applyHammerToSlot,
    continueWithCoins,
    continueAfterReward,
    rewardCoins,
    restartRound,
  } = useGameState(paused);

  useGameAnimationPause(gameRef, paused);

  useLayoutEffect(() => {
    const dialog = pauseDialogRef.current;

    if (menuOpen && !dialog.open) {
      dialog.showModal();
    }

    if (!menuOpen && dialog.open) {
      dialog.close();
    }
  }, [menuOpen]);

  const bestScore = useBestScore(score);
  const hintedFeederIndex = useTutorial({ belt, deliveries, feeders, orders });
  const hammerActive =
    !gameOver && hammerRound === round && coins >= hammerCost;
  const showFeederHint =
    !gameOver && loadingQueue.length === 0 && hintedFeederIndex !== -1;

  async function handleRewardCoins() {
    if (rewardAdInProgress.current) {
      return;
    }

    if (Capacitor.getPlatform() !== "android") {
      setRewardAdMessage("Video rewards are available in the Android app.");
      return;
    }

    rewardAdInProgress.current = true;
    setRewardAdBusy(true);
    setRewardAdMessage("Loading ad…");

    try {
      const earnedReward = await watchAndroidRewardAd();

      if (earnedReward) {
        rewardCoins(bonusCoins);
        setRewardAdMessage(`+${bonusCoins} coins added to your wallet.`);
      } else {
        setRewardAdMessage("Ad closed before the reward.");
      }
    } catch (error) {
      console.error("Rewarded coin boost failed:", error);

      const code = error?.code;
      setRewardAdMessage(
        code == null ? "Ad unavailable." : `Ad unavailable (code ${code}).`,
      );
    } finally {
      rewardAdInProgress.current = false;
      setRewardAdBusy(false);
    }
  }

  function openPauseMenu() {
    setConfirmMenuRestart(false);
    setMenuOpen(true);
  }

  function closePauseMenu() {
    setConfirmMenuRestart(false);
    setMenuOpen(false);
  }

  function toggleHammer() {
    setHammerRound(hammerActive ? null : round);
  }

  function selectHammerSlot(slotIndex) {
    if (!hammerActive || !belt[slotIndex]) {
      return;
    }

    applyHammerToSlot(slotIndex);
    setHammerRound(null);
  }

  function handleContinue() {
    setHammerRound(null);
    continueWithCoins();
  }

  function handleReward() {
    setHammerRound(null);
    continueAfterReward();
  }

  function handleRestart() {
    closePauseMenu();
    setHammerRound(null);
    setRewardAdMessage("");
    restartRound();
  }

  return createElement(
    Fragment,
    null,
    createElement(
      GameLayout,
      {
        ref: gameRef,
        inert: gameOver ? true : undefined,
        "aria-label": "Sushi Conveyor",
        "data-sushi-game": true,
      },
      createElement(GameHud, {
        round,
        coins,
        bestScore,
        runCoins: score,
        hammerActive,
        onHammerToggle: toggleHammer,
        onRewardCoins: handleRewardCoins,
        rewardAdBusy,
        rewardAdMessage,
        onOpenMenu: openPauseMenu,
        menuOpen,
      }),
      createElement(
        CustomerBoard,
        null,
        createElement(MainBelt, {
          sushiBySlot: belt,
          beltStep,
          loadingQueue,
          moveIntervalMs,
          hammerActive,
          onHammerSlotSelect: selectHammerSlot,
        }),
        orders.map(({ slot, type, quantity, portraitIndex, departing }) =>
          createElement(Customer, {
            key: slot,
            slot,
            portraitIndex,
            type,
            quantity,
            departing,
          }),
        ),
      ),
      createElement(
        Tutorial,
        { showHint: showFeederHint },
        createElement(CustomerProgress, { servedCustomers, totalCustomers }),
      ),
      createElement(
        FeederCounter,
        null,
        feeders.map((sushiTypes, feederIndex) =>
          createElement(Feeder, {
            key: feederIndex,
            sushiTypes,
            showTutorialHint:
              showFeederHint && feederIndex === hintedFeederIndex,
            onLoad: () => loadFromFeeder(feederIndex),
          }),
        ),
      ),
      gameOver
        ? null
        : deliveries.map(
            ({ id, type, fromSlot, cornerSlot, moveMs, travelMs }) =>
              createElement(PlateDelivery, {
                key: id,
                id,
                gameRef,
                type,
                fromSlot,
                cornerSlot,
                moveMs,
                travelMs,
                paused,
                onArrive: finishDelivery,
              }),
          ),
    ),
    createElement(
      PauseDialog,
      {
        id: "game-pause-menu",
        ref: pauseDialogRef,
        "aria-labelledby": "game-pause-title",
        onCancel: (event) => {
          event.preventDefault();
          closePauseMenu();
        },
      },
      createElement(
        PauseMenuTitle,
        { id: "game-pause-title" },
        confirmMenuRestart ? "Start a new game?" : "Game paused",
      ),
      createElement(
        PauseMenuButton,
        {
          type: "button",
          onClick: confirmMenuRestart
            ? () => setConfirmMenuRestart(false)
            : closePauseMenu,
        },
        confirmMenuRestart ? "Back" : "Continue",
      ),
      createElement(
        PauseMenuButton,
        {
          type: "button",
          onClick: confirmMenuRestart
            ? handleRestart
            : () => setConfirmMenuRestart(true),
        },
        confirmMenuRestart ? "Start new game" : "Play again",
      ),
    ),
    gameOver
      ? createElement(GameOver, {
          round,
          coins,
          score,
          onContinue: handleContinue,
          onReward: handleReward,
          onTestAd: testAdsEnabled ? handleReward : undefined,
          onRestart: handleRestart,
        })
      : null,
  );
}
