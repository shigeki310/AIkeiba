import { useState } from 'react';
import { Link } from 'react-router-dom';

// モックデータ - 実際の実装ではAPIから取得
const todaysRaces = {
  venue: '東京',
  date: '2024-05-11',
  races: [
    {
      id: 1,
      number: 1,
      startTime: '10:10',
      name: '3歳未勝利',
      conditions: '3歳未勝利 / ダート1400m / 本賞金500万円',
    },
    {
      id: 2,
      number: 2,
      startTime: '10:40',
      name: '3歳500万下',
      conditions: '3歳500万下 / 芝1600m / 本賞金750万円',
    },
    {
      id: 3,
      number: 3,
      startTime: '11:10',
      name: '4歳以上500万下',
      conditions: '4歳以上500万下 / ダート1600m / 本賞金750万円',
    },
    {
      id: 4,
      number: 4,
      startTime: '11:40',
      name: '4歳以上1000万下',
      conditions: '4歳以上1000万下 / 芝2000m / 本賞金1000万円',
    },
    {
      id: 5,
      number: 5,
      startTime: '12:30',
      name: '新緑賞',
      conditions: '3歳以上1600万下 / 芝1800m / 本賞金1800万円',
    },
    {
      id: 6,
      number: 6,
      startTime: '13:00',
      name: '春風ステークス',
      conditions: '4歳以上オープン / ダート1400m / 本賞金2400万円',
    },
    {
      id: 7,
      number: 7,
      startTime: '13:30',
      name: '若葉ステークス',
      conditions: '3歳オープン / 芝2000m / 本賞金2400万円',
    },
    {
      id: 8,
      number: 8,
      startTime: '14:00',
      name: '桜花賞',
      conditions: '3歳牝馬 / G1 / 芝1600m / 本賞金1億3000万円',
    },
    {
      id: 9,
      number: 9,
      startTime: '14:35',
      name: '4歳以上1000万下',
      conditions: '4歳以上1000万下 / 芝1400m / 本賞金1000万円',
    },
    {
      id: 10,
      number: 10,
      startTime: '15:10',
      name: '春雨ステークス',
      conditions: '4歳以上オープン / 芝2400m / 本賞金2400万円',
    },
    {
      id: 11,
      number: 11,
      startTime: '15:45',
      name: '4歳以上500万下',
      conditions: '4歳以上500万下 / ダート1200m / 本賞金750万円',
    },
    {
      id: 12,
      number: 12,
      startTime: '16:20',
      name: '3歳500万下',
      conditions: '3歳500万下 / 芝1400m / 本賞金750万円',
    },
  ],
};

function RaceList() {
  const [selectedVenue] = useState(todaysRaces);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* ヘッダー */}
      <div className="bg-[#1a5135] text-white p-6 rounded-t-lg">
        <h2 className="text-2xl font-bold">
          {selectedVenue.venue}競馬場 {selectedVenue.date}
        </h2>
      </div>

      {/* レース一覧 */}
      <div className="bg-white shadow-lg rounded-b-lg overflow-hidden">
        <div className="max-h-[calc(100vh-250px)] overflow-y-auto">
          {selectedVenue.races.map((race) => (
            <Link
              key={race.id}
              to={`/prediction/${race.id}`}
              className="block border-b border-gray-200 hover:bg-green-50 transition-colors"
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl font-bold text-[#1a5135]">
                      {race.number}R
                    </span>
                    <span className="text-lg font-medium text-gray-600">
                      {race.startTime}
                    </span>
                  </div>
                  {race.name.includes('ステークス') || race.name.includes('賞') ? (
                    <span className="px-3 py-1 bg-[#1a5135] text-white rounded-full text-sm">
                      重賞
                    </span>
                  ) : null}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {race.name}
                </h3>
                <p className="text-sm text-gray-600">{race.conditions}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* フッター */}
      <div className="mt-6 flex justify-end space-x-4">
        <button
          type="button"
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
        >
          前日のレース
        </button>
        <button
          type="button"
          className="px-4 py-2 bg-[#1a5135] text-white rounded-md hover:bg-[#143f28] transition-colors"
        >
          翌日のレース
        </button>
      </div>
    </div>
  );
}

export default RaceList;