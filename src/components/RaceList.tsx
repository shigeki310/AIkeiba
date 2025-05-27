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
  // 他のレースを追加
];

function RaceList() {
  const [selectedVenue, setSelectedVenue] = useState<string | null>(null);

  const filteredRaces = selectedVenue
    ? races.filter(race => race.venue === selectedVenue.split('競馬場')[0])
    : races;

  return (
    <div className="space-y-6">
      <VenueSelector
        selectedVenue={selectedVenue}
        onVenueChange={setSelectedVenue}
      />
      <div className="bg-white rounded-lg shadow">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-xl font-semibold text-gray-900">開催レース一覧</h2>
        </div>
        <ul className="divide-y divide-gray-200">
          {filteredRaces.map((race) => (
            <li key={race.id}>
              <Link
                to={`/prediction/${race.id}`}
                className="block hover:bg-gray-50"
              >
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {race.grade}
                      </span>
                      <p className="ml-2 text-sm font-medium text-gray-900">
                        {race.name}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <p className="text-sm text-gray-500">{race.venue}</p>
                      <p className="ml-2 text-sm text-gray-500">{race.date}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default RaceList