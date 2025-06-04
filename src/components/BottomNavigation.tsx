
import { Home, Search, Video, User, Plus } from 'lucide-react';

interface BottomNavigationProps {
  onCreatePost?: () => void;
}

const BottomNavigation = ({ onCreatePost }: BottomNavigationProps) => {
  const navItems = [
    { icon: Home, label: 'Accueil', active: true },
    { icon: Search, label: 'Explorer', active: false },
    { icon: Video, label: 'Lives', active: false },
    { icon: User, label: 'Profil', active: false },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex items-center">
        {navItems.slice(0, 2).map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={index}
              className={`flex-1 py-2 px-1 flex flex-col items-center justify-center space-y-1 transition-colors ${
                item.active
                  ? 'text-primary bg-blue-50'
                  : 'text-gray-600 hover:text-primary hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
        
        {/* Bouton Créer au centre */}
        <div className="flex-1 flex justify-center">
          <button
            onClick={onCreatePost}
            className="w-14 h-14 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg transform -translate-y-2 hover:scale-105 transition-transform"
          >
            <Plus className="w-6 h-6 text-white" />
          </button>
        </div>
        
        {navItems.slice(2).map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={index + 2}
              className={`flex-1 py-2 px-1 flex flex-col items-center justify-center space-y-1 transition-colors ${
                item.active
                  ? 'text-primary bg-blue-50'
                  : 'text-gray-600 hover:text-primary hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
