"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";

import RobotLoader from "@/components/ui/RobotLoader";

// The chat window and everything behind it: only needed once the page is idle, or the robot is clicked
const Chatbot = dynamic(() => import("@/components/ui/Chatbot"), { ssr: false });

// Pure CSS robot (RobotLoader): it is part of the page's HTML and styles, so it shows and moves with the page
const RobotButton = ({ onClick, label }: { onClick: () => void; label: string }) => {
  return (
    <>
      <style>{`
        @keyframes dhBubble { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
        .dh-bubble-float { animation: dhBubble 2.8s ease-in-out infinite; }
      `}</style>
      <button
        type="button"
        onClick={onClick}
        className="group fixed bottom-1 right-1 sm:bottom-3 sm:right-5 z-50 flex flex-col items-center cursor-pointer"
        aria-label="May I help you? Open chat"
      >
        <span className="dh-bubble-float relative z-10 -mb-2 whitespace-nowrap rounded-[14px] border border-[#d5deee] bg-white px-4 py-2 text-[14px] sm:text-[15px] font-bold tracking-[-0.01em] text-[#0A2B5E] shadow-[0_6px_16px_rgba(10,43,94,0.15)]">
          {label}
          <span className="absolute left-1/2 -bottom-[7px] h-3 w-3 -translate-x-1/2 rotate-45 border-b border-r border-[#d5deee] bg-white" />
        </span>
        {/* Animated CSS robot (16 × 21 of --rb-size) */}
        <RobotLoader className="[--rb-size:5.4px] sm:[--rb-size:6.4px] transition-transform duration-300 group-hover:scale-105" />
      </button>
    </>
  );
};

/* "May I help you?" robot (bottom right) that opens the chat. It is sent with the page, so it doesn't wait for
   the chat's code; that loads afterwards, without the visitor noticing. */
const ChatbotLauncher = ({ loadChat }: { loadChat: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [clickedEarly, setClickedEarly] = useState(false);
  const openChat = useRef<(() => void) | null>(null);

  const onRobotClick = () => {
    if (openChat.current) openChat.current();
    else setClickedEarly(true);
  };

  return (
    <>
      {!isOpen && <RobotButton onClick={onRobotClick} label={clickedEarly && !openChat.current ? "Opening…" : "May I help you?"} />}
      {(loadChat || clickedEarly) && <Chatbot isOpen={isOpen} setIsOpen={setIsOpen} openRef={openChat} openAtOnce={clickedEarly} />}
    </>
  );
};

export default ChatbotLauncher;
