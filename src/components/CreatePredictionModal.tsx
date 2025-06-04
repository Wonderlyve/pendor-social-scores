
import { useState } from 'react';
import { X, Image, Video, Calendar, TrendingUp } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface CreatePredictionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreatePredictionModal = ({ open, onOpenChange }: CreatePredictionModalProps) => {
  const [predictionText, setPredictionText] = useState('');
  const [matchInfo, setMatchInfo] = useState('');
  const [odds, setOdds] = useState('');
  const [confidence, setConfidence] = useState(3);

  const handleSubmit = () => {
    // Logic to submit prediction
    console.log({ predictionText, matchInfo, odds, confidence });
    onOpenChange(false);
    // Reset form
    setPredictionText('');
    setMatchInfo('');
    setOdds('');
    setConfidence(3);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-green-500" />
            <span>Nouveau Pronostic</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Match Information */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Match / Événement
            </label>
            <Input
              placeholder="Ex: PSG vs Real Madrid"
              value={matchInfo}
              onChange={(e) => setMatchInfo(e.target.value)}
            />
          </div>

          {/* Prediction */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Votre pronostic
            </label>
            <Textarea
              placeholder="Ex: Victoire PSG, plus de 2.5 buts..."
              value={predictionText}
              onChange={(e) => setPredictionText(e.target.value)}
              rows={3}
            />
          </div>

          {/* Odds */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Cote
            </label>
            <Input
              placeholder="Ex: 2.10"
              value={odds}
              onChange={(e) => setOdds(e.target.value)}
              type="number"
              step="0.01"
            />
          </div>

          {/* Confidence */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Niveau de confiance: {confidence}/5
            </label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setConfidence(star)}
                  className={`text-2xl ${
                    star <= confidence ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                >
                  ⭐
                </button>
              ))}
            </div>
          </div>

          {/* Media Options */}
          <Card className="p-3">
            <div className="flex space-x-3">
              <Button variant="outline" size="sm" className="flex-1">
                <Image className="w-4 h-4 mr-2" />
                Photo
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <Video className="w-4 h-4 mr-2" />
                Vidéo
              </Button>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Annuler
            </Button>
            <Button
              onClick={handleSubmit}
              className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
              disabled={!predictionText || !matchInfo}
            >
              Publier
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePredictionModal;
