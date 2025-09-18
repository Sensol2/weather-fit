export interface ClothingOption {
  id: number
  name: string
  min_temp: number // inclusive
  max_temp: number // inclusive
  image?: string // optional image path
}

export const clothingOptions: ClothingOption[] = [
  {
    id: 1,
    name: '긴팔',
    min_temp: 20,
    max_temp: 22,
    image: '/avatars/긴팔.png',
  },
  {
    id: 2,
    name: '반팔',
    min_temp: 23,
    max_temp: 28,
    image: '/avatars/반팔.png',
  },
  {
    id: 3,
    name: '돕바',
    min_temp: -5,
    max_temp: 4,
    image: '/avatars/돕바.png',
  },
  {
    id: 4,
    name: '과잠',
    min_temp: 5,
    max_temp: 11,
    image: '/avatars/과잠.png',
  },
  {
    id: 5,
    name: '숏패딩',
    min_temp: -5,
    max_temp: 4,
    image: '/avatars/숏패딩.png',
  },
  { id: 6, name: '코트', min_temp: 5, max_temp: 8, image: '/avatars/코트.png' },
  {
    id: 7,
    name: '민소매',
    min_temp: 28,
    max_temp: 50,
    image: '/avatars/민소매.png',
  },
  { id: 8, name: '후드티', min_temp: 5, max_temp: 11 },
  { id: 9, name: '원피스', min_temp: 23, max_temp: 50 },
  { id: 10, name: '얇은 셔츠', min_temp: 23, max_temp: 27 },
  { id: 11, name: '면바지', min_temp: 20, max_temp: 27 },
  { id: 12, name: '얇은 가디건', min_temp: 20, max_temp: 22 },
  { id: 13, name: '맨투맨', min_temp: 17, max_temp: 19 },
  { id: 14, name: '니트', min_temp: 12, max_temp: 19 },
  { id: 15, name: '자켓', min_temp: 12, max_temp: 16 },
  { id: 16, name: '스타킹', min_temp: 12, max_temp: 16 },
  { id: 17, name: '트렌치코트', min_temp: 12, max_temp: 16 },
  { id: 18, name: '가죽자켓', min_temp: 5, max_temp: 8 },
  { id: 19, name: '목도리', min_temp: -5, max_temp: 4 },
  { id: 20, name: '두꺼운 코트', min_temp: -5, max_temp: 4 },
  { id: 21, name: '기모제품', min_temp: -5, max_temp: 4 },
]
