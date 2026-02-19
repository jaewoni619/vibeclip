import { Category, Template, GalleryItem, PromptSuggestion } from '@/types';

export interface VideoIdea {
  id: string;
  title: string;
  prompt: string;
}

export const videoIdeas: VideoIdea[] = [
  { id: 'vi1', title: '피카츄 vs 고죠 사토루 에픽 배틀', prompt: '피카츄와 고죠 사토루가 에너지를 방출하며 에픽한 배틀을 벌이는 시네마틱 장면, 번개와 무한의 힘이 충돌하는 드라마틱한 연출' },
  { id: 'vi2', title: '블랙핑크 x BTS 합동 무대', prompt: '블랙핑크와 BTS가 거대한 콘서트 무대에서 합동 퍼포먼스를 펼치는 장면, 화려한 조명과 관객, 시네마틱 카메라 워크' },
  { id: 'vi3', title: '아이유가 파리 카페에서 노래하는 뮤비', prompt: '아이유가 파리의 아늑한 카페에서 기타를 치며 노래하는 뮤직비디오 스타일 영상, 따뜻한 조명, 시네마틱 색보정' },
  { id: 'vi4', title: '우주에서 고래가 헤엄치는 장면', prompt: '광활한 우주 공간에서 거대한 고래가 성운 사이를 유유히 헤엄치는 초현실적 판타지 장면, 별빛과 오로라 배경' },
  { id: 'vi5', title: '마리오와 소닉의 레이싱 대결', prompt: '마리오와 소닉이 미래적인 레이싱 트랙에서 속도 대결을 펼치는 장면, 역동적인 카메라, 스피드 이펙트' },
  { id: 'vi6', title: '지브리 스타일 여름 시골 자전거 여행', prompt: '지브리 스타일의 아름다운 여름 시골길을 자전거로 달리는 소녀, 바람에 흔들리는 들꽃, 뭉게구름, 따뜻한 색감' },
  { id: 'vi7', title: '공룡이 현대 도시를 걸어다니는 장면', prompt: '거대한 티라노사우루스가 현대 도시 한복판을 걸어다니는 SF 장면, 사람들이 놀라서 도망치는 모습, 시네마틱 연출' },
  { id: 'vi8', title: '겨울왕국 엘사 vs 불의 마법사', prompt: '엘사가 얼음 마법으로 불의 마법사와 대결하는 에픽 판타지 배틀, 얼음과 불꽃이 충돌하며 폭발하는 장면' },
  { id: 'vi9', title: '고양이 셰프의 미니어처 주방', prompt: '귀여운 고양이가 미니어처 주방에서 진지하게 요리하는 코미디 장면, 작은 앞치마, 클로즈업 요리 과정' },
  { id: 'vi10', title: '네온 사이버펑크 도시 자동차 추격전', prompt: '비 내리는 네온 사이버펑크 도시에서 벌어지는 치열한 자동차 추격전, 네온 반사광, 드리프트, 시네마틱 슬로우모션' },
  { id: 'vi11', title: '오로라 아래 캠핑하는 커플', prompt: '북극의 밤하늘 오로라 아래에서 캠프파이어 옆에 앉아있는 커플, 로맨틱한 분위기, 별빛, 따뜻한 불빛' },
  { id: 'vi12', title: '해리포터 vs 간달프 마법 대결', prompt: '해리포터와 간달프가 마법 지팡이로 치열한 마법 대결을 벌이는 에픽 판타지 장면, 주문과 빛줄기가 교차하는 연출' },
];

export const categories: { id: Category; name: string }[] = [
  { id: 'battle', name: '배틀' },
  { id: 'dance', name: '댄스' },
  { id: 'comedy', name: '코미디' },
  { id: 'trending', name: '트렌딩' },
];

