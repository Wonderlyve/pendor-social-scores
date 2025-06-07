
import { useRef, useState } from 'react';
import { Image, Video, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FileUploadProps {
  onImageSelect: (file: File | null) => void;
  onVideoSelect: (file: File | null) => void;
  selectedImage: File | null;
  selectedVideo: File | null;
}

const FileUpload = ({ onImageSelect, onVideoSelect, selectedImage, selectedVideo }: FileUploadProps) => {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Vérifier la taille (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('L\'image ne doit pas dépasser 5MB');
        return;
      }
      // Vérifier le type
      if (!file.type.startsWith('image/')) {
        alert('Veuillez sélectionner un fichier image valide');
        return;
      }
      onImageSelect(file);
    }
  };

  const handleVideoSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Vérifier la taille (max 50MB)
      if (file.size > 50 * 1024 * 1024) {
        alert('La vidéo ne doit pas dépasser 50MB');
        return;
      }
      // Vérifier le type
      if (!file.type.startsWith('video/')) {
        alert('Veuillez sélectionner un fichier vidéo valide');
        return;
      }
      onVideoSelect(file);
    }
  };

  const removeImage = () => {
    onImageSelect(null);
    if (imageInputRef.current) {
      imageInputRef.current.value = '';
    }
  };

  const removeVideo = () => {
    onVideoSelect(null);
    if (videoInputRef.current) {
      videoInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex space-x-3">
        <Button 
          type="button"
          variant="outline" 
          size="sm" 
          className="flex-1 text-xs"
          onClick={() => imageInputRef.current?.click()}
        >
          <Image className="w-4 h-4 mr-1" />
          Photo
        </Button>
        <Button 
          type="button"
          variant="outline" 
          size="sm" 
          className="flex-1 text-xs"
          onClick={() => videoInputRef.current?.click()}
        >
          <Video className="w-4 h-4 mr-1" />
          Vidéo
        </Button>
      </div>

      {/* Preview de l'image sélectionnée */}
      {selectedImage && (
        <div className="relative">
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Preview"
            className="w-full h-32 object-cover rounded-lg"
          />
          <button
            type="button"
            onClick={removeImage}
            className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
            {selectedImage.name}
          </div>
        </div>
      )}

      {/* Preview de la vidéo sélectionnée */}
      {selectedVideo && (
        <div className="relative">
          <video
            src={URL.createObjectURL(selectedVideo)}
            className="w-full h-32 object-cover rounded-lg"
            controls
          />
          <button
            type="button"
            onClick={removeVideo}
            className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
            {selectedVideo.name}
          </div>
        </div>
      )}

      {/* Inputs cachés */}
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageSelect}
        className="hidden"
      />
      <input
        ref={videoInputRef}
        type="file"
        accept="video/*"
        onChange={handleVideoSelect}
        className="hidden"
      />
    </div>
  );
};

export default FileUpload;
