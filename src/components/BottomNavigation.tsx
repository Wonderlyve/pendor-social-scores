
import { Home, Search, Video, BarChart3, User } from 'lucide-react';

const BottomNavigation = () => {
  const navItems = [
    { icon: Home, label: 'Accueil', active: true },
    { icon: Search, label: 'Explorer', active: false },
    { icon: Video, label: 'Lives', active: false },
    { icon: BarChart3, label: 'Stats', active: false },
    { icon: User, label: 'Profil', active: false },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex">
        {navItems.map((item, index) => {
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
      </div>
    </div>
  );
};

export default BottomNavigation;
