gsap.registerPlugin();
gsap.registerPlugin(ScrollTrigger);

// 首頁效果
document.addEventListener("DOMContentLoaded", () => {
    // 首頁進場大圖
    const webKvTl = gsap.timeline({
        defaults: { ease: "power2.out", duration: 1.2 }
    });

    webKvTl.to(".web-kv img", {
        clipPath: "inset(0 0% 0 0)", // 從右側縮減至 0，達成展開效果
        opacity: 1,
        duration: 1.5
    })
    .to(".web-ci-blanket", {
        y: 0, // 回到原位
        duration: 1,
        ease: "power3.inOut"
    }, "-=0.5") // 提前 0.5 秒開始，增加流暢感
    .from(".web-kv-title-set h1", {
        opacity: 0,
        filter: "blur(10px)",
        y: 10,
        stagger: 0.3, // 標題依序出現
        duration: 0.8
    })
    .from(".logo-name, .logo-en-name", {
        opacity: 0,
        y: 20,
        stagger: 0.3, // 標題依序出現
        duration: 0.8
    })
    .to(".scroll-hint", {
        opacity: 1,
        duration: 0.5
    });

    // 各頁hero kv進場
    if (document.querySelector('.page-hero-kv')){
        const pageHeroKvTl = gsap.timeline({
            defaults: { ease: "power2.out", duration: 1.2 }
        });
        pageHeroKvTl.to(".page-hero-kv > img", {
            clipPath: "inset(0% 0% 0% 0%)",
            opacity: 1,
            duration: 1.5,
            filter: "blur(0px)",
        });
        pageHeroKvTl.from(".page-hero-info-column > *", {
        y: 30,
        opacity: 0,
        filter: "blur(10px)",
        stagger: 0.2,
        duration: 1
    }, "-=0.8"); // 圖片展開到一半時文字就開始進場
    }

    // 封裝一個檢查函式，確保元素存在才執行動畫
    const initScrollAnim = (selector, config) => {
        if (document.querySelector(selector)) {
            gsap.from(selector, {
                scrollTrigger: {
                    trigger: selector,
                    start: "top 80%", // 當元素頂部進入視窗 80% 位置時觸發
                    toggleActions: "play none none none", // 只播放一次
                    ...config.st
                },
                ...config.gsap
            });
        }
    };

    // Welcome 區塊：左右交錯淡入
    if (document.querySelector('.web-welcome-wrapper')) {
        const tlWelcome = gsap.timeline({
            scrollTrigger: {
                trigger: ".web-welcome-wrapper",
                toggleActions: "play reverse play reverse",
                start: "top 80%",
            }
        });
        tlWelcome.from(".welcome-part", {
            y: 30,
            opacity: 0,
            filter: "blur(10px)",
            duration: 1.5,
            stagger: 0.4,
            ease: "power2.out"
        });
    }

    // Recruit Student 區塊：背景放大與文字上浮
    if (document.querySelector('.recruit-student')) {
        gsap.from(".recruit-student-bg", {
            scrollTrigger: {
                trigger: ".recruit-student",
                toggleActions: "play reverse play reverse",
                start: "top bottom",
                scrub: true // 隨著捲動持續縮放，更有層次感
            },
            scale: 1.3,
            y: -600,
            opacity: 0.5,
            ease: "none"
        });
        
        gsap.from(".recruit-info > *", {
            scrollTrigger: {
                trigger: ".recruit-info",
                toggleActions: "play reverse play reverse",
                start: "top 85%"
            },
            y: 20,
            opacity: 0,
            filter: "blur(10px)",
            duration: 1.2,
            stagger: 0.3
        });
    }

    // 教學六大特色：扇形或依序浮現
    if (document.querySelector('.lesson-features')) {
        gsap.from(".lesson-features-title", {
            scrollTrigger: {
                trigger: ".lesson-features-title",
                toggleActions: "play reverse play reverse",
                start: "top 90%"
            },
            opacity: 0,
            filter: "blur(10px)",
            y: 20,
            duration: 1
        });

        gsap.from(".lesson-feature-point", {
            scrollTrigger: {
                trigger: ".lesson-features",
                toggleActions: "play reverse play reverse",
                start: "top 70%"
            },
            opacity: 0,
            filter: "blur(10px)",
            y: 40,
            duration: 1.2,
            stagger: 0.2, // 六個點會像階梯般依序出現
            ease: "power2.out"
        });
    }

    // about - 關於我們
    if (document.querySelector('.about-teacher')) {
        gsap.from(".about-teacher > *", {
            scrollTrigger: {
                trigger: ".about-teacher",
                toggleActions: "play reverse play reverse",
                start: "top 60%",
            },
            opacity: 0,
            filter: "blur(10px)",
            y: 20,
            stagger: 0.4,
            duration: 0.7
        });
    }

    // about - 經歷與證照
    if (document.querySelector('.teacher-resume.scholar')) {
        gsap.from(".teacher-resume.scholar > *", {
            scrollTrigger: {
                trigger: ".teacher-resume.scholar",
                toggleActions: "play reverse play reverse",
                start: "top 60%",
            },
            opacity: 0,
            filter: "blur(10px)",
            x: -120,
            stagger: 0.4,
            duration: 0.7
        });
    }
    if (document.querySelector('.teacher-resume.license')) {
        gsap.from(".teacher-resume.license > *", {
            scrollTrigger: {
                trigger: ".teacher-resume.license",
                toggleActions: "play reverse play reverse",
                start: "top 60%",
            },
            opacity: 0,
            filter: "blur(10px)",
            x: 120,
            stagger: 0.4,
            duration: 0.7
        });
    }

    // classroom - 教室介紹
    if (document.querySelector('.about-classroom')) {
        gsap.from(".classroom-interior-intro", {
            scrollTrigger: {
                trigger: ".classroom-interior-intro",
                toggleActions: "play reverse play reverse",
                start: "top 60%",
            },
            opacity: 0,
            filter: "blur(10px)",
            x: 120,
            stagger: 0.4,
            duration: 0.7
        });
    }

    // classroom - 教室設備解說
    if (document.querySelector('.equipments-wrapper')) {
        gsap.from(".equipments-demo-intro", {
            scrollTrigger: {
                trigger: ".equipments-demo-intro",
                toggleActions: "play reverse play reverse",
                start: "top 60%",
            },
            opacity: 0,
            filter: "blur(10px)",
            y: 120,
            stagger: 0.4,
            duration: 0.7
        });
        gsap.from(".equipment-brief > *", {
            scrollTrigger: {
                trigger: ".equipment-brief",
                toggleActions: "play reverse play reverse",
                start: "top 60%",
            },
            opacity: 0,
            filter: "blur(10px)",
            y: 120,
            stagger: 0.4,
            duration: 0.7
        });
    }

    // classroom - 立即報名
    if (document.querySelector('#program')) {
        gsap.from("#program > *", {
            scrollTrigger: {
                trigger: "#program",
                toggleActions: "play reverse play reverse",
                start: "top 60%",
            },
            opacity: 0,
            filter: "blur(10px)",
            scale: 0.7,
            stagger: 0.4,
            duration: 1
        });
    }

    // classroom - 報名及繳費方式
    if (document.querySelector('#register')) {
        gsap.from(".join-steps > li", {
            scrollTrigger: {
                trigger: ".for-join-program",
                toggleActions: "play reverse play reverse",
                start: "top 60%",
            },
            opacity: 0,
            filter: "blur(10px)",
            x: 120,
            stagger: 1,
            duration: 1
        });
    }

    // history - 老師的小教室
    // 獲取頁面上所有的小教室區塊
    const pads = gsap.utils.toArray('.knowledge-pad');

    pads.forEach(pad => {
        // 建立該區塊的專屬 Timeline
        const kPadtTl = gsap.timeline({
            scrollTrigger: {
                trigger: pad,
                start: "top 65%",
                // 設為重複觸發
                toggleActions: "play reverse play reverse",
            }
        });

        // 整個外框由上往下彈跳淡入
        kPadtTl.from(pad, {
            y: -50,            // 從上方 50px 開始
            opacity: 0,
            filter: "blur(10px)",
            duration: 0.7,
            ease: "back.out(10)", // 關鍵：Back ease 產生彈跳感，1.7 是彈跳強度
        });

        // 標題與副標依序進場
        kPadtTl.from([pad.querySelector('.knowledge-pad-title'), pad.querySelector('.knowledge-pad-sub')], {
            y: 20,
            opacity: 0,
            filter: "blur(5px)",
            duration: 0.8,
            stagger: 0.2
        }, "-=0.6"); // 提前開始，讓動作更流暢

        // 四大精神項目 (和敬清寂) 依序浮現
        const items = pad.querySelectorAll('.tea-spirit-item');
        if (items.length > 0) {
            kPadtTl.from(items, {
                scale: 0.9,       // 稍微縮小
                y: 20,
                opacity: 0,
                filter: "blur(8px)",
                duration: 0.8,
                stagger: 0.15,    // 每個項目間隔 0.15 秒
                ease: "power2.out"
            }, "-=0.4");
        }
    });

    // history - 茶道精神與生活美學
    if (document.querySelector('.about-history')) {
        gsap.from(".about-history > *", {
            scrollTrigger: {
                trigger: ".about-history",
                toggleActions: "play reverse play reverse",
                start: "top 60%",
            },
            opacity: 0,
            filter: "blur(10px)",
            y: 20,
            stagger: 0.4,
            duration: 0.7
        });
    }
});

