/*
  # ユーザープロファイルテーブルの作成

  1. 新規テーブル
    - `profiles`
      - `id` (uuid, primary key) - ユーザーID
      - `email` (text, unique) - メールアドレス
      - `display_name` (text) - 表示名
      - `avatar_url` (text, nullable) - アバター画像URL
      - `created_at` (timestamptz) - 作成日時
      - `updated_at` (timestamptz) - 更新日時

  2. セキュリティ
    - RLSの有効化
    - 認証済みユーザーのみが自身のプロファイルを読み書き可能
*/

CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  email text UNIQUE NOT NULL,
  display_name text,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 自身のプロファイルの読み取りを許可
CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- 自身のプロファイルの更新を許可
CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- プロファイル作成時のトリガー
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (new.id, new.email);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();