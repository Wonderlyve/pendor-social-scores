import { useState } from 'react';
import { Heart, MessageCircle, Share, MoreHorizontal, Star, Play, VolumeX, Volume2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import PredictionModal from '@/components/PredictionModal';

interface PredictionCardProps {
  prediction: any;
  onCommentClick?: () => void;
}

const PredictionCard = ({ prediction, onCommentClick }: PredictionCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPostMenuOpen, setIsPostMenuOpen] = useState(false);

  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
  };

  const handleVideoClick = () => {
    setIsVideoPlaying(!isVideoPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const postMenuOptions = [
    { label: 'Partager', action: () => console.log('Partager') },
    { label: 'Copier le lien', action: () => console.log('Copier lien') },
    { label: 'Signaler', action: () => console.log('Signaler'), danger: true },
    { label: 'Masquer', action: () => console.log('Masquer') },
    { label: 'Ne plus suivre', action: () => console.log('Ne plus suivre'), danger: true },
  ];

  return (
    <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        {/* User Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={prediction.user.avatar} />
              <AvatarFallback>{prediction.user.username[1]?.toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-medium text-sm">{prediction.user.username}</span>
                {prediction.user.badge && (
                  <span className={`text-xs px-2 py-0.5 rounded-full text-white ${prediction.user.badgeColor}`}>
                    {prediction.user.badge}
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <span>{prediction.timeAgo}</span>
                <span>•</span>
                <span>{prediction.sport}</span>
                <span>•</span>
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                  <span>{prediction.successRate}%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="text-right">
              <div className="text-lg font-bold text-green-600">{prediction.odds}</div>
              <Button size="sm" className="text-xs px-3 py-1 h-6">
                Suivre
              </Button>
            </div>

            <Sheet open={isPostMenuOpen} onOpenChange={setIsPostMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="w-8 h-8">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[75vh]">
                <SheetHeader>
                  <SheetTitle>Options du post</SheetTitle>
                  <SheetDescription>
                    Gérez ce pronostic de {prediction.user.username}
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-2">
                  {postMenuOptions.map((option, index) => (
                    <button
                      key={index}
                      onClick={option.action}
                      className={`w-full text-left p-4 rounded-lg transition-colors ${
                        option.danger 
                          ? 'text-red-600 hover:bg-red-50' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Match Info */}
        <div className="mb-3">
          <h3 className="font-semibold text-gray-900 mb-1">{prediction.match}</h3>
        </div>

        {/* Media Content */}
        {prediction.image && (
          <div className="mb-3 rounded-lg overflow-hidden">
            <img 
              src={prediction.image} 
              alt={prediction.match}
              className="w-full h-48 object-cover"
            />
          </div>
        )}

        {prediction.video && (
          <div className="relative mb-3 rounded-lg overflow-hidden bg-black">
            <video 
              className="w-full h-48 object-cover cursor-pointer"
              poster="https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=600&fit=crop"
              muted={isMuted}
              onClick={handleVideoClick}
              onPlay={handleVideoPlay}
            >
              <source src={prediction.video} type="video/mp4" />
            </video>
            
            {!isVideoPlaying && (
              <div className="absolute inset-0 flex items-center justify-center">
                <button 
                  onClick={handleVideoPlay}
                  className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                >
                  <Play className="w-8 h-8 text-gray-800 ml-1" />
                </button>
              </div>
            )}
            
            <button
              onClick={toggleMute}
              className="absolute bottom-3 right-3 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        )}

        {/* Combined Matches for Combiné */}
        {prediction.matches && (
          <div className="mb-3">
            <div className="space-y-2">
              {prediction.matches.map((match: any) => (
                <div key={match.id} className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="font-medium text-sm text-gray-900">{match.teams}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {match.league} • {match.time}
                      </div>
                    </div>
                    <div className="text-right ml-3">
                      <div className="text-sm font-medium text-gray-900">{match.prediction}</div>
                      <div className="text-sm text-green-600 font-bold">{match.odds}</div>
                    </div>
                  </div>
                </div>
              ))}
              {prediction.totalOdds && (
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-blue-900">Cote totale du combiné</span>
                    <span className="text-lg font-bold text-blue-600">{prediction.totalOdds}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Confidence Stars */}
        <div className="flex items-center space-x-1 mb-3">
          <span className="text-sm text-gray-600 mr-2">Confiance:</span>
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < prediction.confidence
                  ? 'text-yellow-500 fill-current'
                  : 'text-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center space-x-6">
            <button 
              onClick={() => setIsLiked(!isLiked)}
              className={`flex items-center space-x-2 transition-colors ${
                isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
              }`}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              <span className="text-sm font-medium">{prediction.likes + (isLiked ? 1 : 0)}</span>
            </button>

            <button 
              onClick={onCommentClick}
              className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm font-medium">{prediction.comments}</span>
            </button>

            <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors">
              <Share className="w-5 h-5" />
              <span className="text-sm font-medium">{prediction.shares}</span>
            </button>
          </div>

          <Button 
            onClick={() => setIsModalOpen(true)}
            variant="outline" 
            size="sm"
          >
            Voir les pronostics
          </Button>
        </div>
      </CardContent>

      <PredictionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        prediction={prediction}
      />
    </Card>
  );
};

export default PredictionCard;
