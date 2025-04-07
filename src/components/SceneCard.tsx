import Link from 'next/link';
import { Scene } from '@/types/scene';

interface SceneCardProps {
  scene: Scene;
}

export default function SceneCard({ scene }: SceneCardProps) {
  return (
    <Link href={`/scenes/${scene.id}`}>
      <div className="group p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 cursor-pointer">
        <div className="text-3xl mb-3 transform transition-transform duration-300 group-hover:scale-110">
          {scene.icon}
        </div>
        <h2 className="text-lg font-bold mb-1 text-gray-900 dark:text-white transition-colors duration-300 line-clamp-1">
          {scene.titleEn}
        </h2>
        <h3 className="text-base mb-2 text-gray-700 dark:text-gray-300 transition-colors duration-300 line-clamp-1">
          {scene.titleZh}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300 line-clamp-2">
          {scene.descriptionEn}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500 mt-1 transition-colors duration-300 line-clamp-2">
          {scene.descriptionZh}
        </p>
      </div>
    </Link>
  );
} 