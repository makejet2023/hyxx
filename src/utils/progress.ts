interface ProgressItem {
  dialogueId: string;
  lastPracticed: Date;
  correctCount: number;
  incorrectCount: number;
}

export function getProgress(): ProgressItem[] {
  if (typeof window === 'undefined') {
    return [];
  }

  const progressData = localStorage.getItem('progress');
  if (!progressData) {
    return [];
  }

  try {
    const parsed = JSON.parse(progressData);
    return parsed.map((item: any) => ({
      ...item,
      lastPracticed: new Date(item.lastPracticed)
    }));
  } catch (error) {
    console.error('Error parsing progress data:', error);
    return [];
  }
}

export function getCompletionRate(): number {
  const progress = getProgress();
  if (progress.length === 0) {
    return 0;
  }

  const totalAttempts = progress.reduce((sum, item) => sum + item.correctCount + item.incorrectCount, 0);
  const totalCorrect = progress.reduce((sum, item) => sum + item.correctCount, 0);
  
  return (totalCorrect / totalAttempts) * 100;
} 