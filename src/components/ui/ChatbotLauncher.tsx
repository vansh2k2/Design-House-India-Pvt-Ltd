"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { preload } from "react-dom";

// The chat window and everything behind it: only needed once the page is idle, or the robot is clicked
const Chatbot = dynamic(() => import("@/components/ui/Chatbot"), { ssr: false });

// The animation's first frame. Being a plain picture in the page's HTML, the robot shows with the page.
const ROBOT_PICTURE = "/assets/chatbot/robot-first-frame.webp";
const START_MOVING_WITHIN_MS = 1500;

const RobotButton = ({ onClick, label }: { onClick: () => void; label: string }) => {
  preload(ROBOT_PICTURE, { as: "image", fetchPriority: "high" });

  const stage = useRef<HTMLSpanElement>(null);
  const [moving, setMoving] = useState(false);

  useEffect(() => {
    let stopped = false;
    let robot: { destroy: () => void } | null = null;

    const startMoving = () => {
      Promise.all([import("lottie-web/build/player/lottie_light"), import("./robotAnimation.json")])
        .then(([{ default: lottie }, { default: animationData }]) => {
          if (stopped || !stage.current) return;
          const animation = lottie.loadAnimation({ container: stage.current, renderer: "svg", loop: true, autoplay: true, animationData });
          animation.addEventListener("DOMLoaded", () => setMoving(true));
          robot = animation;
        })
        .catch(() => {}); // the picture stays: a still robot that still opens the chat
    };

    if ("requestIdleCallback" in window) requestIdleCallback(startMoving, { timeout: START_MOVING_WITHIN_MS });
    else setTimeout(startMoving, 500);

    return () => {
      stopped = true;
      robot?.destroy();
    };
  }, []);

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
        <span className="relative block h-[110px] w-[110px] sm:h-[130px] sm:w-[130px] transition-transform duration-300 group-hover:scale-105">
          {/* eslint-disable-next-line @next/next/no-img-element -- already small: the image optimizer would only delay it */}
          {!moving && <img src={ROBOT_PICTURE} alt="" width={260} height={260} className="absolute inset-0 h-full w-full" />}
          <span ref={stage} className="absolute inset-0 block" />
        </span>
      </button>
    </>
  );
};

/* "May I help you?" robot (bottom right) that opens the chat. It is sent with the page, so it doesn't wait for
   the chat's code or the animation player; both load afterwards, without the visitor noticing. */
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
