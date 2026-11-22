const walletStorageKey = "sushi-conveyor.coin-wallet";

export function readCoinWallet() {
  try {
    const savedCoins = Number(window.localStorage.getItem(walletStorageKey));

    return Number.isSafeInteger(savedCoins) && savedCoins >= 0 ? savedCoins : 0;
  } catch {
    return 0;
  }
}

export function saveCoinWallet(coins) {
  try {
    window.localStorage.setItem(walletStorageKey, String(coins));
  } catch {}
}
