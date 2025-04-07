'use client';

import { useState, useRef, useEffect } from 'react';
import { Dialogue } from '@/types/dialogue';
import { updateProgress, resetStreak } from '@/utils/achievements';

interface PracticeCardProps {
  dialogue: Dialogue;
  onNext: () => void;
  practiceType: 'translation' | 'listening' | 'speaking' | 'matching';
}

export default function PracticeCard({ dialogue, onNext, practiceType }: PracticeCardProps) {
  const [userInput, setUserInput] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playCount, setPlayCount] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('ended', () => {
        setIsPlaying(false);
      });
    }
  }, []);

  const handlePlayAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
      setPlayCount(prev => prev + 1);
    }
  };

  const handlePauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleReplayAudio = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setIsPlaying(true);
      setPlayCount(prev => prev + 1);
    }
  };

  const handleCheck = () => {
    let correct = false;
    
    switch (practiceType) {
      case 'translation':
        correct = userInput.toLowerCase().trim() === dialogue.english.toLowerCase().trim();
        break;
      case 'matching':
        correct = selectedOption === dialogue.english;
        break;
      case 'listening':
        // 对于听力练习，检查中文或英文答案
        correct = userInput.toLowerCase().trim() === dialogue.chinese.toLowerCase().trim() ||
                 userInput.toLowerCase().trim() === dialogue.english.toLowerCase().trim();
        break;
      case 'speaking':
        // 这里可以添加语音识别逻辑
        correct = true;
        break;
    }

    setIsCorrect(correct);
    
    if (correct) {
      updateProgress('correct_answer');
    } else {
      resetStreak();
    }
  };

  const handleNext = () => {
    setUserInput('');
    setIsCorrect(null);
    setSelectedOption(null);
    setPlayCount(0);
    updateProgress('practice_session');
    onNext();
  };

  const renderPracticeContent = () => {
    switch (practiceType) {
      case 'translation':
        return (
          <div className="space-y-4">
            <div className="text-xl font-medium text-gray-900 dark:text-white">
              {dialogue.chinese}
            </div>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Type the English translation..."
            />
          </div>
        );
      
      case 'listening':
        return (
          <div className="space-y-4">
            <audio ref={audioRef} src={dialogue.audioUrl} />
            <div className="flex space-x-4 justify-center">
              <button
                onClick={isPlaying ? handlePauseAudio : handlePlayAudio}
                className="p-4 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? '⏸️' : '▶️'}
              </button>
              <button
                onClick={handleReplayAudio}
                className="p-4 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                title="Replay"
              >
                🔄
              </button>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 text-center">
              Played {playCount} times
            </div>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Type what you hear (Chinese or English)..."
            />
            {isCorrect === false && (
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                提示：{dialogue.pinyin}
              </div>
            )}
          </div>
        );
      
      case 'speaking':
        return (
          <div className="space-y-4">
            <div className="text-xl font-medium text-gray-900 dark:text-white">
              {dialogue.english}
            </div>
            <button
              className="p-4 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
              onClick={() => {
                // 添加语音识别逻辑
              }}
            >
              🎤 Start Speaking
            </button>
          </div>
        );
      
      case 'matching':
        const options = [
          dialogue.english,
          'Wrong option 1',
          'Wrong option 2',
          'Wrong option 3'
        ].sort(() => Math.random() - 0.5);

        return (
          <div className="space-y-4">
            <div className="text-xl font-medium text-gray-900 dark:text-white">
              {dialogue.chinese}
            </div>
            <div className="grid grid-cols-2 gap-4">
              {options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedOption(option)}
                  className={`p-4 rounded-md transition-colors ${
                    selectedOption === option
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      {renderPracticeContent()}
      
      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={handleCheck}
          disabled={isCorrect !== null}
          className={`px-4 py-2 rounded-md text-white ${
            isCorrect === null
              ? 'bg-blue-500 hover:bg-blue-600'
              : isCorrect
              ? 'bg-green-500'
              : 'bg-red-500'
          } transition-colors`}
        >
          {isCorrect === null ? 'Check' : isCorrect ? 'Correct!' : 'Try Again'}
        </button>
        
        {isCorrect !== null && (
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
          >
            Next
          </button>
        )}
      </div>

      {isCorrect !== null && !isCorrect && (
        <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
          <h3 className="font-medium text-gray-900 dark:text-white mb-2">正确答案：</h3>
          <p className="text-gray-700 dark:text-gray-300">{dialogue.chinese}</p>
          <p className="text-gray-700 dark:text-gray-300">{dialogue.english}</p>
          <p className="text-gray-600 dark:text-gray-400">{dialogue.pinyin}</p>
        </div>
      )}
    </div>
  );
} 