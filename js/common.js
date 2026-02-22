// ========== 著作 slider
const bookSwiper = new Swiper(".books-swiper", {
  // 無限輪播
  loop: true,
  
  // 一次只顯示一個項目
  slidesPerView: 1,

  // 自動播放設定
  autoplay: {
    delay: 4000, // 4秒切換一次
    disableOnInteraction: true, // 使用者手動操作（滑動/點擊）後停止自動輪播
  },

  // 分頁器
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  // 左右箭頭
//   navigation: {
//     nextEl: ".swiper-button-next",
//     prevEl: ".swiper-button-prev",
//   },
});

// ========== 教室環境slider 
const classroomInteriorSwiper = new Swiper(".classroom-interior-swiper", {
  // 無限輪播
  loop: true,
  
  // 一次只顯示一個項目
  slidesPerView: 1,

  // 自動播放設定
  autoplay: {
    delay: 4000, // 4秒切換一次
    disableOnInteraction: true, // 使用者手動操作（滑動/點擊）後停止自動輪播
  },

  // 分頁器
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

// ========== 設備slider 
const equipmentsDemoSwiper = new Swiper(".equipments-demo-swiper", {
  // 無限輪播
  loop: true,
  
  // 一次只顯示一個項目
  slidesPerView: 1,

  // 自動播放設定
  autoplay: {
    delay: 3000, // 4秒切換一次
    disableOnInteraction: true, // 使用者手動操作（滑動/點擊）後停止自動輪播
  },

  // 分頁器
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

// ========== 常見問答
$(function() {
    // 1. 檢查元素是否存在
    const $faqSet = $('.faq-set-wrapper');
    
    if ($faqSet.length > 0) {
        // 點擊問題標題
        $faqSet.on('click', '.faq-item-question', function() {
            const $parentItem = $(this).closest('.faq-item');
            const $answer = $parentItem.find('.faq-item-answer');

            // 2. 每個項目獨立收合：切換自身的 active class
            $parentItem.toggleClass('active');

            // 3. 處理內容顯示 (配合 CSS 動效)
            if ($parentItem.hasClass('active')) {
                $answer.stop().slideDown(400); 
            } else {
                $answer.stop().slideUp(400);
            }
        });
    }
}); 

$(function() {
    // ==========tabs切換

    // 1. 檢查核心外框是否存在
    const $tabsSet = $('.defalut-tabs-set');
    
    if ($tabsSet.length > 0) {
        // 初始化：確保畫面上只有第一個內容是顯示的，其餘隱藏
        // 這樣即使 HTML 沒寫好，JS 也會幫你校正
        $('.defalut-tabs-cnt').hide();
        $('.defalut-tabs-cnt.active').show();

        // 2. 監聽標籤點擊事件
        $tabsSet.on('click', '.defalut-tabs-label', function() {
            const $this = $(this);
            
            // 防呆：如果已經是 active 狀態，就不重複執行特效
            if ($this.hasClass('active')) return;

            const index = $this.index();
            const $allLabels = $this.parent().find('.defalut-tabs-label');
            const $allContents = $this.closest('.defalut-tabs-set').find('.defalut-tabs-cnt');
            const $targetContent = $allContents.eq(index);

            // 3. 標籤切換
            $allLabels.removeClass('active');
            $this.addClass('active');

            // 4. 內容切換特效
            // 先停止所有正在進行的動畫 (stop)，避免快速連續點擊造成的排隊問題
            $allContents.stop(true, true).hide().removeClass('active');
            
            $targetContent.css({
                display: 'flex', 
                opacity: 0,
                transform: 'translateY(15px)'
            }).animate({
                opacity: 1
            }, {
                duration: 600,
                step: function(now, fx) {
                    if (fx.prop === "opacity") {
                        let move = 15 - (now * 15);
                        $(this).css('transform', `translateY(${move}px)`);
                    }
                },
                complete: function() {
                    $(this).addClass('active');
                }
            });
        });
        
        console.log("Tabs system initialized."); // 僅供除錯確認
    }

    // ========== 內容導覽選單
    const $anchorNav = $('.about-side-anchors');
    // 檢查元素是否存在
    if ($anchorNav.length > 0) {
        const $window = $(window);
        // 抓取初始位置，如果頁面有大圖，建議給個預算值或在 window.load 執行
        let navTop = $anchorNav.offset().top;

        // 監聽捲動
        $window.on('scroll', function() {
            const scrollTop = $window.scrollTop();
            const threshold = 80; // 對應你 CSS 的 top: 80px

            // A. 固定效果切換
            if (scrollTop > (navTop - threshold)) {
                $anchorNav.addClass('is-fixed');
            } else {
                $anchorNav.removeClass('is-fixed');
            }

            // B. ScrollSpy (連動對應)
            // 只針對有出現在導覽列中的 ID 進行檢查
            $anchorNav.find('a').each(function() {
                const targetId = $(this).attr('href');
                if (targetId.startsWith('#') && targetId.length > 1) {
                    const $targetSection = $(targetId);
                    if ($targetSection.length) {
                        const targetTop = $targetSection.offset().top - 120; // 緩衝值
                        const targetBottom = targetTop + $targetSection.outerHeight();

                        if (scrollTop >= targetTop && scrollTop < targetBottom) {
                            $anchorNav.find('li').removeClass('active');
                            $(this).parent().addClass('active');
                        }
                    }
                }
            });
        });

        // C. 平滑捲動與點擊收合
        $anchorNav.on('click', 'a', function(e) {
            const target = $(this).attr('href');
            if (target !== "#" && $(target).length) {
                e.preventDefault();
                $('html, body').stop().animate({
                    scrollTop: $(target).offset().top - 80
                }, 600);

                // 如果是手機版，點完後收合選單
                if ($window.width() <= 768) { 
                    $anchorNav.removeClass('is-open');
                }
            }
        });

        // D. 手機版 Menu 按鈕點擊 (透過偽元素觸發時需注意)
        // 點擊整個 nav 區塊切換收合
        $anchorNav.on('click', '.mobile-toggle', function(e) {
            console.log('111');
            e.stopPropagation(); // 防止事件冒泡
            $anchorNav.toggleClass('is-open');
        });
        
        // 視窗 resize 時重新校準 navTop
        $window.on('resize', function() {
            $anchorNav.removeClass('is-fixed'); // 先移除才能抓到原始位置
            navTop = $anchorNav.offset().top;
        });
    }

});


