(function () {
  "use strict";

  window.SUMMER_CAMP_DATA = Object.freeze({
    version: "demo-2026-05-25",
    school: "北京师范大学",
    college: "系统科学学院",
    title: "2026年优秀大学生夏令营",
    titleLines: ["2026年", "优秀大学生夏令营"],
    location: "线下举办",
    quota: "约60名营员",
    eventDate: "2026年7月7日—9日",
    deadline: "2026年6月18日 24:00",
    deadlineIso: "2026-06-19T00:00:00+08:00",
    urls: {
      college: "https://sss.bnu.edu.cn/",
      officialNotice: "https://sss.bnu.edu.cn/szszp/zsxx/1e10a4d531bd4d9bb94aa4bd711953a7.htm",
      application: "https://xly.bnu.edu.cn/xly",
      advisors: "https://sss.bnu.edu.cn/yjszsztw/"
    },
    music: {
      ready: true,
      file: "./assets/music.mp3",
      placeholderMessage: "配乐将在正式素材确认后启用"
    },
    highlights: [
      {
        value: "国家重点学科",
        title: "系统理论",
        body: "系统理论专业为系统科学学科中全国唯一的国家重点学科。"
      },
      {
        value: "一级学科",
        title: "博士学位授权",
        body: "2000年取得系统科学一级学科博士学位授予权。"
      },
      {
        value: "世界一流学科",
        title: "系统科学",
        body: "系统科学学科入选国家“世界一流学科”建设名单。"
      },
      {
        value: "交叉创新",
        title: "复杂性科学",
        body: "面向自然、生命与社会复杂系统培养高水平人才。"
      }
    ],
    directions: [
      {
        title: "统计物理与复杂系统基本理论",
        description:
          "面向复杂系统的基础理论与方法，关注统计物理、非线性动力学、相变与临界现象、复杂网络、无序体系等问题，探索从微观相互作用到宏观集体现象的规律。",
        keywords: ["统计物理", "复杂系统", "非线性动力学", "相变临界", "复杂网络"]
      },
      {
        title: "地球复杂系统",
        description:
          "面向气候、环境、生态等地球系统问题，结合统计物理、复杂网络、遥感数据、数值模拟和机器学习方法，研究气候变化、极端事件、生态系统响应与地球系统风险。",
        keywords: ["气候变化", "地球系统", "大气环境", "生态系统", "复杂网络"]
      },
      {
        title: "认知与行为计算神经科学",
        description:
          "面向脑科学、认知神经科学与类脑智能，研究脑网络动力学、神经信号处理、脑连接组、神经机器人、强化学习与人工神经网络等交叉问题。",
        keywords: ["计算神经科学", "脑网络", "认知", "类脑智能", "神经动力学"]
      },
      {
        title: "生命与人工系统的群体运动",
        description:
          "面向生命系统、集群行为和人工智能系统，研究生物集群行为、集群机器人、神经生物学、生命起源与演化、群体协同与复杂动力学机制。",
        keywords: ["集群行为", "集群机器人", "生命系统", "生物复杂性", "演化"]
      },
      {
        title: "教育与社会复杂系统",
        description:
          "面向教育、经济、金融、人口、社会治理和科学学等问题，结合行为博弈、复杂网络、数据分析、系统建模和演化机制研究，理解社会系统的复杂行为与调控机制。",
        keywords: ["行为博弈", "金融复杂性", "人口老龄化", "教育治理", "科学学"]
      }
    ],
    schedule: [
      {
        date: "报名阶段",
        name: "在线申请",
        detail: "登录夏令营申请系统，完成材料提交。"
      },
      {
        date: "6月18日 24:00",
        name: "申请截止",
        detail: "请在截止时间前完成系统提交。"
      },
      {
        date: "6月22日左右",
        name: "材料审核与遴选结束",
        detail: "入营名单将在学院网站公布，并以邮件通知本人。"
      },
      {
        date: "通知后3日内",
        name: "确认入营",
        detail: "入选者需邮件回复，并在报名系统中确认。"
      },
      {
        date: "7月7日—9日",
        name: "线下夏令营",
        detail: "详细日程待入营名单公示后另行通知。"
      }
    ],
    activities: [
      {
        title: "学术报告",
        text: "了解系统科学相关研究进展与前沿议题。"
      },
      {
        title: "师生交流",
        text: "与学院教师深入交流研究兴趣与项目方向。"
      },
      {
        title: "项目展示",
        text: "开展科研项目初步探索，展示思路与成果。"
      }
    ],
    requirements: [
      "全国高校理工科专业大学本科三年级在校生",
      "优先考虑与学院五个学科研究方向契合程度高的相关专业",
      "具有扎实的数理基础，专业学习成绩优秀",
      "了解系统科学，对复杂系统研究具有兴趣",
      "能够全程参加本次线下夏令营"
    ],
    materials: [
      "夏令营申请表扫描件，系统填写并打印签章",
      "个人自述，含夏令营报名理由陈述",
      "学校课程成绩单扫描件",
      "一封专家推荐信扫描件",
      "大学英语四、六级考试成绩单等外语成绩扫描件",
      "学术论文、专利等科研成果材料（如无可不提交）"
    ],
    materialNote:
      "材料按顺序合成一个 PDF 文件，命名为“姓名+学校+手机号”，上传至申请系统“上传材料-其他材料”一栏。本期无需邮寄纸质材料。",
    applicationReminder:
      "请参照学院五个学科研究方向，将申请志愿和项目导师填入导师栏目。",
    support: {
      cost: "凡入选夏令营的外校学生，活动期间的食宿由学院统一安排，费用全免。",
      award:
        "活动结束后，学院将根据在营期间项目选题和夏令营后项目研究报告等综合情况，评选本届夏令营优秀项目。"
    },
    contact: {
      people: "吴老师、郝老师",
      phone: "010-58807062",
      phoneHref: "tel:01058807062",
      email: "xtjx@bnu.edu.cn",
      emailHref: "mailto:xtjx@bnu.edu.cn?subject=%E5%A4%8F%E4%BB%A4%E8%90%A5%E5%92%A8%E8%AF%A2",
      note: "邮件请注明“夏令营”字样"
    },
    sources: [
      {
        label: "2026年夏令营官方通知",
        url: "https://sss.bnu.edu.cn/szszp/zsxx/1e10a4d531bd4d9bb94aa4bd711953a7.htm"
      },
      {
        label: "学院简介",
        url: "https://sss.bnu.edu.cn/sxygk/sxyjj/index.htm"
      },
      {
        label: "项目导师信息",
        url: "https://sss.bnu.edu.cn/yjszsztw/"
      }
    ]
  });
})();
