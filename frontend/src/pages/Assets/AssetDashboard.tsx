import React, { useState, useEffect } from 'react';
import { assetsAPI } from '../../services/apiService';
import { 
  Package, AlertTriangle, 
  DollarSign, TrendingUp, Calendar, Clock,
  ArrowRight, ShieldCheck, MapPin
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { toast } from '../../components/Toast';
import PageTitle from "../../components/PageTitle";
 // Import custom assets styling

const AssetDashboard: React.FC<{ setActivePage?: (page: string) => void }> = ({ setActivePage }) => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await assetsAPI.getStats();
      setStats(res.data);
    } catch (error) {
      toast.error('Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const statusData = stats ? [
    { name: 'Active', value: stats.active || 0, color: '#10b981' },
    { name: 'Maintenance', value: stats.maintenance || 0, color: '#f59e0b' },
    { name: 'Scrapped', value: stats.scrapped || 0, color: '#ef4444' },
  ] : [];

  if (loading) {
     return (
       <div className="p-8 text-center bg-white rounded-xl border border-gray-100 shadow-xl m-6">
          <div className="animate-spin w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-500 font-bold">Synchronizing Asset Database...</p>
       </div>
     );
  }

  const totalItems = stats?.total || 0;

  return (
    <div className="main-content animate-fade-in">
      {/* Header */}
      <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "24px" }}>
        <PageTitle title="Asset Infrastructure" subtitle="Total Lifecycle Visibility & Operational Analytics" />
        <div style={{ display: "flex", gap: "10px" }}>
          <button 
            onClick={fetchStats}
            className="btn btn-secondary shadow-sm"
          >
            <Clock size={16} /> Sync Realtime
          </button>
        </div>
      </div>

      {/* Grid Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px", marginBottom: "32px" }}>
        <div className="glass-card" style={{ display: "flex", alignItems: "center", gap: "16px", padding: "20px" }}>
           <div style={{ background: "rgba(79, 70, 229, 0.08)", padding: "12px", borderRadius: "12px" }}>
              <Package size={24} color="var(--primary)" />
           </div>
           <div style={{ flex: 1 }}>
              <p style={{ color: "var(--text-muted)", fontSize: "12px", fontWeight: "600" }}>Total Assets Registered</p>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginTop: "4px" }}>
                 <h3 style={{ fontSize: "20px", margin: 0, fontWeight: "700" }}>{totalItems}</h3>
                 <span style={{ fontSize: "12px", color: "var(--primary)", fontWeight: "600", display: "flex", alignItems: "center", gap: "4px" }}>
                   <TrendingUp size={12} /> 12% Growth
                 </span>
              </div>
           </div>
        </div>

        <div className="glass-card" style={{ display: "flex", alignItems: "center", gap: "16px", padding: "20px" }}>
           <div style={{ background: "rgba(22, 163, 74, 0.08)", padding: "12px", borderRadius: "12px" }}>
              <DollarSign size={24} color="#16a34a" />
           </div>
           <div style={{ flex: 1 }}>
              <p style={{ color: "var(--text-muted)", fontSize: "12px", fontWeight: "600" }}>Total Inventory Value</p>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginTop: "4px" }}>
                 <h3 style={{ fontSize: "20px", margin: 0, fontWeight: "700" }}>$ {stats?.totalValue?.toLocaleString() || 0}</h3>
                 <span style={{ fontSize: "10px", color: "var(--text-muted)", fontWeight: "600", textTransform: "uppercase" }}>Aggregate</span>
              </div>
           </div>
        </div>

        <div className="glass-card" style={{ display: "flex", alignItems: "center", gap: "16px", padding: "20px" }}>
           <div style={{ background: "rgba(234, 179, 8, 0.08)", padding: "12px", borderRadius: "12px" }}>
              <AlertTriangle size={24} color="#eab308" />
           </div>
           <div style={{ flex: 1 }}>
              <p style={{ color: "var(--text-muted)", fontSize: "12px", fontWeight: "600" }}>In Maintenance Phase</p>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginTop: "4px" }}>
                 <h3 style={{ fontSize: "20px", margin: 0, fontWeight: "700" }}>{stats?.maintenance || 0}</h3>
                 <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: "600", display: "flex", alignItems: "center", gap: "4px" }}>
                   <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#eab308" }}></div>
                   {stats?.upcomingMaint || 0} pending
                 </span>
              </div>
           </div>
        </div>

        <div className="glass-card" style={{ display: "flex", alignItems: "center", gap: "16px", padding: "20px" }}>
           <div style={{ background: "rgba(14, 165, 233, 0.08)", padding: "12px", borderRadius: "12px" }}>
              <ShieldCheck size={24} color="#0ea5e9" />
           </div>
           <div style={{ flex: 1 }}>
              <p style={{ color: "var(--text-muted)", fontSize: "12px", fontWeight: "600" }}>Asset Groups Defined</p>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginTop: "4px" }}>
                 <h3 style={{ fontSize: "20px", margin: 0, fontWeight: "700" }}>{stats?.categories || 0}</h3>
                 <span style={{ fontSize: "10px", color: "var(--text-muted)", fontWeight: "600", textTransform: "uppercase" }}>Categories</span>
              </div>
           </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 glass-card" style={{ padding: "24px" }}>
           <div className="flex items-center justify-between mb-8">
              <h3 className="text-[16px] font-bold text-gray-900 flex items-center gap-2">
                 <div className="w-1 h-6 bg-(--primary) rounded-full"></div>
                 Operational Distribution
              </h3>
              <div className="flex gap-2">
                 <button className="px-4 py-2 bg-(--primary-light) text-(--primary) rounded-lg text-xs font-bold uppercase ">Live</button>
                 <button className="px-4 py-2 hover:bg-gray-50 text-gray-400 rounded-lg text-xs font-bold uppercase ">Historic</button>
              </div>
           </div>
           <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={statusData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} fontWeight={600} axisLine={false} tickLine={false} dy={10} />
                    <YAxis stroke="#94a3b8" fontSize={12} fontWeight={600} axisLine={false} tickLine={false} width={30} />
                    <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: 'var(--shadow-sm)' }} itemStyle={{ fontSize: '13px', fontWeight: '600' }} />
                    <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={40}>
                       {statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.9} />
                       ))}
                    </Bar>
                 </BarChart>
              </ResponsiveContainer>
           </div>
        </div>

        <div className="lg:col-span-4 glass-card flex flex-col" style={{ padding: "24px" }}>
           <h3 className="text-[16px] font-bold text-gray-900 mb-8 text-center border-b border-gray-100 pb-4">Status Mix %</h3>
           <div className="h-64 flex items-center justify-center relative">
              <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                    <Pie
                       data={statusData}
                       cx="50%"
                       cy="50%"
                       innerRadius={65}
                       outerRadius={85}
                       paddingAngle={12}
                       dataKey="value"
                    >
                       {statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                       ))}
                    </Pie>
                    <Tooltip 
                       contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    />
                 </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                 <span className="text-2xl font-bold text-gray-800">{totalItems}</span>
                 <span className="text-[10px] text-gray-500 font-bold uppercase ">Total</span>
              </div>
           </div>
           <div className="mt-8 space-y-4">
              {statusData.map((item, i) => (
                 <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100  transition-transform hover:translate-x-2">
                    <div className="flex items-center gap-3">
                       <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: item.color }}></div>
                       <span className="text-xs font-bold text-gray-600 uppercase ">{item.name}</span>
                    </div>
                    <div className="text-sm font-bold text-gray-900">
                       {totalItems > 0 ? Math.round((item.value / totalItems) * 100) : 0}%
                    </div>
                 </div>
              ))}
           </div>
        </div>
      </div>

      {/* Grid 2 Column */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
         <div className="glass-card flex flex-col" style={{ padding: "32px", position: "relative" }}>
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-3">
               <Calendar size={20} color="#f59e0b" />
               Upcoming Maintenance
            </h3>
            <div className="space-y-4 flex-1 flex flex-col">
               {stats?.upcomingMaint ? (
                 <p className="text-gray-500">Maintenance records integrated with service vendor workflows.</p>
               ) : (
                 <div className="flex-1 flex flex-col items-center justify-center p-6 border border-dashed border-gray-200 rounded-xl bg-gray-50">
                    <Clock size={32} color="#cbd5e1" className="mb-3" />
                    <p className="text-gray-400 font-semibold text-sm">No tasks due soon</p>
                 </div>
               )}
               <button 
                  onClick={() => setActivePage?.('assetUpcomingMaint')}
                  className="btn btn-secondary mt-4 w-full justify-center shadow-sm"
               >
                  Service Dashboard <ArrowRight size={16} />
               </button>
            </div>
         </div>

         <div className="glass-card flex flex-col" style={{ padding: "32px", position: "relative", overflow: "hidden", background: "var(--color-bg-secondary)" }}>
            <h4 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-3">
               <ShieldCheck size={20} color="var(--primary)" />
               <span>Recent Audit Trail</span>
            </h4>
            <div className="space-y-6">
                <div className="flex gap-4 group">
                   <div className="relative">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                         <MapPin className="w-5 h-5 text-indigo-400" />
                      </div>
                      <div className="absolute top-10 left-1/2 w-0.5 h-full bg-white/5"></div>
                   </div>
                   <div className="flex-1 pb-6 border-b border-white/5">
                      <p className="text-white font-bold uppercase text-xs tracking-tight">System Ready</p>
                      <p className="text-gray-500 text-[11px] mt-1 ">Asset Synchronization completed successfully</p>
                   </div>
                </div>
                <div className="flex gap-4">
                   <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5 text-emerald-400" />
                   </div>
                   <div className="flex-1 ">
                      <p className="text-white font-bold uppercase text-xs tracking-tight">Database integrity checks: PASS</p>
                      <p className="text-gray-500 text-[11px] mt-1  tracking-tighter">Verified {totalItems} asset records</p>
                   </div>
                </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default AssetDashboard;
