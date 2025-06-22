import React, { useState } from 'react';
import { MapContainer, TileLayer, Popup, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  TrendingUp, 
  AlertTriangle, 
  DollarSign,
  MessageSquare,
  Shield,
  BarChart3,
  Map,
  MapPin,
  Users,
  ThumbsUp,
  ThumbsDown,
  Hash,
  Zap,
  XCircle,
} from 'lucide-react';
import { 
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
} from 'recharts';

const sentimentData = [
  { platform: 'Instagram', positive: 45, negative: 32, neutral: 23, mentions: 2847, engagement: 8.4 },
  { platform: 'Twitter/X', positive: 38, negative: 42, neutral: 20, mentions: 3521, engagement: 12.7 },
  { platform: 'Facebook', positive: 52, negative: 28, neutral: 20, mentions: 1923, engagement: 6.2 },
  { platform: 'TikTok', positive: 41, negative: 35, neutral: 24, mentions: 1456, engagement: 15.3 },
  { platform: 'Detik', positive: 35, negative: 48, neutral: 17, mentions: 892, engagement: 4.8 },
  { platform: 'Kompas', positive: 42, negative: 38, neutral: 20, mentions: 654, engagement: 3.2 },
];

const sentimentTrends = [
  { date: '2024-01-01', positive: 42, negative: 35, neutral: 23 },
  { date: '2024-01-02', positive: 38, negative: 38, neutral: 24 },
  { date: '2024-01-03', positive: 35, negative: 42, neutral: 23 },
  { date: '2024-01-04', positive: 33, negative: 45, neutral: 22 },
  { date: '2024-01-05', positive: 31, negative: 48, neutral: 21 },
  { date: '2024-01-06', positive: 29, negative: 52, neutral: 19 },
  { date: '2024-01-07', positive: 27, negative: 55, neutral: 18 },
];

const detailedSentimentAnalysis = [
  {
    topic: 'Transparansi Dana Desa',
    mentions: 1247,
    sentiment: -0.65,
    platforms: {
      instagram: { mentions: 342, sentiment: -0.45 },
      twitter: { mentions: 456, sentiment: -0.78 },
      facebook: { mentions: 289, sentiment: -0.52 },
      tiktok: { mentions: 160, sentiment: -0.89 }
    },
    keywords: ['dana desa', 'transparansi', 'korupsi', 'laporan keuangan'],
    influencers: [
      { name: '@aktivis_desa', followers: 45000, sentiment: -0.85 },
      { name: '@watchdog_id', followers: 78000, sentiment: -0.72 }
    ],
    peakTime: '14:00-16:00',
    geography: ['Jakarta', 'Bandung', 'Surabaya', 'Medan']
  },
  {
    topic: 'Proyek Infrastruktur',
    mentions: 892,
    sentiment: -0.42,
    platforms: {
      instagram: { mentions: 234, sentiment: -0.35 },
      twitter: { mentions: 345, sentiment: -0.48 },
      facebook: { mentions: 213, sentiment: -0.41 },
      tiktok: { mentions: 100, sentiment: -0.52 }
    },
    keywords: ['infrastruktur', 'jalan', 'jembatan', 'kualitas'],
    influencers: [
      { name: '@engineer_publik', followers: 32000, sentiment: -0.65 },
      { name: '@sipil_watch', followers: 28000, sentiment: -0.38 }
    ],
    peakTime: '19:00-21:00',
    geography: ['Bandung', 'Yogyakarta', 'Semarang', 'Malang']
  }
];

const newsAnalysis = [
  {
    source: 'Detik.com',
    articles: 156,
    sentiment: 'Mixed',
    topics: [
      { topic: 'Dana Desa', count: 45, sentiment: -0.6 },
      { topic: 'Korupsi Desa', count: 38, sentiment: -0.8 },
      { topic: 'Transparansi', count: 32, sentiment: -0.4 },
      { topic: 'Pembangunan', count: 41, sentiment: 0.2 }
    ],
    reach: 2400000,
    engagement: 8.7
  },
  {
    source: 'Kompas.com',
    articles: 123,
    sentiment: 'Neutral',
    topics: [
      { topic: 'Kebijakan Desa', count: 42, sentiment: 0.1 },
      { topic: 'Anggaran Desa', count: 35, sentiment: -0.3 },
      { topic: 'Pengawasan', count: 28, sentiment: 0.4 },
      { topic: 'Reformasi', count: 18, sentiment: 0.6 }
    ],
    reach: 1800000,
    engagement: 6.2
  }
];

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

