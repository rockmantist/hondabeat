import React, { useState } from 'react';
import { Search, Bell, User, Settings, LogOut } from 'lucide-react';

export function Header() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const notifications = [
    {
      id: 1,
      type: 'alert',
      title: 'Fraud Terdeteksi',
      message: 'Potensi fraud di Desa Sukamaju memerlukan perhatian',
      time: '5 menit lalu',
      unread: true
    },
    {
      id: 2,
      type: 'report',
      title: 'Laporan Baru',
      message: 'Laporan baru dari masyarakat di Desa Makmur',
      time: '15 menit lalu',
      unread: true
    },
    {
      id: 3,
      type: 'case',
      title: 'Update Kasus',
      message: 'Kasus KOR-2024-001 telah diselesaikan',
      time: '1 jam lalu',
      unread: false
    },
    {
      id: 4,
      type: 'anomaly',
      title: 'Anomali IP Terdeteksi',
      message: '5 laporan dari IP address yang sama dalam 1 jam',
      time: '2 jam lalu',
      unread: true
    }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex-1 max-w-md relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Cari laporan, kasus, atau desa..."
            className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Right Side - Notifications and Profile */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-400 hover:text-white transition-colors"
            >
              <Bell className="h-6 w-6" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50">
                <div className="p-4 border-b border-gray-700">
                  <h3 className="text-white font-medium">Notifikasi</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-gray-700 hover:bg-gray-700 transition-colors ${
                        notification.unread ? 'bg-gray-750' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          notification.unread ? 'bg-blue-500' : 'bg-gray-600'
                        }`}></div>
                        <div className="flex-1">
                          <h4 className="text-white font-medium text-sm">{notification.title}</h4>
                          <p className="text-gray-400 text-sm mt-1">{notification.message}</p>
                          <p className="text-gray-500 text-xs mt-2">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-gray-700">
                  <button className="w-full text-blue-400 hover:text-blue-300 text-sm transition-colors">
                    Lihat Semua Notifikasi
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center space-x-3 p-2 text-gray-400 hover:text-white transition-colors"
            >
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-white text-sm font-medium">Admin Kejaksaan</p>
                <p className="text-gray-400 text-xs">Investigator</p>
              </div>
            </button>

            {/* Profile Dropdown */}
            {showProfile && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50">
                <div className="p-4 border-b border-gray-700">
                  <p className="text-white font-medium">Admin Kejaksaan</p>
                  <p className="text-gray-400 text-sm">admin@kejaksaan.go.id</p>
                </div>
                <div className="py-2">
                  <button className="w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-700 hover:text-white transition-colors flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>Profil Saya</span>
                  </button>
                  <button className="w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-700 hover:text-white transition-colors flex items-center space-x-2">
                    <Settings className="h-4 w-4" />
                    <span>Pengaturan</span>
                  </button>
                </div>
                <div className="border-t border-gray-700 py-2">
                  <button className="w-full px-4 py-2 text-left text-red-400 hover:bg-gray-700 hover:text-red-300 transition-colors flex items-center space-x-2">
                    <LogOut className="h-4 w-4" />
                    <span>Keluar</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}