export const templates: Template[] = [
  // === 배틀 ===
  {
    id: 'epic-battle',
    name: 'Epic Battle',
    category: 'battle',
    thumbnail: '/templates/epic-battle.png',
    description: '폭발과 극적인 카메라 앵글의 시네마틱 전투 장면',
    prompt: 'Two characters engaged in an epic battle, cinematic camera angles, dramatic lighting, explosions and debris flying, slow motion impact shots, dynamic action choreography, movie-quality VFX, intense atmosphere, 4K cinematic quality',
    creditCost: { '5s_720p': 10, '5s_1080p': 20, '10s_720p': 20, '10s_1080p': 40 },
    gradient: 'linear-gradient(135deg, #FF4500, #DC143C, #8B0000)',
    popular: true,
  },
  {
    id: 'boxing-match',
    name: 'Boxing Match',
    category: 'battle',
    thumbnail: '/templates/boxing-match.png',
    description: '관중이 환호하는 프로 복싱 링에서 펼쳐지는 대결',
    prompt: 'Two characters boxing in a professional boxing ring, dramatic overhead lighting, cheering crowd in background, powerful punches being exchanged, sweat droplets flying, slow motion impact, dynamic camera movement circling around fighters, cinematic quality',
    creditCost: { '5s_720p': 10, '5s_1080p': 20, '10s_720p': 20, '10s_1080p': 40 },
    gradient: 'linear-gradient(135deg, #FFD700, #FF6347, #DC143C)',
  },
  {
    id: 'superpower-clash',
    name: 'Superpower Clash',
    category: 'battle',
    thumbnail: '/templates/superpower-clash.png',
    description: '에너지 빔과 마법을 쏘며 충돌하는 초능력 배틀',
    prompt: 'Two characters in a superpower energy clash, glowing energy beams colliding between them, sparks and lightning emanating from impact point, dramatic wind blowing, ground cracking beneath their feet, cosmic background with stars, anime-style energy effects, cinematic slow motion',
    creditCost: { '5s_720p': 10, '5s_1080p': 20, '10s_720p': 20, '10s_1080p': 40 },
    gradient: 'linear-gradient(135deg, #00BFFF, #7B68EE, #FF00FF)',
    popular: true,
  },
  {
    id: 'sword-duel',
    name: 'Sword Duel',
    category: 'battle',
    thumbnail: '/templates/sword-duel.png',
    description: '비 내리는 밤, 사무라이 스타일의 긴박한 검술 대결',
    prompt: 'Two samurai characters engaged in an intense sword duel, rain pouring down, sparks flying from clashing blades, dramatic slow motion, traditional Japanese architecture in background, moonlight reflecting off wet surfaces, cinematic depth of field',
    creditCost: { '5s_720p': 10, '5s_1080p': 20, '10s_720p': 20, '10s_1080p': 40 },
    gradient: 'linear-gradient(135deg, #2F4F4F, #708090, #C0C0C0)',
  },

  // === 댄스 ===
  {
    id: 'kpop-dance',
    name: 'K-POP Dance',
    category: 'dance',
    thumbnail: '/templates/kpop-dance.png',
    description: '화려한 무대 조명 아래 싱크로율 100% K-POP 안무',
    prompt: 'Two characters performing synchronized K-pop dance choreography, colorful stage lights flashing, LED screens in background, energetic hip-hop dance moves, professional stage setting, dynamic camera switching between wide and close-up shots, concert atmosphere',
    creditCost: { '5s_720p': 10, '5s_1080p': 20, '10s_720p': 20, '10s_1080p': 40 },
    gradient: 'linear-gradient(135deg, #FF69B4, #9370DB, #00CED1)',
    popular: true,
  },
  {
    id: 'dance-battle',
    name: 'Dance Battle',
    category: 'dance',
    thumbnail: '/templates/dance-battle.png',
    description: '관객들이 둘러싼 가운데 벌어지는 스트릿 댄스 배틀',
    prompt: 'Two characters in a breakdance battle, urban street setting, circle of spectators around them, one character performing impressive floor moves while the other watches, boombox playing music, graffiti walls in background, dynamic camera angles, street culture atmosphere',
    creditCost: { '5s_720p': 10, '5s_1080p': 20, '10s_720p': 20, '10s_1080p': 40 },
    gradient: 'linear-gradient(135deg, #FF8C00, #FF4500, #8B008B)',
  },
  {
    id: 'music-video',
    name: 'Music Video',
    category: 'dance',
    thumbnail: '/templates/music-video.png',
    description: '시네마틱 비주얼의 스타일리시한 뮤직비디오 퍼포먼스',
    prompt: 'Two characters performing in a stylish music video, cinematic camera movements, beautiful lighting with lens flares, dynamic choreography, smooth transitions, professional music video quality, aesthetic color grading, dramatic poses and expressions',
    creditCost: { '5s_720p': 10, '5s_1080p': 20, '10s_720p': 20, '10s_1080p': 40 },
    gradient: 'linear-gradient(135deg, #8A2BE2, #DA70D6, #FFB6C1)',
  },

  // === 코미디 ===
  {
    id: 'chase-scene',
    name: 'Chase Scene',
    category: 'comedy',
    thumbnail: '/templates/chase-scene.png',
    description: '한 캐릭터가 다른 캐릭터를 쫓는 웃긴 추격전',
    prompt: 'Comedic chase scene, one character frantically running away while the other chases, exaggerated running animation, obstacles being dodged, funny expressions, cartoon-style physics, dynamic camera following the action, slapstick comedy style',
    creditCost: { '5s_720p': 10, '5s_1080p': 20, '10s_720p': 20, '10s_1080p': 40 },
    gradient: 'linear-gradient(135deg, #32CD32, #FFD700, #FF6347)',
  },
  {
    id: 'dramatic-meeting',
    name: 'Dramatic Meeting',
    category: 'comedy',
    thumbnail: '/templates/dramatic-meeting.png',
    description: '영화처럼 과장된 극적인 첫 만남 장면',
    prompt: 'Two characters meeting dramatically, slow motion walking toward each other, wind blowing dramatically, epic movie music atmosphere, over-the-top dramatic expressions, lens flares, sunset background, cinematic depth of field, comedy through excessive drama',
    creditCost: { '5s_720p': 10, '5s_1080p': 20, '10s_720p': 20, '10s_1080p': 40 },
    gradient: 'linear-gradient(135deg, #FF6B6B, #FFA07A, #FFD700)',
  },
  {
    id: 'horror-react',
    name: 'Horror React',
    category: 'comedy',
    thumbnail: '/templates/horror-react.png',
    description: '깜짝 놀라게 하고 리액션하는 코미디 공포 장면',
    prompt: 'One character scaring another with a jump scare, exaggerated shocked reaction, comically over-the-top scream, dark hallway setting, sudden dramatic lighting change, horror movie style camera angles but with comedic timing, funny aftermath',
    creditCost: { '5s_720p': 10, '5s_1080p': 20, '10s_720p': 20, '10s_1080p': 40 },
    gradient: 'linear-gradient(135deg, #2C003E, #4A0080, #7B00FF)',
  },

  // === 트렌딩 ===
  {
    id: 'rap-battle',
    name: 'Rap Battle',
    category: 'trending',
    thumbnail: '/templates/rap-battle.png',
    description: '마이크 잡고 관중을 열광시키는 치열한 랩 배틀',
    prompt: 'Two characters in an intense rap battle, holding microphones, crowd in background going wild, dramatic spotlight, one character dropping bars while the other reacts, urban stage setting, smoke effects, dynamic camera cuts, hip-hop culture atmosphere',
    creditCost: { '5s_720p': 10, '5s_1080p': 20, '10s_720p': 20, '10s_1080p': 40 },
    gradient: 'linear-gradient(135deg, #FFD700, #FF4500, #000000)',
    popular: true,
  },
  {
    id: 'cooking-showdown',
    name: 'Cooking Showdown',
    category: 'trending',
    thumbnail: '/templates/cooking-showdown.png',
    description: '재료가 날아다니는 치열한 주방 요리 대결',
    prompt: 'Two characters in a cooking competition, professional kitchen setting, ingredients flying through the air, dramatic chopping and stirring, flames from the stove, competitive expressions, food being plated artistically, cooking show camera angles, timer counting down',
    creditCost: { '5s_720p': 10, '5s_1080p': 20, '10s_720p': 20, '10s_1080p': 40 },
    gradient: 'linear-gradient(135deg, #FF6347, #FF8C00, #FFD700)',
  },
];

