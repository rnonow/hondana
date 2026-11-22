# わたしの本棚

スマホで使う蔵書管理アプリ（試作）。

- 本棚に背表紙を並べ、長押しで1冊ずつ好きな段・位置へ動かせる
- 好きな本は表紙を見せて飾れる（面陳）
- カメラでISBNバーコードを読み取って登録（openBD → Google Books）
- フォローした著者・シリーズの新刊チェック（Google Books）
- ホーム画面に追加してアプリのように使える（PWA）

データはブラウザの localStorage に保存されます。端末を変える時は「データ」から書き出し・読み込みしてください。

`lib/zxing-reader.js` と `lib/zxing_reader.wasm` は [zxing-wasm](https://github.com/Sec-ant/zxing-wasm) 3.1.5（MIT、中身は ZXing-C++）です。
