import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  AlertTriangle, 
  Clock, 
  CheckCircle,
  XCircle,
  Eye,
  MapPin,
  User,
  Calendar,
  FileText
} from 'lucide-react';

const reports = [
  {
    id: 'RPT-2024-001',
    title: 'Dugaan Penyalahgunaan Dana Desa',
    reporter: 'Masyarakat Umum',
    village: 'Desa Sukamaju',
    category: 'Penyimpangan Dana Desa',
    urgency: 'Tinggi',
    status: 'Under Investigation',
    date: '2024-01-15',
    estimatedLoss: 'Rp 150.000.000',
    anonymous: true
  },
  {
    id: 'RPT-2024-002',
    title: 'Laporan Pungli Pelayanan Administrasi',
    reporter: 'Perangkat Desa',
    village: 'Desa Makmur',
    category: 'Pungli',
    urgency: 'Sedang',
    status: 'Resolved',
    date: '2024-01-14',
    estimatedLoss: 'Rp 5.000.000',
    anonymous: false
  },
  {
    id: 'RPT-2024-003',
    title: 'Proyek Infrastruktur Tidak Sesuai Spesifikasi',
    reporter: 'Masyarakat Umum',
    village: 'Desa Sejahtera',
    category: 'Proyek Fiktif',
    urgency: 'Tinggi',
    status: 'Pending Review',
    date: '2024-01-13',
    estimatedLoss: 'Rp 275.000.000',
    anonymous: true
  }
];

export function Reports() {
  const [showNewReportModal, setShowNewReportModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [filters, setFilters] = useState({
    status: 'all',
    urgency: 'all',
    category: 'all'
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Under Investigation':
        return <Clock className="h-4 w-4 text-orange-500" />;
      case 'Resolved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'Pending Review':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default:
        return <XCircle className="h-4 w-4 text-red-500" />;
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'Tinggi':
        return 'bg-red-600 text-white';
      case 'Sedang':
        return 'bg-orange-600 text-white';
      case 'Rendah':
        return 'bg-green-600 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Manajemen Laporan</h1>
          <p className="text-gray-400 mt-1">Kelola dan monitor semua laporan masyarakat</p>
        </div>
        <button 
          onClick={() => setShowNewReportModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Buat Laporan Baru</span>
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Laporan</p>
              <p className="text-3xl font-bold text-white">847</p>
            </div>
            <FileText className="h-12 w-12 text-blue-500" />
          </div>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Dalam Investigasi</p>
              <p className="text-3xl font-bold text-white">156</p>
            </div>
            <Clock className="h-12 w-12 text-orange-500" />
          </div>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Selesai</p>
              <p className="text-3xl font-bold text-white">623</p>
            </div>
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Prioritas Tinggi</p>
              <p className="text-3xl font-bold text-white">68</p>
            </div>
            <AlertTriangle className="h-12 w-12 text-red-500" />
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
              placeholder="Cari laporan..."
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select 
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.status}
            onChange={(e) => setFilters({...filters, status: e.target.value})}
          >
            <option value="all">Semua Status</option>
            <option value="pending">Pending Review</option>
            <option value="investigation">Under Investigation</option>
            <option value="resolved">Resolved</option>
          </select>
          <select 
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.urgency}
            onChange={(e) => setFilters({...filters, urgency: e.target.value})}
          >
            <option value="all">Semua Urgensi</option>
            <option value="high">Tinggi</option>
            <option value="medium">Sedang</option>
            <option value="low">Rendah</option>
          </select>
          <select 
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.category}
            onChange={(e) => setFilters({...filters, category: e.target.value})}
          >
            <option value="all">Semua Kategori</option>
            <option value="dana-desa">Penyimpangan Dana Desa</option>
            <option value="pungli">Pungli</option>
            <option value="proyek-fiktif">Proyek Fiktif</option>
          </select>
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">ID Laporan</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Judul</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Pelapor</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Desa</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Urgensi</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Kerugian Estimasi</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">{report.id}</div>
                    <div className="text-sm text-gray-400">{report.date}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-white">{report.title}</div>
                    <div className="text-sm text-gray-400">{report.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <div>
                        <div className="text-sm text-white">{report.reporter}</div>
                        {report.anonymous && (
                          <div className="text-xs text-yellow-400">Anonim</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-white">{report.village}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getUrgencyColor(report.urgency)}`}>
                      {report.urgency}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(report.status)}
                      <span className="text-sm text-white">{report.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {report.estimatedLoss}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button 
                      onClick={() => setSelectedReport(report)}
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Report Modal */}
      {showNewReportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 w-full max-w-2xl max-h-screen overflow-y-auto">
            <h2 className="text-2xl font-bold text-white mb-6">Buat Laporan Baru</h2>
            
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Jenis Pelapor</label>
                  <select className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Masyarakat Umum</option>
                    <option>Perangkat Desa</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Kategori</label>
                  <select className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Penyimpangan Dana Desa</option>
                    <option>Pungli</option>
                    <option>Proyek Fiktif</option>
                    <option>Lainnya</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Judul Laporan</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Masukkan judul laporan"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Deskripsi Detail</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Jelaskan detail kejadian atau dugaan penyimpangan"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Tingkat Urgensi</label>
                  <select className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Rendah</option>
                    <option>Sedang</option>
                    <option>Tinggi</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Nama Pelapor</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nama lengkap"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Kontak</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nomor telepon"
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500" />
                  <span className="text-gray-300">Kirim laporan secara anonim</span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Unggah Bukti Pendukung</label>
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                  <FileText className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                  <p className="text-gray-400">Seret file ke sini atau klik untuk memilih</p>
                  <p className="text-gray-500 text-sm mt-1">PDF, DOC, JPG, PNG (Max: 10MB)</p>
                </div>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowNewReportModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Kirim Laporan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}