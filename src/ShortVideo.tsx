import { AbsoluteFill, Img, interpolate, Sequence, useCurrentFrame, useVideoConfig, spring } from 'remotion';
import React from 'react';
import './index.css';
import character1 from './assets/character1.jpg';
import character2 from './assets/character2.jpg';

// Helper for continuous breathing animation
const BreathingCharacter: React.FC<{ src: string; className?: string }> = ({ src, className }) => {
    const frame = useCurrentFrame();
    // Gentle up/down movement
    const y = Math.sin(frame / 15) * 10;
    // Gentle scaling
    const scale = 1 + Math.sin(frame / 20) * 0.02;

    return (
        <div style={{ transform: `translateY(${y}px) scale(${scale})` }} className={className}>
            <Img src={src} className="w-full h-full object-contain drop-shadow-xl" />
        </div>
    );
};

const Scene1: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Pop in text
    const textScale = spring({
        frame,
        fps,
        config: { damping: 10, stiffness: 100 }
    });

    return (
        <AbsoluteFill className="bg-orange-100 flex items-center justify-center p-10 overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: 'radial-gradient(#f97316 2px, transparent 2px)',
                    backgroundSize: '40px 40px'
                }}
            />

            <div className="text-center absolute top-20 w-full z-10" style={{ transform: `scale(${textScale})` }}>
                <div className="bg-white/90 inline-block p-8 rounded-full border-4 border-dashed border-orange-300 shadow-lg">
                    <h1 className="text-6xl font-black text-gray-700 leading-tight">
                        🍳 レンジフード<br />
                        <span className="text-orange-500 text-7xl">最後に掃除したの</span><br />
                        いつですか？
                    </h1>
                </div>
            </div>

            {/* Character with breathing animation */}
            <div className="absolute -bottom-10 w-full flex justify-center">
                <BreathingCharacter src={character1} className="h-[1300px]" />
            </div>

            <div className="absolute top-1/2 left-20 right-20 bg-white/95 p-8 rounded-[3rem] shadow-xl border-8 border-orange-200 rotation-3 z-20"
                style={{ opacity: interpolate(frame, [25, 35], [0, 1]) }}>
                <p className="text-6xl font-bold text-orange-600 text-center flex items-center justify-center gap-4">
                    <span>💦</span>
                    正直...面倒ですよね？
                    <span>😓</span>
                </p>
            </div>
        </AbsoluteFill>
    );
};

const Scene2: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const items = [
        "✨ フィルターなしで拭くだけ",
        "👂 運転音、とっても静か",
        "🔥 コンロ連動で自動ON/OFF",
        "🗓️ 10年間ファン掃除不要!?"
    ];

    return (
        <AbsoluteFill className="bg-sky-100 flex flex-col items-center justify-center p-8 overflow-hidden">
            <div className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: 'linear-gradient(45deg, #3b82f6 25%, transparent 25%, transparent 50%, #3b82f6 50%, #3b82f6 75%, transparent 75%, transparent)',
                    backgroundSize: '60px 60px'
                }}
            />

            <h2 className="text-7xl font-black text-blue-600 mb-10 text-center bg-white px-10 py-4 rounded-full shadow-md z-10">
                最新はここがすごい！🎉
            </h2>

            <div className="flex flex-col gap-6 w-full max-w-4xl z-10">
                {items.map((item, i) => {
                    const delay = i * 10;
                    const spr = spring({
                        frame: frame - delay,
                        fps,
                        config: { damping: 12, stiffness: 200 }
                    });

                    return (
                        <div key={i} style={{ transform: `scale(${spr})` }}
                            className="bg-white p-7 rounded-2xl shadow-lg border-b-8 border-sky-400 flex items-center">
                            <p className="text-5xl font-bold text-gray-700">{item}</p>
                        </div>
                    );
                })}
            </div>
        </AbsoluteFill>
    );
};

const Scene3: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Gentle sway for the main container
    const rotate = Math.sin(frame / 30) * 2;

    // Character sway
    const charRotate = Math.sin(frame / 20) * 3;

    return (
        <AbsoluteFill className="bg-green-100 flex items-center justify-center p-10 overflow-hidden">
            {/* Cute circles background */}
            <div className="absolute inset-0 opacity-10">
                {[...Array(10)].map((_, i) => (
                    <div key={i} className="absolute rounded-full bg-green-400"
                        style={{
                            width: 200, height: 200,
                            left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`
                        }}
                    />
                ))}
            </div>

            <div className="w-full h-full flex flex-col items-center pt-20 relative z-10">
                <div style={{ transform: `rotate(${rotate}deg)` }} className="mb-10">
                    <div className="bg-yellow-400 text-gray-800 px-10 py-6 rounded-full shadow-xl border-4 border-white">
                        <h2 className="text-6xl font-black">🔍 点検だけでもOK!</h2>
                    </div>
                </div>

                <div className="bg-white/95 p-10 rounded-[3rem] shadow-2xl border-8 border-green-200 text-center w-full max-w-[900px]">
                    <p className="text-4xl font-bold text-gray-600 mb-4 bg-gray-100 inline-block px-4 py-2 rounded-lg">
                        キッチンまるごとじゃなくてOK
                    </p>
                    <p className="text-7xl font-black text-green-600 mb-8 mt-2">
                        交換はたった半日！
                    </p>
                    <div className="bg-orange-100 p-6 rounded-2xl">
                        <p className="text-5xl font-bold text-orange-700">お気軽にご相談ください😊</p>
                        <p className="text-3xl text-gray-600 mt-4 font-bold">住まいるでんき館きょうしん</p>
                    </div>
                </div>
            </div>

            <div className="absolute -bottom-20 -right-20">
                <div style={{ transform: `rotate(${charRotate}deg)` }}>
                    <BreathingCharacter src={character2} className="h-[900px]" />
                </div>
            </div>
        </AbsoluteFill>
    );
};

export const ShortVideo: React.FC = () => {
    return (
        <AbsoluteFill className="bg-white">
            <Sequence from={0} durationInFrames={100}>
                <Scene1 />
            </Sequence>
            <Sequence from={100} durationInFrames={110}>
                <Scene2 />
            </Sequence>
            <Sequence from={210} durationInFrames={90}>
                <Scene3 />
            </Sequence>
        </AbsoluteFill>
    );
};
