import { useParams } from 'react-router-dom';

// モックデータ
const racesByVenue = {
  '東京': {
    '11': [
      {
        id: 1,
        number: 1,
        startTime: '10:10',
        name: '3歳未勝利',
        conditions: '3歳未勝利 / 芝1600m',
      },
      {
        id: 2,
        number: 2,
        startTime: '10:40',
        name: '3歳上500万下',
        conditions: '3歳以上500万下 / ダート1400m',
      },
      {
        id: 3,
        number: 3,
        startTime: '11:10',
        name: '3歳上1000万下',
        conditions: '3歳以上1000万下 / 芝2000m',
      },
      {
        id: 4,
        number: 4,
        startTime: '11:40',
        name: '障害4歳上オープン',
        conditions: '障害4歳以上オープン / 障害3200m',
      },
      {
        id: 5,
        number: 5,
        startTime: '12:30',
        name: '3歳上500万下',
        conditions: '3歳以上500万下 / 芝1400m',
      },
      {
        id: 6,
        number: 6,
        startTime: '13:00',
        name: '3歳上1000万下',
        conditions: '3歳以上1000万下 / ダート1600m',
      },
      {
        id: 7,
        number: 7,
        startTime: '13:30',
        name: '3歳上1600万下',
        conditions: '3歳以上1600万下 / 芝2400m',
      },
      {
        id: 8,
        number: 8,
        startTime: '14:00',
        name: '4歳上オープン',
        conditions: '4歳以上オープン / ダート2100m',
      },
      {
        id: 9,
        number: 9,
        startTime: '14:35',
        name: '3歳上1000万下',
        conditions: '3歳以上1000万下 / 芝1800m',
      },
      {
        id: 10,
        number: 10,
        startTime: '15:10',
        name: '新潟記念',
        conditions: 'G3 / 芝2000m',
      },
      {
        id: 11,
        number: 11,
        startTime: '15:45',
        name: '3歳上500万下',
        conditions: '3歳以上500万下 / ダート1200m',
      },
      {
        id: 12,
        number: 12,
        startTime: '16:25',
        name: '3歳上オープン',
        conditions: '3歳以上オープン / 芝1600m',
      },
    ],
  },
};

export default function RaceListByDay() {
  const { venue, day } = useParams();

  if (!venue || !day || !racesByVenue[venue] || !racesByVenue[venue][day]) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">レース情報が見つかりません</h2>
      </div>
    );
  }

  const races = racesByVenue[venue][day];

  return (
    <div className="bg-white rounded-lg shadow mx-auto max-w-7xl">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">
          {venue}競馬場 {day}日目 レース一覧
        </h2>
      </div>
      <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
        <ul className="divide-y divide-gray-200">
          {races.map((race) => (
            <li key={race.id}>
              <a
                href={`/prediction/${race.id}`}
                className="block hover:bg-gray-50 transition duration-150 px-4 py-4 sm:px-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center mb-2 sm:mb-0">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-800 font-semibold text-sm">
                      {race.number}R
                    </span>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">{race.name}</p>
                      <p className="text-sm text-gray-500 mt-1">{race.conditions}</p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">{race.startTime}</div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}