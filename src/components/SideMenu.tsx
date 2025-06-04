
import { useState } from 'react';
import { X, User, Settings, HelpCircle, LogOut, TrendingUp, Award, Bell, Shield, BookOpen } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader } from '@/components/ui/sheet';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideMenu = ({ isOpen, onClose }: SideMenuProps) => {
  const menuItems = [
    {
      icon: User,
      label: 'Mon profil',
      href: '/profile',
      badge: null
    },
    {
      icon: TrendingUp,
      label: 'Mes statistiques',
      href: '/stats',
      badge: null
    },
    {
      icon: Award,
      label: 'Mes succès',
      href: '/achievements',
      badge: '3'
    },
    {
      icon: Bell,
      label: 'Notifications',
      href: '/notifications',
      badge: '12'
    },
    {
      icon: BookOpen,
      label: 'Guide du débutant',
      href: '/guide',
      badge: null
    },
    {
      icon: Shield,
      label: 'Jeu responsable',
      href: '/responsible-gaming',
      badge: null
    },
    {
      icon: Settings,
      label: 'Paramètres',
      href: '/settings',
      badge: null
    },
    {
      icon: HelpCircle,
      label: 'Aide & Support',
      href: '/help',
      badge: null
    }
  ];

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-80 p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <SheetHeader className="p-6 bg-gradient-to-r from-green-500 to-green-600 text-white">
            <div className="flex items-center space-x-4">
              <Avatar className="w-16 h-16 border-4 border-white/20">
                <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" />
                <AvatarFallback>PK</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold">Alexandre Martin</h3>
                <p className="text-green-100">@prono_king</p>
                <Badge className="bg-yellow-500 text-yellow-900 mt-1">
                  Confirmé
                </Badge>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-white/20">
              <div className="text-center">
                <div className="text-xl font-bold">12.5K</div>
                <div className="text-xs text-green-100">Abonnés</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold">78%</div>
                <div className="text-xs text-green-100">Réussite</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold">234</div>
                <div className="text-xs text-green-100">Pronos</div>
              </div>
            </div>
          </SheetHeader>

          {/* Menu Items */}
          <div className="flex-1 py-4">
            <nav className="space-y-2">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    // Navigation logic here
                    onClose();
                  }}
                  className="w-full flex items-center justify-between px-6 py-3 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-800 font-medium">{item.label}</span>
                  </div>
                  {item.badge && (
                    <Badge variant="secondary" className="text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Footer */}
          <div className="border-t p-6 space-y-3">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-1">Version Premium</h4>
              <p className="text-sm text-blue-700 mb-3">
                Débloquez des analyses exclusives et plus de fonctionnalités
              </p>
              <Button size="sm" className="w-full">
                Passer au Premium
              </Button>
            </div>
            
            <button 
              onClick={onClose}
              className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Déconnexion</span>
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SideMenu;