export const promptSuggestions: PromptSuggestion[] = [
  { id: 'ps1', category: '우주', textKo: '우주 공간에서 거대한 행성 사이를 날아가는 우주선, 시네마틱 카메라, 별빛과 성운이 빛나는 배경' },
  { id: 'ps2', category: '지브리', textKo: '지브리 스타일의 아름다운 시골 풍경, 바람에 흔들리는 꽃밭, 맑은 하늘 아래 소녀가 걸어가는 장면' },
  { id: 'ps3', category: '풍경', textKo: '드라마틱한 일몰이 비치는 눈 덮인 산맥, 드론 촬영 스타일의 시네마틱 풍경' },
  { id: 'ps4', category: '게임', textKo: '사이버펑크 도시 야경, 네온사인이 빛나는 거리를 걷는 캐릭터, 비 내리는 분위기' },
  { id: 'ps5', category: '동물', textKo: '거대한 드래곤이 화염을 내뿜으며 하늘을 나는 판타지 장면, 에픽한 배경음악 분위기' },
  { id: 'ps6', category: '음식', textKo: '김이 모락모락 나는 라멘 그릇 클로즈업, 슬로우 모션으로 면을 들어올리는 장면' },
  { id: 'ps7', category: '액션', textKo: '빌딩 사이를 뛰어다니는 파쿠르 액션, 슬로우 모션 점프, 시네마틱 카메라 앵글' },
  { id: 'ps8', category: '바다', textKo: '수정처럼 맑은 바다 속을 탐험하는 다이버, 산호초와 열대어가 가득한 수중 세계' },
  { id: 'ps9', category: '공포', textKo: '안개 자욱한 숲속 폐가에서 벌어지는 미스터리한 장면, 호러 영화 분위기' },
  { id: 'ps10', category: '로맨스', textKo: '벚꽃이 흩날리는 거리에서 만나는 두 사람, 시네마틱 슬로우 모션' },
];

export const promptPlaceholders: string[] = [
  '우주 공간에서 은하수를 배경으로 날아가는 우주선...',
  '지브리 스타일의 숲속을 걷는 소녀, 빛이 나뭇잎 사이로...',
  '사이버펑크 네온 도시에서 달리는 오토바이, 비 오는 밤...',
  '눈 덮인 산맥 위를 나는 드래곤, 드라마틱한 일몰...',
  '맑은 바다 속 산호초 사이를 헤엄치는 거북이, 빛줄기...',
];

export const galleryItems: GalleryItem[] = [
  // 앞 4개 = 랜딩 GalleryPreview에 표시 (TemplateShowcase 인기 4개와 겹치지 않도록)
  { id: 'g1', templateId: 'cooking-showdown', title: '고든 램지 vs 백종원', views: 16800, likes: 1250, createdAt: '14시간 전', creationMode: 'template' },
  { id: 'g2', templateId: 'horror-react', title: '친구 깜짝 놀래키기', views: 13600, likes: 1020, createdAt: '11시간 전', creationMode: 'template' },
  { id: 'g3', templateId: 'dance-battle', title: '스파이더맨 vs 데드풀 댄스배틀', views: 10300, likes: 812, createdAt: '5시간 전', creationMode: 'template' },
  { id: 'g4', templateId: 'boxing-match', title: '고양이 vs 강아지 복싱', views: 9800, likes: 776, createdAt: '12시간 전', creationMode: 'template' },
  // 나머지
  { id: 'g5', templateId: 'epic-battle', title: '손오공 vs 나루토', views: 12400, likes: 890, createdAt: '2시간 전', creationMode: 'template' },
  { id: 'g6', templateId: 'superpower-clash', title: '마리오 vs 소닉 에너지 대결', views: 8900, likes: 654, createdAt: '4시간 전', creationMode: 'template' },
  { id: 'g7', templateId: 'kpop-dance', title: '내 캐릭터들의 K-POP 댄스', views: 6700, likes: 432, createdAt: '6시간 전', creationMode: 'template' },
  { id: 'g8', templateId: 'rap-battle', title: '아인슈타인 vs 뉴턴 랩배틀', views: 15200, likes: 1100, createdAt: '8시간 전', creationMode: 'template' },
  { id: 'g9', templateId: 'chase-scene', title: '아기 vs 로봇 추격전', views: 5400, likes: 321, createdAt: '1일 전', creationMode: 'template' },
  { id: 'g10', templateId: 'sword-duel', title: '사무라이 테디베어 대결', views: 7300, likes: 543, createdAt: '1일 전', creationMode: 'template' },
  { id: 'g11', templateId: 'music-video', title: '내 강아지 뮤직비디오', views: 8100, likes: 598, createdAt: '9시간 전', creationMode: 'template' },
  { id: 'g12', templateId: 'dramatic-meeting', title: '우리 부모님 첫만남 재현', views: 4200, likes: 287, createdAt: '2일 전', creationMode: 'template' },
];
