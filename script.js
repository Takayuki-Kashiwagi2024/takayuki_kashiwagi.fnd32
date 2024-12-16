'use strict';
// テキストを保存する配列
let textArray = [];

//画像の配列
const images = [
    "image1.png",
    "image2.png",
    "image3.png",
//     "images/image4.jpg"
];

// 画像をプリロードする関数
function preloadImages(imageArray) {
    imageArray.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// 現在の画像のインデックス
let currentIndex = 0;

// ページが読み込まれたときにローカルストレージからデータを読み込む
document.addEventListener('DOMContentLoaded', function() {
   
    // 画像をプリロード
    preloadImages(images);

    // Flatpickrのインスタンスを作成
    flatpickr("#datepicker", {
        dateFormat: "Y-m-d",
        locale: "ja" // 日本語化
    });

    // ローカルストレージからデータを読み込む
    loadTextArray();

    // 画像を自動で切り替える
    startSlideshow();
    
});

// スライドショーを開始する関数
function startSlideshow() {
    const slideshowElement = document.getElementById('slideshow');
    setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length; // インデックスを更新
        slideshowElement.src = images[currentIndex]; // 画像を切り替え
    }, 5000); // 5000ミリ秒（5秒）ごとに切り替え
}

function addText() {
    // 入力されたテキストを取得
    const inputText = document.getElementById("textInput").value;
    const inputDate = document.getElementById("datepicker").value;

    // 入力されたテキストと日付が空でない場合のみ追加
    if (inputText.trim() !== "" && inputDate.trim() !== "") {
        // 配列にテキストと日付を追加
        textArray.push({ text: inputText, date: inputDate });

        // 賞味期限を即座にチェック
        checkExpiryForNewItem(inputText, inputDate);

        // 結果を表示
        displayText();

        // ローカルストレージに保存
        saveTextArray();
    }

    // 入力欄を空にする
    document.getElementById("textInput").value = "";
    document.getElementById("datepicker").value = "";
}

function displayText() {
    const outputElement = document.getElementById("output");

    // 出力エリアをクリア
    outputElement.innerHTML = "";

    // 配列の中身をすべて表示
    for (let i = 0; i < textArray.length; i++) {
        const div = document.createElement("div");
        div.classList.add("item");
        // テキストと日付を追加
        div.textContent = textArray[i].text + " (" + textArray[i].date + ")";

        // 削除ボタンを作成
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "削除";
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
    // ローカルストレージに保存
    saveTextArray();
}

// 新しいアイテムの賞味期限をチェックする関数
function checkExpiryForNewItem(text, date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // 今日の日付の時間を0に設定

    const expiryDate = new Date(date);

    // 賞味期限の1日前を計算
    const oneDayBeforeExpiry = new Date(expiryDate);
    oneDayBeforeExpiry.setDate(expiryDate.getDate() - 1);

    if (oneDayBeforeExpiry.getTime() === today.getTime()) {
        alert(`${text}の賞味期限が明日です！`);
    } else if (expiryDate.getTime() < today.getTime()) {
        const daysPast = Math.floor((today - expiryDate) / (1000 * 60 * 60 * 24));
        alert(`${text}の賞味期限が${daysPast}日過ぎています！`);
    }
}

// ローカルストレージにテキスト配列を保存する関数
function saveTextArray() {
    localStorage.setItem('textArray', JSON.stringify(textArray));
}

// ローカルストレージからテキスト配列を読み込む関数
function loadTextArray() {
    const storedTextArray = localStorage.getItem('textArray');
    if (storedTextArray) {
        textArray = JSON.parse(storedTextArray);
        displayText(); // 読み込んだ内容を表示
        checkExpiredItems(); // 賞味期限が過ぎているアイテムをチェック
    }
}

// 賞味期限が過ぎているアイテムをチェックする関数
function checkExpiredItems() {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // 今日の日付の時間を0に設定

    textArray.forEach(item => {
        const expiryDate = new Date(item.date);
        if (expiryDate.getTime() < today.getTime()) {
            const daysPast = Math.floor((today - expiryDate) / (1000 * 60 * 60 * 24));
            alert(`${item.text}の賞味期限が${daysPast}日過ぎています！`);
        }
    });
}
