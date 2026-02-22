$(function() {
    
    $("#navigation").load("components/navigation.html", function(){
        // 點擊按鈕切換 active 狀態
        $(".navi-call-btn").on("click", function(e) {
            e.preventDefault();
            $(this).toggleClass("active");
            $(".navi-bar").toggleClass("active");
            
            // 防止背景滾動 (選用)
            $("body").toggleClass("overflow-hidden");
        });

        // 點擊選單連結後自動收起 (提升使用者體驗)
        $(".navi-list a").on("click", function() {
            $(".navi-call-btn, .navi-bar").removeClass("active");
            $("body").removeClass("overflow-hidden");
        });
    });
    $("#footer").load("components/footer.html");
});
