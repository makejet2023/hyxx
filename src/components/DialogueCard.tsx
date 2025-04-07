'use client';

import { useState, useRef, useEffect } from 'react';
import { Dialogue } from '@/types/scene';

interface DialogueCardProps {
  dialogue: Dialogue;
  onToggleFavorite?: (dialogue: Dialogue) => void;
  isFavorite?: boolean;
}

export default function DialogueCard({ dialogue, onToggleFavorite, isFavorite = false }: DialogueCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  // 组件挂载时的调试信息
  useEffect(() => {
    console.log('DialogueCard mounted:', {
      id: dialogue.id,
      audioUrl: dialogue.audioUrl
    });
  }, [dialogue.id, dialogue.audioUrl]);

  // 音频元素挂载后的处理
  useEffect(() => {
    console.log('Audio element ref:', audioRef.current);
    
    if (audioRef.current) {
      const audio = audioRef.current;
      
      // 设置音频属性
      audio.preload = 'auto';
      
      console.log('Setting up audio element:', {
        src: audio.src,
        preload: audio.preload,
        readyState: audio.readyState
      });

      // 尝试加载音频
      try {
        audio.load();
        console.log('Audio load() called');
      } catch (err) {
        console.error('Error loading audio:', err);
      }
    }
  }, [audioRef.current]);

  const handlePlayAudio = async () => {
    console.log('Play button clicked');
    
    if (!audioRef.current) {
      console.error('No audio element available');
      return;
    }

    try {
      if (isPlaying) {
        console.log('Pausing audio');
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(false);
      } else {
        console.log('Starting audio playback');
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          await playPromise;
          console.log('Audio playback started successfully');
          setIsPlaying(true);
          setError(null);
        }
      }
    } catch (err) {
      console.error('播放错误:', err);
      setError('音频播放失败');
      setIsPlaying(false);
    }
  };

  const handleToggleFavorite = () => {
    if (onToggleFavorite) {
      onToggleFavorite(dialogue);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-lg font-medium">{dialogue.chinese}</p>
            <p className="text-gray-600">{dialogue.english}</p>
            <p className="text-gray-500 text-sm">{dialogue.pinyin}</p>
            {/* 添加音频URL和状态信息显示，仅在开发环境显示 */}
            {process.env.NODE_ENV === 'development' && (
              <>
                <p className="text-xs text-gray-400 mt-1">
                  音频URL: {dialogue.audioUrl}
                </p>
                <p className="text-xs text-gray-400">
                  状态: {isLoading ? '加载中...' : error ? '加载失败' : '已就绪'}
                </p>
                {error && <p className="text-xs text-red-500">{error}</p>}
              </>
            )}
          </div>
          {onToggleFavorite && (
            <button
              onClick={handleToggleFavorite}
              className={`text-2xl ${isFavorite ? 'text-red-500' : 'text-gray-400'} hover:text-red-600 transition-colors`}
            >
              {isFavorite ? '❤️' : '🤍'}
            </button>
          )}
        </div>
        <div className="flex justify-between items-center mt-4">
          <button 
            onClick={handlePlayAudio}
            disabled={!dialogue.audioUrl || isLoading}
            className="text-blue-500 hover:text-blue-600 disabled:text-gray-400"
          >
            <span className="sr-only">Play audio</span>
            {isLoading ? '⌛' : isPlaying ? '⏸️' : '▶️'}
          </button>
          <audio 
            ref={audioRef}
            src={dialogue.audioUrl}
            onLoadStart={() => {
              console.log('Audio loadstart event');
              setIsLoading(true);
            }}
            onCanPlayThrough={() => {
              console.log('Audio canplaythrough event');
              setIsLoading(false);
            }}
            onEnded={() => {
              console.log('Audio ended event');
              setIsPlaying(false);
            }}
            onError={(e) => {
              const target = e.currentTarget;
              console.error('Audio error event:', {
                error: target.error,
                networkState: target.networkState,
                readyState: target.readyState,
                src: target.src
              });
              setError('音频加载失败');
              setIsLoading(false);
            }}
            // 临时添加controls属性来测试
            controls={process.env.NODE_ENV === 'development'}
          />
          <button className="text-gray-500 hover:text-gray-600">
            <span className="sr-only">Share</span>
            Share
          </button>
        </div>
      </div>
    </div>
  );
} 