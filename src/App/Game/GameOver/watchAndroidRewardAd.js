import { AdMob, RewardAdPluginEvents } from "@capacitor-community/admob";

const productionRewardAdId = "ca-app-pub-4015948856765595/7636445189";
const testRewardAdId = "ca-app-pub-3940256099942544/5224354917";

const useTestAds = process.env.REACT_APP_ADMOB_USE_TEST_IDS === "true";

const rewardAdId =
  process.env.REACT_APP_ADMOB_REWARD_AD_ID ||
  (useTestAds ? testRewardAdId : productionRewardAdId);

let initialized = false;

export default async function watchAndroidRewardAd() {
  const listeners = [];
  let earnedReward = false;
  let finishAd;
  let stage = "initialize";

  const dismissed = new Promise((resolve) => {
    finishAd = resolve;
  });

  console.info(
    `[AdMob] Rewarded ad requested. Test unit: ${rewardAdId === testRewardAdId}`,
  );

  try {
    if (!initialized) {
      await AdMob.initialize();
      initialized = true;
      console.info("[AdMob] Initialized");
    }

    stage = "load";
    await AdMob.prepareRewardVideoAd({ adId: rewardAdId });
    console.info("[AdMob] Rewarded ad loaded");

    stage = "add listeners";
    listeners.push(
      await AdMob.addListener(RewardAdPluginEvents.Rewarded, () => {
        earnedReward = true;
        console.info("[AdMob] Reward earned");
      }),
    );

    listeners.push(
      await AdMob.addListener(RewardAdPluginEvents.Dismissed, () => {
        console.info(`[AdMob] Ad closed. Reward earned: ${earnedReward}`);
        finishAd(earnedReward);
      }),
    );

    stage = "show";
    console.info("[AdMob] Showing rewarded ad");

    const showResult = AdMob.showRewardVideoAd().then(
      () => dismissed,
      (error) => {
        const message = String(error?.message ?? error).toLowerCase();

        if (message.includes("dismiss")) {
          console.info("[AdMob] Ad dismissed without a reward");
          return false;
        }

        throw error;
      },
    );

    return await Promise.race([dismissed, showResult]);
  } catch (error) {
    console.error(
      `[AdMob] Failed at ${stage}. Code: ${error?.code ?? "unknown"}. ` +
        `Message: ${error?.message ?? String(error)}`,
    );
    throw error;
  } finally {
    await Promise.allSettled(
      listeners.map(async (listener) => listener.remove()),
    );
  }
}
