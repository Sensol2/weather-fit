'use client';
import styled from 'styled-components';
import { CITIES, findNearestCity } from '@/lib/locations';
import { useEffect, useState } from 'react';

interface Props {
  selectedCityKo: string;
  onCityChange: (ko: string) => void;
}

export default function LocationsSection({ selectedCityKo, onCityChange }: Props) {
  const [locating, setLocating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSecure, setIsSecure] = useState(false);

  useEffect(() => {
    // localhost는 secure context로 취급됨
    const secure = typeof window !== 'undefined'
      ? (window.isSecureContext || location.hostname === 'localhost' || location.hostname === '127.0.0.1')
      : false;
    setIsSecure(secure);
  }, []);

  // 최초 마운트 시 자동으로 현재 위치를 기반으로 도시를 설정
  useEffect(() => {
    if (!isSecure) return; // 보안 컨텍스트가 아니면 스킵
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const nearest = findNearestCity(latitude, longitude);
        onCityChange(nearest.ko);
        setLocating(false);
      },
      (err) => {
        // 실패해도 셀렉트로 선택 가능하므로 에러만 기록
        setError('위치 정보를 가져오지 못했습니다. 브라우저 권한을 확인하세요.');
        setLocating(false);
        console.error(err);
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
    );
  }, [isSecure, onCityChange]);

  return (
    <Select value={selectedCityKo} onChange={(e) => onCityChange(e.target.value)} disabled={locating}>
      {CITIES.map((c) => (
        <option key={c.id} value={c.ko}>{c.ko}</option>
      ))}
    </Select>
  );
}

const Select = styled.select`
  background: white;
  border: 3px solid #000;
  border-radius: 8px;
  padding: 8px 20px;
  font-size: 1.2rem;
  font-weight: 600;
`;