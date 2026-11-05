import type { FeedItem, KindMeta, PlatformId, PlatformMeta, SourceProfile } from "./types";

export const platforms: PlatformMeta[] = [
  { id: "x", name: "X", short: "X", color: "#d7dbe3" },
  { id: "binance", name: "币安广场", short: "广场", color: "#f0b90b" },
  { id: "telegram", name: "Telegram", short: "TG", color: "#3aa0e8" },
  { id: "truth", name: "Truth Social", short: "Truth", color: "#7c8cff" },
  { id: "wire", name: "电讯", short: "电讯", color: "#3ecfb2" },
];

export const kinds: KindMeta[] = [
  { id: "flash", name: "快讯" },
  { id: "opinion", name: "观点" },
  { id: "announce", name: "公告" },
  { id: "thread", name: "长文" },
];

export const sources: SourceProfile[] = [
  { handle: "unionwire", author: "联讯快讯", platform: "wire", note: "滚动短讯，只报事实" },
  { handle: "northwindow", author: "北窗", platform: "x", note: "协议与市场结构" },
  { handle: "onchainnote", author: "链上便签", platform: "x", note: "地址与资金流备忘" },
  { handle: "squarewatch", author: "广场观察", platform: "binance", note: "交易者讨论摘录" },
  { handle: "desknote", author: "柜台笔记", platform: "binance", note: "上币与产品公告" },
  { handle: "tgroom", author: "电报室", platform: "telegram", note: "群聊里反复出现的话题" },
  { handle: "nightchannel", author: "夜航频道", platform: "telegram", note: "亚太时段摘要" },
  { handle: "truthdesk", author: "真话台", platform: "truth", note: "政策与公开表态" },
];

const bodies: Omit<FeedItem, "id" | "ts">[] = [
  {
    platform: "wire",
    kind: "flash",
    author: "联讯快讯",
    handle: "unionwire",
    body: "演示：某二层网络将在下周窗口升级证明器，官方说明称不影响现有充值地址。",
    tags: ["L2", "升级"],
  },
  {
    platform: "x",
    kind: "opinion",
    author: "北窗",
    handle: "northwindow",
    body: "演示：现货成交恢复得比合约慢。看资讯时先分清是资金回来了，还是只是话题热度回来了。",
    tags: ["市场", "成交"],
  },
  {
    platform: "binance",
    kind: "announce",
    author: "柜台笔记",
    handle: "desknote",
    body: "演示：广场置顶了一则钱包维护通知，预计 40 分钟，期间站内划转暂停，链上充值照常。",
    tags: ["钱包", "维护"],
  },
  {
    platform: "telegram",
    kind: "flash",
    author: "电报室",
    handle: "tgroom",
    body: "演示：三个常用群同时在转同一份审计摘要，结论是权限合约已换成多签，旧入口废弃。",
    tags: ["审计", "多签"],
  },
  {
    platform: "truth",
    kind: "opinion",
    author: "真话台",
    handle: "truthdesk",
    body: "演示：公开评论把稳定币储备披露说成「下周给时间表」，还没有对应的正式文件。",
    tags: ["稳定币", "政策"],
  },
  {
    platform: "x",
    kind: "thread",
    author: "链上便签",
    handle: "onchainnote",
    body: "演示：一条地址今天向三家交易所分批转入同一枚代币。便签只记录路径，不判断意图。",
    tags: ["地址", "转入"],
  },
  {
    platform: "binance",
    kind: "opinion",
    author: "广场观察",
    handle: "squarewatch",
    body: "演示：广场热帖集中在「新上的积分活动能不能当收益」。多数回复把它当成营销，而不是产品。",
    tags: ["积分", "活动"],
  },
  {
    platform: "wire",
    kind: "announce",
    author: "联讯快讯",
    handle: "unionwire",
    body: "演示：某公链浏览器更新了内部交易展示，历史页面的跳转链接保持不变。",
    tags: ["浏览器", "产品"],
  },
  {
    platform: "telegram",
    kind: "opinion",
    author: "夜航频道",
    handle: "nightchannel",
    body: "演示：亚太早盘摘要只有两件事被重复提到：一是费率调整，二是某跨链桥的延迟告警已解除。",
    tags: ["费率", "跨链"],
  },
  {
    platform: "x",
    kind: "flash",
    author: "北窗",
    handle: "northwindow",
    body: "演示：核心开发者会议纪要放出，下个硬分叉仍把重点放在状态增长，没有新的发行参数。",
    tags: ["会议", "分叉"],
  },
  {
    platform: "truth",
    kind: "flash",
    author: "真话台",
    handle: "truthdesk",
    body: "演示：一条短帖提到「对交易所的额外披露」，没有点名对象，也没有附法规编号。",
    tags: ["披露", "交易所"],
  },
  {
    platform: "binance",
    kind: "flash",
    author: "柜台笔记",
    handle: "desknote",
    body: "演示：新的杠杆代币说明页补了一句，极端行情下再平衡可能比平常更频繁。",
    tags: ["杠杆", "说明"],
  },
  {
    platform: "telegram",
    kind: "thread",
    author: "电报室",
    handle: "tgroom",
    body: "演示：有人把同一份空投规则贴进五个群。规则文本一致，领取时间都不相同，以项目页面为准。",
    tags: ["空投", "规则"],
  },
  {
    platform: "wire",
    kind: "opinion",
    author: "联讯快讯",
    handle: "unionwire",
    body: "演示：今日编辑备注——同一事件在 X 和广场上的标题差了两个小时，时间以最早的公告页为准。",
    tags: ["校对", "时间"],
  },
  {
    platform: "x",
    kind: "announce",
    author: "链上便签",
    handle: "onchainnote",
    body: "演示：基金会地址公布了本季拨款名单，名单链接在个人简介，帖子正文只列了三个方向。",
    tags: ["拨款", "基金会"],
  },
  {
    platform: "binance",
    kind: "thread",
    author: "广场观察",
    handle: "squarewatch",
    body: "演示：长帖在比较两条 L2 的提款等待时间。作者用的是自己的两笔记录，样本很小。",
    tags: ["提款", "L2"],
  },
];

