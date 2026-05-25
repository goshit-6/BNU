# 北京师范大学系统科学学院 2026 年优秀大学生夏令营 H5 Demo

本项目是手机端优先的互动招生海报预览版。页面内容依据学院官网公开通知与项目提供的官网信息整理文档制作，当前用于视觉、交互和真机体验确认。

## 已实现内容

- 首屏活动信息、申请截止倒计时和报名入口
- 学院亮点、五个研究方向展开卡片、活动时间轴
- 申请条件、材料清单、申请提示、费用及评优信息
- 官方通知、报名系统、项目导师官网跳转
- “查看更多信息”弹窗、复制邮箱、返回顶部
- 配乐控制占位与学院官方微信公众号二维码展示
- 已使用学院院徽，并采用深绿色主题与低对比校园照片背景
- `demo-mobile-preview.png` 为当前 375px 手机视口的首屏验收截图
- 手机宽度下启用整屏分节滚动，上滑后自动吸附至下一板块

## 本地预览

项目为原生 HTML/CSS/JavaScript，不需要构建步骤。

1. 在 VS Code 中打开本目录。
2. 使用 Live Server 打开 `index.html`；或直接在浏览器打开文件进行基础查看。
3. 使用浏览器手机模拟模式和 Android/iPhone 真机测试交互效果。

## 修改文字内容

可变文字优先在 `data.js` 中修改，保存并刷新页面即可看到效果：

| 要修改的内容 | 在 `data.js` 中查找 |
| --- | --- |
| 首屏标题、日期、招收规模 | `titleLines`、`eventDate`、`deadline`、`quota` |
| 报名、通知、导师网页链接 | `urls` |
| 学院亮点四张卡片 | `highlights` |
| 五个方向名称、简介和关键词 | `directions` |
| 时间节点 | `schedule` |
| 活动内容 | `activities` |
| 申请条件和提交材料 | `requirements`、`materials` |
| 报名提示、费用与评优 | `applicationReminder`、`support` |
| 联系人、电话和邮箱 | `contact` |

页面中不需要程序动态替换的固定小标题，在 `index.html` 中修改，例如“学院亮点”“五个学科研究方向”“申请信息”“费用与项目评优”“咨询与报名”。

封面目前有意精简，未显示副标题和信息标签。若后续需要恢复这些内容，需要同时在 `index.html` 中加回显示容器，并在 `data.js` 中增加相应字段。

## 删除或隐藏板块

页面结构均在 `index.html` 中，每个内容区是独立的 `<section>`：

| 要移除的板块 | 在 `index.html` 中查找的标记 |
| --- | --- |
| 学院亮点 | `class="section ... intro` |
| 五个研究方向 | `class="section directions` |
| 活动内容 | `class="section program` |
| 时间轴 | `class="section timeline` |
| 申请条件 | `photo-hall application` |
| 提交材料 | `photo-hall materials-page` |
| 费用与评优 | `class="section ... support` |
| 联系方式和官方微信二维码 | `class="section contact` |

删除对应的完整 `<section>...</section>` 即可去掉一个板块。底部固定的“立即报名”按钮在 `index.html` 中查找 `class="sticky-cta"`；右上角配乐按钮查找 `id="musicButton"`。

各屏通过 `class="page"` 参与手机端整屏翻页，右侧页码指示点由脚本根据 `page` 数量自动生成。新增板块时给新的 `<section>` 添加 `page` 和 `data-page-title="板块名"`；删除板块后无需手动调整指示点。

## 素材与视觉更新

目前网页实际使用的轻量图片位于 `assets/media/`：

| 文件 | 当前用途 |
| --- | --- |
| `emblem.png` | 首屏学院院徽 |
| `hero-campus.jpg` | 首屏深绿色遮罩背景 |
| `ginkgo.jpg` | 学院亮点板块弱化底图 |
| `jingshi-hall.jpg` | 申请信息板块弱化底图 |
| `motto-snow.jpg` | 费用与评优板块弱化底图 |
| `official-wechat-qrcode.png` | 学院官网提供的官方微信公众号二维码 |

遮罩强度、主题颜色和底图位置在 `style.css` 中调整，查找 `.hero::after`、`.photo-section::before`、`.photo-section::after` 与 `:root`。

- 正式音乐放入 `assets/music.mp3`，并将 `data.js` 中 `music.ready` 修改为 `true`。
- 官方微信二维码信息卡在 `index.html` 中查找 `.official-channel`，官网链接和微信账号文字可在该区域直接修改。
- 如需替换院徽，替换 `assets/media/emblem.png`，或在 `index.html` 中修改 `.emblem` 图片地址。
- 页面在 `2026年6月18日 24:00` 后会自动把报名按钮切换为“查看官方通知”。

## 手动修改后的空白问题

此前脚本默认 `heroTags` 等字段一定存在；从 `data.js` 删除该字段后，JavaScript 在执行列表渲染时中断，导致后续卡片和文字没有注入页面。当前 `main.js` 已兼容可选字段：删除未使用的列表或链接配置时，其他模块仍会正常显示。

## 真机测试重点

- 微信、Android 浏览器与 iPhone Safari 中首屏排版和按钮触控面积
- 报名系统、官方通知、导师链接能否正确打开
- 研究方向卡片、详情弹窗、复制邮箱和返回顶部能否工作
- 添加音乐素材后，用户点击播放/暂停是否正常
- 正式图像与音乐加入后的首屏加载速度

## 信息来源

- [夏令营官方通知](https://sss.bnu.edu.cn/szszp/zsxx/1e10a4d531bd4d9bb94aa4bd711953a7.htm)
- [北京师范大学夏令营申请系统](https://xly.bnu.edu.cn/xly)
- [系统科学学院项目导师信息](https://sss.bnu.edu.cn/yjszsztw/)
- 上级目录中的 `BNU_SSS_summer_camp_official_data_summary.md`
