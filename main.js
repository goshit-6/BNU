(function () {
  "use strict";

  var data = window.SUMMER_CAMP_DATA;
  if (!data) {
    return;
  }

  var $ = function (selector) {
    return document.querySelector(selector);
  };
  var $$ = function (selector) {
    return Array.prototype.slice.call(document.querySelectorAll(selector));
  };

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function setText(selector, value) {
    var element = $(selector);
    if (!element) {
      return;
    }
    if (value === undefined || value === null || value === "") {
      element.hidden = true;
      return;
    }
    element.hidden = false;
    element.textContent = value;
  }

  function attachLinks(selector, url) {
    if (!url) {
      return;
    }
    $$(selector).forEach(function (link) {
      link.href = url;
    });
  }

  function renderBaseContent() {
    setText("#school", data.school);
    setText("#college", data.college);
    $("#title").innerHTML = (data.titleLines || [data.title])
      .map(function (line) {
        return '<span class="title-line">' + escapeHtml(line) + "</span>";
      })
      .join("");
    setText("#deadline", "截止时间：" + data.deadline);
    setText("#applicationReminder", data.applicationReminder);
    setText("#materialNote", data.materialNote);
    setText("#cost", data.support && data.support.cost);
    setText("#award", data.support && data.support.award);
    setText("#contactPeople", data.contact && data.contact.people ? "联系人：" + data.contact.people : null);
    setText("#contactNote", data.contact && data.contact.note);
    setText("#dialogEventDate", data.eventDate);
    setText("#dialogScale", data.location + " / " + data.quota);
    setText("#dialogDeadline", data.deadline);
    setText("#dialogReminder", data.applicationReminder);

    var phoneLink = $("#phoneLink");
    if (phoneLink && data.contact && data.contact.phone) {
      phoneLink.textContent = data.contact.phone;
      phoneLink.href = data.contact.phoneHref || "#";
    }

    var emailLink = $("#emailLink");
    if (emailLink && data.contact && data.contact.email) {
      emailLink.textContent = data.contact.email;
      emailLink.href = data.contact.emailHref || "#";
    }

    attachLinks(".apply-link", data.urls && data.urls.application);
    attachLinks(".notice-link", data.urls && data.urls.officialNotice);
    attachLinks(".advisor-link", data.urls && data.urls.advisors);

    var highlights = $("#highlights");
    if (highlights) {
      highlights.innerHTML = (data.highlights || [])
      .map(function (item) {
        return (
          '<article class="highlight-card">' +
          '<p class="highlight-value">' +
          escapeHtml(item.value) +
          "</p>" +
          "<h3>" +
          escapeHtml(item.title) +
          "</h3>" +
          "<p>" +
          escapeHtml(item.body) +
          "</p>" +
          "</article>"
        );
      })
      .join("");
    }

    var activities = $("#activities");
    if (activities) {
      activities.innerHTML = (data.activities || [])
      .map(function (item, index) {
        return (
          '<article class="activity-card">' +
          '<span class="activity-number">0' +
          (index + 1) +
          "</span>" +
          "<h3>" +
          escapeHtml(item.title) +
          "</h3>" +
          "<p>" +
          escapeHtml(item.text) +
          "</p>" +
          "</article>"
        );
      })
      .join("");
    }

    var timeline = $("#timeline");
    if (timeline) {
      timeline.innerHTML = (data.schedule || [])
      .map(function (item) {
        return (
          "<li>" +
          '<p class="timeline-date">' +
          escapeHtml(item.date) +
          "</p>" +
          "<h3>" +
          escapeHtml(item.name) +
          "</h3>" +
          "<p>" +
          escapeHtml(item.detail) +
          "</p>" +
          "</li>"
        );
      })
      .join("");
    }

    var requirements = $("#requirements");
    if (requirements) {
      requirements.innerHTML = (data.requirements || [])
      .map(function (item) {
        return "<li>" + escapeHtml(item) + "</li>";
      })
      .join("");
    }

    var materials = $("#materials");
    if (materials) {
      materials.innerHTML = (data.materials || [])
      .map(function (item) {
        return "<li>" + escapeHtml(item) + "</li>";
      })
      .join("");
    }

  }

  function renderDirections() {
    var container = $("#directionList");
    if (!container) {
      return;
    }
    container.innerHTML = (data.directions || [])
      .map(function (direction, index) {
        var panelId = "direction-panel-" + index;
        return (
          '<article class="direction-card">' +
          '<button class="direction-toggle" type="button" aria-expanded="false" aria-controls="' +
          panelId +
          '">' +
          '<span class="direction-order">0' +
          (index + 1) +
          "</span>" +
          "<span>" +
          escapeHtml(direction.title) +
          "</span>" +
          '<span class="toggle-symbol" aria-hidden="true">+</span>' +
          "</button>" +
          '<div class="direction-panel" id="' +
          panelId +
          '" hidden>' +
          "<p>" +
          escapeHtml(direction.description) +
          "</p>" +
          '<div class="keyword-row">' +
          direction.keywords
            .map(function (keyword) {
              return "<span>" + escapeHtml(keyword) + "</span>";
            })
            .join("") +
          "</div>" +
          "</div>" +
          "</article>"
        );
      })
      .join("");

    $$(".direction-toggle").forEach(function (button) {
      button.addEventListener("click", function () {
        var wasOpen = button.getAttribute("aria-expanded") === "true";
        $$(".direction-toggle").forEach(function (otherButton) {
          var panel = document.getElementById(otherButton.getAttribute("aria-controls"));
          otherButton.setAttribute("aria-expanded", "false");
          panel.hidden = true;
        });
        if (!wasOpen) {
          var currentPanel = document.getElementById(button.getAttribute("aria-controls"));
          button.setAttribute("aria-expanded", "true");
          currentPanel.hidden = false;
        }
      });
    });
  }

  function updateDeadline() {
    var countdown = $("#countdown");
    if (!countdown || !data.deadlineIso) {
      return;
    }
    var deadline = new Date(data.deadlineIso);
    var remaining = deadline.getTime() - Date.now();

    if (remaining <= 0) {
      countdown.textContent = "报名已截止";
      $$(".apply-link").forEach(function (button) {
        button.textContent = "查看官方通知";
        button.href = data.urls && data.urls.officialNotice ? data.urls.officialNotice : "#";
        button.classList.add("ended");
      });
      return;
    }

    var totalMinutes = Math.floor(remaining / 60000);
    var days = Math.floor(totalMinutes / (60 * 24));
    var hours = Math.floor((totalMinutes % (60 * 24)) / 60);
    var minutes = totalMinutes % 60;
    countdown.textContent =
      days + "天 " + String(hours).padStart(2, "0") + "小时 " + String(minutes).padStart(2, "0") + "分";
  }

  function toast(message) {
    var element = $("#toast");
    window.clearTimeout(toast.timeout);
    element.textContent = message;
    element.classList.add("is-visible");
    toast.timeout = window.setTimeout(function () {
      element.classList.remove("is-visible");
    }, 2600);
  }

  function copyContactEmail() {
    var email = data.contact && data.contact.email;
    if (!email) {
      toast("暂未配置咨询邮箱");
      return;
    }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard
        .writeText(email)
        .then(function () {
          toast("咨询邮箱已复制");
        })
        .catch(function () {
          fallbackCopy(email);
        });
      return;
    }
    fallbackCopy(email);
  }

  function fallbackCopy(value) {
    var field = document.createElement("textarea");
    field.value = value;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.appendChild(field);
    field.select();
    try {
      document.execCommand("copy");
      toast("咨询邮箱已复制");
    } catch (error) {
      toast("请手动复制：" + value);
    }
    document.body.removeChild(field);
  }

  function setUpMusic() {
    var button = $("#musicButton");
    var label = $("#musicLabel");
    var audio = $("#backgroundMusic");
    if (!button || !audio) {
      return;
    }
    var music = data.music || {};
    if (music.file) {
      audio.src = music.file;
    }

    function markPlaying() {
      button.classList.add("playing");
      button.setAttribute("aria-label", "暂停背景音乐");
      if (label) {
        label.textContent = "暂停";
      }
    }

    function markPaused() {
      button.classList.remove("playing");
      button.setAttribute("aria-label", "开启背景音乐");
      if (label) {
        label.textContent = "配乐";
      }
    }

    function tryPlayMusic(showFailure) {
      if (!music.ready) {
        if (showFailure) {
          toast(music.placeholderMessage || "配乐暂未启用");
        }
        return Promise.resolve(false);
      }
      if (!audio.paused) {
        markPlaying();
        return Promise.resolve(true);
      }
      return audio
        .play()
        .then(function () {
          markPlaying();
          return true;
        })
        .catch(function () {
          if (showFailure) {
            toast("当前浏览器未能播放配乐");
          }
          return false;
        });
    }

    button.addEventListener("click", function (event) {
      event.stopPropagation();
      if (audio.paused) {
        tryPlayMusic(true);
      } else {
        audio.pause();
        markPaused();
      }
    });

    document.addEventListener(
      "pointerdown",
      function (event) {
        if (button.contains(event.target)) {
          return;
        }
        tryPlayMusic(false);
      },
      { once: true, passive: true }
    );

    audio.addEventListener("error", function () {
      if (music.ready) {
        toast("配乐素材暂未加载成功");
      }
    });
  }

  function setUpDialog() {
    var dialog = $("#moreDialog");
    if (!dialog) {
      return;
    }
    function closeDialog() {
      if (typeof dialog.close === "function") {
        dialog.close();
      } else {
        dialog.removeAttribute("open");
      }
    }

    $$("[data-open-details]").forEach(function (button) {
      button.addEventListener("click", function () {
        if (typeof dialog.showModal === "function") {
          dialog.showModal();
        } else {
          dialog.setAttribute("open", "");
        }
      });
    });
    $$("[data-close-dialog]").forEach(function (button) {
      button.addEventListener("click", function () {
        closeDialog();
      });
    });
    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) {
        closeDialog();
      }
    });
  }

  function setUpScrollEffects() {
    var poster = $(".poster");
    var mobileSlides = window.matchMedia("(max-width: 699px)").matches;
    var scrollTarget = mobileSlides && poster ? poster : window;
    var topButton = $("#backTop");
    scrollTarget.addEventListener("scroll", function () {
      var offset = scrollTarget === window ? window.scrollY : poster.scrollTop;
      if (topButton) {
        topButton.classList.toggle("visible", offset > 620);
      }
    });
    if (topButton) {
      topButton.addEventListener("click", function () {
        scrollTarget.scrollTo({ top: 0, behavior: "smooth" });
      });
    }

    var targets = $$(".reveal");
    if (!("IntersectionObserver" in window)) {
      targets.forEach(function (target) {
        target.classList.add("shown");
      });
      return;
    }
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("shown");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, root: mobileSlides ? poster : null }
    );
    targets.forEach(function (target) {
      observer.observe(target);
    });
  }

  function setUpSlidePages() {
    var poster = $(".poster");
    var nav = $("#slideNav");
    var pages = $$(".page");
    if (!poster || !nav || !pages.length) {
      return;
    }

    nav.innerHTML = pages
      .map(function (page, index) {
        var label = page.getAttribute("data-page-title") || "第" + (index + 1) + "页";
        return (
          '<button type="button" data-slide-index="' +
          index +
          '" aria-label="前往' +
          escapeHtml(label) +
          '"><span></span></button>'
        );
      })
      .join("");

    var controls = $$("#slideNav button");
    function updateActive(index) {
      controls.forEach(function (control, controlIndex) {
        control.classList.toggle("active", controlIndex === index);
      });
      document.body.classList.toggle("on-cover", index === 0);
    }

    controls.forEach(function (control, index) {
      control.addEventListener("click", function () {
        pages[index].scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });

    var nextButton = $("#nextPage");
    if (nextButton && pages[1]) {
      nextButton.addEventListener("click", function () {
        pages[1].scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            updateActive(pages.indexOf(entry.target));
          }
        });
      },
      {
        root: window.matchMedia("(max-width: 699px)").matches ? poster : null,
        threshold: 0.62
      }
    );
    pages.forEach(function (page) {
      observer.observe(page);
    });
    updateActive(0);
  }

  renderBaseContent();
  renderDirections();
  updateDeadline();
  setInterval(updateDeadline, 60000);
  setUpMusic();
  setUpDialog();
  setUpSlidePages();
  setUpScrollEffects();
  if ($("#copyEmail")) {
    $("#copyEmail").addEventListener("click", copyContactEmail);
  }
})();
