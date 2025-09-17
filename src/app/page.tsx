"use client";

import styled from "styled-components";

export default function Home() {
  const day = "20일";
  const location = "동작구";
  const clothingType = "긴팔";

  return (
    <Container>
      {/* 메인 제목 영역 */}
      <HeaderSection>
        <MainTitle>
          오늘 <ClothingBox>긴팔</ClothingBox> 입어도 될까?
        </MainTitle>
      </HeaderSection>

      {/* 입력 영역 */}
      <InputSection>
        <InputGroup>
          <InputButton>{day}</InputButton>
          <InputButton>{location}</InputButton>
          <span>에서</span>
          <InputButton>{clothingType}</InputButton>
          <span>가능?</span>
        </InputGroup>
      </InputSection>

      {/* 확인 버튼 */}
      <CheckButtonSection>
        <CheckButton>확인하기</CheckButton>
      </CheckButtonSection>

      {/* 결과 영역 */}
      <ResultSection>
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
          <ResultMessage>쌉가능입니다.</ResultMessage>
        </WeatherInfo>
      </ResultSection>
    </Container>
  );
}

const Container = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-top: 60px;
  margin-bottom: 40px;
`;

const MainTitle = styled.h1`
  font-size: 4rem;
  font-weight: 900;
  color: #000;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
`;

const ClothingBox = styled.span`
  background: #000;
  color: white;
  padding: 10px 30px;
  border-radius: 8px;
  font-weight: 900;
`;

const InputSection = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 60px;
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 1.5rem;
  font-weight: 600;
  
  span {
    color: #333;
  }
`;

const InputButton = styled.button`
  background: white;
  border: 3px solid #000;
  border-radius: 8px;
  padding: 8px 20px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  
  &:hover {
    background: #f0f0f0;
  }
`;

const CheckButtonSection = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
`;

const CheckButton = styled.button`
  background: #007bff;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 15px 40px;
  font-size: 1.3rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #0056b3;
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const ResultSection = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  flex-wrap: wrap;
  gap: 40px;
`;

const WeatherInfo = styled.div`
  text-align: center;
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  min-width: 300px;
`;

const RecommendationText = styled.div<{color: string}>`
  font-size: 2.5rem;
  font-weight: 900;
  color: ${props => props.color};
  margin-bottom: 20px;
`;

const WeatherDetails = styled.div`
  margin-bottom: 20px;
`;

const WeatherRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  font-size: 1.1rem;
  
  span {
    color: #333;
  }
`;

const ResultMessage = styled.div`
  font-size: 1.3rem;
  font-weight: 600;
  color: #000;
  margin-top: 15px;
`;