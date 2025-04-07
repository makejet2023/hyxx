export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  requirement: {
    type: 'correct_answers' | 'practice_sessions' | 'streak' | 'scene_completion';
    count: number;
    sceneId?: string;
  };
  progress: number;
  completed: boolean;
  completedAt?: string;
}

export interface AchievementProgress {
  correctAnswers: number;
  practiceSessions: number;
  currentStreak: number;
  longestStreak: number;
  completedScenes: string[];
} 