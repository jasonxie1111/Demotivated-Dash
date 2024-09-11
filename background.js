// 存儲惡毒內容的數組
const inspirations = [
  { type: "insult", content: "你永遠不會成功，因為你從來不夠努力。" },
  { type: "insult", content: "不管你多努力，你的境遇只會變得更糟。" },
  { type: "insult", content: "無論如何掙扎，終點依然是失敗。" },
  { type: "insult", content: "你的生活毫無價值，你珍惜的每一刻都只是浪費時間。" },
  { type: "insult", content: "不管你怎麼看待世界，世界對你毫不在乎。" },
  { type: "insult", content: "逆境只是讓你墮落的原因，而不是你的成長機會。" },
  { type: "insult", content: "你永遠不會克服困難，只會不斷逃避現實。" },
  { type: "insult", content: "幸福？那只是一個你永遠無法達到的幻覺。" },
  { type: "insult", content: "每次跌倒，你只會更難再站起來。" },
  { type: "insult", content: "命運不會讓你掌握，因為它早已注定你的失敗。" },
  { type: "insult", content: "即使你勇敢，恐懼最終還是會吞噬你。" },
  { type: "insult", content: "你永遠不會完美，因為你甚至不會接納自己。" },
  { type: "insult", content: "你以為你在進步，但實際上你只是在原地踏步。" },
  { type: "insult", content: "所有的努力都是徒勞的，沒有人會在乎你做了什麼。" },
  { type: "insult", content: "你今天的成就，未來會被人遺忘。" },
  { type: "insult", content: "別再奢望改變了，因為你的未來已經注定失敗。" },
  { type: "insult", content: "你所謂的夢想，只是個遙不可及的幻想。" },
  { type: "insult", content: "無論你怎麼努力，還是永遠不會足夠好。" },
  { type: "insult", content: "現實是殘酷的，而你就是它的犧牲品。" },
  { type: "insult", content: "不要再假裝你可以成功了，因為你注定無法做到。" },
  { type: "insult", content: "即使你不願承認，真相是：你正在失敗的路上。" },
  { type: "insult", content: "你的希望只會讓你更失望。" },
  { type: "insult", content: "努力不會改變什麼，因為你永遠無法超越現狀。" },
  { type: "insult", content: "別自欺欺人了，沒有人會相信你能成功。" },
  { type: "insult", content: "你越努力，失敗得越徹底。" },
  { type: "insult", content: "你根本配不上你夢想的生活。" },
  { type: "insult", content: "你所做的一切都只會讓你更接近失敗。" },
  // ... 添加更多惡毒的言語
];

// 監聽新標籤頁的創建
chrome.tabs.onCreated.addListener((tab) => {
  console.log("New tab created:", tab.pendingUrl);
  if (tab.pendingUrl === "chrome://newtab/") {
    console.log("Showing inspiration for new tab");
    showInspiration();
  }
});

function showInspiration() {
  console.log("showInspiration function called");
  const inspiration = inspirations[Math.floor(Math.random() * inspirations.length)];
  
  console.log("Selected inspiration:", inspiration);

  chrome.notifications.create({
    type: "basic",
    iconUrl: "icon.png",
    title: "激勵小語",
    message: inspiration.content
  }, (notificationId) => {
    if (chrome.runtime.lastError) {
      console.error("Notification error:", chrome.runtime.lastError);
    } else {
      console.log("Notification created with ID:", notificationId);
    }
  });
}

// 添加一個測試函數
chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
  checkNotificationPermission();
});

// 在文件頂部添加這個函數
function checkNotificationPermission() {
  chrome.notifications.getPermissionLevel((level) => {
    console.log("Notification permission level:", level);
    if (level === 'granted') {
      showInspiration();
    } else {
      console.log("Notifications are not enabled for this extension");
    }
  });
}
