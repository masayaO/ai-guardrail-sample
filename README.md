# ai-guardrail-sample

`React + TypeScript + Vite + TanStack Router + Tailwind + Zustand` で構築した ToDo サンプルアプリです。

## セットアップ

```bash
npm install
```

## 開発サーバー起動

```bash
npm run dev
```

## 本番ビルド

```bash
npm run build
```

## ルーティング

- `/` -> `/todos` へリダイレクト
- `/todos` -> ToDo 一覧ページ

## 実装機能

- ToDoの追加
- ToDoの編集（ダイアログ）
- ToDoの削除
- 完了/未完了の切り替え
- フィルタ表示（すべて / 未完了 / 完了）
- 完了済みの一括削除
- `localStorage` 永続化（キー: `todo-app-v1`）

## ディレクトリ責務

- `src/routes`: TanStack Router の file-based route 定義（薄いエントリのみ）
- `src/features`: 画面実装（ToDoページ本体と画面部品）
- `src/ui`: 共通UIコンポーネント
- `src/store`: 状態管理（Zustand）
- `src/lib`: 共通ユーティリティ・永続化ヘルパ
- `src/types`: 型定義

## ルーター運用ルール

- `src/routeTree.gen.ts` は自動生成ファイルです。
- `src/routeTree.gen.ts` は手編集しません。

## 仕様メモ

- UI文言は日本語固定です。
- 入力は前後空白を `trim` し、空文字を拒否します。
- タイトル最大長は100文字です。
- `localStorage` の読み込み失敗時は空配列にフォールバックします。

## 手動確認チェックリスト

1. `/` にアクセスして `/todos` へ遷移する
2. ToDoを追加できる
3. 完了/未完了を切り替えられる
4. タイトルを編集できる
5. ToDoを削除できる
6. フィルタで表示が切り替わる
7. リロード後もデータが保持される
8. 空入力・空白のみ入力が拒否される
9. `localStorage` が壊れていてもクラッシュしない
