// モックデータ
const pastResults = [
  {
    id: 1,
    name: '第83回 東京優駿（日本ダービー）',
    date: '2023-05-28',
    predictedWinner: 'イクイノックス',
    actualWinner: 'イクイノックス',
    accuracy: 95,
  },
  {
    id: 2,
    name: '第64回 宝塚記念',
    date: '2023-06-25',
    predictedWinner: 'スターズオンアース',
    actualWinner: 'スターズオンアース',
    accuracy: 90,
  },
];

function PastResults() {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-4 py-5 sm:px-6">
        <h2 className="text-xl font-semibold text-gray-900">過去の予測結果</h2>
      </div>
      <div className="px-4 py-5 sm:p-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                レース名
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                開催日
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                予想1着
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                実際の1着
              </th>
              <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                的中率
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {pastResults.map((result) => (
              <tr key={result.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {result.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {result.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {result.predictedWinner}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {result.actualWinner}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                  {result.accuracy}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PastResults