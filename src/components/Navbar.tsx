import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-gray-800">AIkeiba</span>
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link
                to="/"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
              >
                レース一覧
              </Link>
              <Link
                to="/past-results"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
              >
                過去の予測結果
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar