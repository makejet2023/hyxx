export interface Dialogue {
  id: string;
  chinese: string;
  english: string;
  pinyin: string;
  audioUrl?: string;
}

export interface Scene {
  id: string;
  titleEn: string;
  titleZh: string;
  descriptionEn: string;
  descriptionZh: string;
  icon: string;
  dialogues: Dialogue[];
}

export const SCENES: Scene[] = [
  {
    id: 'transportation',
    titleEn: 'Transportation',
    titleZh: '交通',
    descriptionEn: 'Essential phrases for airports, taxis, and public transportation',
    descriptionZh: '机场、出租车和公共交通必备短语',
    icon: '🚗',
    dialogues: [
      {
        id: 't1',
        chinese: '请问去机场怎么走？',
        english: 'How do I get to the airport?',
        pinyin: 'Qǐngwèn qù jīchǎng zěnme zǒu?',
        audioUrl: '/audio/transportation/t1.mp3'
      },
      {
        id: 't2',
        chinese: '我要打车',
        english: 'I want to take a taxi',
        pinyin: 'Wǒ yào dǎchē',
        audioUrl: '/audio/transportation/t2.mp3'
      },
      {
        id: 't3',
        chinese: '多少钱？',
        english: 'How much is it?',
        pinyin: 'Duōshao qián?',
        audioUrl: '/audio/transportation/t3.mp3'
      },
      {
        id: 't4',
        chinese: '请打表',
        english: 'Please use the meter',
        pinyin: 'Qǐng dǎbiǎo',
        audioUrl: '/audio/transportation/t4.mp3'
      },
      {
        id: 't5',
        chinese: '我要买一张地铁票',
        english: 'I want to buy a subway ticket',
        pinyin: 'Wǒ yào mǎi yī zhāng dìtiě piào',
        audioUrl: '/audio/transportation/t5.mp3'
      }
    ]
  },
  {
    id: 'hotel',
    titleEn: 'Hotel',
    titleZh: '酒店',
    descriptionEn: 'Useful expressions for hotel check-in and room service',
    descriptionZh: '酒店入住和服务相关表达',
    icon: '🏨',
    dialogues: [
      {
        id: 'h1',
        chinese: '我要办理入住',
        english: 'I want to check in',
        pinyin: 'Wǒ yào bànlǐ rùzhù',
        audioUrl: '/audio/hotel/h1.mp3'
      },
      {
        id: 'h2',
        chinese: '请问有房间吗？',
        english: 'Do you have any rooms available?',
        pinyin: 'Qǐngwèn yǒu fángjiān ma?',
        audioUrl: '/audio/hotel/h2.mp3'
      },
      {
        id: 'h3',
        chinese: '我要一个双人间',
        english: 'I want a double room',
        pinyin: 'Wǒ yào yī gè shuāngrénjiān',
        audioUrl: '/audio/hotel/h3.mp3'
      },
      {
        id: 'h4',
        chinese: '房间里有空调吗？',
        english: 'Is there air conditioning in the room?',
        pinyin: 'Fángjiān lǐ yǒu kōngtiáo ma?',
        audioUrl: '/audio/hotel/h4.mp3'
      },
      {
        id: 'h5',
        chinese: '请帮我打扫房间',
        english: 'Please clean my room',
        pinyin: 'Qǐng bāng wǒ dǎsǎo fángjiān',
        audioUrl: '/audio/hotel/h5.mp3'
      }
    ]
  },
  {
    id: 'restaurant',
    titleEn: 'Restaurant',
    titleZh: '餐厅',
    descriptionEn: 'Common phrases for ordering food and paying bills',
    descriptionZh: '点餐和结账常用表达',
    icon: '🍽️',
    dialogues: [
      {
        id: 'r1',
        chinese: '我要点菜',
        english: 'I want to order',
        pinyin: 'Wǒ yào diǎn cài',
        audioUrl: '/audio/restaurant/r1.mp3'
      },
      {
        id: 'r2',
        chinese: '请问有什么推荐？',
        english: 'What do you recommend?',
        pinyin: 'Qǐngwèn yǒu shénme tuījiàn?',
        audioUrl: '/audio/restaurant/r2.mp3'
      },
      {
        id: 'r3',
        chinese: '我对花生过敏',
        english: 'I am allergic to peanuts',
        pinyin: 'Wǒ duì huāshēng guòmǐn',
        audioUrl: '/audio/restaurant/r3.mp3'
      },
      {
        id: 'r4',
        chinese: '请给我账单',
        english: 'Please give me the bill',
        pinyin: 'Qǐng gěi wǒ zhàngdān',
        audioUrl: '/audio/restaurant/r4.mp3'
      },
      {
        id: 'r5',
        chinese: '可以刷卡吗？',
        english: 'Can I pay by card?',
        pinyin: 'Kěyǐ shuākǎ ma?',
        audioUrl: '/audio/restaurant/r5.mp3'
      }
    ]
  },
  {
    id: 'shopping',
    titleEn: 'Shopping',
    titleZh: '购物',
    descriptionEn: 'Essential phrases for bargaining and making purchases',
    descriptionZh: '砍价和购物必备表达',
    icon: '🛍️',
    dialogues: [
      {
        id: 's1',
        chinese: '这个多少钱？',
        english: 'How much is this?',
        pinyin: 'Zhège duōshao qián?',
        audioUrl: '/audio/shopping/s1.mp3'
      },
      {
        id: 's2',
        chinese: '太贵了，能便宜点吗？',
        english: 'Too expensive, can you make it cheaper?',
        pinyin: 'Tài guì le, néng piányi diǎn ma?',
        audioUrl: '/audio/shopping/s2.mp3'
      },
      {
        id: 's3',
        chinese: '我要大号的',
        english: 'I want a large size',
        pinyin: 'Wǒ yào dà hào de',
        audioUrl: '/audio/shopping/s3.mp3'
      },
      {
        id: 's4',
        chinese: '可以用支付宝吗？',
        english: 'Can I use Alipay?',
        pinyin: 'Kěyǐ yòng Zhīfùbǎo ma?',
        audioUrl: '/audio/shopping/s4.mp3'
      },
      {
        id: 's5',
        chinese: '有红色的吗？',
        english: 'Do you have it in red?',
        pinyin: 'Yǒu hóngsè de ma?',
        audioUrl: '/audio/shopping/s5.mp3'
      }
    ]
  },
  {
    id: 'emergency',
    titleEn: 'Emergency',
    titleZh: '紧急情况',
    descriptionEn: 'Important phrases for emergencies and medical situations',
    descriptionZh: '紧急情况和医疗相关表达',
    icon: '🚑',
    dialogues: [
      {
        id: 'e1',
        chinese: '救命！',
        english: 'Help!',
        pinyin: 'Jiùmìng!',
        audioUrl: '/audio/emergency/e1.mp3'
      },
      {
        id: 'e2',
        chinese: '我生病了',
        english: 'I am sick',
        pinyin: 'Wǒ shēngbìng le',
        audioUrl: '/audio/emergency/e2.mp3'
      },
      {
        id: 'e3',
        chinese: '请叫救护车',
        english: 'Please call an ambulance',
        pinyin: 'Qǐng jiào jiùhùchē',
        audioUrl: '/audio/emergency/e3.mp3'
      },
      {
        id: 'e4',
        chinese: '我的护照丢了',
        english: 'I lost my passport',
        pinyin: 'Wǒ de hùzhào diū le',
        audioUrl: '/audio/emergency/e4.mp3'
      },
      {
        id: 'e5',
        chinese: '请帮我报警',
        english: 'Please help me call the police',
        pinyin: 'Qǐng bāng wǒ bàojǐng',
        audioUrl: '/audio/emergency/e5.mp3'
      }
    ]
  },
  {
    id: 'social',
    titleEn: 'Social Etiquette',
    titleZh: '社交礼仪',
    descriptionEn: 'Basic greetings and social expressions',
    descriptionZh: '基本问候和社交表达',
    icon: '👋',
    dialogues: [
      {
        id: 'so1',
        chinese: '你好',
        english: 'Hello',
        pinyin: 'Nǐ hǎo',
        audioUrl: '/audio/social/so1.mp3'
      },
      {
        id: 'so2',
        chinese: '谢谢',
        english: 'Thank you',
        pinyin: 'Xièxiè',
        audioUrl: '/audio/social/so2.mp3'
      },
      {
        id: 'so3',
        chinese: '对不起',
        english: 'Sorry',
        pinyin: 'Duìbùqǐ',
        audioUrl: '/audio/social/so3.mp3'
      },
      {
        id: 'so4',
        chinese: '再见',
        english: 'Goodbye',
        pinyin: 'Zàijiàn',
        audioUrl: '/audio/social/so4.mp3'
      },
      {
        id: 'so5',
        chinese: '不客气',
        english: 'You\'re welcome',
        pinyin: 'Bú kèqì',
        audioUrl: '/audio/social/so5.mp3'
      }
    ]
  }
]; 