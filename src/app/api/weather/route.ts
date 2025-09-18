import { NextResponse } from 'next/server';
import { getCityByKo } from '@/lib/locations';

export async function GET(req: Request) {
  const apiKey = process.env.OPEN_WEATHER_API_KEY;
  const { searchParams } = new URL(req.url);
  const requested = searchParams.get('city') || "Seoul";
  const mapped = getCityByKo(requested);
  const city = mapped ? mapped.en : requested;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  try {
    const res = await fetch(url);
    
    if (!res.ok) {
      throw new Error("Failed to fetch weather data");
    }
    
    const data = await res.json();
    console.log("Weather API Response:", data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Weather API Error:", error);
    return NextResponse.json({ error: 'Failed to fetch weather data' }, { status: 500 });
  }
}