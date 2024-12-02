'use strict'
// テキストを保存する配列
const textArray = [];

document.addEventListener('DOMContentLoaded', function() {
    // Flatpickrのインスタンスを作成
    flatpickr("#datepicker", {
        dateFormat: "Y-m-d",
        locale: "ja" // 日本語化
    });
});

function addText() {
    // 入力されたテキストを取得する
    const inputText = document.getElementById("textInput").value;
    const inputDate = document.getElementById("datepicker").value;

    // 入力されたテキストと日付が空でない場合のみ追加する
    if (inputText.trim() !== "" && inputDate.trim() !== "") {
        // 配列にテキストと日付を追加する
        textArray.push({ text: inputText, date: inputDate });

        // 結果を表示する
        displayText();
    }

    // 入力欄を空にする
    document.getElementById("textInput").value = "";
    document.getElementById("datepicker").value = "";
}

function displayText() {
    const outputElement = document.getElementById("output");

    // 出力エリアをクリア
    outputElement.innerHTML = "";

    // 配列の中身をすべて表示する
    for (let i = 0; i < textArray.length; i++) {
        const div = document.createElement("div");
        div.classList.add("item");
        // テキストと日付を追加する
        div.textContent = textArray[i].text + " (" + textArray[i].date + ")";

        // 削除ボタンを作成する
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "削除";
        deleteButton.onclick = function() {
            deleteText(i); // 削除関数を呼び出す
        };

        // divに削除ボタンを追加する
        div.appendChild(deleteButton);
        // <div>に追加
        outputElement.appendChild(div);
    }
}

// 特定のテキストを削除する関数
function deleteText(index) {
    // 配列から指定のインデックスを削除
    textArray.splice(index, 1);
    // 再表示
    displayText();
}
