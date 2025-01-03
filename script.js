// 入力欄から値を取得
const amount = document.getElementById('amount');
const member = document.getElementById('member');
const amountdisplay = document.getElementById('amount-display');
const errordisplay = document.getElementById('error-display');
const repamountdisplay = document.getElementById('rep-amount-display');
const cutamountdisplay = document.getElementById('cut-amount-display');
const cuterrordisplay = document.getElementById('cut-error-display');
const cutrepamountdisplay = document.getElementById('cut-rep-amount-display');

// 初期メッセージを表示（計算結果がまだ表示されない状態）
setInitialMessages();

// 入力値の変更に合わせて即座に計算
amount.addEventListener('input', handleInput);
member.addEventListener('input', handleInput);

// 初期状態のメッセージを設定する関数
function setInitialMessages() {
    amountdisplay.textContent = '※金額はここに表示されます';
    errordisplay.textContent = '※誤差はここに表示されます';
    repamountdisplay.textContent = '※金額はここに表示されます';
    cutamountdisplay.textContent = '※金額はここに表示されます';
    cuterrordisplay.textContent = '※誤差はここに表示されます';
    cutrepamountdisplay.textContent = '※金額はここに表示されます';

    document.getElementById('money-formula-display').textContent = '※計算式はここに表示されます';
    document.getElementById('cut-money-formula-display').textContent = '※計算式はここに表示されます';
}

// 入力を受け取って計算する関数
function handleInput() {
    const total = parseFloat(amount.value);
    const peoplecount = parseInt(member.value);

    if (isNaN(total) || total <= 0 || isNaN(peoplecount) || peoplecount <= 0) {
        setInitialMessages();
        return;
    }

    calculateAmount(total, peoplecount);
    cutcoincalculate(total, peoplecount);
}

// 通常の金額を計算
function calculateAmount(total, peoplecount) {
    const onepersonmoney = Math.floor(total / peoplecount);
    const moneyerror = total - (onepersonmoney * peoplecount);
    const repmoney = onepersonmoney + moneyerror;

    amountdisplay.textContent = `${onepersonmoney} 円`;
    errordisplay.textContent = `${moneyerror} 円`;
    repamountdisplay.textContent = `${repmoney} 円`;

    const breakdown = `( ${onepersonmoney} × ${peoplecount - 1} ) + ( ${repmoney} × 1 ) = ${total} `;
    document.getElementById('money-formula-display').textContent = breakdown;
}

// 小銭切り捨て時の金額を計算
function cutcoincalculate(total, peoplecount) {
    // 金額の平均を計算
    let onepersonmoney = total / peoplecount;

    // 100の位で四捨五入
    let roundedMoney = Math.round(onepersonmoney / 100) * 100;

    // 他の全員の金額合計を計算
    const totalRounded = roundedMoney * (peoplecount - 1);

    // 代表者の金額を計算
    const repmoney = total - totalRounded;

    // 誤差計算（誤差が小さいことを確認）
    const moneyerror = repmoney - roundedMoney;

    // 結果を画面に表示
    cutamountdisplay.textContent = `${roundedMoney} 円`;
    cuterrordisplay.textContent = `${moneyerror} 円`;
    cutrepamountdisplay.textContent = `${repmoney} 円`;

    // 計算式を表示
    const breakdown = `( ${roundedMoney} × ${peoplecount - 1} ) + ( ${repmoney} × 1 ) = ${total} `;
    document.getElementById('cut-money-formula-display').textContent = breakdown;
}

// 小銭切り捨て時を表示
function showcutcoin() {
    document.getElementById("show-coin").style.display = "none";
    document.getElementById("cut-coin-show").style.display = "block";
    document.getElementById("close-button").style.display = "block";
}

// 小銭切り捨て時を非表示
function cutcoinclose() {
    document.getElementById("show-coin").style.display = "block";
    document.getElementById("cut-coin-show").style.display = "none";
    document.getElementById("close-button").style.display = "none";
}

// 消去ボタン
function deleteinput() {
    amount.value = '';
    member.value = '';
    setInitialMessages();
}