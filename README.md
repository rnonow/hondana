# わたしの本棚

スマホで使う蔵書管理アプリ（試作）。

- 本棚に背表紙を並べ、長押しで1冊ずつ好きな段・位置へ動かせる
- 好きな本は表紙を見せて飾れる（面陳）
- カメラでISBNバーコードを読み取って登録（openBD → Google Books）
- フォローした著者・シリーズの新刊チェック（Google Books）
- ホーム画面に追加してアプリのように使える（PWA）

データはブラウザの localStorage に保存されます。端末を変える時は「データ」から書き出し・読み込みしてください。

`lib/html5-qrcode.min.js` は [html5-qrcode](https://github.com/mebjas/html5-qrcode) 2.3.8（Apache-2.0）です。