export function AIAnalytics() {
  const [activeTab, setActiveTab] = useState('map');
  const [selectedSentimentTopic, setSelectedSentimentTopic] = useState(null);

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

  const tabs = [
    { id: 'map', label: 'Peta Intelijen', icon: Map },
    { id: 'sentiment', label: 'Analisis Sentimen', icon: MessageSquare },
  ];

  const renderSentimentAnalysis = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Sentimen Positif</p>
              <p className="text-3xl font-bold text-white">42%</p>
              <p className="text-green-400 text-sm">↑ 5% dari bulan lalu</p>
            </div>
            <ThumbsUp className="h-12 w-12 text-green-500" />
          </div>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Sentimen Negatif</p>
              <p className="text-3xl font-bold text-white">37%</p>
              <p className="text-red-400 text-sm">↑ 12% dari bulan lalu</p>
            </div>
            <ThumbsDown className="h-12 w-12 text-red-500" />
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Mention</p>
              <p className="text-3xl font-bold text-white">8,247</p>
              <p className="text-blue-400 text-sm">Dalam 7 hari terakhir</p>
            </div>
            <Hash className="h-12 w-12 text-blue-500" />
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Engagement Rate</p>
              <p className="text-3xl font-bold text-white">9.2%</p>
              <p className="text-purple-400 text-sm">Rata-rata platform</p>
            </div>
            <Zap className="h-12 w-12 text-purple-500" />
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Viral Content</p>
              <p className="text-3xl font-bold text-white">23</p>
              <p className="text-orange-400 text-sm">Konten trending</p>
            </div>
            <TrendingUp className="h-12 w-12 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Sentiment Trend Chart */}
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-4">Tren Sentimen 7 Hari Terakhir</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={sentimentTrends}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="date" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F2937', 
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#F9FAFB'
              }} 
            />
            <Area type="monotone" dataKey="positive" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
            <Area type="monotone" dataKey="neutral" stackId="1" stroke="#6B7280" fill="#6B7280" fillOpacity={0.6} />
            <Area type="monotone" dataKey="negative" stackId="1" stroke="#EF4444" fill="#EF4444" fillOpacity={0.6} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Platform Analysis */}
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-4">Analisis Sentimen per Platform</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={sentimentData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="platform" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F2937', 
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#F9FAFB'
              }} 
            />
            <Bar dataKey="positive" stackId="a" fill="#10B981" />
            <Bar dataKey="neutral" stackId="a" fill="#6B7280" />
            <Bar dataKey="negative" stackId="a" fill="#EF4444" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Detailed Topic Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">Analisis Topik Mendalam</h3>
          <div className="space-y-4">
            {detailedSentimentAnalysis.map((topic, index) => (
              <div key={index} className="p-4 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors"
                   onClick={() => setSelectedSentimentTopic(topic)}>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-white font-medium">{topic.topic}</h4>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400 text-sm">{topic.mentions} mentions</span>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      topic.sentiment <= -0.6 ? 'bg-red-600 text-white' :
                      topic.sentiment <= -0.3 ? 'bg-orange-600 text-white' :
                      topic.sentiment <= 0.3 ? 'bg-gray-600 text-white' :
                      'bg-green-600 text-white'
                    }`}>
                      {(topic.sentiment * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <p className="text-gray-400 text-xs">Peak Time</p>
                    <p className="text-white text-sm">{topic.peakTime}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs">Top Influencer</p>
                    <p className="text-white text-sm">{topic.influencers[0].name}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {topic.keywords.map((keyword, idx) => (
                    <span key={idx} className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded">
                      #{keyword}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-4 gap-2 text-xs">
                  {Object.entries(topic.platforms).map(([platform, data]) => (
                    <div key={platform} className="text-center">
                      <p className="text-gray-400 capitalize">{platform}</p>
                      <p className="text-white font-medium">{data.mentions}</p>
                      <div className={`w-full h-1 rounded ${
                        data.sentiment <= -0.5 ? 'bg-red-500' :
                        data.sentiment <= -0.2 ? 'bg-orange-500' :
                        data.sentiment <= 0.2 ? 'bg-gray-500' :
                        'bg-green-500'
                      }`}></div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">Analisis Media Berita</h3>
          <div className="space-y-4">
            {newsAnalysis.map((news, index) => (
              <div key={index} className="p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-white font-medium">{news.source}</h4>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400 text-sm">{news.articles} artikel</span>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      news.sentiment === 'Positive' ? 'bg-green-600 text-white' :
                      news.sentiment === 'Negative' ? 'bg-red-600 text-white' :
                      news.sentiment === 'Mixed' ? 'bg-orange-600 text-white' :
                      'bg-gray-600 text-white'
                    }`}>
                      {news.sentiment}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                  <div>
                    <span className="text-gray-400">Reach: </span>
                    <span className="text-white font-medium">{(news.reach / 1000000).toFixed(1)}M</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Engagement: </span>
                    <span className="text-white font-medium">{news.engagement}%</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-gray-400 text-xs">Top Topics:</p>
                  {news.topics.slice(0, 3).map((topic, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm">
                      <span className="text-white">{topic.topic}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-400">{topic.count}</span>
                        <div className={`w-12 h-2 rounded ${
                          topic.sentiment <= -0.5 ? 'bg-red-500' :
                          topic.sentiment <= -0.2 ? 'bg-orange-500' :
                          topic.sentiment <= 0.2 ? 'bg-gray-500' :
                          'bg-green-500'
                        }`}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Geographic Sentiment Distribution */}
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-4">Distribusi Sentimen Geografis</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { region: 'Jakarta', positive: 35, negative: 45, neutral: 20, mentions: 2847 },
            { region: 'Bandung', positive: 42, negative: 38, neutral: 20, mentions: 1923 },
            { region: 'Surabaya', positive: 38, negative: 42, neutral: 20, mentions: 1654 },
            { region: 'Medan', positive: 33, negative: 48, neutral: 19, mentions: 1234 },
          ].map((region, index) => (
            <div key={index} className="p-4 bg-gray-700 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-white font-medium">{region.region}</h4>
                <span className="text-gray-400 text-sm">{region.mentions}</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-green-400">Positif</span>
                  <span className="text-white">{region.positive}%</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: `${region.positive}%` }}></div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-red-400">Negatif</span>
                  <span className="text-white">{region.negative}%</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: `${region.negative}%` }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderIntelligenceMap = () => (
    <div className="space-y-6">
      {/* Header with Score Cards */}
      {/* <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Peta Intelijen Desa</h1>
          <p className="text-gray-400 mt-1">Monitoring visual distribusi risiko dan aktivitas desa</p>
        </div>
      </div> */}

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

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">AI Analytics Intelligence</h1>
          <p className="text-gray-400 mt-1">Analisis mendalam dengan kecerdasan buatan</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="bg-green-600 px-3 py-1 rounded-full">
            <span className="text-white text-sm font-medium">AI Engine Active</span>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-gray-800 p-2 rounded-lg border border-gray-700">
        <div className="flex space-x-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              <tab.icon className="h-5 w-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'map' && renderIntelligenceMap()}
        {activeTab === 'sentiment' && renderSentimentAnalysis()}
      </div>

      {/* Detailed Sentiment Topic Modal */}
      {selectedSentimentTopic && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 w-full max-w-4xl max-h-screen overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Analisis Mendalam: {selectedSentimentTopic.topic}</h2>
              <button 
                onClick={() => setSelectedSentimentTopic(null)}
                className="text-gray-400 hover:text-white"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Platform Breakdown */}
              <div className="space-y-4">
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-4">Platform Breakdown</h3>
                  <div className="space-y-3">
                    {Object.entries(selectedSentimentTopic.platforms).map(([platform, data]) => (
                      <div key={platform} className="p-3 bg-gray-800 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-medium capitalize">{platform}</span>
                          <span className="text-gray-400 text-sm">{data.mentions} mentions</span>
                        </div>
                        <div className="w-full bg-gray-600 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              data.sentiment <= -0.5 ? 'bg-red-500' :
                              data.sentiment <= -0.2 ? 'bg-orange-500' :
                              data.sentiment <= 0.2 ? 'bg-gray-500' :
                              'bg-green-500'
                            }`}
                            style={{ width: `${Math.abs(data.sentiment) * 100}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">Sentiment: {(data.sentiment * 100).toFixed(0)}%</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-4">Key Influencers</h3>
                  <div className="space-y-3">
                    {selectedSentimentTopic.influencers.map((influencer, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                        <div>
                          <p className="text-white font-medium">{influencer.name}</p>
                          <p className="text-gray-400 text-sm">{influencer.followers.toLocaleString()} followers</p>
                        </div>
                        <div className="text-right">
                          <p className={`text-sm font-medium ${
                            influencer.sentiment <= -0.5 ? 'text-red-400' :
                            influencer.sentiment <= -0.2 ? 'text-orange-400' :
                            'text-green-400'
                          }`}>
                            {(influencer.sentiment * 100).toFixed(0)}%
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Additional Analysis */}
              <div className="space-y-4">
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-4">Temporal Analysis</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Peak Activity Time:</span>
                      <span className="text-white">{selectedSentimentTopic.peakTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Mentions:</span>
                      <span className="text-white">{selectedSentimentTopic.mentions.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Overall Sentiment:</span>
                      <span className={`font-medium ${
                        selectedSentimentTopic.sentiment <= -0.5 ? 'text-red-400' :
                        selectedSentimentTopic.sentiment <= -0.2 ? 'text-orange-400' :
                        'text-green-400'
                      }`}>
                        {(selectedSentimentTopic.sentiment * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-4">Geographic Distribution</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedSentimentTopic.geography.map((location, index) => (
                      <div key={index} className="p-2 bg-gray-800 rounded text-center">
                        <p className="text-white text-sm">{location}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-4">Key Keywords</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedSentimentTopic.keywords.map((keyword, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full">
                        #{keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}