import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { PortfolioData } from '../types';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const DesignAssistant: React.FC<{ data: PortfolioData }> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: `Hello! I'm Mahalakshmi's AI Design Assistant. Ask me about her 8+ years of experience in marketing design, isometric illustrations, or her work at FullContact Technologies!` }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const systemPrompt = `You are a professional design assistant for Mahalakshmi K, a Senior Graphic Designer with 8+ years of experience. 
      Use the following context to answer questions accurately and professionally. 
      Mahalakshmi's Profile: ${data.summary}
      Core Skills: ${data.resume.skills.design.join(', ')}.
      Experience History: ${data.resume.experience.map(e => `${e.role} at ${e.company} (${e.period})`).join('. ')}
      Academic: ${data.resume.education[0].degree} from ${data.resume.education[0].school} (Class of ${data.resume.education[0].year}).
      Contact: mahakasi3108@gmail.com
      
      Keep answers concise, sophisticated, and focused on her marketing design expertise. If asked about technical tools, mention her advanced proficiency in Adobe Illustrator, Photoshop, and InDesign.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.7,
        },
      });

      const aiText = response.text || "I'm sorry, I couldn't process that. Feel free to reach out to Mahalakshmi directly via email!";
      setMessages(prev => [...prev, { role: 'assistant', content: aiText }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Something went wrong. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* FAB */}
      <button 
        id="design-assistant-fab"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-[60] bg-black text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center gap-2 group no-print"
      >
        <MessageSquare size={24} />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap text-xs font-bold uppercase tracking-widest px-0 group-hover:px-2">
          Design Assistant
        </span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-8 z-[60] w-[90vw] md:w-96 bg-white border border-gray-100 shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-300 flex flex-col h-[600px] max-h-[80vh] chat-window no-print">
          <div className="p-6 bg-black text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Sparkles size={18} className="text-yellow-400" />
              <span className="text-xs font-bold uppercase tracking-widest">Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:opacity-50 transition-opacity">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 text-sm leading-relaxed ${
                  m.role === 'user' 
                  ? 'bg-gray-100 text-black' 
                  : 'bg-black text-white font-light'
                }`}>
                  {m.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-black text-white p-4 flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin" />
                  <span className="text-xs italic">Consulting Mahalakshmi's records...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-gray-100 flex gap-2">
            <input 
              type="text" 
              placeholder="Ask about my background..." 
              className="flex-1 bg-gray-50 border-none px-4 py-3 text-sm focus:ring-1 focus:ring-black"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button 
              onClick={handleSend}
              disabled={isLoading}
              className="p-3 bg-black text-white hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};