import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Clock, 
  CheckCircle,
  XCircle,
  Eye,
  User,
  Calendar,
  FileText,
  Users,
  DollarSign,
  MapPin,
  AlertTriangle,
  Edit
} from 'lucide-react';

const cases = [
  {
    id: 'KOR-2024-001',
    title: 'Penyalahgunaan Dana Desa Sukamaju',
    village: 'Desa Sukamaju',
    suspects: ['Kepala Desa', 'Bendahara Desa'],
    status: 'Under Investigation',
    priority: 'High',
    estimatedLoss: 'Rp 150.000.000',
    dateCreated: '2024-01-10',
    assignedTo: 'Tim Investigasi A',
    progress: 65,
    evidence: ['Dokumen Keuangan', 'Rekaman Audio', 'Laporan Saksi'],
    timeline: [
      { date: '2024-01-10', event: 'Kasus dibuka', type: 'created' },
      { date: '2024-01-12', event: 'Tim investigasi ditugaskan', type: 'assigned' },
      { date: '2024-01-15', event: 'Bukti awal dikumpulkan', type: 'evidence' },
      { date: '2024-01-18', event: 'Wawancara saksi kunci', type: 'interview' },
    ]
  },
  {
    id: 'KOR-2024-002',
    title: 'Dugaan Mark-up Proyek Infrastruktur',
    village: 'Desa Sejahtera',
    suspects: ['Kontraktor', 'Sekretaris Desa'],
    status: 'Prosecution Ready',
    priority: 'High',
    estimatedLoss: 'Rp 275.000.000',
    dateCreated: '2024-01-05',
    assignedTo: 'Tim Investigasi B',
    progress: 90,
    evidence: ['Kontrak Proyek', 'Foto Lapangan', 'Analisis Harga'],
    timeline: [
      { date: '2024-01-05', event: 'Kasus dibuka', type: 'created' },
      { date: '2024-01-07', event: 'Investigasi lapangan', type: 'investigation' },
      { date: '2024-01-12', event: 'Analisis forensik selesai', type: 'analysis' },
      { date: '2024-01-20', event: 'BAP tersangka selesai', type: 'interrogation' },
    ]
  },
  {
    id: 'KOR-2024-003',
    title: 'Kasus Pungli Pelayanan Administrasi',
    village: 'Desa Makmur',
    suspects: ['Staff Administrasi'],
    status: 'Closed - Resolved',
    priority: 'Medium',
    estimatedLoss: 'Rp 25.000.000',
    dateCreated: '2024-01-01',
    assignedTo: 'Tim Investigasi C',
    progress: 100,
    evidence: ['Bukti Transfer', 'Kesaksian Masyarakat'],
    timeline: [
      { date: '2024-01-01', event: 'Kasus dibuka', type: 'created' },
      { date: '2024-01-03', event: 'Investigasi dimulai', type: 'investigation' },
      { date: '2024-01-10', event: 'Tersangka mengaku', type: 'confession' },
      { date: '2024-01-15', event: 'Kasus selesai', type: 'closed' },
    ]
  }
];

