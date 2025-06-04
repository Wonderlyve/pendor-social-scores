
import { Home, Search, Video, User, Plus } from 'lucide-react';

interface BottomNavigationProps {
  onCreatePost?: () => void;
}

const BottomNavigation = ({ onCreatePost }: BottomNavigationProps) => {
  const navItems = [
    { icon: Home, label: 'Accueil', active: true, type: 'normal' },
    { icon: Search, label: 'Explorer', active: false, type: 'normal' },
    { icon: Plus, label: 'Créer', active: false, type: 'create' },
    { icon: Video, label: 'Lives', active: false, type: 'normal' },
    { icon: User, label: 'Profil', active: false, type: 'normal' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          
          if (item.type === 'create') {
            return (
              <button
                key={index}
                onClick={onCreatePost}
                className="flex-1 py-2 px-1 flex flex-col items-center justify-center space-y-1 transition-colors relative"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg transform -translate-y-2">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs font-medium text-gray-600">{item.label}</span>
              </button>
            );
          }
          
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
      </div>
    </div>
  );
};

export default BottomNavigation;
