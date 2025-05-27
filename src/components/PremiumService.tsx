import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { loadStripe } from '@stripe/stripe-js';

const plans = [
  {
    id: 'basic',
    name: 'ベーシック',
    price: '980',
    features: [
      'AIによるレース予想',
      '過去のレース結果分析',
      'レース情報の閲覧'
    ]
  },
  {
    id: 'premium',
    name: 'プレミアム',
    price: '1,980',
    features: [
      'ベーシックの全機能',
      '詳細な競走馬データ',
      'オッズ分析ツール',
      'レース予想の的中率表示'
    ]
  },
  {
    id: 'professional',
    name: 'プロフェッショナル',
    price: '4,980',
    features: [
      'プレミアムの全機能',
      'AIによる予想根拠の詳細表示',
      'プロ向け分析ツール',
      '優先サポート'
    ]
  }
];

export default function PremiumService() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (planId: string) => {
    try {
      setIsLoading(true);
      // ここでStripeのチェックアウトセッションを作成するエッジ関数を呼び出す
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ planId }),
      });

      const { sessionId } = await response.json();
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
      
      if (!stripe) {
        throw new Error('Stripeの初期化に失敗しました');
      }

      const { error } = await stripe.redirectToCheckout({ sessionId });
      if (error) throw error;
    } catch (error) {
      toast.error('決済の処理に失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          プレミアムサービス
        </h2>
        <p className="mt-4 text-lg text-gray-500">
          AIkeibaの高度な機能を使って、より精度の高い予想を実現しましょう
        </p>
      </div>

      <div className="mt-12 space-y-4 sm:mt-16 sm:grid sm:grid-cols-3 sm:gap-6 sm:space-y-0">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`rounded-lg shadow-lg divide-y divide-gray-200 ${
              selectedPlan === plan.id ? 'ring-2 ring-indigo-600' : ''
            }`}
          >
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-gray-900">{plan.name}</h3>
              <p className="mt-4">
                <span className="text-4xl font-extrabold text-gray-900">¥{plan.price}</span>
                <span className="text-base font-medium text-gray-500">/月</span>
              </p>
              <ul className="mt-6 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex">
                    <svg
                      className="flex-shrink-0 w-6 h-6 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="ml-3 text-gray-500">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleSubscribe(plan.id)}
                disabled={isLoading}
                className="mt-8 block w-full bg-indigo-600 text-white rounded-md py-2 text-sm font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                {isLoading ? '処理中...' : '申し込む'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}