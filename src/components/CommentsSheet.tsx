
import { useState } from 'react';
import { Heart, MessageCircle, MoreHorizontal, Reply, ChevronDown, ChevronRight } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

interface Comment {
  id: number;
  user: {
    username: string;
    avatar: string;
    badge?: string;
  };
  content: string;
  timeAgo: string;
  likes: number;
  isLiked: boolean;
  replies: Comment[];
  isExpanded?: boolean;
}

interface CommentsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  predictionId: number;
}

const CommentsSheet = ({ isOpen, onClose, predictionId }: CommentsSheetProps) => {
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<number | null>(null);
  const [expandedComments, setExpandedComments] = useState<Set<number>>(new Set());

  const mockComments: Comment[] = [
    {
      id: 1,
      user: {
        username: '@football_fan',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
        badge: 'Pro'
      },
      content: 'Excellente analyse ! Je suis totalement d\'accord avec ton pronostic. PSG a vraiment l\'avantage à domicile.',
      timeAgo: '2h',
      likes: 12,
      isLiked: false,
      replies: [
        {
          id: 2,
          user: {
            username: '@prono_king',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
            badge: 'Confirmé'
          },
          content: 'Merci ! En effet, les statistiques à domicile du PSG sont impressionnantes cette saison.',
          timeAgo: '1h',
          likes: 5,
          isLiked: false,
          replies: [
            {
              id: 3,
              user: {
                username: '@betting_expert',
                avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c3c3?w=50&h=50&fit=crop&crop=face'
              },
              content: 'Attention quand même au Real qui reste très dangereux en Champions League !',
              timeAgo: '45min',
              likes: 8,
              isLiked: true,
              replies: []
            }
          ]
        }
      ]
    },
    {
      id: 4,
      user: {
        username: '@madrid_supporter',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face'
      },
      content: 'Je ne suis pas d\'accord, le Real Madrid a montré qu\'il peut gagner partout en Europe. Mbappé ou pas !',
      timeAgo: '3h',
      likes: 7,
      isLiked: false,
      replies: []
    }
  ];

  const toggleExpanded = (commentId: number) => {
    const newExpanded = new Set(expandedComments);
    if (newExpanded.has(commentId)) {
      newExpanded.delete(commentId);
    } else {
      newExpanded.add(commentId);
    }
    setExpandedComments(newExpanded);
  };

  const renderComment = (comment: Comment, depth = 0, isLast = false, parentLines: boolean[] = []) => {
    const hasReplies = comment.replies && comment.replies.length > 0;
    const isExpanded = expandedComments.has(comment.id);
    const showReplies = hasReplies && isExpanded;

    return (
      <div key={comment.id} className="relative">
        {/* Ligne de connexion */}
        {depth > 0 && (
          <div className="absolute left-6 top-0 bottom-0 flex">
            {parentLines.map((shouldShow, index) => (
              shouldShow && (
                <div key={index} className="w-8 border-l-2 border-gray-200 ml-8" />
              )
            ))}
            <div className={`w-8 border-l-2 border-gray-200 ${isLast && !hasReplies ? 'h-8' : ''}`} />
            <div className="w-8 h-8 border-b-2 border-gray-200" />
          </div>
        )}

        <div className={`flex space-x-3 ${depth > 0 ? 'ml-16' : ''} mb-4`}>
          <Avatar className="w-8 h-8 flex-shrink-0">
            <AvatarImage src={comment.user.avatar} />
            <AvatarFallback>{comment.user.username[1]?.toUpperCase()}</AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <span className="font-medium text-sm">{comment.user.username}</span>
              {comment.user.badge && (
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                  {comment.user.badge}
                </span>
              )}
              <span className="text-gray-500 text-xs">{comment.timeAgo}</span>
            </div>

            <p className="text-sm text-gray-800 mb-2">{comment.content}</p>

            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <button className={`flex items-center space-x-1 ${comment.isLiked ? 'text-red-500' : ''}`}>
                <Heart className={`w-4 h-4 ${comment.isLiked ? 'fill-current' : ''}`} />
                <span>{comment.likes}</span>
              </button>

              <button 
                onClick={() => setReplyTo(comment.id)}
                className="flex items-center space-x-1 hover:text-blue-500"
              >
                <Reply className="w-4 h-4" />
                <span>Répondre</span>
              </button>

              {hasReplies && (
                <button 
                  onClick={() => toggleExpanded(comment.id)}
                  className="flex items-center space-x-1 hover:text-blue-500"
                >
                  {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  <span>{comment.replies.length} réponse{comment.replies.length > 1 ? 's' : ''}</span>
                </button>
              )}

              <button className="hover:text-gray-700">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Réponses */}
        {showReplies && comment.replies.map((reply, index) => 
          renderComment(
            reply, 
            depth + 1, 
            index === comment.replies.length - 1,
            [...parentLines, true]
          )
        )}
      </div>
    );
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[75vh] flex flex-col">
        <SheetHeader className="flex-shrink-0">
          <SheetTitle>Commentaires</SheetTitle>
          <SheetDescription>
            {mockComments.length} commentaire{mockComments.length > 1 ? 's' : ''}
          </SheetDescription>
        </SheetHeader>

        {/* Liste des commentaires */}
        <div className="flex-1 overflow-y-auto px-4 py-2">
          {mockComments.map((comment, index) => 
            renderComment(comment, 0, index === mockComments.length - 1)
          )}
        </div>

        {/* Zone de saisie */}
        <div className="flex-shrink-0 border-t bg-white p-4">
          {replyTo && (
            <div className="mb-2 p-2 bg-blue-50 rounded-lg flex items-center justify-between">
              <span className="text-sm text-blue-700">
                Réponse en cours...
              </span>
              <button 
                onClick={() => setReplyTo(null)}
                className="text-blue-500 hover:text-blue-700"
              >
                ✕
              </button>
            </div>
          )}
          
          <div className="flex space-x-2">
            <Avatar className="w-8 h-8 flex-shrink-0">
              <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 flex space-x-2">
              <Textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Écrivez votre commentaire..."
                className="min-h-[40px] resize-none"
                rows={1}
              />
              <Button 
                disabled={!newComment.trim()}
                className="px-6"
              >
                Envoyer
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CommentsSheet;
