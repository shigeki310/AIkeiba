import { Link } from 'react-router-dom';
import React, { useState } from 'react';

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

function RaceList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-10 gap-6">
      <div className="md:col-span-3">
        <div className="bg-white rounded-lg shadow">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-xl font-semibold text-gray-900">今週のピックアップレース</h2>
          </div>
          <ul className="divide-y divide-gray-200">
            {races.map((race) => (
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
      <div className="md:col-span-7">
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
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    第83回 東京優駿（日本ダービー）
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    2023-05-28
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    イクイノックス
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    イクイノックス
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                    95%
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    第64回 宝塚記念
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    2023-06-25
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    スターズオンアース
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    スターズオンアース
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                    90%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RaceList;