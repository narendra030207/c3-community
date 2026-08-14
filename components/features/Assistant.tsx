'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

const FAQ_RESPONSES: Record<string, string> = {
  events: "We organize various events throughout the year including hackathons, seminars, and tech talks. You can check the Gallery and Notices pages for past and upcoming events.",
  competitions: "C3 hosts coding competitions like Algo Battle and Debug the Code. Results are posted on the Results page.",
  leaderboard: "The leaderboard tracks top performers across our competitions. Check out the Results page to see current standings.",
  register: "To register for upcoming events, watch out for announcements on our Notices page. Some events may require you to have an account, so make sure you register on the website!",
  team: "The C3 Community is run by dedicated Faculty Mentors, Core Team members, and Volunteers. You can meet them on the Team page.",
  contact: "You can reach out to us via the Contact page, or email us at c3community@techuniversity.edu.",
  certificate: "Certificates for participation and winning are usually distributed within 2 weeks after an event concludes.",
  results: "All competition results are officially published on the Results page.",
  achievement: "We proudly display our members' achievements on the Notices and Results pages.",
  prizes: "Prizes vary by competition, ranging from cash rewards, swags, and certificates. Check specific event notices for details."
};

const DEFAULT_RESPONSE = "I'm the C3 Assistant! I can help you with events, competitions, leaderboard, certificates, and more. What would you like to know?";

export default function Assistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 'initial-msg', role: 'assistant', content: DEFAULT_RESPONSE }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simple FAQ logic
    setTimeout(() => {
      const lowerInput = userMsg.content.toLowerCase();
      let matchedResponse = DEFAULT_RESPONSE;
      
      for (const [key, response] of Object.entries(FAQ_RESPONSES)) {
        if (lowerInput.includes(key)) {
          matchedResponse = response;
          break;
        }
      }

      const botMsg: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: matchedResponse };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 flex items-center justify-center text-white shadow-[0_0_20px_rgba(59,130,246,0.5)] z-40 transition-all",
          isOpen ? "opacity-0 pointer-events-none scale-0" : "opacity-100"
        )}
        aria-label="Open C3 Assistant"
      >
        <MessageSquare className="w-6 h-6" />
        <span className="absolute w-full h-full rounded-full border-2 border-blue-400 animate-ping opacity-20"></span>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-[400px] h-[500px] max-h-[80vh] bg-[#0f1526]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-[#0a0e1a]/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                  <Bot className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">C3 Assistant</h3>
                  <p className="text-green-400 text-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block"></span>
                    Online
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={msg.id} 
                  className={cn(
                    "flex gap-3 max-w-[85%]",
                    msg.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
                  )}
                >
                  <div className={cn(
                    "w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-1",
                    msg.role === 'user' ? "bg-violet-500/20 text-violet-300" : "bg-blue-500/20 text-blue-300"
                  )}>
                    {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className={cn(
                    "p-3 rounded-2xl text-sm leading-relaxed",
                    msg.role === 'user' 
                      ? "bg-gradient-to-br from-violet-600 to-blue-600 text-white rounded-tr-sm" 
                      : "bg-white/10 text-slate-200 border border-white/5 rounded-tl-sm"
                  )}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <div className="flex gap-3 max-w-[85%] mr-auto">
                   <div className="w-7 h-7 rounded-full bg-blue-500/20 text-blue-300 flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="p-4 rounded-2xl bg-white/10 border border-white/5 rounded-tl-sm flex gap-1 items-center">
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-white/10 bg-[#0a0e1a]/50">
              <div className="relative flex items-center">
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask something..."
                  className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-4 pr-12 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
                <button 
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="absolute right-1.5 p-1.5 bg-blue-500 hover:bg-blue-400 text-white rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
