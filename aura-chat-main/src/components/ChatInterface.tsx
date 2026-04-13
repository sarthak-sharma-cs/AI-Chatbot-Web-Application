import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles, Circle } from 'lucide-react';
import ReactMarkdown from "react-markdown";

interface Message {
  id: number;
  role: 'user' | 'ai';
  content: string;
}

const easing = [0.2, 0.8, 0.2, 1] as const;

const TypingIndicator = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="flex gap-3"
  >
    <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
      <Bot size={14} className="text-primary" />
    </div>
    <div className="px-4 py-3 bg-foreground/[0.03] border border-foreground/[0.05] rounded-[18px] rounded-tl-none flex items-center gap-1.5">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce-dot"
          style={{ animationDelay: `${i * 0.16}s` }}
        />
      ))}
    </div>
  </motion.div>
);

const ChatMessage = ({ msg }: { msg: Message }) => {
  const isUser = msg.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: easing }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`flex gap-3 max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <div
          className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center border ${
            isUser
              ? 'bg-secondary border-foreground/10'
              : 'bg-primary/10 border-primary/20'
          }`}
        >
          {isUser ? <User size={14} /> : <Bot size={14} className="text-primary" />}
        </div>

        <div
          className={`px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap break-words ${
            isUser
              ? 'bg-primary text-primary-foreground rounded-[18px] rounded-tr-none shadow-[0_4px_12px_hsl(var(--glow-primary)/0.3)]'
              : 'bg-foreground/[0.03] border border-foreground/[0.05] rounded-[18px] rounded-tl-none'
          }`}
        >
         <ReactMarkdown>
  {msg.content}
</ReactMarkdown>
        </div>
      </div>
    </motion.div>
  );
};

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, role: 'ai', content: 'System initialized. How can I assist your workflow today?' },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const suggestions = [
    "Summarize my last message and give next steps",
    "Draft an email to my client with a friendly tone",
    "Plan my day with time blocks (no more than 30 mins each)",
    "Turn this into a checklist I can execute",
  ] as const;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now(), role: 'user', content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: 'ai', content: data.reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: 'ai',
          content: 'Connection error. Ensure backend is running on port 5000.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: easing }}
        className="relative w-full max-w-2xl h-[80vh] bg-surface/60 backdrop-blur-md rounded-[24px] flex flex-col overflow-hidden border border-foreground/[0.06] shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_18px_60px_rgba(0,0,0,0.55)]"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-70 bg-[radial-gradient(circle_at_top,rgba(250,89,255,0.24),transparent_55%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,rgba(255,255,255,0.35)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.35)_1px,transparent_1px)] bg-[size:40px_40px]"
        />
        {/* Header */}
        <header className="px-6 py-4 border-b border-foreground/[0.04] flex items-center justify-between bg-surface/50 backdrop-blur-md z-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
              <Bot size={18} className="text-primary" />
            </div>
            <div>
              <h1 className="text-sm font-medium tracking-tight">Nexus AI</h1>
              <div className="flex items-center gap-1.5">
                <Circle size={6} className="fill-emerald-500 text-emerald-500" />
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
                  Online
                </span>
              </div>
            </div>
          </div>
          <Sparkles size={16} className="text-muted-foreground" />
        </header>

        {/* Messages */}
        <div
          ref={scrollRef}
          className="relative z-10 flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide"
          style={{ scrollBehavior: 'smooth' }}
        >
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <ChatMessage key={msg.id} msg={msg} />
            ))}
          </AnimatePresence>
          <AnimatePresence>{isLoading && <TypingIndicator />}</AnimatePresence>
        </div>

        {/* Input */}
        <footer className="relative z-10 p-6 bg-surface/60 backdrop-blur-md border-t border-foreground/[0.04]">
          <form onSubmit={handleSend} className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              placeholder='Command Nexus... (try: "Summarize my last message")'
              className="w-full bg-foreground/[0.03] border border-input rounded-2xl px-5 py-4 pr-14 text-sm text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-muted-foreground disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute right-2 p-2.5 bg-primary hover:bg-primary/90 disabled:bg-secondary disabled:text-muted-foreground text-primary-foreground rounded-xl transition-all shadow-[0_0_15px_hsl(var(--glow-primary)/0.4)] disabled:shadow-none active:scale-95"
            >
              <Send size={18} />
            </button>
          </form>
          <div className="flex flex-wrap gap-2 mt-4">
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                disabled={isLoading}
                onClick={() => setInput(s)}
                className="px-3 py-1.5 rounded-full text-[11px] font-medium border border-foreground/[0.08] bg-foreground/[0.02] hover:bg-foreground/[0.05] disabled:opacity-50 disabled:hover:bg-foreground/[0.02] transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-center mt-4 text-muted-foreground font-medium tracking-wide uppercase">
            Encrypted End-to-End • Nexus v1.0.4
          </p>
        </footer>
      </motion.div>
    </div>
  );
};

export default ChatInterface;
