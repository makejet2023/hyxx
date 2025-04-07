interface PracticeType {
  id: string;
  title: string;
  description: string;
  icon: string;
}

interface PracticeTypeSelectorProps {
  selectedType: string;
  onSelectType: (type: string) => void;
}

const practiceTypes: PracticeType[] = [
  {
    id: 'translation',
    title: 'Translation',
    description: 'Translate Chinese phrases to English',
    icon: '🔄'
  },
  {
    id: 'listening',
    title: 'Listening',
    description: 'Listen and choose the correct translation',
    icon: '👂'
  },
  {
    id: 'speaking',
    title: 'Speaking',
    description: 'Practice pronunciation with voice recognition',
    icon: '🗣️'
  },
  {
    id: 'matching',
    title: 'Matching',
    description: 'Match Chinese phrases with their meanings',
    icon: '🔗'
  }
];

export default function PracticeTypeSelector({ selectedType, onSelectType }: PracticeTypeSelectorProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {practiceTypes.map((type) => (
        <button
          key={type.id}
          onClick={() => onSelectType(type.id)}
          className={`p-4 rounded-lg border-2 transition-all duration-200 ${
            selectedType === type.id
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900'
              : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
          }`}
        >
          <div className="text-2xl mb-2">{type.icon}</div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
            {type.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {type.description}
          </p>
        </button>
      ))}
    </div>
  );
} 