
import { useState } from 'react';
import { ArrowLeft, Settings, Share, MoreHorizontal, Calendar, MapPin, Link as LinkIcon, Star, TrendingUp, Users, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import BottomNavigation from '@/components/BottomNavigation';
import PredictionCard from '@/components/PredictionCard';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('predictions');

  const userStats = {
    predictions: 234,
    followers: 1247,
    following: 89,
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
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="px-4 py-3 flex items-center justify-between">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold">Profil</h1>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Share className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Profile Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-4 pt-6 pb-4">
        <div className="flex items-start space-x-4 mb-4">
          <Avatar className="w-20 h-20 border-4 border-white">
            <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" />
            <AvatarFallback>PK</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h2 className="text-xl font-bold text-white">Prono King</h2>
              <div className="bg-yellow-500 px-2 py-1 rounded-full">
                <span className="text-xs font-medium text-yellow-900">Confirmé</span>
              </div>
            </div>
            <p className="text-blue-100 mb-2">@prono_king</p>
            <div className="flex items-center space-x-4 text-sm text-blue-100">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>Membre depuis Mars 2023</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>Paris, FR</span>
              </div>
            </div>
          </div>
        </div>

        <p className="text-white mb-4">
          Expert en pronostics sportifs 🏆 | Spécialiste Football & Tennis | 
          Analyses détaillées et stratégies gagnantes 📈
        </p>

        <div className="flex items-center space-x-1 mb-4">
          <LinkIcon className="w-4 h-4 text-blue-100" />
          <span className="text-blue-100">pronoking.com</span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{userStats.predictions}</div>
            <div className="text-xs text-blue-100">Pronostics</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{userStats.followers}</div>
            <div className="text-xs text-blue-100">Abonnés</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{userStats.following}</div>
            <div className="text-xs text-blue-100">Abonnements</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Button className="flex-1 bg-white text-blue-600 hover:bg-gray-100">
            Suivre
          </Button>
          <Button variant="outline" className="border-white text-white hover:bg-white/10">
            Message
          </Button>
          <Button variant="outline" size="icon" className="border-white text-white hover:bg-white/10">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Performance Cards */}
      <div className="px-4 py-4 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-4 text-center">
              <Star className="w-6 h-6 mx-auto mb-2" />
              <div className="text-2xl font-bold">{userStats.successRate}%</div>
              <div className="text-xs opacity-90">Taux de réussite</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-6 h-6 mx-auto mb-2" />
              <div className="text-2xl font-bold">{userStats.streak}</div>
              <div className="text-xs opacity-90">Série en cours</div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <Award className="w-5 h-5" />
                  <span className="font-medium">Performance</span>
                </div>
                <div className="text-sm opacity-90">
                  {userStats.totalWins} victoires sur {userStats.predictions} pronostics
                </div>
              </div>
              <div className="text-2xl font-bold">{userStats.totalWins}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b sticky top-[73px] z-10">
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
            onClick={() => setActiveTab('media')}
            className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
              activeTab === 'media'
                ? 'text-primary border-b-2 border-primary bg-blue-50'
                : 'text-gray-600 hover:text-primary'
            }`}
          >
            Médias
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-2">
        {activeTab === 'predictions' && (
          <div className="space-y-4">
            {userPredictions.map((prediction) => (
              <PredictionCard key={prediction.id} prediction={prediction} />
            ))}
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="text-center py-12">
            <TrendingUp className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">Statistiques détaillées</h3>
            <p className="text-gray-500">Graphiques et analyses à venir</p>
          </div>
        )}

        {activeTab === 'media' && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">Galerie média</h3>
            <p className="text-gray-500">Photos et vidéos à venir</p>
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Profile;
