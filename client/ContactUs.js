// 每個輸入框的提示
tippy(".hint", {
  content: " 必 填 ",
  arrow: true,
});

// 每個輸入框的提示 - 電話(選填)
tippy(".telHint", {
  content: " 選 填 ",
  arrow: true,
});

// 表單驗證
function validateForm() {
  // 獲取所有必填輸入框元素
  var requiredInputs = document.querySelectorAll(
    "input[required], textarea[required]"
  );

  // 檢查每個必填項目是否已填寫
  for (var i = 0; i < requiredInputs.length; i++) {
    if (requiredInputs[i].value === "") {
      // 若有任何一個必填項目未填寫，將會顯示警告訊息
      alert("請檢查所有必填項目是否均已填寫！");
      return false; // 阻止表單提交
    }
  }

  // 所有必填項目均已填寫，則允許表單進行提交
  return true; // 允許表單提交
}

// 當"寄出"按鈕被點擊時，則執行表單驗證
$(".Sendbutton").click(function (event) {
  event.preventDefault(); // 阻止默認提交

  if (validateForm()) {
    // 如果表單通過驗證，則會顯示Loading加載動畫
    $.LoadingOverlay("show", {
      image: "",
      text: "信件寄出中…",
      textColor: "#0984e3",
      textResizeFactor: 0.4,
    });

    // 表單已提交成功
    setTimeout(function () {
      $.LoadingOverlay("text", "信件已寄出!將於3到5個工作日答覆您");
      setTimeout(function () {
        $.LoadingOverlay("hide");
      }, 3000);
    }, 4000);
  }
});

// 等待DOM加載完成
document.addEventListener("DOMContentLoaded", function () {
  // 獲取表單元素
  var form = document.querySelector("#myForm");

  // 添加表單提交事件處理程序
  form.addEventListener("submit", function (event) {
    console.log('add submit');
    event.preventDefault(); // 阻止表單默認提交行為

    // 獲取表單中的數據
    var formData = new FormData(form);

    // 使用AJAX將數據傳送到後端
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/submit", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    console.log('xhr 執行中');
    // 監聽AJAX請求完成事件
    xhr.onload = function () {
      if (xhr.status === 200) {
        // 成功處理
        console.log("數據已成功提交");
        alert("數據已成功提交");
      } else {
        // 處理錯誤
        console.error("數據提交時發生錯誤");
        alert("數據提交時發生錯誤");
      }
    };

    // 發送AJAX請求
    xhr.send(JSON.stringify(Object.fromEntries(formData.entries())));
  });
});