const incoming: Omit<FeedItem, "id" | "ts">[] = [
  {
    platform: "wire",
    kind: "flash",
    author: "联讯快讯",
    handle: "unionwire",
    body: "演示：数据站更新了昨日稳定币净流入，修订幅度不到百分之一，方向没有变。",
    tags: ["稳定币", "数据"],
  },
  {
    platform: "telegram",
    kind: "flash",
    author: "夜航频道",
    handle: "nightchannel",
    body: "演示：频道置顶换成了节点运营商的短讯，称同步延迟已回到平常水平。",
    tags: ["节点", "延迟"],
  },
  {
    platform: "x",
    kind: "opinion",
    author: "北窗",
    handle: "northwindow",
    body: "演示：别把转发数当成确认。这条线程底下的原始链接，比转发文案少了两个限定条件。",
    tags: ["核实", "转发"],
  },
  {
    platform: "binance",
    kind: "announce",
    author: "柜台笔记",
    handle: "desknote",
    body: "演示：活动页改了结算币种，仍是同一期活动，只是奖励改记到另一枚平台代币。",
    tags: ["活动", "奖励"],
  },
  {
    platform: "truth",
    kind: "opinion",
    author: "真话台",
    handle: "truthdesk",
    body: "演示：下午的表态和早上那条用了不同措辞，正式口径仍看机构网站，不看社交短帖。",
    tags: ["口径", "政策"],
  },
  {
    platform: "x",
    kind: "flash",
    author: "链上便签",
    handle: "onchainnote",
    body: "演示：刚记下一次跨链到账，从发出到对端可见大约六分钟，和昨天的样本接近。",
    tags: ["跨链", "到账"],
  },
];

let seq = 0;

function stamp(seed: Omit<FeedItem, "id" | "ts">, ts: number): FeedItem {
  seq += 1;
  return { ...seed, id: `f${seq}`, ts };
}

export function createSeed(now = Date.now()): FeedItem[] {
  return bodies
    .map((item, index) => stamp(item, now - (index + 1) * 1000 * 60 * 7))
    .sort((a, b) => b.ts - a.ts);
}

let cursor = 0;

export function nextItem(now = Date.now()): FeedItem {
  const seed = incoming[cursor % incoming.length];
  cursor += 1;
  return stamp(seed, now);
}

export function platformOf(id: PlatformId): PlatformMeta {
  return platforms.find((item) => item.id === id) ?? platforms[0];
}

export function kindName(id: FeedItem["kind"]): string {
  return kinds.find((item) => item.id === id)?.name ?? id;
}

export function relTime(ts: number, now: number): string {
  const delta = Math.max(0, now - ts);
  const sec = Math.floor(delta / 1000);
  if (sec < 10) return "刚刚";
  if (sec < 60) return `${sec}秒前`;
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}分钟前`;
  const hour = Math.floor(min / 60);
  if (hour < 24) return `${hour}小时前`;
  return `${Math.floor(hour / 24)}天前`;
}
