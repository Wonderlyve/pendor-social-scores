
import { useState } from 'react';
import { Heart, MessageCircle, Share, TrendingUp, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import BottomNavigation from '@/components/BottomNavigation';
import PredictionCard from '@/components/PredictionCard';

const Index = () => {
  const [activeTab, setActiveTab] = useState('trending');

  // Mock data for predictions
  const mockPredictions = [
    {
      id: 1,
      user: {
        username: '@prono_king',
        avatar: '/placeholder.svg',
        badge: 'Confirmé',
        badgeColor: 'bg-yellow-500'
      },
      match: 'PSG vs Real Madrid',
      prediction: 'Victoire PSG',
      odds: '2.10',
      confidence: 4,
      analysis: 'PSG en forme à domicile, Mbappé en grande forme. Real sans Benzema.',
      likes: 127,
      comments: 23,
      shares: 8,
      successRate: 78,
      timeAgo: '2h',
      sport: 'Football'
    },
    {
      id: 2,
      user: {
        username: '@sport_analyst',
        avatar: '/placeholder.svg',
        badge: 'Pro',
        badgeColor: 'bg-blue-500'
      },
      match: 'Lakers vs Warriors',
      prediction: 'Plus de 220.5 points',
      odds: '1.85',
      confidence: 3,
      analysis: 'Deux attaques prolifiques, défenses fragiles cette saison.',
      likes: 89,
      comments: 15,
      shares: 5,
      successRate: 65,
      timeAgo: '4h',
      sport: 'Basketball'
    },
    {
      id: 3,
      user: {
        username: '@tennis_pro',
        avatar: '/placeholder.svg',
        badge: 'Novice',
        badgeColor: 'bg-green-500'
      },
      match: 'Djokovic vs Alcaraz',
      prediction: 'Victoire Alcaraz en 3 sets',
      odds: '3.20',
      confidence: 5,
      analysis: 'Alcaraz très en forme sur terre battue, Djokovic pas à 100%.',
      likes: 234,
      comments: 67,
      shares: 19,
      successRate: 72,
      timeAgo: '6h',
      sport: 'Tennis'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary">Pendor</h1>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">P</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="flex">
          <button
            onClick={() => setActiveTab('trending')}
            className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
              activeTab === 'trending'
                ? 'text-primary border-b-2 border-primary bg-blue-50'
                : 'text-gray-600 hover:text-primary'
            }`}
          >
            🔥 Tendances
          </button>
          <button
            onClick={() => setActiveTab('following')}
            className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
              activeTab === 'following'
                ? 'text-primary border-b-2 border-primary bg-blue-50'
                : 'text-gray-600 hover:text-primary'
            }`}
          >
            👥 Abonnements
          </button>
          <button
            onClick={() => setActiveTab('live')}
            className={`flex-1 py-3 px-4 text-center font-medium transition-colors relative ${
              activeTab === 'live'
                ? 'text-primary border-b-2 border-primary bg-blue-50'
                : 'text-gray-600 hover:text-primary'
            }`}
          >
            🔴 Live
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-2 space-y-4">
        {activeTab === 'trending' && (
          <>
            {/* Quick Stats */}
            <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">Meilleurs pronostiqueurs</h3>
                    <p className="text-sm opacity-90">Cette semaine</p>
                  </div>
                  <TrendingUp className="w-8 h-8" />
                </div>
                <div className="flex space-x-4 mt-3">
                  <div className="text-center">
                    <div className="font-bold text-lg">86%</div>
                    <div className="text-xs opacity-80">Taux moyen</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-lg">1,247</div>
                    <div className="text-xs opacity-80">Pronos actifs</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-lg">34</div>
                    <div className="text-xs opacity-80">Lives en cours</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Predictions Feed */}
            <div className="space-y-4">
              {mockPredictions.map((prediction) => (
                <PredictionCard key={prediction.id} prediction={prediction} />
              ))}
            </div>
          </>
        )}

        {activeTab === 'following' && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Heart className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-600 mb-2">Aucun abonnement</h3>
            <p className="text-gray-500 mb-4">Suivez des pronostiqueurs pour voir leurs analyses ici</p>
            <Button>Découvrir des experts</Button>
          </div>
        )}

        {activeTab === 'live' && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-500 text-2xl">🔴</span>
              </div>
            </div>
            <h3 className="text-lg font-medium text-gray-600 mb-2">Aucun live en cours</h3>
            <p className="text-gray-500 mb-4">Les pronostiqueurs experts partageront bientôt leurs analyses en direct</p>
            <Button variant="outline">Voir les replays</Button>
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Index;
