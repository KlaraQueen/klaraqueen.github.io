import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useReducer,
  useRef,
} from "react";
import { hasLevel } from "../Level";
import { readCoinWallet, saveCoinWallet } from "./coinWallet";
import createRoundState from "./createRoundState";
import gameReducer from "./gameReducer";

const normalMoveIntervalMs = 540;
const fastMoveIntervalMs = 180;
const savedGameProgressStorageKey = "sushi-conveyor.saved-game-progress";

function readSavedProgress() {
  try {
    const savedProgress = window.localStorage.getItem(savedGameProgressStorageKey);

    if (!savedProgress) {
      return { round: 1, coins: readCoinWallet(), score: 0 };
    }

    const parsed = JSON.parse(savedProgress);
    const round = Number(parsed.round);
    const coins = Number(parsed.coins);
    const score = Number(parsed.score);

    return {
      round: Number.isSafeInteger(round) && round >= 1 ? round : 1,
      coins: Number.isFinite(coins) && coins >= 0 ? coins : readCoinWallet(),
      score: Number.isFinite(score) && score >= 0 ? score : 0,
    };
  } catch {
    return { round: 1, coins: readCoinWallet(), score: 0 };
  }
}

function saveProgress(round, coins, score) {
  try {
    window.localStorage.setItem(
      savedGameProgressStorageKey,
      JSON.stringify({ round, coins, score }),
    );
  } catch {}
}

function createSavedGameState() {
  const { round, coins, score } = readSavedProgress();
  return createRoundState(round, coins, score);
}

export default function useGameState(paused = false) {
  const [state, dispatch] = useReducer(gameReducer, undefined, createSavedGameState);
  const pauseStartedAt = useRef(null);
  const totalPausedMs = useRef(0);

  const {
    round,
    coins,
    score,
    orders,
    waitingOrders,
    totalCustomers,
    feeders,
  } = state;
  const gameOver = Boolean(state.gameOver);
  const clockPaused = paused || gameOver;

  const activeCustomers = orders.filter(({ quantity }) => quantity > 0).length;
  const servedCustomers =
    totalCustomers - activeCustomers - waitingOrders.length;

  const roundComplete =
    servedCustomers === totalCustomers &&
    orders.every(({ departing }) => !departing);

  const feedersEmpty = feeders.every((queue) => queue.length === 0);
  const moveIntervalMs = feedersEmpty
    ? fastMoveIntervalMs
    : normalMoveIntervalMs;

  useLayoutEffect(() => {
    if (clockPaused) {
      pauseStartedAt.current = performance.now();
      return;
    }

    if (pauseStartedAt.current !== null) {
      totalPausedMs.current += performance.now() - pauseStartedAt.current;
      pauseStartedAt.current = null;
    }
  }, [clockPaused]);

  const readGameTime = useCallback(() => {
    const now = pauseStartedAt.current ?? performance.now();
    return now - totalPausedMs.current;
  }, []);

  useEffect(() => {
    saveCoinWallet(coins);
  }, [coins]);

  useEffect(() => {
    saveProgress(round, coins, score);
  }, [coins, round, score]);

  useEffect(() => {
    if (clockPaused || roundComplete) {
      return;
    }

    const timerId = setInterval(() => {
      dispatch({
        type: "move",
        elapsedMs: moveIntervalMs,
        now: readGameTime(),
      });
    }, moveIntervalMs);

    return () => clearInterval(timerId);
  }, [clockPaused, moveIntervalMs, readGameTime, roundComplete, round]);

  useEffect(() => {
    const nextRound = round + 1;

    if (!clockPaused && roundComplete && hasLevel(nextRound)) {
      dispatch({
        type: "nextRound",
        initialState: createRoundState(nextRound),
      });
    }
  }, [clockPaused, roundComplete, round]);

  const finishDelivery = useCallback(
    (deliveryId) => {
      dispatch({
        type: "deliveryArrived",
        deliveryId,
        now: readGameTime(),
      });
    },
    [readGameTime],
  );

  function loadFromFeeder(feederIndex) {
    if (!clockPaused) {
      dispatch({ type: "load", feederIndex });
    }
  }

  function useHammerOnSlot(slotIndex) {
    dispatch({ type: "useHammer", slotIndex });
  }

  function continueWithCoins() {
    dispatch({ type: "recoverWithCoins" });
  }

  function continueAfterReward() {
    dispatch({ type: "recoverAfterReward" });
  }

  function rewardCoins(amount) {
    dispatch({ type: "grantRewardCoins", amount });
  }

  function restartRound() {
    dispatch({ type: "restart", initialState: createRoundState(1) });
  }

  return {
    ...state,
    gameOver,
    servedCustomers,
    moveIntervalMs,
    finishDelivery,
    loadFromFeeder,
    useHammerOnSlot,
    continueWithCoins,
    continueAfterReward,
    rewardCoins,
    restartRound,
  };
}
