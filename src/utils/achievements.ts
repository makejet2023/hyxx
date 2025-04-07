import { Achievement, AchievementProgress } from '@/types/achievement';

const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_correct',
    title: 'First Step',
    description: 'Get your first correct answer',
    icon: '🎯',
    requirement: {
      type: 'correct_answers',
      count: 1
    },
    progress: 0,
    completed: false
  },
  {
    id: 'perfect_score',
    title: 'Perfect Score',
    description: 'Get 10 correct answers in a row',
    icon: '🏆',
    requirement: {
      type: 'streak',
      count: 10
    },
    progress: 0,
    completed: false
  },
  {
    id: 'practice_master',
    title: 'Practice Master',
    description: 'Complete 50 practice sessions',
    icon: '📚',
    requirement: {
      type: 'practice_sessions',
      count: 50
    },
    progress: 0,
    completed: false
  },
  {
    id: 'scene_master_airport',
    title: 'Airport Expert',
    description: 'Complete all phrases in the Airport scene',
    icon: '✈️',
    requirement: {
      type: 'scene_completion',
      count: 1,
      sceneId: 'airport'
    },
    progress: 0,
    completed: false
  },
  {
    id: 'scene_master_hotel',
    title: 'Hotel Expert',
    description: 'Complete all phrases in the Hotel scene',
    icon: '🏨',
    requirement: {
      type: 'scene_completion',
      count: 1,
      sceneId: 'hotel'
    },
    progress: 0,
    completed: false
  },
  {
    id: 'scene_master_restaurant',
    title: 'Restaurant Expert',
    description: 'Complete all phrases in the Restaurant scene',
    icon: '🍽️',
    requirement: {
      type: 'scene_completion',
      count: 1,
      sceneId: 'restaurant'
    },
    progress: 0,
    completed: false
  },
  {
    id: 'scene_master_shopping',
    title: 'Shopping Expert',
    description: 'Complete all phrases in the Shopping scene',
    icon: '🛍️',
    requirement: {
      type: 'scene_completion',
      count: 1,
      sceneId: 'shopping'
    },
    progress: 0,
    completed: false
  },
  {
    id: 'scene_master_emergency',
    title: 'Emergency Expert',
    description: 'Complete all phrases in the Emergency scene',
    icon: '🚨',
    requirement: {
      type: 'scene_completion',
      count: 1,
      sceneId: 'emergency'
    },
    progress: 0,
    completed: false
  },
  {
    id: 'scene_master_social',
    title: 'Social Expert',
    description: 'Complete all phrases in the Social scene',
    icon: '👥',
    requirement: {
      type: 'scene_completion',
      count: 1,
      sceneId: 'social'
    },
    progress: 0,
    completed: false
  }
];

export function getStoredAchievements(): Achievement[] {
  if (typeof window === 'undefined') return ACHIEVEMENTS;
  
  const stored = localStorage.getItem('achievements');
  if (!stored) return ACHIEVEMENTS;
  
  return JSON.parse(stored);
}

export function getStoredProgress(): AchievementProgress {
  if (typeof window === 'undefined') {
    return {
      correctAnswers: 0,
      practiceSessions: 0,
      currentStreak: 0,
      longestStreak: 0,
      completedScenes: []
    };
  }
  
  const stored = localStorage.getItem('achievement_progress');
  if (!stored) {
    return {
      correctAnswers: 0,
      practiceSessions: 0,
      currentStreak: 0,
      longestStreak: 0,
      completedScenes: []
    };
  }
  
  return JSON.parse(stored);
}

export function updateProgress(
  type: 'correct_answer' | 'practice_session' | 'scene_completion',
  value?: string
): void {
  if (typeof window === 'undefined') return;

  const progress = getStoredProgress();
  const achievements = getStoredAchievements();

  switch (type) {
    case 'correct_answer':
      progress.correctAnswers++;
      progress.currentStreak++;
      if (progress.currentStreak > progress.longestStreak) {
        progress.longestStreak = progress.currentStreak;
      }
      break;
    case 'practice_session':
      progress.practiceSessions++;
      break;
    case 'scene_completion':
      if (value && !progress.completedScenes.includes(value)) {
        progress.completedScenes.push(value);
      }
      break;
  }

  // 更新成就进度
  achievements.forEach(achievement => {
    if (achievement.completed) return;

    switch (achievement.requirement.type) {
      case 'correct_answers':
        achievement.progress = progress.correctAnswers;
        break;
      case 'practice_sessions':
        achievement.progress = progress.practiceSessions;
        break;
      case 'streak':
        achievement.progress = progress.currentStreak;
        break;
      case 'scene_completion':
        if (achievement.requirement.sceneId) {
          achievement.progress = progress.completedScenes.includes(achievement.requirement.sceneId) ? 1 : 0;
        }
        break;
    }

    if (achievement.progress >= achievement.requirement.count) {
      achievement.completed = true;
      achievement.completedAt = new Date().toISOString();
    }
  });

  localStorage.setItem('achievement_progress', JSON.stringify(progress));
  localStorage.setItem('achievements', JSON.stringify(achievements));
}

export function resetStreak(): void {
  if (typeof window === 'undefined') return;

  const progress = getStoredProgress();
  progress.currentStreak = 0;
  localStorage.setItem('achievement_progress', JSON.stringify(progress));
} 