
import { useState } from 'react';
import { Heart, MessageCircle, Share, MoreVertical, Play, VolumeX, Volume2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import PredictionModal from '@/components/PredictionModal';

interface PredictionCardProps {
  prediction: any;
  onCommentClick?: () => void;
}

const PredictionCard = ({ prediction, onCommentClick }: PredictionCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const handleVideoPlay = (e: React.MouseEvent) => {
    e.preventDefault();
    const video = e.currentTarget.querySelector('video') as HTMLVideoElement;
    if (video) {
      video.play();
      setIsVideoPlaying(true);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = e.currentTarget.parentElement?.querySelector('video') as HTMLVideoElement;
    if (video) {
      video.muted = !video.muted;
      setIsMuted(video.muted);
    }
  };

  return (
    <>
      <Card className="bg-white">
        <CardContent className="p-4 space-y-3">
          {/* User Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={prediction.user.avatar} />
                <AvatarFallback>{prediction.user.username[1]}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-sm">{prediction.user.username}</span>
                  <Badge className={`${prediction.user.badgeColor} text-white text-xs px-2 py-0.5`}>
                    {prediction.user.badge}
                  </Badge>
                  <span className="text-gray-500 text-sm">• {prediction.timeAgo}</span>
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs text-gray-500">{prediction.sport}</span>
                  <span className="text-xs text-gray-500">• {prediction.successRate}% de réussite</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-green-600">{prediction.odds}</span>
                <Button size="sm" variant="outline">
                  Suivre
                </Button>
              </div>
              <button
                onClick={() => setIsMenuOpen(true)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <MoreVertical className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Match Info */}
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-900">{prediction.match}</h3>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-lg ${i < prediction.confidence ? 'text-yellow-400' : 'text-gray-300'}`}>
                    ⭐
                  </span>
                ))}
                <span className="text-sm text-gray-600 ml-2">Confiance: {prediction.confidence}/5</span>
              </div>
            </div>
          </div>

          {/* Media */}
          {prediction.image && (
            <div className="rounded-lg overflow-hidden">
              <img 
                src={prediction.image} 
                alt="Match" 
                className="w-full h-48 object-cover"
              />
            </div>
          )}

          {prediction.video && (
            <div className="relative rounded-lg overflow-hidden">
              <video
                className="w-full h-48 object-cover"
                poster="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop"
                muted={isMuted}
                onPlay={() => setIsVideoPlaying(true)}
                onPause={() => setIsVideoPlaying(false)}
              >
                <source src={prediction.video} type="video/mp4" />
              </video>
              
              {!isVideoPlaying && (
                <button
                  onClick={handleVideoPlay}
                  className="absolute inset-0 flex items-center justify-center bg-black/20"
                >
                  <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                    <Play className="w-8 h-8 text-gray-800 ml-1" />
                  </div>
                </button>
              )}
              
              <button
                onClick={toggleMute}
                className="absolute bottom-3 right-3 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4 text-white" />
                ) : (
                  <Volume2 className="w-4 h-4 text-white" />
                )}
              </button>
            </div>
          )}

          {/* Analysis Preview */}
          <p className="text-gray-700 text-sm line-clamp-2">{prediction.analysis}</p>

          {/* Actions */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-6">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`flex items-center space-x-2 ${isLiked ? 'text-red-500' : 'text-gray-500'} hover:text-red-500 transition-colors`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                <span className="text-sm">{prediction.likes + (isLiked ? 1 : 0)}</span>
              </button>
              
              <button
                onClick={onCommentClick}
                className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                <span className="text-sm">{prediction.comments}</span>
              </button>
              
              <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors">
                <Share className="w-5 h-5" />
                <span className="text-sm">{prediction.shares}</span>
              </button>
            </div>
            
            <Button 
              onClick={() => setIsModalOpen(true)}
              size="sm" 
              className="bg-blue-600 hover:bg-blue-700"
            >
              Voir les pronostics
            </Button>
          </div>
        </CardContent>
      </Card>

      <PredictionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        prediction={prediction}
      />

      {/* Menu Bottom Sheet */}
      <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <SheetContent side="bottom" className="h-[75vh]">
          <SheetHeader>
            <SheetTitle>Options du post</SheetTitle>
          </SheetHeader>
          
          <div className="py-6 space-y-4">
            <button className="w-full text-left p-4 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="font-medium">Masquer ce post</div>
              <div className="text-sm text-gray-500">Ne plus voir ce type de contenu</div>
            </button>
            
            <button className="w-full text-left p-4 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="font-medium">Signaler le post</div>
              <div className="text-sm text-gray-500">Contenu inapproprié ou spam</div>
            </button>
            
            <button className="w-full text-left p-4 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="font-medium">Bloquer @{prediction.user.username}</div>
              <div className="text-sm text-gray-500">Ne plus voir les posts de cet utilisateur</div>
            </button>
            
            <button className="w-full text-left p-4 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="font-medium">Copier le lien</div>
              <div className="text-sm text-gray-500">Partager ce post</div>
            </button>
            
            <button className="w-full text-left p-4 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="font-medium">Enregistrer</div>
              <div className="text-sm text-gray-500">Ajouter à mes favoris</div>
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default PredictionCard;
