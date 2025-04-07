'use client';

import { useState } from 'react';
import { Dialogue } from '@/types/scene';

interface ShareButtonProps {
  dialogue: Dialogue;
}

export default function ShareButton({ dialogue }: ShareButtonProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleShare = async () => {
    const shareText = `${dialogue.chinese}\n${dialogue.english}\n${dialogue.pinyin}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Essential Chinese Phrase',
          text: shareText,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareText);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (error) {
        console.error('Error copying to clipboard:', error);
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
    >
      {isCopied ? '📋 Copied!' : '📤 Share'}
    </button>
  );
} 