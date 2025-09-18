'use client'

import AvatarsSection from '@/components/avatarsSection'
import ClothingTypeSelect from '@/components/clothingTypeSelect'
import LocationsSection from '@/components/locationsSection'
import ResultSection from '@/components/resultSection'
import { clothingOptions } from '@/lib/clothing'
import { useState } from 'react'
import styled from 'styled-components'

export default function Home() {
  const [location, setLocation] = useState('서울')
  const [clothingType, setClothingType] = useState('긴팔')
  const [showResult, setShowResult] = useState(false)

  const handleCheckClick = () => {
    setShowResult(true)
  }

  const handleClothingSelect = (selectedClothing: string) => {
    setClothingType(selectedClothing)
    setShowResult(false) // 의류 변경 시 결과 숨기기
  }

  return (
    <Container>
      {/* 메인 제목 영역 */}
      <HeaderSection>
        <MainTitle>
          오늘 <ClothingBox>{clothingType}</ClothingBox> 입어도 될까?
        </MainTitle>
        <SubTitle>애매하다 싶은 옷차림 다 정해드림</SubTitle>
      </HeaderSection>

      {/* 입력 영역 */}
      <InputSection>
        <InputGroup>
          {/* 지역 선택 + 현재 위치 매핑 */}
          <LocationsSection
            selectedCityKo={location}
            onCityChange={setLocation}
          />
          <Span>에서</Span>
          <ClothingTypeSelect
            value={clothingType}
            options={clothingOptions}
            onChange={setClothingType}
          />
          <Span>가능?</Span>
        </InputGroup>
      </InputSection>

      {/* 확인 버튼 */}
      <CheckButtonSection>
        <CheckButton onClick={handleCheckClick}>확인하기</CheckButton>
      </CheckButtonSection>

      {/* 의류 선택 영역 */}
      <AvatarsSection
        clothingOptions={clothingOptions}
        selectedClothing={clothingType}
        onClothingSelect={handleClothingSelect}
      />

      {/* 결과 영역 */}
      {showResult && (
        <>
          <div style={{ height: '40px' }} /> {/* Gap between sections */}
          <ResultSection city={location} clothingType={clothingType} />
        </>
      )}
    </Container>
  )
}

const Container = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
`

const HeaderSection = styled.div`
  text-align: center;
  margin-top: 60px;
  margin-bottom: 40px;
`

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
`

const SubTitle = styled.h5`
  font-size: 1.5rem;
  font-weight: 600;
  color: #555;
  margin: 20px 0 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`

const ClothingBox = styled.span`
  background: #000;
  color: white;
  padding: 10px 30px;
  border-radius: 8px;
  font-weight: 900;
`

const InputSection = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 60px;
`

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 1.5rem;
  font-weight: 600;
`

const Span = styled.span`
  color: #333;
  font-size: 1.2rem;
  font-weight: 600;
`

// InputButton removed; unified selects used instead

const CheckButtonSection = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
`

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
`

// selection styles moved into components/ClothingSelectionSection.tsx
