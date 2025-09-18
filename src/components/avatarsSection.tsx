'use client'
import { ClothingOption } from '@/lib/clothing'
import Image from 'next/image'
import { useState } from 'react'
import styled from 'styled-components'

interface Props {
  clothingOptions: ClothingOption[]
  selectedClothing: string
  onClothingSelect: (name: string) => void
}

export default function AvatarsSection({
  clothingOptions,
  selectedClothing,
  onClothingSelect,
}: Props) {
  return (
    <AvatarsSectionContainer>
      <ScrollView>
        {clothingOptions.map((option) => (
          <Card
            key={option.id}
            $isSelected={selectedClothing === option.name}
            onClick={() => onClothingSelect(option.name)}
          >
            {option.image ? (
              <ImageWithLoading
                src={option.image}
                alt={option.name}
                isSelected={selectedClothing === option.name}
              />
            ) : (
              <Placeholder />
            )}
            <Label>{option.name}</Label>
          </Card>
        ))}
      </ScrollView>
    </AvatarsSectionContainer>
  )
}

function ImageWithLoading({
  src,
  alt,
  isSelected,
}: {
  src: string
  alt: string
  isSelected: boolean
}) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
    console.log(`Failed to load image: ${src}`)
  }

  if (hasError) {
    return <Placeholder />
  }

  return (
    <ImageContainer $isSelected={isSelected}>
      {isLoading && <ImageSkeleton />}
      <Image
        src={src}
        alt={alt}
        width={240}
        height={380}
        style={{
          objectFit: 'contain',
          borderRadius: '12px',
          width: '100%',
          height: '100%',
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.3s ease',
        }}
        onLoad={handleLoad}
        onError={handleError}
        priority={false}
      />
    </ImageContainer>
  )
}

const AvatarsSectionContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  padding: 10px 20px 30px;

  /* 스크롤바 숨기기 (크로스브라우저) */
  -ms-overflow-style: none; /* IE, Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari */
  }
  -webkit-overflow-scrolling: touch;
`

const ScrollView = styled.div`
  display: flex;
  gap: 36px;
  width: max-content;
  margin: 0 auto; /* centers when not overflowing */
  align-items: flex-start;
`

const ImageContainer = styled.div<{ $isSelected: boolean }>`
  width: 240px;
  height: 380px;
  border-radius: 12px;
  border: ${(props) =>
    props.$isSelected ? '3px solid #007bff' : '2px solid #ddd'};
  margin-bottom: 12px;
  overflow: hidden;
  position: relative;
  background: #f8f9fa;
`

const ImageSkeleton = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 2s infinite;
  border-radius: 12px;

  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
`

const Placeholder = styled.div`
  width: 240px; /* larger image box */
  height: 380px; /* larger image box */
  border-radius: 12px;
  background: #f5f5f5;
  border: 2px solid #ddd;
  margin-bottom: 12px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 64px;
    height: 64px;
    background: #d0d0d0;
    border-radius: 8px;
  }
`

const Label = styled.div`
  font-size: 1.1rem; /* larger text */
  font-weight: 600;
  color: #333;
  text-align: center;
`

const Card = styled.div<{ $isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 150px; /* larger card */
  cursor: pointer;
  user-select: none;

  ${(props) =>
    props.$isSelected &&
    `
    ${Placeholder} {
      border: 3px solid #007bff;
      background: #e3f2fd;
    }
    ${Label} {
      color: #007bff;
      font-weight: 700;
    }
  `}
`
