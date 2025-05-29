import { useState } from 'react';
import { Link } from 'react-router-dom';

// モックデータ
const pastRaces = [
  {
    id: 1,
    name: '第83回 東京優駿（日本ダービー）',
    date: '2025-05-25',
    venue: '東京',
    grade: 'G1',
    distance: '2400m',
    surface: '芝',
    winner: 'イクイノックス',
    predictionAccuracy: 95,
    predictionCorrect: true
  },
  {
    id: 2,
    name: '第64回 宝塚記念',
    date: '2025-06-23',
    venue: '阪神',
    grade: 'G1',
    distance: '2200m',
    surface: '芝',
    winner: 'スターズオンアース',
    predictionAccuracy: 90,
    predictionCorrect: true
  },
  // 他のレースデータ...
];

export default function PastRaces() {
  const [dateFilter, setDateFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // 日付でフィルタリング
  const filteredRaces = dateFilter
    ? pastRaces.filter(race => race.date >= dateFilter)
    : pastRaces;

  // ページネーション
  const totalPages = Math.ceil(filteredRaces.length / itemsPerPage);
  const currentRaces = filteredRaces.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 sm:mb-0">過去のレース一覧</h2>
            <div className="flex items-center space-x-4">
              <label htmlFor="dateFilter" className="text-sm text-gray-700">
                開催日で絞り込み
              </label>
              <input
                type="date"
                id="dateFilter"
                min="2025-05-01"
                max={new Date().toISOString().split('T')[0]}
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  開催日
                </th>
                <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  レース名
                </th>
                <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  開催場所
                </th>
                <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  グレード
                </th>
                <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  勝馬
                </th>
                <th className="px-4 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  的中率
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentRaces.map((race) => (
                <tr key={race.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {race.date}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Link
                        to={`/prediction/${race.id}`}
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-900"
                      >
                        {race.name}
                      </Link>
                      {race.predictionCorrect && (
                        <img 
                          src="https://raw.githubusercontent.com/stackblitz/stackblitz-icons/main/public/target.svg"
                          alt="的中"
                          className="w-5 h-5 ml-2"
                        />
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {race.venue}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {race.grade}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {race.winner}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                    {race.predictionAccuracy}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ページネーション */}
        {totalPages > 1 && (
          <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setCurrentPage(page => Math.max(page - 1, 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                前へ
              </button>
              <button
                onClick={() => setCurrentPage(page => Math.min(page + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                次へ
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  全<span className="font-medium"> {filteredRaces.length} </span>
                  件中
                  <span className="font-medium"> {(currentPage - 1) * itemsPerPage + 1} </span>
                  -
                  <span className="font-medium">
                    {' '}
                    {Math.min(currentPage * itemsPerPage, filteredRaces.length)}{' '}
                  </span>
                  件を表示
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        page === currentPage
                          ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}