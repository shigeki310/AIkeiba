import React, { useState } from 'react';
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
        {
          horseNumber: 1,
          horseName: 'シャドウディーヴァ',
          odds: 3.5,
          probability: 28.5,
          analysis: {
            prediction: '1着予想',
            probability: '28.5%',
            reasons: [
              '前走で見せた末脚の伸びが顕著で、2400mの距離適性が高い',
              '父系統の産駒は東京芝2400mで好走率が高く（勝率24.3%）、血統面での適性が高い',
              '直近5走のラップタイムの上昇率が安定しており、状態が良好',
              '同条件での過去実績が優れており、特に最終コーナーからの加速力が際立つ'
            ]
          }
        },
        {
          horseNumber: 3,
          horseName: 'ドリームソルジャー',
          odds: 4.2,
          probability: 23.8,
          analysis: {
            prediction: '1着予想',
            probability: '23.8%',
            reasons: [
              '前走での瞬発力が際立っており、勝負所での切れ味が魅力',
              '東京コースでの成績が抜群（2戦2勝）で、コース適性は申し分なし',
              '追い切りの動きが良好で、仕上がり具合は上々',
              '相性の良い騎手との組み合わせで、信頼度が高い'
            ]
          }
        },
        {
          horseNumber: 7,
          horseName: 'ライトニングボルト',
          odds: 5.8,
          probability: 17.2,
          analysis: {
            prediction: '1着予想',
            probability: '17.2%',
            reasons: [
              '前走から斤量が減少し、条件面での好転が見られる',
              '長距離適性が高く、終盤の粘り強さが持ち味',
              '雨天時の実績も十分で、馬場状態を問わない適応力の高さ',
              '上がり3ハロンの時計が安定しており、終盤の伸びしろが期待できる'
            ]
          }
        }
      ],
      place: [
        {
          horseNumber: 1,
          horseName: 'シャドウディーヴァ',
          odds: 1.4,
          probability: 71.4,
          analysis: {
            prediction: '複勝圏内予想',
            probability: '71.4%',
            reasons: [
              '安定した脚質で、どのようなレース展開でも対応が可能',
              '過去の重賞レースでの複勝圏内率が高い（80%）',
              '騎手との相性が良く、特に東京コースでの成績が優秀'
            ]
          }
        },
        {
          horseNumber: 3,
          horseName: 'ドリームソルジャー',
          odds: 1.6,
          probability: 62.5,
          analysis: {
            prediction: '複勝圏内予想',
            probability: '62.5%',
            reasons: [
              '前走での上がり3ハロンが優れており、末脚の確実性が高い',
              '重賞での複勝圏内実績が豊富で、大舞台での経験値が十分',
              '調教師の仕上げ方に定評があり、レースへの準備は万全'
            ]
          }
        },
        {
          horseNumber: 7,
          horseName: 'ライトニングボルト',
          odds: 2.1,
          probability: 47.6,
          analysis: {
            prediction: '複勝圏内予想',
            probability: '47.6%',
            reasons: [
              '前走での敗因が明確で、今回は改善策が講じられている',
              '同舞台での好走実績があり、コース適性は証明済み',
              '追い切りでは余力を残しながらも好時計をマーク'
            ]
          }
        }
      ],
      trio: [
        {
          combination: [1, 3, 7],
          odds: 24.5,
          probability: 4.1,
          analysis: {
            prediction: '3連複予想（1-3-7）',
            probability: '4.1%',
            reasons: [
              '3頭とも東京コースでの好走実績があり、コース適性が高い',
              '各馬の脚質が異なり、どのような展開でも対応が可能',
              '3頭の相性が良く、過去のレースでも好走している',
              '上位人気馬の実力が拮抗しており、この組み合わせの可能性が高い'
            ]
          }
        },
        {
          combination: [1, 3, 5],
          odds: 32.1,
          probability: 3.1,
          analysis: {
            prediction: '3連複予想（1-3-5）',
            probability: '3.1%',
            reasons: [
              '3頭の適性距離が今回の条件と合致している',
              '前走での各馬の上がり3ハロンが優秀で、終盤の脚質が合う',
              '過去の対戦成績から、好相性が証明されている',
              '騎手同士の連携が良好で、レース展開での協調性が期待できる'
            ]
          }
        },
        {
          combination: [3, 7, 8],
          odds: 41.2,
          probability: 2.4,
          analysis: {
            prediction: '3連複予想（3-7-8）',
            probability: '2.4%',
            reasons: [
              '3頭とも前走からの上昇度が著しく、勢いがある',
              '馬場状態の変化に対する適応力が高い組み合わせ',
              '各馬の距離適性が高く、長丁場での安定感がある',
              '相性の良い騎手との組み合わせで、信頼度が高い'
            ]
          }
        }
      ]
    }
  }
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
        <div className="divide-y divide-gray-200">
          {raceData.predictions.win.map((horse) => (
            <div key={horse.horseNumber} className="p-4 sm:p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-800 font-semibold">
                        {horse.horseNumber}
                      </span>
                      <span className="ml-2 text-lg font-medium">{horse.horseName}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">予想オッズ</div>
                      <div className="font-bold text-indigo-600">{horse.odds}</div>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="text-sm text-gray-500">予想確率</div>
                    <div className="font-medium">{horse.probability}%</div>
                  </div>
                </div>
                <div className="mt-4 lg:mt-0">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">AI分析</h4>
                  <ul className="space-y-2">
                    {horse.analysis.reasons.map((reason, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        <span className="text-sm text-gray-600">{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 複勝予想 */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">複勝予想</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {raceData.predictions.place.map((horse) => (
            <div key={horse.horseNumber} className="p-4 sm:p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-800 font-semibold">
                        {horse.horseNumber}
                      </span>
                      <span className="ml-2 text-lg font-medium">{horse.horseName}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">予想オッズ</div>
                      <div className="font-bold text-indigo-600">{horse.odds}</div>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="text-sm text-gray-500">予想確率</div>
                    <div className="font-medium">{horse.probability}%</div>
                  </div>
                </div>
                <div className="mt-4 lg:mt-0">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">AI分析</h4>
                  <ul className="space-y-2">
                    {horse.analysis.reasons.map((reason, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        <span className="text-sm text-gray-600">{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3連複予想 */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">3連複予想</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {raceData.predictions.trio.map((combo, index) => (
            <div key={index} className="p-4 sm:p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className="text-lg font-medium">
                        {combo.combination.join('-')}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">予想オッズ</div>
                      <div className="font-bold text-indigo-600">{combo.odds}</div>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="text-sm text-gray-500">予想確率</div>
                    <div className="font-medium">{combo.probability}%</div>
                  </div>
                </div>
                <div className="mt-4 lg:mt-0">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">AI分析</h4>
                  <ul className="space-y-2">
                    {combo.analysis.reasons.map((reason, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        <span className="text-sm text-gray-600">{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RacePrediction;