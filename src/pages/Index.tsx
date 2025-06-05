import { useState } from 'react';
import { Heart, MessageCircle, Share, TrendingUp, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import BottomNavigation from '@/components/BottomNavigation';
import PredictionCard from '@/components/PredictionCard';
import SideMenu from '@/components/SideMenu';
import useScrollToTop from '@/hooks/useScrollToTop';

const Index = () => {
  useScrollToTop();
  
  const [activeTab, setActiveTab] = useState('trending');
  const [showSideMenu, setShowSideMenu] = useState(false);

  const mockPredictions = [
    {
      id: 1,
      user: {
        username: '@prono_king',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        badge: 'Confirmé',
        badgeColor: 'bg-yellow-500'
      },
      match: 'PSG vs Real Madrid',
      prediction: 'Victoire PSG',
      odds: '2.10',
      confidence: 4,
      analysis: 'PSG en forme à domicile, Mbappé en grande forme. Real sans Benzema. Défense madrilène fragile sur les transitions rapides.',
      likes: 127,
      comments: 23,
      shares: 8,
      successRate: 78,
      timeAgo: '2h',
      sport: 'Football',
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=600&fit=crop'
    },
    {
      id: 2,
      user: {
        username: '@sport_analyst',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c3c3?w=100&h=100&fit=crop&crop=face',
        badge: 'Pro',
        badgeColor: 'bg-blue-500'
      },
      match: 'Pari Combiné',
      prediction: 'Triple combiné',
      odds: '1.85',
      totalOdds: '1.25',
      confidence: 5,
      analysis: 'Combiné sûr avec trois équipes en grande forme. Analyse détaillée de chaque match dans les pronostics.',
      likes: 89,
      comments: 15,
      shares: 5,
      successRate: 65,
      timeAgo: '4h',
      sport: 'Football',
      matches: [
        {
          id: 1,
          teams: 'Betis Séville vs Jagiellonia',
          prediction: 'Victoire Betis',
          odds: '1.45',
          league: 'Conference League',
          time: '18:45'
        },
        {
          id: 2,
          teams: 'Manchester City vs Inter',
          prediction: 'Plus de 2.5 buts',
          odds: '1.65',
          league: 'Champions League',
          time: '21:00'
        },
        {
          id: 3,
          teams: 'Barcelona vs Bayern',
          prediction: 'Barcelone ou match nul',
          odds: '1.35',
          league: 'Champions League',
          time: '21:00'
        }
      ]
    },
    {
      id: 3,
      user: {
        username: '@tennis_pro',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        badge: 'Novice',
        badgeColor: 'bg-green-500'
      },
      match: 'Djokovic vs Alcaraz',
      prediction: 'Victoire Alcaraz en 3 sets',
      odds: '3.20',
      confidence: 5,
      analysis: 'Alcaraz très en forme sur terre battue, Djokovic pas à 100%. Le jeune espagnol a les armes pour battre le serbe.',
      likes: 234,
      comments: 67,
      shares: 19,
      successRate: 72,
      timeAgo: '6h',
      sport: 'Tennis',
      video: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4'
    },
    {
      id: 4,
      user: {
        username: '@basket_expert',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
        badge: 'Pro',
        badgeColor: 'bg-blue-500'
      },
      match: 'Lakers vs Warriors',
      prediction: 'Plus de 220 points',
      odds: '1.95',
      confidence: 3,
      analysis: 'Deux attaques prolifiques, défenses moyennes. Le rythme devrait être élevé avec beaucoup de possessions.',
      likes: 156,
      comments: 41,
      shares: 12,
      successRate: 83,
      timeAgo: '1h',
      sport: 'Basketball',
      image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=600&fit=crop'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 shadow-sm border-b sticky top-0 z-10">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-yellow-800 text-lg">🏆</span>
              </div>
              <h1 className="text-2xl font-bold text-white">PENDOR</h1>
            </div>
            <div className="flex items-center space-x-3">
              <button className="p-2 hover:bg-green-700 rounded-full transition-colors">
                <span className="text-white text-xl">🔔</span>
              </button>
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">P</span>
              </div>
              <button 
                onClick={() => setShowSideMenu(true)}
                className="text-white hover:bg-green-700 p-1 rounded"
              >
                <span className="text-xl">☰</span>
              </button>
            </div>
          </div>
        </div>
      </div>

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
      <SideMenu open={showSideMenu} onOpenChange={setShowSideMenu} />
    </div>
  );
};

export default Index;
