import React from 'react';
import { 
  TrendingUp, 
  AlertTriangle, 
  Users,
  MapPin,
  Activity,
  DollarSign,
  FileText,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const reportsData = [
  { month: 'Jan', reports: 45, resolved: 32 },
  { month: 'Feb', reports: 52, resolved: 38 },
  { month: 'Mar', reports: 61, resolved: 42 },
  { month: 'Apr', reports: 58, resolved: 45 },
  { month: 'May', reports: 73, resolved: 51 },
  { month: 'Jun', reports: 84, resolved: 62 },
];

const riskData = [
  { name: 'Rendah', value: 145, color: '#10B981' },
  { name: 'Sedang', value: 89, color: '#F59E0B' },
  { name: 'Tinggi', value: 52, color: '#EF4444' },
  { name: 'Kritis', value: 23, color: '#DC2626' },
];

const recentActivities = [
  { id: 2, type: 'report', message: 'Laporan baru dari masyarakat di Desa Makmur', time: '12 menit lalu', priority: 'medium' },
  { id: 3, type: 'case', message: 'Kasus KOR-2024-001 telah diselesaikan', time: '1 jam lalu', priority: 'low' },
  { id: 4, type: 'anomaly', message: 'Anomali keuangan ditemukan di 3 desa', time: '2 jam lalu', priority: 'high' },
];

export function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard Intelijen JagaDesa</h1>
          <p className="text-gray-400 mt-1">Monitoring dan analisis real-time sistem desa</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="bg-green-600 px-4 py-2 rounded-lg">
            <span className="text-white font-medium">Sistem Aktif</span>
          </div>
          <div className="text-right">
            <p className="text-white font-medium">Update Terakhir</p>
            <p className="text-gray-400 text-sm">2 menit yang lalu</p>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Desa Dipantau</p>
              <p className="text-3xl font-bold text-white">1,247</p>
              <p className="text-green-400 text-sm flex items-center mt-1">
                <TrendingUp className="h-4 w-4 mr-1" />
                +12% dari bulan lalu
              </p>
            </div>
            <MapPin className="h-12 w-12 text-blue-500" />
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Tingkat Penyelesaian</p>
              <p className="text-3xl font-bold text-white">78%</p>
              <p className="text-green-400 text-sm flex items-center mt-1">
                <CheckCircle className="h-4 w-4 mr-1" />
                +5% dari target
              </p>
            </div>
            <Activity className="h-12 w-12 text-green-500" />
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Laporan Aktif</p>
              <p className="text-3xl font-bold text-white">84</p>
              <p className="text-orange-400 text-sm flex items-center mt-1">
                <AlertTriangle className="h-4 w-4 mr-1" />
                23 prioritas tinggi
              </p>
            </div>
            <FileText className="h-12 w-12 text-orange-500" />
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Potensi Kerugian</p>
              <p className="text-3xl font-bold text-white">Rp 2.1M</p>
              <p className="text-red-400 text-sm flex items-center mt-1">
                <DollarSign className="h-4 w-4 mr-1" />
                Perlu tindakan segera
              </p>
            </div>
            <AlertTriangle className="h-12 w-12 text-red-500" />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Reports Trend */}
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">Tren Laporan Bulanan</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={reportsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }} 
              />
              <Area type="monotone" dataKey="reports" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
              <Area type="monotone" dataKey="resolved" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Risk Distribution */}
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">Distribusi Tingkat Risiko</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={riskData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {riskData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center space-x-4 mt-4">
            {riskData.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-gray-300 text-sm">{item.name}: {item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activities and AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">Aktivitas Terbaru</h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-700 rounded-lg">
                <div className={`p-2 rounded-full ${
                  activity.priority === 'high' ? 'bg-red-600' :
                  activity.priority === 'medium' ? 'bg-orange-600' :
                  'bg-green-600'
                }`}>
                  {activity.type === 'fraud' && <AlertTriangle className="h-4 w-4 text-white" />}
                  {activity.type === 'report' && <FileText className="h-4 w-4 text-white" />}
                  {activity.type === 'case' && <CheckCircle className="h-4 w-4 text-white" />}
                  {activity.type === 'anomaly' && <XCircle className="h-4 w-4 text-white" />}
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm">{activity.message}</p>
                  <p className="text-gray-400 text-xs flex items-center mt-1">
                    <Clock className="h-3 w-3 mr-1" />
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Intelligence Summary */}
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">Ringkasan Intelijen AI</h3>
          <div className="space-y-4">
            <div className="p-4 bg-green-600 bg-opacity-20 border border-green-600 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-green-400 font-medium">Tren Laporan</h4>
                {/* <span className="text-green-400 text-sm">Confidence: -5%</span> */}
              </div>
              <p className="text-gray-300 text-sm">Laporan SARA menurun sebanyak 5% dalam satu minggu terakhir.</p>
            </div>

            <div className="p-4 bg-orange-600 bg-opacity-20 border border-orange-600 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-orange-400 font-medium">Analisis Sentimen</h4>
                {/* <span className="text-orange-400 text-sm">Confidence: 72%</span> */}
              </div>
              <p className="text-gray-300 text-sm">Sentimen negatif meningkat 23% pada media sosial terkait transparansi keuangan desa.</p>
            </div>

            {/* <div className="p-4 bg-blue-600 bg-opacity-20 border border-green-600 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-red-400 font-medium">Tren Laporan</h4>
                <span className="text-red-400 text-sm"> +4%</span>
              </div>
              <p className="text-gray-300 text-sm">8 desa diprediksi akan mengalami peningkatan risiko korupsi dalam 2 minggu ke depan.</p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}