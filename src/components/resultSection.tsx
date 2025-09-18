'use client';
import styled from "styled-components";
import { useEffect, useState, useRef } from "react";

interface WeatherData {
  main: {
    temp_min: number;
    temp_max: number;
    feels_like: number;
  };
  wind: {
    speed: number;
  };
}

export default function ResultSection({ city }: { city: string }) {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setWeatherData(data);
      } catch (err) {
        console.error("Weather fetch error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    setLoading(true);
    fetchWeatherData();
  }, [city]);

  // Auto-scroll to result section when data is loaded
  useEffect(() => {
    if (!loading && resultRef.current) {
      resultRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  }, [loading]);

  if (loading) {
    return (
      <ResultContainer ref={resultRef}>
        <WeatherInfo>
          <RecommendationText color="#999">로딩중...</RecommendationText>
        </WeatherInfo>
      </ResultContainer>
    );
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
            <WeatherRow>
              <span>체감온도: -도</span>
              <span>풍속: -m/s</span>
            </WeatherRow>
          </WeatherDetails>
          <ResultMessage>날씨 정보를 불러올 수 없습니다.</ResultMessage>
        </WeatherInfo>
      </ResultContainer>
    );
  }

  return (
    <ResultContainer ref={resultRef}>
      <WeatherInfo>
        <RecommendationText color="#4CAF50">가능</RecommendationText>
        <WeatherDetails>
          <WeatherRow>
            <span>최저기온: {Math.round(weatherData.main.temp_min)}도</span>
            <span>최고기온: {Math.round(weatherData.main.temp_max)}도</span>
          </WeatherRow>
          <WeatherRow>
            <span>체감온도: {Math.round(weatherData.main.feels_like)}도</span>
            <span>풍속: {weatherData.wind.speed}m/s</span>
          </WeatherRow>
        </WeatherDetails>
        <ResultMessage>쌉가능입니다.</ResultMessage>
      </WeatherInfo>
    </ResultContainer>
  );
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
`;

const RecommendationText = styled.div<{color: string}>`
  font-size: 3rem;
  font-weight: 900;
  color: ${props => props.color};
  margin-bottom: 24px;
`;

const WeatherDetails = styled.div`
  margin-bottom: 24px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 16px;
  border: 1px solid #e0e0e0;
`;

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
`;

const ResultMessage = styled.div`
  font-size: 1.4rem;
  font-weight: 700;
  color: #222;
  margin-top: 20px;
  padding: 12px 24px;
  background: #f8f9fa;
  border-radius: 12px;
  border: 1px solid #e0e0e0;
`;

// Generous container for content-rich layout (images + text)
const ResultContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  min-height: 600px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;