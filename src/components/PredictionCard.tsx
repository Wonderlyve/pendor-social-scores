
import { Heart, MessageCircle, Share, Star, MoreVertical, Play, VolumeX, Volume2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import PredictionModal from './PredictionModal';
import { useState, useRef } from 'react';

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
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMenuAction = (action: string) => {
    console.log(`Action: ${action} on prediction ${prediction.id}`);
  };

  const handlePlayVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
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
          <Drawer>
            <DrawerTrigger asChild>
              <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                <MoreVertical className="w-4 h-4 text-gray-500" />
              </button>
            </DrawerTrigger>
            <DrawerContent className="h-[75vh]">
              <DrawerHeader>
                <DrawerTitle>Options du post</DrawerTitle>
              </DrawerHeader>
              <div className="p-4 space-y-3">
                <button 
                  onClick={() => handleMenuAction('follow')}
                  className="w-full text-left p-3 hover:bg-gray-100 rounded-lg transition-colors flex items-center space-x-3"
                >
                  <span className="text-2xl">👤</span>
                  <span>Suivre cet utilisateur</span>
                </button>
                <button 
                  onClick={() => handleMenuAction('save')}
                  className="w-full text-left p-3 hover:bg-gray-100 rounded-lg transition-colors flex items-center space-x-3"
                >
                  <span className="text-2xl">🔖</span>
                  <span>Sauvegarder</span>
                </button>
                <button 
                  onClick={() => handleMenuAction('copy')}
                  className="w-full text-left p-3 hover:bg-gray-100 rounded-lg transition-colors flex items-center space-x-3"
                >
                  <span className="text-2xl">📋</span>
                  <span>Copier le lien</span>
                </button>
                <button 
                  onClick={() => handleMenuAction('report')}
                  className="w-full text-left p-3 hover:bg-gray-100 rounded-lg transition-colors flex items-center space-x-3"
                >
                  <span className="text-2xl">🚨</span>
                  <span>Signaler</span>
                </button>
                <button 
                  onClick={() => handleMenuAction('hide')}
                  className="w-full text-left p-3 hover:bg-gray-100 rounded-lg transition-colors flex items-center space-x-3"
                >
                  <span className="text-2xl">👁️</span>
                  <span>Masquer ce post</span>
                </button>
                <button 
                  onClick={() => handleMenuAction('block')}
                  className="w-full text-left p-3 hover:bg-red-50 rounded-lg transition-colors flex items-center space-x-3 text-red-600"
                >
                  <span className="text-2xl">🚫</span>
                  <span>Bloquer l'utilisateur</span>
                </button>
              </div>
            </DrawerContent>
          </Drawer>
        </div>

        {/* Match Info - Réorganisé */}
        <div className="mb-3">
          <div className="font-semibold text-lg text-gray-900 mb-2">{prediction.match}</div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">Cote: {prediction.odds}</span>
              {prediction.totalOdds && (
                <span className="text-sm text-orange-600 font-medium">
                  Cote totale: {prediction.totalOdds}
                </span>
              )}
            </div>
            <Button variant="outline" size="sm">
              Suivre
            </Button>
          </div>
          
          {/* Confidence Stars */}
          <div className="flex items-center space-x-1">
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
          <div className="mb-4 rounded-lg overflow-hidden relative">
            {prediction.video ? (
              <div className="relative">
                <video
                  ref={videoRef}
                  className="w-full h-48 object-cover"
                  poster="https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=600&fit=crop"
                  muted={isMuted}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  controls={false}
                >
                  <source src="https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" type="video/mp4" />
                </video>
                
                {/* Play Button */}
                {!isPlaying && (
                  <button 
                    onClick={handlePlayVideo}
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 transition-opacity"
                  >
                    <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                      <Play className="w-8 h-8 text-gray-800 ml-1" />
                    </div>
                  </button>
                )}
                
                {/* Mute Button */}
                <button 
                  onClick={toggleMute}
                  className="absolute bottom-2 right-2 w-8 h-8 bg-black bg-opacity-60 rounded-full flex items-center justify-center"
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4 text-white" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-white" />
                  )}
                </button>
              </div>
            ) : prediction.image && (
              <img
                src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=600&fit=crop"
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

        {/* Actions - Réorganisées */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
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
        </div>
      </CardContent>
    </Card>
  );
};

export default PredictionCard;
