import { createElement, Fragment, useRef, useState } from "react";
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
import { CustomerBoard } from "./styled";
import useBestScore from "./useBestScore";
import useGameAnimationPause from "./useGameAnimationPause";
import useGameState from "./useGameState";
import { hammerCost } from "./useGameState/gameReducer";

const testAdsEnabled = process.env.NODE_ENV === "development";

export default function Game() {
  const gameRef = useRef(null);
  const [hammerRound, setHammerRound] = useState(null);
  const [rewardAdBusy, setRewardAdBusy] = useState(false);
  const paused = hammerRound !== null;

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

  const bestScore = useBestScore(score);
  const hintedFeederIndex = useTutorial({ belt, deliveries, feeders, orders });
  const hammerActive =
    !gameOver && hammerRound === round && coins >= hammerCost;
  const showFeederHint =
    !gameOver && loadingQueue.length === 0 && hintedFeederIndex !== -1;

  async function handleRewardCoins() {
    if (rewardAdBusy) {
      return;
    }

    setRewardAdBusy(true);

    try {
      const earnedReward = await watchAndroidRewardAd();

      if (earnedReward) {
        rewardCoins(100);
      }
    } catch (error) {
      console.error("Rewarded coin boost failed:", error);
    } finally {
      setRewardAdBusy(false);
    }
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
    setHammerRound(null);
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
