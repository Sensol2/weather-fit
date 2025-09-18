'use client'
import { ClothingOption, clothingOptions } from '@/lib/clothing'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

interface WeatherData {
  main: {
    temp_min: number
    temp_max: number
    feels_like: number
  }
  wind: {
    speed: number
  }
}

interface Props {
  city: string
  clothingType: string
}

export default function ResultSection({ city, clothingType }: Props) {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const resultRef = useRef<HTMLDivElement>(null)

  const getStatusImage = (status: string) => {
    switch (status) {
      case 'perfect':
        return '/resultBGs/가능.png'
      case 'cold_morning':
        return '/resultBGs/싸늘.jpg'
      case 'hot_afternoon':
        return '/resultBGs/적당히 더움.jpg'
      case 'too_hot':
        return '/resultBGs/매우더움.jpg'
      case 'too_cold':
        return '/resultBGs/한파.png'
      default:
        return '/resultBGs/가능.png'
    }
  }
  const getRecommendation = (
    todayMin: number,
    todayMax: number,
    clothing: ClothingOption,
  ) => {
    const { min_temp, max_temp } = clothing
    const buffer = 4 // 허용 오차 (3도 정도)

    // 1. 완벽히 범위 안
    if (todayMin >= min_temp && todayMax <= max_temp) {
      return {
        status: 'perfect',
        color: '#4CAF50',
        title: '가능',
        message: '쌉가능',
      }
    }

    // 2. 범위에서 약간 벗어남 (buffer 이내)
    if (
      todayMin < min_temp &&
      todayMin >= min_temp - buffer &&
      todayMax <= max_temp
    ) {
      return {
        status: 'cold_morning',
        color: '#FF9800',
        title: '살짝 가능',
        message: '살짝 가능. 해가 지면 추울 수 있습니다.',
      }
    }

    if (
      todayMax > max_temp &&
      todayMax <= max_temp + buffer &&
      todayMin >= min_temp
    ) {
      return {
        status: 'hot_afternoon',
        color: '#FF9800',
        title: '살짝 가능',
        message: '살짝 가능. 낮에는 살짝 더울 수 있습니다.',
      }
    }

    if (
      todayMin < min_temp &&
      todayMin >= min_temp - buffer &&
      todayMax > max_temp &&
      todayMax <= max_temp + buffer
    ) {
      return {
        status: 'both_off',
        color: '#FF9800',
        title: '살짝 가능',
        message: '살짝 가능. 아침/저녁엔 춥고 낮에는 더울 수 있습니다.',
      }
    }

    // 3. 완전히 벗어남 (buffer 이상 차이)
    if (todayMax <= min_temp - buffer) {
      return {
        status: 'too_cold',
        color: '#ff6b6b',
        title: '쌉불가능',
        message: '오늘은 너무 추워서 안 맞습니다.',
      }
    }

    if (todayMin >= max_temp + buffer) {
      return {
        status: 'too_hot',
        color: '#ff6b6b',
        title: '쌉불가능',
        message: '오늘은 너무 더워서 안 맞습니다.',
      }
    }

    // 4. 예외 처리
    return {
      status: 'unknown',
      color: '#999',
      title: '알 수 없음',
      message: '날씨 정보를 확인할 수 없습니다.',
    }
  }

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `/api/weather?city=${encodeURIComponent(city)}`,
        )
        if (!response.ok) throw new Error('Failed to fetch')
        const data = await response.json()
        setWeatherData(data)
      } catch (err) {
        console.error('Weather fetch error:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    setLoading(true)
    fetchWeatherData()
  }, [city])

  useEffect(() => {
    if (!loading && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [loading])

  if (loading) {
    return (
      <ResultContainer ref={resultRef}>
        <WeatherInfo>
          <RecommendationText color="#999">로딩중...</RecommendationText>
        </WeatherInfo>
      </ResultContainer>
    )
  }

  if (error || !weatherData) {
    return (
      <ResultContainer ref={resultRef}>
        <WeatherInfo>
          <RecommendationText color="#ff6b6b">불가능</RecommendationText>
          <WeatherDetails>
            <WeatherRow>
              <span>최저기온: -도</span>
              <span>최고기온: -도</span>
            </WeatherRow>
          </WeatherDetails>
          <ResultMessage>날씨 정보를 불러올 수 없습니다.</ResultMessage>
        </WeatherInfo>
      </ResultContainer>
    )
  }

  const selectedClothing = clothingOptions.find(
    (option) => option.name === clothingType,
  )

  if (!selectedClothing) {
    return (
      <ResultContainer ref={resultRef}>
        <WeatherInfo>
          <RecommendationText color="#ff6b6b">오류</RecommendationText>
          <ResultMessage>선택한 의류 정보를 찾을 수 없습니다.</ResultMessage>
        </WeatherInfo>
      </ResultContainer>
    )
  }

  const recommendation = getRecommendation(
    Math.round(weatherData.main.temp_min),
    Math.round(weatherData.main.temp_max),
    selectedClothing,
  )

  const statusImage = getStatusImage(recommendation.status)

  return (
    <ResultContainer ref={resultRef}>
      <WeatherInfo>
        <StatusImageContainer>
          <Image
            src={statusImage}
            alt={`Weather status: ${recommendation.status}`}
            width={600}
            height={450}
            style={{
              objectFit: 'cover',
              borderRadius: '12px',
            }}
          />
        </StatusImageContainer>
        <RecommendationText color={recommendation.color}>
          {recommendation.title}
        </RecommendationText>
        <WeatherDetails>
          <WeatherRow>
            <span>최저기온: {Math.round(weatherData.main.temp_min)}도</span>
            <span>최고기온: {Math.round(weatherData.main.temp_max)}도</span>
          </WeatherRow>
          <WeatherRow>
            <span>체감온도: {Math.round(weatherData.main.feels_like)}도</span>
            <span>풍속: {weatherData.wind.speed}m/s</span>
          </WeatherRow>
          <WeatherRow>
            <span>
              {clothingType} 적정온도: {selectedClothing.min_temp}~
              {selectedClothing.max_temp}도
            </span>
            <span>상태: {recommendation.status}</span>
          </WeatherRow>
        </WeatherDetails>
        <ResultMessage>{recommendation.message}</ResultMessage>
      </WeatherInfo>
    </ResultContainer>
  )
}

const WeatherInfo = styled.div`
  text-align: center;
  background: white;
  padding: 60px 40px;
  border-radius: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
  width: 100%;
  max-width: 1000px;
  min-height: 500px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const StatusImageContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
`

const RecommendationText = styled.div<{ color: string }>`
  font-size: 3rem;
  font-weight: 900;
  color: ${(props) => props.color};
  margin-bottom: 24px;
`

const WeatherDetails = styled.div`
  margin-bottom: 24px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 16px;
  border: 1px solid #e0e0e0;
`

const WeatherRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 12px 0;
  font-size: 1.2rem;

  span {
    color: #333;
    font-weight: 500;
    padding: 6px 12px;
    background: white;
    border-radius: 8px;
    border: 1px solid #e0e0e0;
  }
`

const ResultMessage = styled.div`
  font-size: 1.4rem;
  font-weight: 700;
  color: #222;
  margin-top: 20px;
  padding: 12px 24px;
  background: #f8f9fa;
  border-radius: 12px;
  border: 1px solid #e0e0e0;
`

const ResultContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  min-height: 600px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`
