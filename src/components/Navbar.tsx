import { Link } from 'react-router-dom';
import { Menu } from '@headlessui/react';
import { ChevronDownIcon, UserCircleIcon } from '@heroicons/react/20/solid';
import { useAuthStore } from '../store/authStore';

// モックデータ
const races = [
  { id: 1, name: '2回東京11日', venue: '東京', round: 2, day: 11 },
  { id: 2, name: '2回京都11日', venue: '京都', round: 2, day: 11 },
  { id: 3, name: '2回東京12日', venue: '東京', round: 2, day: 12 },
  { id: 4, name: '2回京都12日', venue: '京都', round: 2, day: 12 },
];

function Navbar() {
  const { isAuthenticated, logout, profile } = useAuthStore()

  return (
    <nav className="bg-[#e8f5e9] shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-gray-800">AIkeiba</span>
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Menu as="div" className="relative">
                <Menu.Button className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900">
                  今週のレース
                  <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                </Menu.Button>
                <Menu.Items className="absolute left-0 z-10 mt-2 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {races.map((race) => (
                      <Menu.Item key={race.id}>
                        {({ active }) => (
                          <Link
                            to={`/prediction/${race.id}`}
                            className={`${
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                            } block px-4 py-2 text-sm`}
                          >
                            {race.name}
                          </Link>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Menu>
              <Link
                to="/past-results"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
              >
                過去の予測結果
              </Link>
              {isAuthenticated && (
                <Link
                  to="/premium"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
                >
                  プレミアムサービス
                </Link>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/signup"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  新規会員登録
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center px-4 py-2 border border-indigo-600 text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
                >
                  ログイン
                </Link>
              </>
            ) : (
              <Menu as="div" className="relative">
                <Menu.Button className="flex items-center">
                  {profile?.avatar_url ? (
                    <img
                      src={profile.avatar_url}
                      alt="Profile"
                      className="h-8 w-8 rounded-full"
                    />
                  ) : (
                    <UserCircleIcon className="h-8 w-8 text-gray-400" />
                  )}
                </Menu.Button>
                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/settings"
                        className={`${
                          active ? 'bg-gray-100' : ''
                        } block px-4 py-2 text-sm text-gray-700`}
                      >
                        設定
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={logout}
                        className={`${
                          active ? 'bg-gray-100' : ''
                        } block w-full text-left px-4 py-2 text-sm text-gray-700`}
                      >
                        ログアウト
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Menu>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar