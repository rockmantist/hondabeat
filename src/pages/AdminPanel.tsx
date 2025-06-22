import React, { useState } from 'react';
import { 
  Users, 
  MapPin, 
  Globe, 
  Shield, 
  Monitor,
  Smartphone,
  Eye,
  AlertTriangle,
  Clock,
  Activity,
  Search,
  Filter,
  Download,
  ExternalLink,
  Wifi,
  WifiOff
} from 'lucide-react';

const reporterTraces = [
  {
    id: 'RPT-001',
    reportId: 'RPT-2024-001',
    ipAddress: '182.253.167.45',
    location: 'Jakarta Selatan, DKI Jakarta',
    deviceType: 'Mobile',
    browser: 'Chrome Mobile 120',
    timestamp: '2024-01-15 14:30:25',
    anonymous: true,
    riskScore: 2.3,
    vpnDetected: false,
    previousReports: 0,
    ipAnomalyCount: 1,
    isIpAnomaly: false
  },
  {
    id: 'RPT-002',
    reportId: 'RPT-2024-002',
    ipAddress: '114.125.87.192',
    location: 'Depok, Jawa Barat',
    deviceType: 'Desktop',
    browser: 'Firefox 121',
    timestamp: '2024-01-14 09:15:42',
    anonymous: false,
    riskScore: 1.2,
    vpnDetected: false,
    previousReports: 3,
    ipAnomalyCount: 1,
    isIpAnomaly: false
  },
  {
    id: 'RPT-003',
    reportId: '---',
    ipAddress: '103.147.8.112',
    location: 'Bandung, Jawa Barat',
    deviceType: 'Mobile',
    browser: 'Safari Mobile 17',
    timestamp: '2024-01-13 16:45:18',
    anonymous: true,
    riskScore: 7.8,
    vpnDetected: true,
    previousReports: 12,
    ipAnomalyCount: 8,
    isIpAnomaly: true
  },
  {
    id: 'RPT-004',
    reportId: 'RPT-2024-003',
    ipAddress: '36.67.89.234',
    location: 'Surabaya, Jawa Timur',
    deviceType: 'Desktop',
    browser: 'Chrome 120',
    timestamp: '2024-01-13 11:22:07',
    anonymous: false,
    riskScore: 3.1,
    vpnDetected: false,
    previousReports: 1,
    ipAnomalyCount: 1,
    isIpAnomaly: false
  },
  {
    id: 'RPT-005',
    reportId: 'RPT-2024-004',
    ipAddress: '103.147.8.112',
    location: 'Bandung, Jawa Barat',
    deviceType: 'Mobile',
    browser: 'Chrome Mobile 120',
    timestamp: '2024-01-13 15:22:33',
    anonymous: true,
    riskScore: 8.5,
    vpnDetected: true,
    previousReports: 15,
    ipAnomalyCount: 8,
    isIpAnomaly: true
  },
  {
    id: 'RPT-006',
    reportId: 'RPT-2024-005',
    ipAddress: '103.147.8.112',
    location: 'Bandung, Jawa Barat',
    deviceType: 'Desktop',
    browser: 'Firefox 121',
    timestamp: '2024-01-13 14:15:12',
    anonymous: false,
    riskScore: 9.2,
    vpnDetected: true,
    previousReports: 18,
    ipAnomalyCount: 8,
    isIpAnomaly: true
  }
];

const systemMetrics = [
  { label: 'Total Users', value: '2,847', change: '+12%', icon: Users },
  { label: 'Active Sessions', value: '156', change: '+5%', icon: Activity },
  { label: 'Reports Today', value: '23', change: '+18%', icon: AlertTriangle },
  { label: 'System Uptime', value: '99.8%', change: '0%', icon: Monitor },
];

