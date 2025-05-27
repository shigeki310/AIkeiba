import { Link } from 'react-router-dom';
import { useState } from 'react';
import VenueSelector from './VenueSelector';

// モックデータ
const races = [
  {
    id: 1,
    name: '第84回 東京優駿（日本ダービー）',
    date: '2024-05-26',
    venue: '東京',
    grade: 'G1',
  },
  {
    id: 2,
    name: '第65回 宝塚記念',
    date: '2024-06-23',
    venue: '阪神',
    grade: 'G1',
  },
];

const pickupRaces = [
  {
    id: 3,
    name: '第65回 有馬記念',
    date: '2024-12-23',
    venue: '中山',
    grade: 'G1',
    description: '今年の総決算！年末の大一番',
  },
  {
    id: 4,
    name: '第41回 ジャパンカップ',
    date: '2024-11-24',
    venue: '東京',
    grade: 'G1',
    description: '世界の強豪馬が集結する国際競走',
  },
];

function RaceList() {
  const [selectedVenue, setSelectedVenue] = useState<string | null>(null);

  const filteredRaces = selectedVenue
    ? races.filter(race => race.venue === selectedVenue.split('競馬場')[0])
    : races;

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* 左コンテナ (30%) */}
      <div className="w-full lg:w-[30%] space-y-6">
        <VenueSelector
          selectedVenue={selectedVenue}
          onVenueChange={setSelectedVenue}
        />
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">今週のピックアップレース</h2>
          <div className="space-y-6">
            {pickupRaces.map((race) => (
              <div key={race.id} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                <div className="flex items-center mb-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {race.grade}
                  </span>
                  <h3 className="ml-2 text-lg font-medium text-gray-900">{race.name}</h3>
                </div>
                <p className="text-sm text-gray-600 mb-2">{race.description}</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{race.venue}競馬場</span>
                  <span>{race.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 右コンテナ (70%) */}
      <div className="w-full lg:w-[70%]">
        <div className="bg-white rounded-lg shadow-lg">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">今週のレース</h2>
          </div>
          <div className="overflow-auto max-h-[calc(100vh-300px)]">
            <ul className="divide-y divide-gray-200">
              {filteredRaces.map((race) => (
                <li key={race.id}>
                  <Link
                    to={`/prediction/${race.id}`}
                    className="block hover:bg-gray-50 p-6"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex items-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {race.grade}
                        </span>
                        <p className="ml-2 text-sm font-medium text-gray-900">
                          {race.name}
                        </p>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <span className="mr-4">{race.venue}</span>
                        <span>{race.date}</span>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RaceList