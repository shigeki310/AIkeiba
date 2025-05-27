import { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-hot-toast';
import { useAuthStore } from '../store/authStore';
import { supabase } from '../lib/supabase';

interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  notificationFrequency: 'realtime' | 'daily' | 'weekly';
}

export default function UserSettings() {
  const { profile, updateProfile } = useAuthStore();
  const [displayName, setDisplayName] = useState(profile?.display_name || '');
  const [isUploading, setIsUploading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailNotifications: true,
    pushNotifications: false,
    notificationFrequency: 'daily'
  });
  const [isDirty, setIsDirty] = useState(false);

  const onDrop = async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    try {
      setIsUploading(true);
      const file = acceptedFiles[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${profile?.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      await updateProfile({ 
        id: profile?.id as string,
        avatar_url: publicUrl 
      });

      toast.success('プロフィール画像を更新しました');
    } catch (error) {
      toast.error('画像のアップロードに失敗しました');
    } finally {
      setIsUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxFiles: 1,
    multiple: false
  });

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile({
        id: profile?.id as string,
        display_name: displayName
      });
      toast.success('プロフィールを更新しました');
      setIsDirty(false);
    } catch (error) {
      toast.error('プロフィールの更新に失敗しました');
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error('新しいパスワードが一致しません');
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;

      toast.success('パスワードを更新しました');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      toast.error('パスワードの更新に失敗しました');
    }
  };

  const handleNotificationUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Here you would typically update notification settings in your database
      toast.success('通知設定を更新しました');
    } catch (error) {
      toast.error('通知設定の更新に失敗しました');
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="space-y-6">
        {/* プロフィール画像セクション */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">プロフィール画像</h3>
          <div 
            {...getRootProps()} 
            className={`mt-2 flex justify-center rounded-lg border-2 border-dashed ${
              isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'
            } px-6 py-10`}
          >
            <div className="text-center">
              {profile?.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt="Profile"
                  className="mx-auto h-32 w-32 rounded-full"
                />
              ) : (
                <div className="mx-auto h-32 w-32 rounded-full bg-gray-200" />
              )}
              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                <input {...getInputProps()} />
                <span className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600">
                  {isUploading ? '画像をアップロード中...' : '画像をアップロード'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 基本情報セクション */}
        <form onSubmit={handleProfileUpdate} className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">基本情報</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                メールアドレス
              </label>
              <input
                type="email"
                id="email"
                value={profile?.email || ''}
                disabled
                className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="displayName" className="block text-sm font-medium text-gray-700">
                表示名
              </label>
              <input
                type="text"
                id="displayName"
                value={displayName}
                onChange={(e) => {
                  setDisplayName(e.target.value);
                  setIsDirty(true);
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!isDirty}
                className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
              >
                保存
              </button>
            </div>
          </div>
        </form>

        {/* パスワード変更セクション */}
        <form onSubmit={handlePasswordChange} className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">パスワード変更</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                現在のパスワード
              </label>
              <input
                type="password"
                id="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                新しいパスワード
              </label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                新しいパスワード（確認）
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!currentPassword || !newPassword || !confirmPassword}
                className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
              >
                パスワードを変更
              </button>
            </div>
          </div>
        </form>

        {/* 通知設定セクション */}
        <form onSubmit={handleNotificationUpdate} className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">通知設定</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="flex-grow flex flex-col">
                <span className="text-sm font-medium text-gray-900">メール通知</span>
                <span className="text-sm text-gray-500">重要なお知らせをメールで受け取る</span>
              </span>
              <button
                type="button"
                onClick={() => setNotifications(prev => ({
                  ...prev,
                  emailNotifications: !prev.emailNotifications
                }))}
                className={`${
                  notifications.emailNotifications ? 'bg-indigo-600' : 'bg-gray-200'
                } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
              >
                <span
                  className={`${
                    notifications.emailNotifications ? 'translate-x-5' : 'translate-x-0'
                  } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span className="flex-grow flex flex-col">
                <span className="text-sm font-medium text-gray-900">プッシュ通知</span>
                <span className="text-sm text-gray-500">ブラウザでプッシュ通知を受け取る</span>
              </span>
              <button
                type="button"
                onClick={() => setNotifications(prev => ({
                  ...prev,
                  pushNotifications: !prev.pushNotifications
                }))}
                className={`${
                  notifications.pushNotifications ? 'bg-indigo-600' : 'bg-gray-200'
                } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
              >
                <span
                  className={`${
                    notifications.pushNotifications ? 'translate-x-5' : 'translate-x-0'
                  } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                />
              </button>
            </div>

            <div>
              <label htmlFor="frequency" className="block text-sm font-medium text-gray-700">
                通知頻度
              </label>
              <select
                id="frequency"
                value={notifications.notificationFrequency}
                onChange={(e) => setNotifications(prev => ({
                  ...prev,
                  notificationFrequency: e.target.value as 'realtime' | 'daily' | 'weekly'
                }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="realtime">リアルタイム</option>
                <option value="daily">1日1回</option>
                <option value="weekly">週1回</option>
              </select>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                設定を保存
              </button>
            </div>
          </div>
        </form>

        {/* アカウント削除セクション */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-red-600 mb-4">アカウント削除</h3>
          <p className="text-sm text-gray-500 mb-4">
            アカウントを削除すると、すべてのデータが完全に削除され、復元することはできません。
          </p>
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            onClick={() => {
              if (window.confirm('本当にアカウントを削除しますか？この操作は取り消せません。')) {
                // アカウント削除のロジックをここに実装
              }
            }}
          >
            アカウントを削除
          </button>
        </div>
      </div>
    </div>
  );
}