'use client';
import styled from 'styled-components';

interface Option { id: number; name: string }

interface Props {
  value: string;
  options: Option[];
  onChange: (value: string) => void;
}

export default function ClothingTypeSelect({ value, options, onChange }: Props) {
  return (
    <Select value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map(o => (
        <option key={o.id} value={o.name}>{o.name}</option>
      ))}
    </Select>
  );
}

// Unified style with InputButton and LocationsSection
export const Select = styled.select`
  background: white;
  border: 3px solid #000;
  border-radius: 8px;
  padding: 8px 20px;
  font-size: 1.2rem;
  font-weight: 600;
`;