import { useParams } from 'react-router-dom';

// モックデータ
const predictions = {
  1: {
    raceName: '第84回 東京優駿（日本ダービー）',
    raceDate: '2024-05-26',
    venue: '東京',
    raceNumber: 11,
    distance: '2400m',
    surface: '芝',
    predictions: {
      win: [
        { horseNumber: 1, horseName: 'シャドウディーヴァ', odds: 3.5, probability: 28.5 },
        { horseNumber: 7, horseName: 'レシャバール', odds: 4.2, probability: 23.8 },
        { horseNumber: 3, horseName: 'キセキノカガヤキ', odds: 5.1, probability: 19.6 },
      ],
      place: [
        { horseNumber: 1, horseName: 'シャドウディーヴァ', odds: 1.4, probability: 71.4 },
        { horseNumber: 7, horseName: 'レシャバール', odds: 1.6, probability: 62.5 },
        { horseNumber: 3, horseName: 'キセキノカガヤキ', odds: 1.8, probability: 55.6 },
      ],
      trio: [
        { combination: [1, 3, 7], odds: 24.5, probability: 4.1 },
        { combination: [1, 7, 8], odds: 32.1, probability: 3.1 },
        { combination: [3, 7, 9], odds: 41.2, probability: 2.4 },
      ],
    },
  },
};

function RacePrediction() {
  const { raceId } = useParams();
  const raceData = predictions[Number(raceId)];

  if (!raceData) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">レースが見つかりません</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* レース情報ヘッダー */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-4 py-5 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">{raceData.raceName}</h2>
              <p className="mt-1 text-sm text-gray-500">
                {raceData.venue} {raceData.raceNumber}R {raceData.distance} ({raceData.surface})
              </p>
            </div>
            <p className="mt-2 sm:mt-0 text-sm text-gray-500">{raceData.raceDate}</p>
          </div>
        </div>
      </div>

      {/* 単勝予想 */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">単勝予想</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">馬番</th>
                <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">馬名</th>
                <th className="px-4 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase">予想オッズ</th>
                <th className="px-4 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase">予想確率</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {raceData.predictions.win.map((horse) => (
                <tr key={horse.horseNumber}>
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">{horse.horseNumber}</td>
                  <td className="px-4 py-4 text-sm text-gray-900">{horse.horseName}</td>
                  <td className="px-4 py-4 text-sm text-right font-bold text-indigo-600">{horse.odds}</td>
                  <td className="px-4 py-4 text-sm text-right text-gray-900">{horse.probability}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 複勝予想 */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">複勝予想</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">馬番</th>
                <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">馬名</th>
                <th className="px-4 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase">予想オッズ</th>
                <th className="px-4 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase">予想確率</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {raceData.predictions.place.map((horse) => (
                <tr key={horse.horseNumber}>
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">{horse.horseNumber}</td>
                  <td className="px-4 py-4 text-sm text-gray-900">{horse.horseName}</td>
                  <td className="px-4 py-4 text-sm text-right font-bold text-indigo-600">{horse.odds}</td>
                  <td className="px-4 py-4 text-sm text-right text-gray-900">{horse.probability}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3連複予想 */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">3連複予想</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">組み合わせ</th>
                <th className="px-4 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase">予想オッズ</th>
                <th className="px-4 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase">予想確率</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {raceData.predictions.trio.map((combo, index) => (
                <tr key={index}>
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">
                    {combo.combination.join('-')}
                  </td>
                  <td className="px-4 py-4 text-sm text-right font-bold text-indigo-600">{combo.odds}</td>
                  <td className="px-4 py-4 text-sm text-right text-gray-900">{combo.probability}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default RacePrediction;