const ipAnomalies = [
  {
    ipAddress: '103.147.8.112',
    location: 'Bandung, Jawa Barat',
    reportCount: 8,
    timeRange: '2 jam',
    riskLevel: 'Critical',
    lastActivity: '5 menit lalu',
    devices: ['Mobile', 'Desktop'],
    browsers: ['Chrome Mobile', 'Firefox', 'Safari Mobile']
  },
  {
    ipAddress: '192.168.1.100',
    location: 'Jakarta Pusat, DKI Jakarta',
    reportCount: 5,
    timeRange: '1 jam',
    riskLevel: 'High',
    lastActivity: '15 menit lalu',
    devices: ['Desktop'],
    browsers: ['Chrome']
  },
  {
    ipAddress: '114.125.87.45',
    location: 'Surabaya, Jawa Timur',
    reportCount: 4,
    timeRange: '30 menit',
    riskLevel: 'Medium',
    lastActivity: '45 menit lalu',
    devices: ['Mobile'],
    browsers: ['Chrome Mobile', 'Safari Mobile']
  }
];

export function AdminPanel() {
  const [selectedTrace, setSelectedTrace] = useState(null);
  const [filter, setFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('traces');

  const getRiskColor = (score: number) => {
    if (score >= 7) return 'text-red-400';
    if (score >= 4) return 'text-orange-400';
    return 'text-green-400';
  };

  const getRiskBadge = (score: number) => {
    if (score >= 7) return 'bg-red-600 text-white';
    if (score >= 4) return 'bg-orange-600 text-white';
    return 'bg-green-600 text-white';
  };

  const getAnomalyRiskColor = (level: string) => {
    switch (level) {
      case 'Critical': return 'text-red-400';
      case 'High': return 'text-orange-400';
      case 'Medium': return 'text-yellow-400';
      default: return 'text-green-400';
    }
  };

  const getAnomalyRiskBadge = (level: string) => {
    switch (level) {
      case 'Critical': return 'bg-red-600 text-white';
      case 'High': return 'bg-orange-600 text-white';
      case 'Medium': return 'bg-yellow-600 text-white';
      default: return 'bg-green-600 text-white';
    }
  };

  const filteredTraces = reporterTraces.filter(trace => {
    if (filter === 'all') return true;
    if (filter === 'high-risk') return trace.riskScore >= 7;
    if (filter === 'vpn') return trace.vpnDetected;
    if (filter === 'anonymous') return trace.anonymous;
    if (filter === 'ip-anomaly') return trace.isIpAnomaly;
    return true;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">User Intelligence Panel</h1>
          <p className="text-gray-400 mt-1">Monitoring sistem dan analisis keamanan</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="bg-green-600 px-3 py-1 rounded-full">
            <span className="text-white text-sm font-medium">System Secure</span>
          </div>
        </div>
      </div>

      {/* System Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {systemMetrics.map((metric, index) => (
          <div key={index} className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">{metric.label}</p>
                <p className="text-3xl font-bold text-white">{metric.value}</p>
                <p className={`text-sm ${metric.change.startsWith('+') ? 'text-green-400' : 'text-gray-400'}`}>
                  {metric.change} dari kemarin
                </p>
              </div>
              <metric.icon className="h-12 w-12 text-blue-500" />
            </div>
          </div>
        ))}
      </div>

      {/* Tab Navigation */}
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('traces')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'traces' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Intelligence Tracking
          </button>
          <button
            onClick={() => setActiveTab('anomalies')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'anomalies' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            IP Anomali Detection
          </button>
        </div>

        {activeTab === 'traces' && (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-white">Intelligence Tracking Pelapor</h2>
              <div className="flex items-center space-x-4">
                <select 
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Semua Pelapor</option>
                  <option value="high-risk">Risiko Tinggi</option>
                  <option value="vpn">VPN Detected</option>
                  <option value="anonymous">Anonymous</option>
                  <option value="ip-anomaly">IP Anomali</option>
                </select>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                  <Download className="h-4 w-4" />
                  <span>Export Data</span>
                </button>
              </div>
            </div>

            {/* Traces Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Trace ID</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">IP Address</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Lokasi</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Device</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Risk Score</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {filteredTraces.map((trace) => (
                    <tr key={trace.id} className={`hover:bg-gray-700 transition-colors ${
                      trace.isIpAnomaly ? 'bg-red-900 bg-opacity-20' : ''
                    }`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-white">{trace.id}</div>
                        <div className="text-sm text-gray-400">{trace.timestamp}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-white font-mono">{trace.ipAddress}</span>
                          {trace.isIpAnomaly && (
                            <span className="px-2 py-1 text-xs bg-red-600 text-white rounded-full">
                              Anomali ({trace.ipAnomalyCount})
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-400">{trace.browser}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-white">{trace.location}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          {trace.deviceType === 'Mobile' ? (
                            <Smartphone className="h-4 w-4 text-blue-400" />
                          ) : (
                            <Monitor className="h-4 w-4 text-green-400" />
                          )}
                          <span className="text-sm text-white">{trace.deviceType}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <span className={`text-sm font-medium ${getRiskColor(trace.riskScore)}`}>
                            {trace.riskScore}/10
                          </span>
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getRiskBadge(trace.riskScore)}`}>
                            {trace.riskScore >= 7 ? 'High' : trace.riskScore >= 4 ? 'Medium' : 'Low'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="space-y-1">
                          {trace.anonymous && (
                            <span className="inline-block px-2 py-1 text-xs bg-yellow-600 text-white rounded-full">
                              Anonymous
                            </span>
                          )}
                          {trace.vpnDetected && (
                            <span className="inline-block px-2 py-1 text-xs bg-red-600 text-white rounded-full">
                              VPN
                            </span>
                          )}
                          {trace.previousReports > 5 && (
                            <span className="inline-block px-2 py-1 text-xs bg-orange-600 text-white rounded-full">
                              Frequent
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button 
                          onClick={() => setSelectedTrace(trace)}
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
          </>
        )}

        {activeTab === 'anomalies' && (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-white">IP Anomali Detection</h2>
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-400">
                  Deteksi otomatis: Multiple reports dari IP yang sama
                </div>
                <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                  <AlertTriangle className="h-4 w-4" />
                  <span>Block All Anomalies</span>
                </button>
              </div>
            </div>

            {/* IP Anomalies Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">IP Address</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Lokasi</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Jumlah Laporan</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Rentang Waktu</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Risk Level</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Device Info</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {ipAnomalies.map((anomaly, index) => (
                    <tr key={index} className="hover:bg-gray-700 transition-colors bg-red-900 bg-opacity-10">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-white font-mono">{anomaly.ipAddress}</div>
                        <div className="text-sm text-gray-400">{anomaly.lastActivity}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-white">{anomaly.location}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-red-400">{anomaly.reportCount}</span>
                          <span className="text-sm text-gray-400">laporan</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-orange-400" />
                          <span className="text-sm text-white">{anomaly.timeRange}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <span className={`text-sm font-medium ${getAnomalyRiskColor(anomaly.riskLevel)}`}>
                            {anomaly.riskLevel}
                          </span>
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getAnomalyRiskBadge(anomaly.riskLevel)}`}>
                            ANOMALI
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-1">
                            <span className="text-gray-400 text-xs">Devices:</span>
                            {anomaly.devices.map((device, idx) => (
                              <span key={idx} className="px-1 py-0.5 text-xs bg-gray-700 text-white rounded">
                                {device}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center space-x-1">
                            <span className="text-gray-400 text-xs">Browsers:</span>
                            <span className="text-xs text-gray-300">{anomaly.browsers.join(', ')}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          <button className="text-red-400 hover:text-red-300 transition-colors">
                            <WifiOff className="h-5 w-5" />
                          </button>
                          <button className="text-blue-400 hover:text-blue-300 transition-colors">
                            <Eye className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {/* Security Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">Security Alerts</h3>
          <div className="space-y-4">
            {[
              { 
                type: 'IP Anomaly Critical', 
                message: 'IP 103.147.8.112 mengirim 8 laporan dalam 2 jam terakhir',
                severity: 'high',
                time: '2 menit lalu'
              },
              { 
                type: 'VPN Detection', 
                message: 'Multiple reports from VPN IP addresses detected',
                severity: 'high',
                time: '5 menit lalu'
              },
              { 
                type: 'Suspicious Pattern', 
                message: 'Unusual reporting pattern from single location',
                severity: 'medium',
                time: '1 jam lalu'
              },
              { 
                type: 'Rate Limiting', 
                message: 'High frequency requests from IP 103.147.8.112',
                severity: 'low',
                time: '2 jam lalu'
              },
            ].map((alert, index) => (
              <div key={index} className={`p-4 rounded-lg border-l-4 ${
                alert.severity === 'high' ? 'bg-red-900 border-red-500' :
                alert.severity === 'medium' ? 'bg-orange-900 border-orange-500' :
                'bg-yellow-900 border-yellow-500'
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-medium">{alert.type}</h4>
                    <p className="text-gray-300 text-sm">{alert.message}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      alert.severity === 'high' ? 'bg-red-600 text-white' :
                      alert.severity === 'medium' ? 'bg-orange-600 text-white' :
                      'bg-yellow-600 text-white'
                    }`}>
                      {alert.severity.toUpperCase()}
                    </span>
                    <p className="text-gray-400 text-xs mt-1">{alert.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">System Health</h3>
          <div className="space-y-4">
            {[
              { component: 'Database', status: 'Healthy', uptime: '99.9%', color: 'green' },
              { component: 'API Gateway', status: 'Healthy', uptime: '99.8%', color: 'green' },
              { component: 'AI Analytics', status: 'Warning', uptime: '98.2%', color: 'orange' },
              { component: 'Map Service', status: 'Healthy', uptime: '99.7%', color: 'green' },
              { component: 'IP Anomaly Detector', status: 'Active', uptime: '100%', color: 'green' },
            ].map((component, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    component.color === 'green' ? 'bg-green-500' :
                    component.color === 'orange' ? 'bg-orange-500' :
                    'bg-red-500'
                  }`}></div>
                  <div>
                    <h4 className="text-white font-medium">{component.component}</h4>
                    <p className="text-gray-400 text-sm">{component.status}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-medium">{component.uptime}</p>
                  <p className="text-gray-400 text-sm">Uptime</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trace Detail Modal */}
      {selectedTrace && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 w-full max-w-2xl max-h-screen overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Detail Intelligence: {selectedTrace.id}</h2>
              <button 
                onClick={() => setSelectedTrace(null)}
                className="text-gray-400 hover:text-white"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              {/* Basic Info */}
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-4">Informasi Dasar</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm">IP Address</p>
                    <p className="text-white font-mono">{selectedTrace.ipAddress}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Lokasi</p>
                    <p className="text-white">{selectedTrace.location}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Device Type</p>
                    <p className="text-white">{selectedTrace.deviceType}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Browser</p>
                    <p className="text-white">{selectedTrace.browser}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Timestamp</p>
                    <p className="text-white">{selectedTrace.timestamp}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Report ID</p>
                    <p className="text-white">{selectedTrace.reportId || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* IP Anomaly Analysis */}
              {selectedTrace.isIpAnomaly && (
                <div className="bg-red-900 bg-opacity-20 border border-red-600 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-red-400 mb-4">⚠️ IP Anomaly Detected</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Total Reports from IP</span>
                      <span className="text-red-400 font-bold">{selectedTrace.ipAnomalyCount} laporan</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Anomaly Risk Level</span>
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-600 text-white">
                        CRITICAL
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Pattern Analysis</span>
                      <span className="text-red-400">Suspicious bulk reporting</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Risk Analysis */}
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-4">Analisis Risiko</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Risk Score</span>
                    <div className="flex items-center space-x-2">
                      <span className={`font-medium ${getRiskColor(selectedTrace.riskScore)}`}>
                        {selectedTrace.riskScore}/10
                      </span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getRiskBadge(selectedTrace.riskScore)}`}>
                        {selectedTrace.riskScore >= 7 ? 'High Risk' : selectedTrace.riskScore >= 4 ? 'Medium Risk' : 'Low Risk'}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">VPN Detected</span>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      selectedTrace.vpnDetected ? 'bg-red-600 text-white' : 'bg-green-600 text-white'
                    }`}>
                      {selectedTrace.vpnDetected ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Anonymous Report</span>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      selectedTrace.anonymous ? 'bg-yellow-600 text-white' : 'bg-blue-600 text-white'
                    }`}>
                      {selectedTrace.anonymous ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Previous Reports</span>
                    <span className="text-white font-medium">{selectedTrace.previousReports}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-4">Tindakan</h3>
                <div className="flex space-x-3">
                  <button className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors">
                    Block IP
                  </button>
                  <button className="flex-1 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors">
                    Flag for Review
                  </button>
                  <button className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
                    Whitelist
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}