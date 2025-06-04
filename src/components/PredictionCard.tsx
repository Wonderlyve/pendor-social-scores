
import { Heart, MessageCircle, Share, Star, MoreVertical, Play } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  ContextMenu, 
  ContextMenuContent, 
  ContextMenuItem, 
  ContextMenuTrigger 
} from '@/components/ui/context-menu';
import PredictionModal from './PredictionModal';

interface PredictionCardProps {
  prediction: {
    id: number;
    user: {
      username: string;
      avatar: string;
      badge: string;
      badgeColor: string;
    };
    match: string;
    prediction: string;
    odds: string;
    confidence: number;
    analysis: string;
    likes: number;
    comments: number;
    shares: number;
    successRate: number;
    timeAgo: string;
    sport: string;
    image?: string;
    video?: string;
    totalOdds?: string;
    matches?: Array<{
      id: number;
      teams: string;
      prediction: string;
      odds: string;
      league: string;
      time: string;
    }>;
  };
}

const PredictionCard = ({ prediction }: PredictionCardProps) => {
  const handleMenuAction = (action: string) => {
    console.log(`Action: ${action} on prediction ${prediction.id}`);
    // Ici on ajoutera la logique pour chaque action
  };

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        {/* User Info */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src={prediction.user.avatar}
                alt={prediction.user.username}
                className="w-10 h-10 rounded-full"
              />
              <div className={`absolute -bottom-1 -right-1 w-5 h-5 ${prediction.user.badgeColor} rounded-full flex items-center justify-center`}>
                <span className="text-white text-xs font-bold">
                  {prediction.user.badge === 'Confirmé' ? 'C' : prediction.user.badge === 'Pro' ? 'P' : 'N'}
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-medium text-gray-900">{prediction.user.username}</span>
                <span className="text-xs text-gray-500">{prediction.timeAgo}</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <span>{prediction.successRate}% de réussite</span>
                <span>•</span>
                <span className="px-2 py-1 bg-gray-100 rounded-full">{prediction.sport}</span>
              </div>
            </div>
          </div>
          
          {/* Menu 3 points */}
          <ContextMenu>
            <ContextMenuTrigger>
              <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                <MoreVertical className="w-4 h-4 text-gray-500" />
              </button>
            </ContextMenuTrigger>
            <ContextMenuContent className="w-48">
              <ContextMenuItem onClick={() => handleMenuAction('follow')}>
                👤 Suivre cet utilisateur
              </ContextMenuItem>
              <ContextMenuItem onClick={() => handleMenuAction('save')}>
                🔖 Sauvegarder
              </ContextMenuItem>
              <ContextMenuItem onClick={() => handleMenuAction('copy')}>
                📋 Copier le lien
              </ContextMenuItem>
              <ContextMenuItem onClick={() => handleMenuAction('report')}>
                🚨 Signaler
              </ContextMenuItem>
              <ContextMenuItem onClick={() => handleMenuAction('hide')}>
                👁️ Masquer ce post
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </div>

        {/* Match Info */}
        <div className="mb-3">
          <div className="font-semibold text-lg text-gray-900 mb-1">{prediction.match}</div>
          <div className="flex items-center space-x-2 mb-2">
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full font-medium">
              {prediction.prediction}
            </span>
            <span className="text-gray-600">Cote: {prediction.odds}</span>
            {prediction.totalOdds && (
              <span className="text-sm text-orange-600 font-medium">
                Cote totale: {prediction.totalOdds}
              </span>
            )}
          </div>
          
          {/* Confidence Stars */}
          <div className="flex items-center space-x-1 mb-2">
            <span className="text-sm text-gray-600">Confiance:</span>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < prediction.confidence ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`}
              />
            ))}
            <span className="text-sm text-yellow-600 font-medium ml-1">
              {prediction.confidence === 5 ? '🔥🔥' : prediction.confidence >= 4 ? '🔥' : ''}
            </span>
          </div>
        </div>

        {/* Media Content */}
        {(prediction.image || prediction.video) && (
          <div className="mb-4 rounded-lg overflow-hidden">
            {prediction.video ? (
              <div className="relative">
                <video
                  className="w-full h-48 object-cover"
                  poster={prediction.image}
                  controls
                >
                  <source src={prediction.video} type="video/mp4" />
                </video>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <Play className="w-12 h-12 text-white opacity-80" />
                </div>
              </div>
            ) : prediction.image && (
              <img
                src={prediction.image}
                alt="Contenu du post"
                className="w-full h-48 object-cover"
              />
            )}
          </div>
        )}

        {/* Analysis */}
        <div className="mb-4">
          <p className="text-gray-700 text-sm leading-relaxed">{prediction.analysis}</p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <button className="flex items-center space-x-1 text-gray-600 hover:text-red-500 transition-colors">
              <Heart className="w-5 h-5" />
              <span className="text-sm">{prediction.likes}</span>
            </button>
            <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-500 transition-colors">
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm">{prediction.comments}</span>
            </button>
            <button className="flex items-center space-x-1 text-gray-600 hover:text-green-500 transition-colors">
              <Share className="w-5 h-5" />
              <span className="text-sm">{prediction.shares}</span>
            </button>
          </div>
          <div className="flex space-x-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-green-500 hover:bg-green-600 text-white" size="sm">
                  Voir les pronostics
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Pronostics de {prediction.user.username}</DialogTitle>
                </DialogHeader>
                <PredictionModal prediction={prediction} />
              </DialogContent>
            </Dialog>
            <Button variant="outline" size="sm">
              Suivre
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PredictionCard;
