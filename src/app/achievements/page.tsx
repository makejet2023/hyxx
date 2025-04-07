'use client';

import { useEffect, useState } from 'react';
import { Achievement } from '@/types/achievement';
import { getStoredAchievements, getStoredProgress } from '@/utils/achievements';
import AchievementCard from '@/components/AchievementCard';

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [progress, setProgress] = useState({
    correctAnswers: 0,
    practiceSessions: 0,
    currentStreak: 0,
    longestStreak: 0,
    completedScenes: [] as string[]
  });

  useEffect(() => {
    setAchievements(getStoredAchievements());
    setProgress(getStoredProgress());
  }, []);

  const completedCount = achievements.filter(a => a.completed).length;
  const totalCount = achievements.length;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Achievements
      </h1>

      <div className="mb-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-500">
              {completedCount}/{totalCount}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Achievements
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-500">
              {progress.correctAnswers}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Correct Answers
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-500">
              {progress.currentStreak}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Current Streak
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-500">
              {progress.longestStreak}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Longest Streak
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map(achievement => (
          <AchievementCard
            key={achievement.id}
            achievement={achievement}
          />
        ))}
      </div>
    </div>
  );
} 