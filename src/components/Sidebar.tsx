import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  BarChart3, 
  FileText, 
  Map, 
  Brain, 
  Briefcase, 
  Settings,
  Shield,
  Download,
  Share2
} from 'lucide-react';

const menuItems = [
  { icon: BarChart3, label: 'Dashboard', path: '/' },
  { icon: FileText, label: 'Laporan', path: '/reports' },
  // { icon: Map, label: 'Peta Intelijen', path: '/intelligence-map' },
  { icon: Brain, label: 'AI Analytics', path: '/ai-analytics' },
  // { icon: Briefcase, label: 'Manajemen Kasus', path: '/case-management' },
  { icon: Settings, label: 'System Log', path: '/admin' },
];

export function Sidebar() {
  return (
    <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <img src='./src/assets/img/aidhyaksa.png' className='w-16 h-16'></img>
          <div>
            <h1 className="text-xl font-bold text-white">JagaDesa</h1>
            <p className="text-xs text-gray-400">Intelligence Dashboard</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`
            }
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      
      <div className="p-4 border-t border-gray-700 space-y-2">
        <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors">
          <Share2 className="h-5 w-5" />
          <span>Share Dashboard</span>
        </button>
        <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors">
          <Download className="h-5 w-5" />
          <span>Export Data</span>
        </button>
      </div>
    </div>
  );
}