"use client";

import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { Trophy, FileSpreadsheet, CheckCircle, X, LayoutDashboard, GraduationCap, BookOpen, Menu } from "lucide-react";
import Image from "next/image";
import profilepic from "./assets/profile pic.png"


const generateComparisonData = (peakPosition = 50, pointCount = 5) => {
  const data = [];
  
 
  const actualPointCount = Math.max(pointCount, 5);
  
  for (let i = 0; i <= actualPointCount - 1; i++) {
    const x = Math.round((i / (actualPointCount - 1)) * 100);
    
    
    const distanceFromPeak = Math.abs(x - peakPosition);
    const maxHeight = 95; 
    const spreadFactor = 25; 
    
   
    const y = Math.round(maxHeight * Math.exp(-(distanceFromPeak * distanceFromPeak) / (2 * spreadFactor * spreadFactor)));
    
    data.push({ x, y });
  }
  
  return data;
};

const skillTopics = [
  { name: "HTML Tools, Forms, History", progress: 80, color: "bg-blue-500" },
  { name: "Tags & References in HTML", progress: 60, color: "bg-orange-500" },
  { name: "Tables & References in HTML", progress: 24, color: "bg-red-500" },
  { name: "Tables & CSS Basics", progress: 96, color: "bg-green-500" },
];

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "#" },
  { name: "Skill Test", icon: BookOpen, href: "#", active: true },
  { name: "Internship", icon: GraduationCap, href: "#" },
];

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [rank, setRank] = useState(4);
  const [percentile, setPercentile] = useState(90);
  const [score, setScore] = useState(12);
  const [data, setData] = useState(generateComparisonData(50, 5));

  useEffect(() => {
    setData(generateComparisonData(percentile, 5));
  }, [percentile]);

  const handleUpdate = () => {
    setData(generateComparisonData(percentile, 5));
    setIsModalOpen(false);
  };

  const scorePercentage = (score / 15) * 100;
  const circumference = 2 * Math.PI * 40;
  const strokeDasharray = `${(scorePercentage * circumference) / 100} ${circumference}`;

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 bottom-0 bg-white border-r z-50 transition-transform duration-300 ease-in-out
        w-64 lg:translate-x-0 lg:static lg:z-auto min-h-screen flex flex-col
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-4 border-b flex items-center justify-between">
          <span className="text-xl font-bold">WhatBytes</span>
          <button
            className="lg:hidden text-gray-500 hover:text-gray-700"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="p-4 flex-grow">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${item.active
                    ? "bg-gray-100 text-blue-600"
                    : "text-gray-700 hover:bg-gray-50"
                    }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Navigation */}
        <nav className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center">
              <div className="flex-1">
                <button
                  className="lg:hidden text-gray-500 hover:text-gray-700"
                  onClick={() => setIsSidebarOpen(true)}
                >
                  <Menu className="w-6 h-6" />
                </button>
              </div>

              <div className="flex justify-end w-full">
                <div className="flex items-center gap-2">
                  <span>Onakpoyan Ufuoma</span>
                  <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden">
                    <Image
                      src={profilepic}
                      width={32}
                      height={32}
                      alt="Profile Picture"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>

              </div>
            </div>
          </div>
        </nav>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Update scores</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Update your Rank
                  </label>
                  <input
                    type="number"
                    value={rank}
                    onChange={(e) => setRank(Number(e.target.value))}
                    className="w-full border rounded-md px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Update your Percentile
                  </label>
                  <input
                    type="number"
                    value={percentile}
                    onChange={(e) => setPercentile(Number(e.target.value))}
                    className="w-full border rounded-md px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Update your Current Score (out of 15)
                  </label>
                  <input
                    type="number"
                    value={score}
                    onChange={(e) => setScore(Number(e.target.value))}
                    className="w-full border rounded-md px-3 py-2"
                  />
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-gray-700 border rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdate}
                    className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-gray-900">Skill Test</h1>
          </div>

          <div className="space-y-8">
            {/* Test Header */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center shrink-0">
                  <Image src="https://cdn.worldvectorlogo.com/logos/html-1.svg" width={10} height={10} alt="HTML" className="w-10 h-10" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold">Hyper Text Markup Language</h2>
                  <p className="text-gray-600 mt-1">Questions: 08 | Duration: 15 mins | Submitted on 5 June 2021</p>
                </div>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition w-full sm:w-auto"
                >
                  Update
                </button>
              </div>
            </div>

            {/* Quick Statistics */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Statistics</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-4 p-4 bg-yellow-50 rounded-lg">
                  <Trophy className="w-8 h-8 text-yellow-600 shrink-0" />
                  <div>
                    <div className="text-2xl font-bold">{rank}</div>
                    <div className="text-sm text-gray-600">YOUR RANK</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                  <FileSpreadsheet className="w-8 h-8 text-blue-600 shrink-0" />
                  <div>
                    <div className="text-2xl font-bold">{percentile}%</div>
                    <div className="text-sm text-gray-600">PERCENTILE</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
                  <CheckCircle className="w-8 h-8 text-green-600 shrink-0" />
                  <div>
                    <div className="text-2xl font-bold">{score}/15</div>
                    <div className="text-sm text-gray-600">CORRECT ANSWERS</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Comparison Graph */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Comparison Graph</h3>
              <p className="text-gray-600 mb-4">
                You scored {percentile}% percentile which is {percentile > 72 ? 'higher' : 'lower'} than the average percentile 72% of all the engineers who took this assessment
              </p>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={data}
                    margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
                  >
                    <XAxis
                      dataKey="x"
                      domain={[0, 100]}
                      ticks={[0, 25, 50, 75, 100]}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <YAxis hide={true} />
                    <Tooltip
                      formatter={(value) => [`${value}`, "Frequency"]}
                      labelFormatter={(value) => `Percentile: ${value}%`}
                    />
                    <ReferenceLine
                      x={percentile}
                      stroke="#888"
                      strokeDasharray="3 3"
                      label={{ value: "your percentile", position: "top", fill: "#666", fontSize: 12 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="y"
                      stroke="#4F46E5"
                      strokeWidth={1.5}
                      dot={{ r: 4, fill: "white", stroke: "#4F46E5", strokeWidth: 1.5 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Analysis Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Syllabus Analysis */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Syllabus Wise Analysis</h3>
                <div className="space-y-4">
                  {skillTopics.map((topic, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-700">{topic.name}</span>
                        <span className="text-sm font-semibold">{topic.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`${topic.color} h-2 rounded-full`}
                          style={{ width: `${topic.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Question Analysis */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold">Question Analysis</h3>
                  <span className="text-blue-600 font-semibold">{score}/15</span>
                </div>
                <div className="flex justify-center items-center">
                  <div className="relative w-32 h-32">
                    <svg className="transform -rotate-90 w-32 h-32">
                      <circle
                        cx="64"
                        cy="64"
                        r="40"
                        stroke="#E5E7EB"
                        strokeWidth="8"
                        fill="none"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="40"
                        stroke="#4F46E5"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={strokeDasharray}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold">{Math.round(scorePercentage)}%</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 mt-4 text-center">
                  You scored {score} questions correct out of 15. {score < 13 ? 'However it still needs some improvements' : 'Great job!'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}