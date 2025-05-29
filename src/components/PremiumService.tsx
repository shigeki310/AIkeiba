import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { loadStripe } from '@stripe/stripe-js';

const plans = [
  {
    id: 'basic',
    name: 'ベーシック',
    price: '350',
    features: [
      'AIによるレース予想',
      '過去のレース結果分析',
      'レース情報の閲覧',
      '基本的な統計データ'
    ],
    description: '競馬予想の基本機能を使いたい方向け'
  },
  {
    id: 'premium',
    name: 'プレミアム',
    price: '1,980',
    features: [
      'ベーシックの全機能',
      '詳細な競走馬データ',
      'オッズ分析ツール',
      'レース予想の的中率表示',
      'カスタムアラート設定'
    ],
    description: 'より詳細な分析と予想を行いたい方向け',
    popular: true
  },
];

interface SubscriptionFormData {
  name: string;
  email: string;
  agreeToTerms: boolean;
}

export default function PremiumService() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<SubscriptionFormData>({
    name: '',
    email: '',
    agreeToTerms: false
  });

  const handleSubscribe = async (planId: string) => {
    if (!formData.agreeToTerms) {
      toast.error('利用規約に同意してください');
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          planId,
          customerName: formData.name,
          customerEmail: formData.email
        }),
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
            className={`rounded-lg shadow-lg divide-y divide-gray-200 relative transition-all duration-200 ${
              selectedPlan === plan.id ? 'border-2 border-indigo-500 transform scale-105' : 'border border-gray-200'
            }`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                  人気
                </span>
              </div>
            )}
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-gray-900">{plan.name}</h3>
              <p className="mt-4">
                <span className="text-4xl font-extrabold text-gray-900">¥{plan.price}</span>
                <span className="text-base font-medium text-gray-500">/月</span>
              </p>
              <p className="mt-2 text-sm text-gray-500">{plan.description}</p>
              <ul className="mt-6 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-500">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setSelectedPlan(plan.id)}
                disabled={isLoading}
                className={`mt-8 block w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors duration-200 ${
                  selectedPlan === plan.id
                    ? 'bg-indigo-600 hover:bg-indigo-700'
                    : 'bg-gray-600 hover:bg-gray-700'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50`}
              >
                {isLoading ? '処理中...' : 'このプランを選択'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedPlan && (
        <div className="mt-12 max-w-lg mx-auto bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">お申し込み情報</h3>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                お名前
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                メールアドレス
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                checked={formData.agreeToTerms}
                onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                <span>利用規約に同意する</span>
                <a href="/terms" className="text-indigo-600 hover:text-indigo-500 ml-1">
                  利用規約を読む
                </a>
              </label>
            </div>
            <button
              type="button"
              onClick={() => handleSubscribe(selectedPlan)}
              disabled={isLoading || !formData.agreeToTerms}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {isLoading ? '処理中...' : '申し込む'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}