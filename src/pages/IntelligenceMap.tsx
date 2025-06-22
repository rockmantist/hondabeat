import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import { 
  MapPin, 
  AlertTriangle, 
  TrendingUp, 
  Users, 
  DollarSign,
  Filter,
  Search,
  BarChart3,
  Activity,
  Shield
} from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const villageData = [
  {
    id: 1,
    name: 'Desa Sukamaju',
    position: [-6.2088, 106.8456],
    corruptionIndex: 8.5,
    transparencyScore: 6.2,
    governanceScore: 7.1,
    population: 3240,
    budget: 2100000000,
    riskLevel: 'high',
    activeReports: 12,
    cases: 3
  },
  {
    id: 2,
    name: 'Desa Makmur',
    position: [-6.1745, 106.8227],
    corruptionIndex: 4.2,
    transparencyScore: 8.7,
    governanceScore: 8.9,
    population: 2890,
    budget: 1800000000,
    riskLevel: 'low',
    activeReports: 3,
    cases: 0
  },
  {
    id: 3,
    name: 'Desa Sejahtera',
    position: [-6.2297, 106.8677],
    corruptionIndex: 7.8,
    transparencyScore: 5.4,
    governanceScore: 6.8,
    population: 4120,
    budget: 3200000000,
    riskLevel: 'high',
    activeReports: 18,
    cases: 5
  },
  {
    id: 4,
    name: 'Desa Harmoni',
    position: [-6.1567, 106.8890],
    corruptionIndex: 5.9,
    transparencyScore: 7.3,
    governanceScore: 7.6,
    population: 2150,
    budget: 1500000000,
    riskLevel: 'medium',
    activeReports: 6,
    cases: 1
  }
];

export function IntelligenceMap() {
  const [selectedVillage, setSelectedVillage] = useState(villageData[0]);
  const [filter, setFilter] = useState('all');

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'high':
        return '#EF4444';
      case 'medium':
        return '#F59E0B';
      case 'low':
        return '#10B981';
      default:
        return '#6B7280';
    }
  };

  const filteredVillages = villageData.filter(village => {
    if (filter === 'all') return true;
    return village.riskLevel === filter;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header with Score Cards */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Peta Intelijen Desa</h1>
          <p className="text-gray-400 mt-1">Monitoring visual distribusi risiko dan aktivitas desa</p>
        </div>
      </div>

      {/* Score Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Desa</p>
              <p className="text-3xl font-bold text-white">1,247</p>
              <p className="text-blue-400 text-sm">Aktif dipantau</p>
            </div>
            <MapPin className="h-12 w-12 text-blue-500" />
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Zona Risiko Tinggi</p>
              <p className="text-3xl font-bold text-white">89</p>
              <p className="text-red-400 text-sm">Perlu perhatian khusus</p>
            </div>
            <AlertTriangle className="h-12 w-12 text-red-500" />
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Populasi</p>
              <p className="text-3xl font-bold text-white">2.8M</p>
              <p className="text-green-400 text-sm">Jiwa terlindungi</p>
            </div>
            <Users className="h-12 w-12 text-green-500" />
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Anggaran</p>
              <p className="text-3xl font-bold text-white">Rp 847M</p>
              <p className="text-orange-400 text-sm">Dana desa 2024</p>
            </div>
            <DollarSign className="h-12 w-12 text-orange-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Section */}
        <div className="lg:col-span-2 bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
          <div className="p-4 border-b border-gray-700 flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white">Peta Distribusi Risiko</h3>
            <div className="flex items-center space-x-4">
              <select 
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Semua Tingkat Risiko</option>
                <option value="high">Risiko Tinggi</option>
                <option value="medium">Risiko Sedang</option>
                <option value="low">Risiko Rendah</option>
              </select>
            </div>
          </div>
          
          <div className="h-96">
            <MapContainer 
              center={[-6.2088, 106.8456]} 
              zoom={11} 
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {filteredVillages.map((village) => (
                <CircleMarker
                  key={village.id}
                  center={village.position as [number, number]}
                  radius={15}
                  fillColor={getRiskColor(village.riskLevel)}
                  color="#fff"
                  weight={2}
                  opacity={1}
                  fillOpacity={0.8}
                  eventHandlers={{
                    click: () => setSelectedVillage(village)
                  }}
                >
                  <Popup>
                    <div className="text-gray-900">
                      <h4 className="font-bold">{village.name}</h4>
                      <p>Indeks Korupsi: {village.corruptionIndex}/10</p>
                      <p>Laporan Aktif: {village.activeReports}</p>
                      <p>Kasus: {village.cases}</p>
                    </div>
                  </Popup>
                </CircleMarker>
              ))}
            </MapContainer>
          </div>

          {/* Legend */}
          <div className="p-4 border-t border-gray-700 bg-gray-900">
            <h4 className="text-white font-medium mb-2">Legenda Tingkat Risiko</h4>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-red-500"></div>
                <span className="text-gray-300 text-sm">Tinggi (8.0+)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                <span className="text-gray-300 text-sm">Sedang (5.0-7.9)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
                <span className="text-gray-300 text-sm">Rendah (0-4.9)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Village Details Sidebar */}
        <div className="space-y-6">
          {/* Selected Village Detail */}
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Detail Desa Terpilih</h3>
            {selectedVillage && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-medium text-white">{selectedVillage.name}</h4>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    selectedVillage.riskLevel === 'high' ? 'bg-red-600 text-white' :
                    selectedVillage.riskLevel === 'medium' ? 'bg-orange-600 text-white' :
                    'bg-green-600 text-white'
                  }`}>
                    Risiko {selectedVillage.riskLevel === 'high' ? 'Tinggi' : 
                            selectedVillage.riskLevel === 'medium' ? 'Sedang' : 'Rendah'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-700 p-3 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <AlertTriangle className="h-4 w-4 text-red-400" />
                      <span className="text-gray-300 text-sm">Indeks Korupsi</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{selectedVillage.corruptionIndex}</p>
                  </div>

                  <div className="bg-gray-700 p-3 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Shield className="h-4 w-4 text-blue-400" />
                      <span className="text-gray-300 text-sm">Skor Transparansi</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{selectedVillage.transparencyScore}</p>
                  </div>

                  <div className="bg-gray-700 p-3 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <BarChart3 className="h-4 w-4 text-green-400" />
                      <span className="text-gray-300 text-sm">Skor Tata Kelola</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{selectedVillage.governanceScore}</p>
                  </div>

                  <div className="bg-gray-700 p-3 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Users className="h-4 w-4 text-purple-400" />
                      <span className="text-gray-300 text-sm">Populasi</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{selectedVillage.population.toLocaleString()}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Anggaran Desa</span>
                    <span className="text-white font-medium">
                      Rp {(selectedVillage.budget / 1000000000).toFixed(1)}M
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Laporan Aktif</span>
                    <span className="text-orange-400 font-medium">{selectedVillage.activeReports}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Kasus Terbuka</span>
                    <span className="text-red-400 font-medium">{selectedVillage.cases}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Village List Filter */}
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Daftar Desa</h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {filteredVillages.map((village) => (
                <div 
                  key={village.id}
                  onClick={() => setSelectedVillage(village)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedVillage?.id === village.id 
                      ? 'bg-blue-600 border border-blue-500' 
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-medium">{village.name}</h4>
                      <p className="text-gray-300 text-sm">
                        {village.activeReports} laporan, {village.cases} kasus
                      </p>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${
                      village.riskLevel === 'high' ? 'bg-red-500' :
                      village.riskLevel === 'medium' ? 'bg-orange-500' :
                      'bg-green-500'
                    }`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}