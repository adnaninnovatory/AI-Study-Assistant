import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import ChatEmptyState from "../ChatEmptyState";
import TypingIndicator from "../TypingIndicator";

const ChatPanel = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [streamingText, setStreamingText] = useState("");

  // ✅ SCROLL REF
  const scrollRef = useRef(null);

  // 🚀 FIXED SCROLL (ChatGPT style reliable)
  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    });
  };

  // ✅ AUTO SCROLL ON UPDATES
  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingText]);

  // 🚀 STREAMING SIMULATION
  const simulateStream = (text) => {
    let i = 0;
    let output = "";

    const interval = setInterval(() => {
      output += text[i];
      i++;

      setStreamingText(output);

      if (i === text.length) {
        clearInterval(interval);

        setMessages((prev) => [
          ...prev,
          { role: "ai", text: output },
        ]);

        setStreamingText("");
        setIsTyping(false);
      }
    }, 25);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    if (isTyping) return;

    const userMsg = { role: "user", text: input };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setIsTyping(true);
    setStreamingText("");

    const fakeResponse =
      "Machine learning is a subset of artificial intelligence that enables systems to learn patterns from data without explicit programming.";

    simulateStream(fakeResponse);
  };

  return (
    <div className="flex flex-col h-[70vh]">

      {/* MESSAGES AREA */}
      <ScrollArea className="flex-1 min-h-0 p-3">
        
        {/* ONLY CHANGE IS HERE (ref kept same usage) */}
        <div
          ref={scrollRef}
          className="space-y-3 pr-2 h-full overflow-y-auto"
        >

          {messages.length === 0 && !isTyping ? (
            <ChatEmptyState />
          ) : (
            <>
              {/* CHAT HISTORY */}
              <AnimatePresence>
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`p-3 rounded-lg max-w-[70%] ${
                      msg.role === "user"
                        ? "bg-indigo-100 ml-auto text-right"
                        : "bg-gray-100"
                    }`}
                  >
                    {msg.text}
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* LIVE STREAMING */}
              {isTyping && streamingText && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-3 bg-gray-100 rounded-lg max-w-[70%]"
                >
                  {streamingText}
                </motion.div>
              )}

              {/* TYPING INDICATOR */}
              {isTyping && !streamingText && <TypingIndicator />}
            </>
          )}

        </div>
      </ScrollArea>

      {/* INPUT (UNCHANGED — DO NOT TOUCH DESIGN) */}
      <div className="flex gap-2 p-3 border-t bg-white sticky bottom-0">

        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask your document..."
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />

        <Button
          onClick={handleSend}
          className="whitespace-nowrap cursor-pointer px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Send
        </Button>

      </div>

    </div>
  );
};

export default ChatPanel;