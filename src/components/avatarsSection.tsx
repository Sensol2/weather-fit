'use client';
import styled from 'styled-components';

interface ClothingOption {
  id: number;
  name: string;
}

interface Props {
  clothingOptions: ClothingOption[];
  selectedClothing: string;
  onClothingSelect: (name: string) => void;
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
            <Placeholder />
            <Label>{option.name}</Label>
          </Card>
        ))}
      </ScrollView>
    </AvatarsSectionContainer>
  );
}


const AvatarsSectionContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  padding: 10px 20px 30px;

  /* 스크롤바 숨기기 (크로스브라우저) */
  -ms-overflow-style: none;  /* IE, Edge */
  scrollbar-width: none;     /* Firefox */
  &::-webkit-scrollbar {
    display: none;           /* Chrome, Safari */
  }
  -webkit-overflow-scrolling: touch;
`;

const ScrollView = styled.div`
  display: flex;
  gap: 36px;
  width: max-content;
  margin: 0 auto; /* centers when not overflowing */
  align-items: flex-start;
`;

const Card = styled.div<{ $isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 150px; /* larger card */
  cursor: pointer;
  user-select: none;

  ${props => props.$isSelected && `
    ${Placeholder} {
      border: 3px solid #007bff;
      background: #e3f2fd;
    }
    ${Label} {
      color: #007bff;
      font-weight: 700;
    }
  `}
`;

const Placeholder = styled.div`
  width: 240px;   /* larger image box */
  height: 380px;  /* larger image box */
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
`;

const Label = styled.div`
  font-size: 1.1rem; /* larger text */
  font-weight: 600;
  color: #333;
  text-align: center;
`;