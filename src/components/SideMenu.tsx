
import { useState } from 'react';
import { X, User, Settings, HelpCircle, Shield, Bell, Bookmark, TrendingUp, Users, LogOut, Sun, Moon } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideMenu = ({ isOpen, onClose }: SideMenuProps) => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const menuSections = [
    {
      title: 'Mon compte',
      items: [
        { icon: User, label: 'Mon profil', action: () => console.log('Profil') },
        { icon: Bookmark, label: 'Mes favoris', action: () => console.log('Favoris') },
        { icon: TrendingUp, label: 'Mes statistiques', action: () => console.log('Stats') },
        { icon: Users, label: 'Mes abonnements', action: () => console.log('Abonnements') }
      ]
    },
    {
      title: 'Paramètres',
      items: [
        { icon: Settings, label: 'Préférences', action: () => console.log('Préférences') },
        { icon: Bell, label: 'Notifications', action: () => console.log('Notifications') },
        { icon: Shield, label: 'Confidentialité', action: () => console.log('Confidentialité') }
      ]
    },
    {
      title: 'Support',
      items: [
        { icon: HelpCircle, label: 'Aide et FAQ', action: () => console.log('Aide') },
        { icon: LogOut, label: 'Se déconnecter', action: () => console.log('Déconnexion'), danger: true }
      ]
    }
  ];

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-80 p-0">
        <div className="flex flex-col h-full">
          {/* Header avec profil */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <SheetTitle className="text-white text-lg font-bold">Menu</SheetTitle>
              <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/20">
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="flex items-center space-x-3">
              <Avatar className="w-12 h-12 border-2 border-white">
                <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face" />
                <AvatarFallback>PK</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-semibold">Prono King</div>
                <div className="text-green-100 text-sm">@prono_king</div>
                <div className="flex items-center space-x-4 text-xs text-green-100 mt-1">
                  <span>1,247 abonnés</span>
                  <span>78% réussite</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contenu du menu */}
          <div className="flex-1 overflow-y-auto">
            {/* Paramètres rapides */}
            <div className="p-4 border-b">
              <h3 className="font-medium text-gray-700 mb-3">Paramètres rapides</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Sun className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">Mode sombre</span>
                  </div>
                  <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Bell className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">Notifications</span>
                  </div>
                  <Switch checked={notifications} onCheckedChange={setNotifications} />
                </div>
              </div>
            </div>

            {/* Sections du menu */}
            <div className="p-4">
              {menuSections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="mb-6">
                  <h3 className="font-medium text-gray-700 mb-3 text-sm uppercase tracking-wide">
                    {section.title}
                  </h3>
                  <div className="space-y-1">
                    {section.items.map((item, itemIndex) => (
                      <button
                        key={itemIndex}
                        onClick={item.action}
                        className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors text-left ${
                          item.danger 
                            ? 'text-red-600 hover:bg-red-50' 
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t bg-gray-50">
            <div className="text-center text-xs text-gray-500">
              <div className="mb-1">PENDOR v1.0.0</div>
              <div>© 2024 Tous droits réservés</div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SideMenu;
