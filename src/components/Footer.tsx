import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* サービス情報 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">AIKeiba</h3>
            <p className="text-gray-600 text-sm">
              最新のAI技術を活用した競馬予想サービス。データに基づいた客観的な予測で、<br />
              あなたの競馬体験をより豊かにします。
            </p>
          </div>

          {/* クイックリンク */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              クイックリンク
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-gray-900 text-sm">
                  ホーム
                </Link>
              </li>
              <li>
                <Link to="/past-races" className="text-gray-600 hover:text-gray-900 text-sm">
                  過去のレース
                </Link>
              </li>
              <li>
                <Link to="/premium" className="text-gray-600 hover:text-gray-900 text-sm">
                  プレミアムサービス
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} AIKeiba. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}