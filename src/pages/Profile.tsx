
import { useState } from 'react';
import { ArrowLeft, Settings, Share, MoreVertical, Calendar, TrendingUp, Award, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import BottomNavigation from '@/components/BottomNavigation';
import PredictionCard from '@/components/PredictionCard';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('predictions');

  const userStats = {
    followers: 12500,
    following: 847,
    predictions: 234,
    successRate: 78,
    totalWins: 183,
    streak: 7
  };

  const userPredictions = [
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
      analysis: 'PSG en forme à domicile, Mbappé en grande forme.',
      likes: 127,
      comments: 23,
      shares: 8,
      successRate: 78,
      timeAgo: '2h',
      sport: 'Football',
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=600&fit=crop'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="px-4 py-3 flex items-center justify-between">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold">@prono_king</h1>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Share className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <MoreVertical className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="bg-white">
        <div className="px-4 py-6">
          {/* Avatar and basic info */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover border-4 border-yellow-400"
                />
                <Badge className="absolute -bottom-1 -right-1 bg-yellow-500 text-white text-xs px-2 py-1">
                  Confirmé
                </Badge>
              </div>
              <div>
                <h2 className="text-xl font-bold">Alexandre Martin</h2>
                <p className="text-gray-600">@prono_king</p>
                <div className="flex items-center space-x-2 mt-1">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-500">Rejoint en mars 2023</span>
                </div>
              </div>
            </div>
            <Button>Suivre</Button>
          </div>

          {/* Bio */}
          <p className="text-gray-700 mb-4">
            🏆 Expert en pronostics sportifs | ⚽ Football & 🏀 Basketball | 📈 78% de réussite | 🔥 Série de 7 victoires
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{userStats.followers.toLocaleString()}</div>
              <div className="text-sm text-gray-500">Abonnés</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{userStats.following}</div>
              <div className="text-sm text-gray-500">Abonnements</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{userStats.predictions}</div>
              <div className="text-sm text-gray-500">Pronostics</div>
            </div>
          </div>

          {/* Performance Cards */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold">{userStats.successRate}%</div>
                    <div className="text-sm opacity-90">Taux de réussite</div>
                  </div>
                  <TrendingUp className="w-8 h-8" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold">{userStats.streak}</div>
                    <div className="text-sm opacity-90">Série actuelle</div>
                  </div>
                  <Award className="w-8 h-8" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-t">
          <div className="flex">
            <button
              onClick={() => setActiveTab('predictions')}
              className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
                activeTab === 'predictions'
                  ? 'text-primary border-b-2 border-primary bg-blue-50'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              Pronostics
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
                activeTab === 'stats'
                  ? 'text-primary border-b-2 border-primary bg-blue-50'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              Statistiques
            </button>
            <button
              onClick={() => setActiveTab('achievements')}
              className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
                activeTab === 'achievements'
                  ? 'text-primary border-b-2 border-primary bg-blue-50'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              Succès
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-4 space-y-4">
        {activeTab === 'predictions' && (
          <div className="space-y-4">
            {userPredictions.map((prediction) => (
              <PredictionCard key={prediction.id} prediction={prediction} />
            ))}
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Statistiques détaillées</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Victoires totales</span>
                    <span className="font-medium">{userStats.totalWins}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Défaites</span>
                    <span className="font-medium">{userStats.predictions - userStats.totalWins}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Meilleure série</span>
                    <span className="font-medium">12 victoires</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sport favori</span>
                    <span className="font-medium">Football</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Badges obtenus</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                    <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-medium">Expert</div>
                      <div className="text-sm text-gray-600">Confirmé</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-medium">Populaire</div>
                      <div className="text-sm text-gray-600">10K+ abonnés</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Profile;
