'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

userNameInput.onkeydown = event => {
    if ( event.key === 'Enter'){
     assessmentButton.onclick();
    }
};

assessmentButton.onclick = () => {
    const userName = userNameInput.value;
    if (userName.length === 0){
        //名前が空の時は処理を終了する
        return;
    }
    console.log(userName);
    // 診断結果表示エリアの作成
    resultDivided.innerText = "";
    const header = document.createElement('h3');
    header.innerText = '診断結果';
    resultDivided.appendChild(header);

    const paragraph = document.createElement('p');
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);

    //TODO ツイートエリアの作成
    tweetDivided.innerText = "";
    const anchor = document.createElement('a')
    const hrefValue =
    'https://twitter.com/intent/tweet?button_hashtag=' + encodeURIComponent('あなたのいいところ') + '&ref_src=twsrc%5Etfw';

    anchor.setAttribute('href',hrefValue);
    anchor.className ='twitter-hashtag-button';
    anchor.setAttribute('data-text',result);
    anchor.innerText = 'Tweet #あなたのいいところ';

    tweetDivided.appendChild(anchor);
    
    const script = document.createElement('script');
    script.setAttribute('src','https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);
};

const answers  = [
'{userName}のいいところは声です。{userName}の特徴的な声は人を惹きつけ、心に残ります。',
'{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
'{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
'{userName}のいいところは厳しさです。{userName}の厳しさがものごとを成功に導きます。',
'{userName}のいいところは知識です。博識な{userName}を頼りにする人がいます。',
'{userName}のいいところはユニークさです。{userName}だけのその特徴が人を楽しくさせます。',
'{userName}のいいところは用心深さです。{userName}の洞察に助けられる人がいます。',
'{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さは人の気を惹きます。',
'{userName}のいいところは決断力です。{userName}がする決断に助けられる人がいます。',
'{userName}のいいところは思いやりです。{userName}に気をかけてもらった人は感謝していることでしょう。',
'{userName}のいいところは感受性です。{userName}が感じたことに共感し、わかりあえる人がいます。',
'{userName}のいいところは節度です。強引すぎない{userName}の考えに感謝している人がいます。',
'{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えは魅力的です。',
'{userName}のいいところは気配りです。{userName}の配慮に救われている人がいます。',
'{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
'{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が評価されているでしょう。'
]

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */
 function assessment(userName) {
    //全文字のコード番号を取得してそれを足し合わせる
    let sumOfCharCode = 0;
    for (let i = 0; i < userName.length; i++){
        sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
    }

    //文字のコード番号の合計を回答の数で割って添字の数値を求める
    const index = sumOfCharCode % answers.length;
    let result = answers[index];

    result = result.replaceAll('{userName}',userName)
    return result;
}

//テスト
console.assert(
    assessment('太郎') === assessment('太郎'),
    '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
);