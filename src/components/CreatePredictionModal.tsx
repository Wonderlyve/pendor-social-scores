
import { useState } from 'react';
import { X, Image, Video, Calendar, TrendingUp, Plus, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Match {
  id: number;
  teams: string;
  prediction: string;
  odds: string;
  league: string;
  time: string;
}

interface CreatePredictionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreatePredictionModal = ({ open, onOpenChange }: CreatePredictionModalProps) => {
  const [betType, setBetType] = useState<'simple' | 'combine'>('simple');
  const [matches, setMatches] = useState<Match[]>([
    { id: 1, teams: '', prediction: '', odds: '', league: '', time: '' }
  ]);
  const [analysis, setAnalysis] = useState('');
  const [confidence, setConfidence] = useState(3);
  const [sport, setSport] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const addMatch = () => {
    const newMatch: Match = {
      id: matches.length + 1,
      teams: '',
      prediction: '',
      odds: '',
      league: '',
      time: ''
    };
    setMatches([...matches, newMatch]);
  };

  const removeMatch = (id: number) => {
    if (matches.length > 1) {
      setMatches(matches.filter(match => match.id !== id));
    }
  };

  const updateMatch = (id: number, field: keyof Match, value: string) => {
    setMatches(matches.map(match => 
      match.id === id ? { ...match, [field]: value } : match
    ));
  };

  const calculateTotalOdds = () => {
    const validOdds = matches.filter(m => m.odds && !isNaN(parseFloat(m.odds)));
    if (validOdds.length === 0) return '0.00';
    return validOdds.reduce((total, match) => total * parseFloat(match.odds), 1).toFixed(2);
  };

  const handleSubmit = () => {
    // Logic to submit prediction
    const predictionData = {
      betType,
      matches: matches.filter(m => m.teams && m.prediction),
      analysis,
      confidence,
      sport,
      totalOdds: betType === 'combine' ? calculateTotalOdds() : null,
      image
    };
    console.log(predictionData);
    onOpenChange(false);
    
    // Reset form
    setMatches([{ id: 1, teams: '', prediction: '', odds: '', league: '', time: '' }]);
    setAnalysis('');
    setConfidence(3);
    setSport('');
    setImage(null);
    setBetType('simple');
  };

  const isFormValid = () => {
    return matches.some(m => m.teams && m.prediction && m.odds) && 
           analysis.trim() && 
           sport;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md mx-auto h-[90vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-green-500" />
            <span>Nouveau Pronostic</span>
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="flex-1 px-4">
          <div className="space-y-4 pb-4">
            {/* Type de pari */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Type de pari
              </label>
              <Select value={betType} onValueChange={(value: 'simple' | 'combine') => setBetType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="simple">Pari Simple</SelectItem>
                  <SelectItem value="combine">Pari Combiné</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Sport */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Sport / Compétition
              </label>
              <Input
                placeholder="Ex: Football, Tennis, Basketball..."
                value={sport}
                onChange={(e) => setSport(e.target.value)}
              />
            </div>

            {/* Cote totale si pari combiné */}
            {betType === 'combine' && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-orange-800 text-sm">Cote totale calculée</span>
                  <span className="text-lg font-bold text-orange-600">
                    {calculateTotalOdds()}
                  </span>
                </div>
              </div>
            )}

            {/* Matchs */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">
                  {betType === 'combine' ? 'Matchs du combiné' : 'Match'}
                </label>
                {betType === 'combine' && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addMatch}
                    className="text-xs"
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    Ajouter
                  </Button>
                )}
              </div>
              
              <div className="space-y-3">
                {matches.map((match, index) => (
                  <Card key={match.id} className="p-3">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-gray-600">
                          {betType === 'combine' ? `Match ${index + 1}` : 'Match'}
                        </span>
                        {betType === 'combine' && matches.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeMatch(match.id)}
                            className="text-red-500 p-1 h-auto"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                      
                      <Input
                        placeholder="Équipes (ex: PSG vs Real Madrid)"
                        value={match.teams}
                        onChange={(e) => updateMatch(match.id, 'teams', e.target.value)}
                        className="text-sm"
                      />
                      
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          placeholder="Compétition"
                          value={match.league}
                          onChange={(e) => updateMatch(match.id, 'league', e.target.value)}
                          className="text-sm"
                        />
                        <Input
                          placeholder="Heure"
                          value={match.time}
                          onChange={(e) => updateMatch(match.id, 'time', e.target.value)}
                          className="text-sm"
                        />
                      </div>
                      
                      <Input
                        placeholder="Votre pronostic (ex: Victoire PSG)"
                        value={match.prediction}
                        onChange={(e) => updateMatch(match.id, 'prediction', e.target.value)}
                        className="text-sm"
                      />
                      
                      <Input
                        placeholder="Cote (ex: 2.10)"
                        value={match.odds}
                        onChange={(e) => updateMatch(match.id, 'odds', e.target.value)}
                        type="number"
                        step="0.01"
                        className="text-sm"
                      />
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Analyse */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Analyse détaillée
              </label>
              <Textarea
                placeholder="Expliquez votre analyse, les statistiques, la forme des équipes..."
                value={analysis}
                onChange={(e) => setAnalysis(e.target.value)}
                rows={4}
                className="text-sm"
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
                    type="button"
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
                <Button variant="outline" size="sm" className="flex-1 text-xs">
                  <Image className="w-4 h-4 mr-1" />
                  Photo
                </Button>
                <Button variant="outline" size="sm" className="flex-1 text-xs">
                  <Video className="w-4 h-4 mr-1" />
                  Vidéo
                </Button>
              </div>
            </Card>
          </div>
        </ScrollArea>

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-4 border-t flex-shrink-0">
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
            disabled={!isFormValid()}
          >
            Publier
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePredictionModal;
