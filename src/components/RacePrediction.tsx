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
          horseNumber: 7,
          horseName: 'レシャバール',
          odds: 4.2,
          probability: 23.8,
          analysis: {
            prediction: '2着予想',
            probability: '23.8%',
            reasons: [
              '前走での瞬発力が高く、特に直線での伸び率が優れている',
              '重賞実績が豊富で、G1レースでの好走歴がある（3戦2着以内2回）',
              '同舞台での適性が高く、東京コースでの成績が抜群（3戦2勝）'
            ]
          }
        },
        {
          horseNumber: 3,
          horseName: 'キセキノカガヤキ',
          odds: 5.1,
          probability: 19.6,
          analysis: {
            prediction: '3着予想',
            probability: '19.6%',
            reasons: [
              '上がり3Fのタイムが安定して優れており、終速に信頼がおける',
              '前走から斤量が-2kgとなり、条件面での好転が見られる',
              '雨天時の馬場での好走実績があり、天候の変化にも対応可能'
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
          horseNumber: 7,
          horseName: 'レシャバール',
          odds: 1.6,
          probability: 62.5,
          analysis: {
            prediction: '複勝圏内予想',
            probability: '62.5%',
            reasons: [
              '前走での上がり3Fが32.8秒と優れており、末脚の確実性が高い',
              '同クラスでの安定感があり、G1レースでの複勝率が65%',
              '休養明けでも好走する傾向があり、状態面での不安が少ない'
            ]
          }
        },
        {
          horseNumber: 3,
          horseName: 'キセキノカガヤキ',
          odds: 1.8,
          probability: 55.6,
          analysis: {
            prediction: '複勝圏内予想',
            probability: '55.6%',
            reasons: [
              '前走での瞬発力が高く、特に直線での伸び率が優れている',
              '同舞台での適性が高く、東京コースでの成績が良好',
              '斤量条件が有利で、展開次第では上位が期待できる'
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
          combination: [1, 7, 8],
          odds: 32.1,
          probability: 3.1,
          analysis: {
            prediction: '3連複予想（1-7-8）',
            probability: '3.1%',
            reasons: [
              '8番馬の上昇度が著しく、穴馬として期待できる',
              '3頭の位置取りが噛み合いやすい展開が予想される',
              '前走の上がり3Fがいずれも優れており、終盤の差が出にくい'
            ]
          }
        },
        {
          combination: [3, 7, 9],
          odds: 41.2,
          probability: 2.4,
          analysis: {
            prediction: '3連複予想（3-7-9）',
            probability: '2.4%',
            reasons: [
              '9番馬の追い込みが優れており、流れが速くなれば台頭の可能性',
              '3頭とも重賞実績があり、大舞台での実力は証明済み',
              '相性の良い騎手が騎乗しており、好連携が期待できる'
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
                    <div className="text-lg font-medium">
                      {combo.combination.join('-')}
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