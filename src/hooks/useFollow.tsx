
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export const useFollow = () => {
  const { user } = useAuth();

  const followUser = async (followingId: string) => {
    if (!user) {
      toast.error('Vous devez être connecté pour suivre un utilisateur');
      return false;
    }

    if (user.id === followingId) {
      toast.error('Vous ne pouvez pas vous suivre vous-même');
      return false;
    }

    try {
      // Check if already following
      const { data: existingFollow } = await supabase
        .from('followers')
        .select('*')
        .eq('follower_id', user.id)
        .eq('following_id', followingId)
        .single();

      if (existingFollow) {
        // Unfollow
        const { error } = await supabase
          .from('followers')
          .delete()
          .eq('follower_id', user.id)
          .eq('following_id', followingId);

        if (error) {
          console.error('Error unfollowing user:', error);
          toast.error('Erreur lors du désabonnement');
          return false;
        }

        toast.success('Utilisateur désabonné avec succès');
        return false; // Now not following
      } else {
        // Follow
        const { error } = await supabase
          .from('followers')
          .insert({
            follower_id: user.id,
            following_id: followingId
          });

        if (error) {
          console.error('Error following user:', error);
          toast.error('Erreur lors de l\'abonnement');
          return false;
        }

        toast.success('Utilisateur suivi avec succès');
        return true; // Now following
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Erreur lors de l\'action');
      return false;
    }
  };

  const isFollowing = async (followingId: string): Promise<boolean> => {
    if (!user || user.id === followingId) return false;

    try {
      const { data } = await supabase
        .from('followers')
        .select('*')
        .eq('follower_id', user.id)
        .eq('following_id', followingId)
        .single();

      return !!data;
    } catch (error) {
      return false;
    }
  };

  const getFollowCounts = async (userId: string) => {
    try {
      const [followersResult, followingResult] = await Promise.all([
        supabase
          .from('followers')
          .select('*', { count: 'exact' })
          .eq('following_id', userId),
        supabase
          .from('followers')
          .select('*', { count: 'exact' })
          .eq('follower_id', userId)
      ]);

      return {
        followers: followersResult.count || 0,
        following: followingResult.count || 0
      };
    } catch (error) {
      console.error('Error getting follow counts:', error);
      return { followers: 0, following: 0 };
    }
  };

  return {
    followUser,
    isFollowing,
    getFollowCounts
  };
};
