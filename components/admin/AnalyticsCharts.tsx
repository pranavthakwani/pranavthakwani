'use client';

import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';
import { AnalyticsData } from '@/lib/types';

interface AnalyticsChartsProps {
  data: AnalyticsData;
}

const COLORS = ['#007acc', '#4ec9b0', '#c586c0', '#ce9178', '#569cd6', '#dcdcaa'];

export function AnalyticsCharts({ data }: AnalyticsChartsProps) {
  // Prepare data for charts
  const pageViewsData = Object.entries(data.pageViews).map(([page, views]) => ({
    name: page === '/' ? 'home' : page.replace('/', ''),
    views,
  }));

  const fileClicksData = Object.entries(data.fileClicks).map(([file, clicks]) => ({
    name: file,
    clicks,
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Page Views Bar Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-[#252526] border border-[#3c3c3c] rounded-lg p-6"
      >
        <h2 className="text-lg font-semibold text-white mb-4">Page Views</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={pageViewsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#3c3c3c" />
              <XAxis 
                dataKey="name" 
                stroke="#858585" 
                tick={{ fill: '#858585', fontSize: 12 }}
              />
              <YAxis 
                stroke="#858585" 
                tick={{ fill: '#858585', fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#252526',
                  border: '1px solid #3c3c3c',
                  borderRadius: '4px',
                  color: '#d4d4d4',
                }}
              />
              <Bar dataKey="views" fill="#007acc" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* File Clicks Pie Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-[#252526] border border-[#3c3c3c] rounded-lg p-6"
      >
        <h2 className="text-lg font-semibold text-white mb-4">File Interactions</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={fileClicksData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="clicks"
              >
                {fileClicksData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#252526',
                  border: '1px solid #3c3c3c',
                  borderRadius: '4px',
                  color: '#d4d4d4',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Trend Line Chart (Mock Data) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-[#252526] border border-[#3c3c3c] rounded-lg p-6 lg:col-span-2"
      >
        <h2 className="text-lg font-semibold text-white mb-4">Visit Trends (Last 7 Days)</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={[
                { day: 'Mon', visits: 120 },
                { day: 'Tue', visits: 180 },
                { day: 'Wed', visits: 150 },
                { day: 'Thu', visits: 220 },
                { day: 'Fri', visits: 280 },
                { day: 'Sat', visits: 190 },
                { day: 'Sun', visits: 107 },
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#3c3c3c" />
              <XAxis 
                dataKey="day" 
                stroke="#858585" 
                tick={{ fill: '#858585', fontSize: 12 }}
              />
              <YAxis 
                stroke="#858585" 
                tick={{ fill: '#858585', fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#252526',
                  border: '1px solid #3c3c3c',
                  borderRadius: '4px',
                  color: '#d4d4d4',
                }}
              />
              <Line
                type="monotone"
                dataKey="visits"
                stroke="#007acc"
                strokeWidth={2}
                dot={{ fill: '#007acc' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}
