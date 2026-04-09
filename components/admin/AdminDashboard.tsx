'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Eye, MousePointer, MessageSquare, FileCode, TrendingUp, Users, Clock } from 'lucide-react';
import { AnalyticsCharts } from './AnalyticsCharts';
import { AnalyticsData } from '@/lib/types';

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';

export function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authStatus = sessionStorage.getItem('admin_authenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      const response = await fetch('/api/track');
      if (response.ok) {
        const data = await response.json();
        setAnalyticsData(data);
      } else {
        // Fallback to mock data if API fails
        const mockData: AnalyticsData = {
          totalVisits: 1247,
          pageViews: {
            '/': 523,
            '/about': 312,
            '/projects': 198,
            '/skills': 87,
            '/experience': 67,
            '/contact': 60,
          },
          fileClicks: {
            'home.tsx': 523,
            'about.html': 312,
            'projects.js': 198,
            'skills.json': 87,
            'experience.ts': 67,
            'contact.css': 60,
          },
          chatInteractions: 156,
          topQuestions: [
            { question: 'Tell me about Aahana?', count: 45 },
            { question: 'What projects has Aahana built?', count: 38 },
            { question: 'What\'s her tech stack?', count: 29 },
            { question: 'How can I contact Aahana?', count: 24 },
            { question: 'Tell me about her work experience', count: 20 },
          ],
        };
        setAnalyticsData(mockData);
      }
    } catch (err) {
      console.error('Failed to fetch analytics:', err);
      // Fallback to mock data
      const mockData: AnalyticsData = {
        totalVisits: 1247,
        pageViews: {
          '/': 523,
          '/about': 312,
          '/projects': 198,
          '/skills': 87,
          '/experience': 67,
          '/contact': 60,
        },
        fileClicks: {
          'home.tsx': 523,
          'about.html': 312,
          'projects.js': 198,
          'skills.json': 87,
          'experience.ts': 67,
          'contact.css': 60,
        },
        chatInteractions: 156,
        topQuestions: [
          { question: 'Tell me about Aahana?', count: 45 },
          { question: 'What projects has Aahana built?', count: 38 },
          { question: 'What\'s her tech stack?', count: 29 },
          { question: 'How can I contact Aahana?', count: 24 },
          { question: 'Tell me about her work experience', count: 20 },
        ],
      };
      setAnalyticsData(mockData);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_authenticated', 'true');
      setError('');
    } else {
      setError('Invalid password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_authenticated');
    setPassword('');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#1e1e1e] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#252526] border border-[#3c3c3c] rounded-lg p-8 w-full max-w-md"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-[#007acc] rounded-full flex items-center justify-center">
              <Lock size={32} className="text-white" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-white text-center mb-2">
            Admin Dashboard
          </h1>
          <p className="text-[#858585] text-center mb-6">
            Enter password to access analytics
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                className="w-full bg-[#3c3c3c] text-[#d4d4d4] px-4 py-3 rounded border border-[#3c3c3c] focus:border-[#007acc] outline-none"
              />
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-400 text-sm text-center"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              className="w-full bg-[#007acc] text-white py-3 rounded font-medium hover:bg-[#0098ff] transition-colors"
            >
              Access Dashboard
            </button>
          </form>

          <p className="text-[#858585] text-xs text-center mt-6">
            Protected area. Unauthorized access is prohibited.
          </p>
        </motion.div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#1e1e1e] flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-8 h-8 border-2 border-[#007acc] border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1e1e1e]">
      {/* Header */}
      <div className="bg-[#252526] border-b border-[#3c3c3c] px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#007acc] rounded flex items-center justify-center">
              <TrendingUp size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Pranav Thakwani - Analytics Dashboard</h1>
              <p className="text-[#858585] text-sm">Portfolio Insights & Metrics</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-[#3c3c3c] text-[#d4d4d4] rounded hover:bg-[#4c4c4c] transition-colors"
          >
            <Unlock size={16} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={Eye}
            label="Total Visits"
            value={analyticsData?.totalVisits || 0}
            color="#007acc"
          />
          <StatCard
            icon={FileCode}
            label="File Interactions"
            value={Object.values(analyticsData?.fileClicks || {}).reduce((a, b) => a + b, 0)}
            color="#4ec9b0"
          />
          <StatCard
            icon={MessageSquare}
            label="Chat Interactions"
            value={analyticsData?.chatInteractions || 0}
            color="#c586c0"
          />
          <StatCard
            icon={Users}
            label="Active Pages"
            value={Object.keys(analyticsData?.pageViews || {}).length}
            color="#ce9178"
          />
        </div>

        {/* Charts */}
        {analyticsData && <AnalyticsCharts data={analyticsData} />}

        {/* Top Questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#252526] border border-[#3c3c3c] rounded-lg p-6 mt-6"
        >
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <MessageSquare size={18} className="text-[#c586c0]" />
            Top Chat Questions
          </h2>
          <div className="space-y-3">
            {analyticsData?.topQuestions.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-[#1e1e1e] rounded"
              >
                <span className="text-[#d4d4d4]">{item.question}</span>
                <div className="flex items-center gap-2">
                  <div className="h-2 bg-[#007acc] rounded" style={{ width: `${(item.count / (analyticsData.topQuestions[0]?.count || 1)) * 100}px` }} />
                  <span className="text-[#858585] text-sm">{item.count}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: typeof Eye;
  label: string;
  value: number;
  color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#252526] border border-[#3c3c3c] rounded-lg p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[#858585] text-sm mb-1">{label}</p>
          <p className="text-3xl font-bold text-white">{value.toLocaleString()}</p>
        </div>
        <div
          className="w-12 h-12 rounded flex items-center justify-center"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon size={24} style={{ color }} />
        </div>
      </div>
    </motion.div>
  );
}
