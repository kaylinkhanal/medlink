"use client";

import { useState, useEffect } from "react";

interface DigitalClockProps {
    dimColor: string;
    mutedColor: string;
}

export default function DigitalClock({ dimColor, mutedColor }: DigitalClockProps) {
    const [time, setTime] = useState<Date | null>(null);

    useEffect(() => {
        setTime(new Date());
        const t = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(t);
    }, []);

    if (!time) return null;

    return (
        <p style={{ fontSize: 11, color: dimColor, fontWeight: 500, marginTop: 2 }}>
            {time.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
            <span style={{ marginLeft: 10, fontFamily: "monospace", color: mutedColor }}>{time.toLocaleTimeString()}</span>
        </p>
    );
}
