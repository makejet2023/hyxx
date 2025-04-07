import { Achievement } from '@/types/achievement';

interface AchievementCardProps {
  achievement: Achievement;
}

export default function AchievementCard({ achievement }: AchievementCardProps) {
  const progress = achievement.progress;
  const requirement = achievement.requirement.count;
  const progressPercentage = Math.min((progress / requirement) * 100, 100);

  return (
    <div className={`p-4 rounded-lg shadow-md transition-all duration-300 ${
      achievement.completed 
        ? 'bg-green-100 dark:bg-green-900' 
        : 'bg-white dark:bg-gray-800'
    }`}>
      <div className="flex items-center space-x-4">
        <div className="text-4xl">{achievement.icon}</div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {achievement.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {achievement.description}
          </p>
        </div>
        {achievement.completed && (
          <div className="text-2xl">🏅</div>
        )}
      </div>
      
      <div className="mt-4">
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
          <div
            className={`h-2.5 rounded-full ${
              achievement.completed
                ? 'bg-green-500'
                : 'bg-blue-500'
            }`}
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">
          {progress} / {requirement}
        </div>
      </div>

      {achievement.completed && achievement.completedAt && (
        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          Completed on {new Date(achievement.completedAt).toLocaleDateString()}
        </div>
      )}
    </div>
  );
} 