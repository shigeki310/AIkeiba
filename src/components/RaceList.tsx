import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Menu } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

// モックデータ
const races = [
  {
    id: 1,
    name: '第84回 東京優駿（日本ダービー）',
    date: '2024-05-26',
    venue: '東京',
    grade: 'G1',
    day: '日'
  },
  {
    id: 2,
    name: '第65回 宝塚記念',
    date: '2024-06-23',
    venue: '阪神',
    grade: 'G1',
    day: '日'
  },
  {
    id: 3,
    name: '安田記念',
    date: '2024-06-22',
    venue: '東京',
    grade: 'G1',
    day: '土'
  },
];

const venues = [
  { id: 1, name: '東京', days: ['土', '日'] },
  { id: 2, name: '阪神', days: ['土', '日'] },
  { id: 3, name: '中山', days: ['土', '日'] },
  { id: 4, name: '京都', days: ['土', '日'] },
];

function RaceList() {
  const [selectedVenue, setSelectedVenue] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const filteredRaces = races.filter(race => {
    if (!selectedVenue && !selectedDay) return true;
    if (selectedVenue && !selectedDay) return race.venue === selectedVenue;
    if (!selectedVenue && selectedDay) return race.day === selectedDay;
    return race.venue === selectedVenue && race.day === selectedDay;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-10 gap-6">
      <div className="md:col-span-3">
        <div className="space-y-6">
          <div className="flex space-x-4">
            <Menu as="div" className="relative inline-block text-left">
              <Menu.Button className="inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                {selectedVenue || '競馬場を選択'}
                <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
              </Menu.Button>
              <Menu.Items className="absolute left-0 z-10 mt-2 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  {venues.map((venue) => (
                    <Menu.Item key={venue.id}>
                      {({ active }) => (
                        <button
                          onClick={() => setSelectedVenue(venue.name)}
                          className={`${
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                          } block w-full px-4 py-2 text-left text-sm`}
                        >
                          {venue.name}
                        </button>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </Menu>

            <Menu as="div" className="relative inline-block text-left">
              <Menu.Button className="inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                {selectedDay || '開催日を選択'}
                <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
              </Menu.Button>
              <Menu.Items className="absolute left-0 z-10 mt-2 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  {['土', '日'].map((day) => (
                    <Menu.Item key={day}>
                      {({ active }) => (
                        <button
                          onClick={() => setSelectedDay(day)}
                          className={`${
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                          } block w-full px-4 py-2 text-left text-sm`}
                        >
                          {day}曜日
                        </button>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </Menu>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-xl font-semibold text-gray-900">今週のレース</h2>
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
                          <p className="ml-2 text-sm text-gray-500">{race.date} ({race.day})</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="md:col-span-7">
        <div className="bg-white rounded-lg shadow">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-xl font-semibold text-gray-900">過去の予測結果</h2>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <PastResults />
          </div>
        </div>
      </div>
    </div>
  );
}

// 過去の予測結果コンポーネント
function PastResults() {
  const results = [
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

  return (
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
        {results.map((result) => (
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
  );
}

export default RaceList