export function CaseManagement() {
  const [selectedCase, setSelectedCase] = useState(null);
  const [showNewCaseModal, setShowNewCaseModal] = useState(false);
  const [filter, setFilter] = useState('all');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Under Investigation':
        return <Clock className="h-4 w-4 text-orange-500" />;
      case 'Prosecution Ready':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'Closed - Resolved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <XCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-600 text-white';
      case 'Medium':
        return 'bg-orange-600 text-white';
      case 'Low':
        return 'bg-green-600 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  const getTimelineIcon = (type: string) => {
    switch (type) {
      case 'created':
        return <Plus className="h-4 w-4 text-blue-400" />;
      case 'assigned':
        return <User className="h-4 w-4 text-purple-400" />;
      case 'evidence':
        return <FileText className="h-4 w-4 text-green-400" />;
      case 'interview':
        return <Users className="h-4 w-4 text-orange-400" />;
      case 'investigation':
        return <Search className="h-4 w-4 text-blue-400" />;
      case 'analysis':
        return <Eye className="h-4 w-4 text-cyan-400" />;
      case 'interrogation':
        return <AlertTriangle className="h-4 w-4 text-red-400" />;
      case 'confession':
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'closed':
        return <XCircle className="h-4 w-4 text-gray-400" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const filteredCases = cases.filter(caseItem => {
    if (filter === 'all') return true;
    return caseItem.status.toLowerCase().includes(filter);
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Manajemen Kasus</h1>
          <p className="text-gray-400 mt-1">Kelola dan monitor progress investigasi kasus korupsi</p>
        </div>
        <button 
          onClick={() => setShowNewCaseModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Buat Kasus Baru</span>
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Kasus</p>
              <p className="text-3xl font-bold text-white">247</p>
            </div>
            <FileText className="h-12 w-12 text-blue-500" />
          </div>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Dalam Investigasi</p>
              <p className="text-3xl font-bold text-white">89</p>
            </div>
            <Clock className="h-12 w-12 text-orange-500" />
          </div>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Siap Penuntutan</p>
              <p className="text-3xl font-bold text-white">34</p>
            </div>
            <AlertTriangle className="h-12 w-12 text-red-500" />
          </div>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Selesai</p>
              <p className="text-3xl font-bold text-white">124</p>
            </div>
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Cari kasus..."
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select 
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">Semua Status</option>
            <option value="investigation">Under Investigation</option>
            <option value="prosecution">Prosecution Ready</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Cases Table */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">ID Kasus</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Judul</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Tersangka</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Prioritas</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Progress</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Kerugian</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredCases.map((caseItem) => (
                <tr key={caseItem.id} className="hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">{caseItem.id}</div>
                    <div className="text-sm text-gray-400">{caseItem.dateCreated}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-white">{caseItem.title}</div>
                    <div className="text-sm text-gray-400 flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {caseItem.village}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-white">
                      {caseItem.suspects.slice(0, 2).map((suspect, index) => (
                        <div key={index}>{suspect}</div>
                      ))}
                      {caseItem.suspects.length > 2 && (
                        <div className="text-gray-400 text-xs">+{caseItem.suspects.length - 2} lainnya</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(caseItem.status)}
                      <span className="text-sm text-white">{caseItem.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(caseItem.priority)}`}>
                      {caseItem.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-600 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${caseItem.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-white">{caseItem.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {caseItem.estimatedLoss}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap space-x-2">
                    <button 
                      onClick={() => setSelectedCase(caseItem)}
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                    <button className="text-green-400 hover:text-green-300 transition-colors">
                      <Edit className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Case Detail Modal */}
      {selectedCase && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 w-full max-w-4xl max-h-screen overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Detail Kasus: {selectedCase.id}</h2>
              <button 
                onClick={() => setSelectedCase(null)}
                className="text-gray-400 hover:text-white"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Case Information */}
              <div className="space-y-6">
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-4">Informasi Kasus</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Judul:</span>
                      <span className="text-white">{selectedCase.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Desa:</span>
                      <span className="text-white">{selectedCase.village}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Status:</span>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(selectedCase.status)}
                        <span className="text-white">{selectedCase.status}</span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Prioritas:</span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(selectedCase.priority)}`}>
                        {selectedCase.priority}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Kerugian Estimasi:</span>
                      <span className="text-white font-medium">{selectedCase.estimatedLoss}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Tim Investigasi:</span>
                      <span className="text-white">{selectedCase.assignedTo}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Progress:</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-600 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: `${selectedCase.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-white text-sm">{selectedCase.progress}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Suspects */}
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-4">Tersangka</h3>
                  <div className="space-y-2">
                    {selectedCase.suspects.map((suspect, index) => (
                      <div key={index} className="flex items-center space-x-3 p-2 bg-gray-800 rounded-lg">
                        <User className="h-5 w-5 text-gray-400" />
                        <span className="text-white">{suspect}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Evidence */}
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-4">Barang Bukti</h3>
                  <div className="space-y-2">
                    {selectedCase.evidence.map((evidence, index) => (
                      <div key={index} className="flex items-center space-x-3 p-2 bg-gray-800 rounded-lg">
                        <FileText className="h-5 w-5 text-gray-400" />
                        <span className="text-white">{evidence}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-4">Timeline Kasus</h3>
                <div className="space-y-4">
                  {selectedCase.timeline.map((event, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="p-2 bg-gray-800 rounded-full">
                        {getTimelineIcon(event.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <p className="text-white font-medium">{event.event}</p>
                          <span className="text-gray-400 text-sm">{event.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Case Modal */}
      {showNewCaseModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 w-full max-w-2xl max-h-screen overflow-y-auto">
            <h2 className="text-2xl font-bold text-white mb-6">Buat Kasus Baru</h2>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Judul Kasus</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Masukkan judul kasus"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Desa Terkait</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nama desa"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Prioritas</label>
                  <select className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Deskripsi Kasus</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Jelaskan detail kasus"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Tersangka (pisahkan dengan koma)</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nama tersangka 1, Nama tersangka 2"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Estimasi Kerugian</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Rp 0"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Tim Investigasi</label>
                  <select className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Tim Investigasi A</option>
                    <option>Tim Investigasi B</option>
                    <option>Tim Investigasi C</option>
                  </select>
                </div>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowNewCaseModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Buat Kasus
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}