'use strict'
// テキストを保存する配列
const textArray = [];

function addText() {
    // 入力されたテキストを取得
    const inputText = document.getElementById("textInput").value;

    // 入力されたテキストが空でない場合のみ追加
    if (inputText.trim() !== "") {
        // 配列にテキストを追加
        textArray.push(inputText);

        // 結果を表示
        displayText();
    }

    // 入力欄を空にする
    document.getElementById("textInput").value = "";
}

function displayText() {
    const outputElement = document.getElementById("output");

    // 出力エリアをクリア
    outputElement.innerHTML = "";

    // 配列の中身をすべて表示
    for (let i = 0; i < textArray.length; i++) {
        const div = document.createElement("div");
        div.classList.add("item");
        // テキストを追加
        div.textContent = textArray[i];

        // 削除ボタンを作成
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "削除";
        // deleteButton.classList.add("delete-button");
        deleteButton.onclick = function() {
            deleteText(i); // 削除関数を呼び出す
        };

        // divに削除ボタンを追加
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



