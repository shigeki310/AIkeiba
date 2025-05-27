import React, { useState } from 'react';
import { useParams } from 'react-router-dom';


// モックデータ
const predictions = {
  1: {
    horses: [
      {
        number: 1,
        name: 'キタサンブラック',
        winProbability: 0.25,
        placeProbability: 0.45,
        trioProbability: 0.15,
      },
      {
        number: 2,
        name: 'アーモンドアイ',
        winProbability: 0.30,
        placeProbability: 0.50,
        trioProbability: 0.20,
      },
      // 他の馬を追加
    ],
  },
};

function RacePrediction() {
  const { raceId } = useParams();
  const raceData = predictions[Number(raceId)];

  if (!raceData) {
    return <div>レースが見つかりません</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-4 py-5 sm:px-6">
        <h2 className="text-xl font-semibold text-gray-900">予測結果</h2>
      </div>
      <div className="px-4 py-5 sm:p-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                馬番
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                馬名
              </th>
              <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                単勝確率
              </th>
              <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                複勝確率
              </th>
              <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                3連複確率
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {raceData.horses.map((horse) => (
              <tr key={horse.number}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {horse.number}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {horse.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                  {(horse.winProbability * 100).toFixed(1)}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                  {(horse.placeProbability * 100).toFixed(1)}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                  {(horse.trioProbability * 100).toFixed(1)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RacePrediction