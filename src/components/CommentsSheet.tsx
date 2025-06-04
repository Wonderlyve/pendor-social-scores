
import { useState } from 'react';
import { Send, Heart, MessageCircle, MoreVertical, Reply } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface Comment {
  id: string;
  user: {
    username: string;
    avatar: string;
  };
  content: string;
  timeAgo: string;
  likes: number;
  isLiked: boolean;
  replies?: Comment[];
}

interface CommentsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  postId: string;
}

const CommentsSheet = ({ isOpen, onClose, postId }: CommentsSheetProps) => {
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      user: {
        username: '@sportsfan',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
      },
      content: 'Excellente analyse ! Je pense que tu as raison sur ce pronostic 🔥',
      timeAgo: '2h',
      likes: 12,
      isLiked: true,
      replies: [
        {
          id: '1-1',
          user: {
            username: '@prono_king',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
          },
          content: 'Merci ! Les statistiques sont claires sur ce match',
          timeAgo: '1h',
          likes: 5,
          isLiked: false
        }
      ]
    },
    {
      id: '2',
      user: {
        username: '@bettingpro',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face'
      },
      content: 'Pas sûr pour cette cote, elle me semble un peu risquée...',
      timeAgo: '3h',
      likes: 3,
      isLiked: false,
      replies: []
    }
  ]);

  const handleLikeComment = (commentId: string, isReply = false, parentId?: string) => {
    setComments(prev => prev.map(comment => {
      if (isReply && comment.id === parentId) {
        return {
          ...comment,
          replies: comment.replies?.map(reply =>
            reply.id === commentId
              ? { ...reply, isLiked: !reply.isLiked, likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1 }
              : reply
          )
        };
      } else if (comment.id === commentId) {
        return {
          ...comment,
          isLiked: !comment.isLiked,
          likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
        };
      }
      return comment;
    }));
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    
    const comment: Comment = {
      id: Date.now().toString(),
      user: {
        username: '@moi',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c3c3?w=100&h=100&fit=crop&crop=face'
      },
      content: newComment,
      timeAgo: 'maintenant',
      likes: 0,
      isLiked: false,
      replies: []
    };
    
    setComments(prev => [comment, ...prev]);
    setNewComment('');
  };

  const handleAddReply = (parentId: string) => {
    if (!replyText.trim()) return;
    
    const reply: Comment = {
      id: `${parentId}-${Date.now()}`,
      user: {
        username: '@moi',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c3c3?w=100&h=100&fit=crop&crop=face'
      },
      content: replyText,
      timeAgo: 'maintenant',
      likes: 0,
      isLiked: false
    };
    
    setComments(prev => prev.map(comment => 
      comment.id === parentId 
        ? { ...comment, replies: [...(comment.replies || []), reply] }
        : comment
    ));
    
    setReplyText('');
    setReplyingTo(null);
  };

  const CommentItem = ({ comment, isReply = false, parentId }: { comment: Comment; isReply?: boolean; parentId?: string }) => (
    <div className={`flex space-x-3 ${isReply ? 'ml-12 mt-3' : 'mb-4'}`}>
      <Avatar className="w-8 h-8">
        <AvatarImage src={comment.user.avatar} />
        <AvatarFallback>{comment.user.username[1]}</AvatarFallback>
      </Avatar>
      
      <div className="flex-1">
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <span className="font-medium text-sm">{comment.user.username}</span>
            <span className="text-xs text-gray-500">{comment.timeAgo}</span>
          </div>
          <p className="text-gray-800 text-sm">{comment.content}</p>
        </div>
        
        <div className="flex items-center space-x-4 mt-2">
          <button
            onClick={() => handleLikeComment(comment.id, isReply, parentId)}
            className={`flex items-center space-x-1 text-xs ${
              comment.isLiked ? 'text-red-500' : 'text-gray-500'
            }`}
          >
            <Heart className={`w-4 h-4 ${comment.isLiked ? 'fill-current' : ''}`} />
            <span>{comment.likes}</span>
          </button>
          
          {!isReply && (
            <button
              onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
              className="flex items-center space-x-1 text-xs text-gray-500"
            >
              <Reply className="w-4 h-4" />
              <span>Répondre</span>
            </button>
          )}
          
          <button className="text-xs text-gray-500">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
        
        {replyingTo === comment.id && (
          <div className="mt-3 flex space-x-2">
            <Input
              placeholder="Écrire une réponse..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="text-sm"
            />
            <Button 
              size="sm" 
              onClick={() => handleAddReply(comment.id)}
              disabled={!replyText.trim()}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        )}
        
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-3">
            {comment.replies.map(reply => (
              <CommentItem key={reply.id} comment={reply} isReply parentId={comment.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[75vh] flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center space-x-2">
            <MessageCircle className="w-5 h-5" />
            <span>Commentaires ({comments.length})</span>
          </SheetTitle>
        </SheetHeader>
        
        <div className="flex-1 overflow-y-auto py-4">
          {comments.map(comment => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
        
        <div className="border-t pt-4">
          <div className="flex space-x-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b332c3c3?w=100&h=100&fit=crop&crop=face" />
              <AvatarFallback>M</AvatarFallback>
            </Avatar>
            <div className="flex-1 flex space-x-2">
              <Input
                placeholder="Ajouter un commentaire..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
              />
              <Button 
                onClick={handleAddComment}
                disabled={!newComment.trim()}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CommentsSheet;
