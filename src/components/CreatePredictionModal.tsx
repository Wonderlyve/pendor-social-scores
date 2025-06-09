
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star, Upload, X } from 'lucide-react';
import FileUpload from './FileUpload';
import { useOptimizedPosts } from '@/hooks/useOptimizedPosts';

interface CreatePredictionModalProps {
  onClose: () => void;
}

const CreatePredictionModal = ({ onClose }: CreatePredictionModalProps) => {
  const [sport, setSport] = useState('');
  const [matchTeams, setMatchTeams] = useState('');
  const [predictionText, setPredictionText] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [odds, setOdds] = useState('');
  const [confidence, setConfidence] = useState(3);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { createPost } = useOptimizedPosts();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!analysis.trim()) {
      toast.error('L\'analyse est obligatoire');
      return;
    }

    if (!odds || isNaN(Number(odds))) {
      toast.error('Les cotes doivent être un nombre valide');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await createPost({
        sport: sport || undefined,
        match_teams: matchTeams || undefined,
        prediction_text: predictionText || undefined,
        analysis,
        odds: Number(odds),
        confidence,
        image_file: imageFile || undefined,
        video_file: videoFile || undefined,
      });

      if (result) {
        // Reset form
        setSport('');
        setMatchTeams('');
        setPredictionText('');
        setAnalysis('');
        setOdds('');
        setConfidence(3);
        setImageFile(null);
        setVideoFile(null);
        onClose();
      }
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('Erreur lors de la création du post');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Créer un nouveau pronostic</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sport">Sport</Label>
              <Select value={sport} onValueChange={setSport}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un sport" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="football">Football</SelectItem>
                  <SelectItem value="basketball">Basketball</SelectItem>
                  <SelectItem value="tennis">Tennis</SelectItem>
                  <SelectItem value="rugby">Rugby</SelectItem>
                  <SelectItem value="hockey">Hockey</SelectItem>
                  <SelectItem value="baseball">Baseball</SelectItem>
                  <SelectItem value="autres">Autres</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="matchTeams">Équipes du match</Label>
              <Input
                id="matchTeams"
                value={matchTeams}
                onChange={(e) => setMatchTeams(e.target.value)}
                placeholder="ex: PSG vs Marseille"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="predictionText">Pronostic</Label>
              <Input
                id="predictionText"
                value={predictionText}
                onChange={(e) => setPredictionText(e.target.value)}
                placeholder="ex: Victoire du PSG"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="odds">Cotes *</Label>
              <Input
                id="odds"
                type="number"
                step="0.01"
                min="1"
                value={odds}
                onChange={(e) => setOdds(e.target.value)}
                placeholder="ex: 2.50"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Niveau de confiance *</Label>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setConfidence(star)}
                    className="p-1"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= confidence ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="analysis">Analyse détaillée *</Label>
              <Textarea
                id="analysis"
                value={analysis}
                onChange={(e) => setAnalysis(e.target.value)}
                placeholder="Expliquez votre analyse et les raisons de ce pronostic..."
                rows={4}
                required
              />
            </div>

            <div className="space-y-4">
              <div>
                <Label>Image (optionnel)</Label>
                <FileUpload
                  accept="image/*"
                  onChange={setImageFile}
                  preview={imageFile}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Vidéo (optionnel)</Label>
                <FileUpload
                  accept="video/*"
                  onChange={setVideoFile}
                  preview={videoFile}
                  className="mt-2"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Annuler
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Publication...' : 'Publier le pronostic'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatePredictionModal;
