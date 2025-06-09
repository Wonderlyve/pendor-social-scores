
import { Heart, MessageCircle, Share, Star, MoreVertical, Play, VolumeX, Volume2, UserPlus, UserCheck } from 'lucide-react';
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
import CommentsBottomSheet from './CommentsBottomSheet';
import ProtectedComponent from './ProtectedComponent';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { useOptimizedPosts } from '@/hooks/useOptimizedPosts';
import { useFollow } from '@/hooks/useFollow';

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
  const navigate = useNavigate();
  const { requireAuth, user } = useAuth();
  const { likePost } = useOptimizedPosts();
  const { followUser, isFollowing } = useFollow();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(prediction.likes);
  const [isFollowingUser, setIsFollowingUser] = useState(false);
  const [isFollowLoading, setIsFollowLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Check if following user on mount
  useEffect(() => {
    const checkFollowStatus = async () => {
      if (user && prediction.user.username) {
        const following = await isFollowing(prediction.user.username);
        setIsFollowingUser(following);
      }
    };
    checkFollowStatus();
  }, [user, prediction.user.username, isFollowing]);

  const handleMenuAction = (action: string) => {
    if (!requireAuth()) return;
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

  const handleProfileClick = () => {
    if (!requireAuth()) return;
    navigate('/profile');
  };

  const handleShare = async () => {
    if (!requireAuth()) return;
    
    const postUrl = `${window.location.origin}/post/${prediction.id}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Pronostic de ${prediction.user.username}`,
          text: `${prediction.match} - ${prediction.prediction}`,
          url: postUrl,
        });
      } catch (error) {
        console.log('Partage annulé');
      }
    } else {
      try {
        await navigator.clipboard.writeText(postUrl);
        toast.success('Lien copié dans le presse-papier !');
      } catch (error) {
        toast.error('Impossible de copier le lien');
      }
    }
  };

  const handleLike = async () => {
    if (!requireAuth()) return;
    
    try {
      await likePost(prediction.id.toString());
      
      // Update local state optimistically
      if (isLiked) {
        setLikesCount(prev => prev - 1);
        setIsLiked(false);
      } else {
        setLikesCount(prev => prev + 1);
        setIsLiked(true);
      }
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleFollow = async () => {
    if (!requireAuth()) return;
    
    setIsFollowLoading(true);
    try {
      const newFollowStatus = await followUser(prediction.user.username);
      setIsFollowingUser(newFollowStatus);
    } catch (error) {
      console.error('Error following user:', error);
    } finally {
      setIsFollowLoading(false);
    }
  };

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        {/* User Info */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div 
              className="relative cursor-pointer"
              onClick={handleProfileClick}
            >
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
                <span 
                  className="font-medium text-gray-900 cursor-pointer hover:underline"
                  onClick={handleProfileClick}
                >
                  {prediction.user.username}
                </span>
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
          <ProtectedComponent fallback={
            <button className="p-1 hover:bg-gray-100 rounded-full transition-colors opacity-50 cursor-not-allowed">
              <MoreVertical className="w-4 h-4 text-gray-500" />
            </button>
          }>
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
                    onClick={handleFollow}
                    disabled={isFollowLoading}
                    className="w-full text-left p-3 hover:bg-gray-100 rounded-lg transition-colors flex items-center space-x-3"
                  >
                    {isFollowingUser ? (
                      <>
                        <UserCheck className="w-5 h-5 text-green-500" />
                        <span>Se désabonner</span>
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-5 h-5" />
                        <span>Suivre cet utilisateur</span>
                      </>
                    )}
                  </button>
                  <button 
                    onClick={() => handleMenuAction('save')}
                    className="w-full text-left p-3 hover:bg-gray-100 rounded-lg transition-colors flex items-center space-x-3"
                  >
                    <span className="text-2xl">🔖</span>
                    <span>Sauvegarder</span>
                  </button>
                  <button 
                    onClick={handleShare}
                    className="w-full text-left p-3 hover:bg-gray-100 rounded-lg transition-colors flex items-center space-x-3"
                  >
                    <span className="text-2xl">📋</span>
                    <span>Partager</span>
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
          </ProtectedComponent>
        </div>

        {/* Match Info */}
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
            <ProtectedComponent fallback={
              <Button variant="outline" size="sm" className="h-7 px-2 text-xs opacity-50 cursor-not-allowed">
                Se connecter
              </Button>
            }>
              <Button 
                variant={isFollowingUser ? "default" : "outline"} 
                size="sm" 
                className="h-7 px-2 text-xs"
                onClick={handleFollow}
                disabled={isFollowLoading}
              >
                {isFollowingUser ? (
                  <>
                    <UserCheck className="w-3 h-3 mr-1" />
                    Suivi
                  </>
                ) : (
                  <>
                    <UserPlus className="w-3 h-3 mr-1" />
                    Suivre
                  </>
                )}
              </Button>
            </ProtectedComponent>
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
                  <source src={prediction.video} type="video/mp4" />
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
          <div className="flex items-center space-x-4">
            <ProtectedComponent fallback={
              <button className="flex items-center space-x-1 text-gray-400 cursor-not-allowed">
                <Heart className="w-5 h-5" />
                <span className="text-sm">{likesCount}</span>
              </button>
            }>
              <button 
                onClick={handleLike}
                className={`flex items-center space-x-1 transition-colors ${
                  isLiked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
                }`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                <span className="text-sm">{likesCount}</span>
              </button>
            </ProtectedComponent>
            
            <ProtectedComponent fallback={
              <button className="flex items-center space-x-1 text-gray-400 cursor-not-allowed">
                <MessageCircle className="w-5 h-5" />
                <span className="text-sm">{prediction.comments}</span>
              </button>
            }>
              <CommentsBottomSheet commentsCount={prediction.comments}>
                <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-500 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-sm">{prediction.comments}</span>
                </button>
              </CommentsBottomSheet>
            </ProtectedComponent>
            
            <ProtectedComponent fallback={
              <button className="flex items-center space-x-1 text-gray-400 cursor-not-allowed">
                <Share className="w-5 h-5" />
                <span className="text-sm">{prediction.shares}</span>
              </button>
            }>
              <button 
                onClick={handleShare}
                className="flex items-center space-x-1 text-gray-600 hover:text-green-500 transition-colors"
              >
                <Share className="w-5 h-5" />
                <span className="text-sm">{prediction.shares}</span>
              </button>
            </ProtectedComponent>
          </div>
          
          <ProtectedComponent fallback={
            <Button className="bg-gray-400 text-white text-xs px-2 py-1 h-7 cursor-not-allowed" size="sm" disabled>
              Se connecter
            </Button>
          }>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-green-500 hover:bg-green-600 text-white text-xs px-2 py-1 h-7" size="sm">
                  Voir pronos
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Pronostics de {prediction.user.username}</DialogTitle>
                </DialogHeader>
                <PredictionModal prediction={prediction} />
              </DialogContent>
            </Dialog>
          </ProtectedComponent>
        </div>
      </CardContent>
    </Card>
  );
};

export default PredictionCard;
