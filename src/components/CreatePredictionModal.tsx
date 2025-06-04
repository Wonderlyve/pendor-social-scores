
import { useState } from 'react';
import { X, Plus, Minus, Upload, Video, ImageIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface CreatePredictionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Match {
  id: string;
  teams: string;
  prediction: string;
  odds: string;
  league: string;
  time: string;
}

const CreatePredictionModal = ({ isOpen, onClose }: CreatePredictionModalProps) => {
  const [predictionType, setPredictionType] = useState<'single' | 'combined'>('single');
  const [matches, setMatches] = useState<Match[]>([{
    id: '1',
    teams: '',
    prediction: '',
    odds: '',
    league: '',
    time: ''
  }]);
  const [analysis, setAnalysis] = useState('');
  const [confidence, setConfidence] = useState(3);
  const [sport, setSport] = useState('Football');
  const [mediaType, setMediaType] = useState<'none' | 'image' | 'video'>('none');

  const addMatch = () => {
    setMatches(prev => [...prev, {
      id: Date.now().toString(),
      teams: '',
      prediction: '',
      odds: '',
      league: '',
      time: ''
    }]);
    setPredictionType('combined');
  };

  const removeMatch = (id: string) => {
    if (matches.length > 1) {
      setMatches(prev => prev.filter(match => match.id !== id));
      if (matches.length === 2) {
        setPredictionType('single');
      }
    }
  };

  const updateMatch = (id: string, field: keyof Match, value: string) => {
    setMatches(prev => prev.map(match => 
      match.id === id ? { ...match, [field]: value } : match
    ));
  };

  const handleSubmit = () => {
    // Ici on peut traiter la création du pronostic
    console.log('Nouveau pronostic:', {
      type: predictionType,
      matches,
      analysis,
      confidence,
      sport,
      mediaType
    });
    onClose();
  };

  const isFormValid = matches.every(match => 
    match.teams && match.prediction && match.odds
  ) && analysis.trim();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <span>Créer un pronostic</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Type de pronostic */}
          <div>
            <label className="block text-sm font-medium mb-2">Type de sport</label>
            <select
              value={sport}
              onChange={(e) => setSport(e.target.value)}
              className="w-full p-2 border rounded-lg"
            >
              <option value="Football">Football</option>
              <option value="Basketball">Basketball</option>
              <option value="Tennis">Tennis</option>
              <option value="Rugby">Rugby</option>
            </select>
          </div>

          {/* Matchs */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium">
                {predictionType === 'single' ? 'Match' : 'Matches'} 
                {predictionType === 'combined' && (
                  <Badge variant="secondary" className="ml-2">Combiné</Badge>
                )}
              </label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addMatch}
                className="flex items-center space-x-1"
              >
                <Plus className="w-4 h-4" />
                <span>Ajouter</span>
              </Button>
            </div>
            
            <div className="space-y-3">
              {matches.map((match, index) => (
                <Card key={match.id} className="relative">
                  <CardContent className="p-4">
                    {matches.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeMatch(match.id)}
                        className="absolute top-2 right-2 h-6 w-6 p-0"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                    
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          placeholder="Équipes (ex: PSG vs Real)"
                          value={match.teams}
                          onChange={(e) => updateMatch(match.id, 'teams', e.target.value)}
                        />
                        <Input
                          placeholder="Ligue"
                          value={match.league}
                          onChange={(e) => updateMatch(match.id, 'league', e.target.value)}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          placeholder="Pronostic"
                          value={match.prediction}
                          onChange={(e) => updateMatch(match.id, 'prediction', e.target.value)}
                        />
                        <Input
                          placeholder="Cote (ex: 2.10)"
                          value={match.odds}
                          onChange={(e) => updateMatch(match.id, 'odds', e.target.value)}
                        />
                      </div>
                      
                      <Input
                        placeholder="Heure (ex: 21:00)"
                        value={match.time}
                        onChange={(e) => updateMatch(match.id, 'time', e.target.value)}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Niveau de confiance */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Niveau de confiance: {confidence}/5
            </label>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map(level => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setConfidence(level)}
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                    level <= confidence 
                      ? 'bg-yellow-400 border-yellow-400 text-white' 
                      : 'border-gray-300'
                  }`}
                >
                  ⭐
                </button>
              ))}
            </div>
          </div>

          {/* Analyse */}
          <div>
            <label className="block text-sm font-medium mb-2">Analyse</label>
            <Textarea
              placeholder="Partagez votre analyse détaillée..."
              value={analysis}
              onChange={(e) => setAnalysis(e.target.value)}
              rows={4}
            />
          </div>

          {/* Médias */}
          <div>
            <label className="block text-sm font-medium mb-2">Ajouter un média (optionnel)</label>
            <div className="flex space-x-2">
              <Button
                type="button"
                variant={mediaType === 'image' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setMediaType(mediaType === 'image' ? 'none' : 'image')}
              >
                <ImageIcon className="w-4 h-4 mr-1" />
                Image
              </Button>
              <Button
                type="button"
                variant={mediaType === 'video' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setMediaType(mediaType === 'video' ? 'none' : 'video')}
              >
                <Video className="w-4 h-4 mr-1" />
                Vidéo
              </Button>
            </div>
            
            {mediaType !== 'none' && (
              <div className="mt-2 p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
                <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">
                  Cliquez pour télécharger une {mediaType === 'image' ? 'image' : 'vidéo'}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex space-x-3 pt-4">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Annuler
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={!isFormValid}
            className="flex-1"
          >
            Publier
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePredictionModal;
