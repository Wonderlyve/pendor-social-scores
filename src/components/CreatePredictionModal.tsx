
import { useState } from 'react';
import { X, Camera, Video, BarChart3, Clock, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface CreatePredictionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreatePredictionModal = ({ isOpen, onClose }: CreatePredictionModalProps) => {
  const [formData, setFormData] = useState({
    match: '',
    prediction: '',
    odds: '',
    analysis: '',
    confidence: 3,
    sport: '',
    league: ''
  });

  const [mediaFiles, setMediaFiles] = useState<File[]>([]);

  const sports = [
    { value: 'football', label: 'Football' },
    { value: 'tennis', label: 'Tennis' },
    { value: 'basketball', label: 'Basketball' },
    { value: 'rugby', label: 'Rugby' },
    { value: 'handball', label: 'Handball' }
  ];

  const confidenceLabels = {
    1: 'Très faible',
    2: 'Faible', 
    3: 'Moyenne',
    4: 'Élevée',
    5: 'Très élevée'
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Nouveau pronostic:', formData);
    // Logique d'envoi du pronostic
    onClose();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setMediaFiles(Array.from(e.target.files));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Nouveau pronostic</span>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Profil utilisateur */}
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <Avatar className="w-10 h-10">
              <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face" />
              <AvatarFallback>PK</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium text-sm">Prono King</div>
              <div className="text-xs text-gray-500">@prono_king</div>
            </div>
          </div>

          {/* Sport et Ligue */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">Sport</label>
              <Select value={formData.sport} onValueChange={(value) => setFormData({...formData, sport: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Choisir..." />
                </SelectTrigger>
                <SelectContent>
                  {sports.map((sport) => (
                    <SelectItem key={sport.value} value={sport.value}>
                      {sport.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Ligue</label>
              <Input
                value={formData.league}
                onChange={(e) => setFormData({...formData, league: e.target.value})}
                placeholder="ex: Champions League"
              />
            </div>
          </div>

          {/* Match */}
          <div>
            <label className="block text-sm font-medium mb-1">Match</label>
            <Input
              value={formData.match}
              onChange={(e) => setFormData({...formData, match: e.target.value})}
              placeholder="ex: PSG vs Real Madrid"
              required
            />
          </div>

          {/* Pronostic et Cote */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">Pronostic</label>
              <Input
                value={formData.prediction}
                onChange={(e) => setFormData({...formData, prediction: e.target.value})}
                placeholder="ex: Victoire PSG"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Cote</label>
              <Input
                value={formData.odds}
                onChange={(e) => setFormData({...formData, odds: e.target.value})}
                placeholder="ex: 2.10"
                type="number"
                step="0.01"
                required
              />
            </div>
          </div>

          {/* Niveau de confiance */}
          <div>
            <label className="block text-sm font-medium mb-2">
              <div className="flex items-center space-x-2">
                <Target className="w-4 h-4" />
                <span>Niveau de confiance</span>
              </div>
            </label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setFormData({...formData, confidence: level})}
                  className={`flex-1 py-2 px-3 rounded-lg border text-sm font-medium transition-colors ${
                    formData.confidence === level
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {confidenceLabels[formData.confidence as keyof typeof confidenceLabels]}
            </p>
          </div>

          {/* Analyse */}
          <div>
            <label className="block text-sm font-medium mb-1">Analyse</label>
            <Textarea
              value={formData.analysis}
              onChange={(e) => setFormData({...formData, analysis: e.target.value})}
              placeholder="Partagez votre analyse détaillée..."
              rows={4}
              required
            />
          </div>

          {/* Médias */}
          <div>
            <label className="block text-sm font-medium mb-2">Médias (optionnel)</label>
            <div className="flex space-x-2">
              <label className="flex-1 flex items-center justify-center space-x-2 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 transition-colors">
                <Camera className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-600">Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  multiple
                />
              </label>
              <label className="flex-1 flex items-center justify-center space-x-2 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 transition-colors">
                <Video className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-600">Vidéo</span>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
            {mediaFiles.length > 0 && (
              <div className="mt-2 text-sm text-gray-600">
                {mediaFiles.length} fichier(s) sélectionné(s)
              </div>
            )}
          </div>

          {/* Boutons d'action */}
          <div className="flex space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Annuler
            </Button>
            <Button type="submit" className="flex-1">
              Publier
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePredictionModal;
