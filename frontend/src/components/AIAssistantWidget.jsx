import { useState } from 'react';
import { MessageCircleQuestion, X, Send, Loader2, Sparkles } from 'lucide-react';
import { api } from '../api/client.js';

// Floating assistant available on every app page (spec section 16).
// It answers strictly from whatever `context` is passed in — by default
// it has no page-specific data, so on most pages it will honestly say
// it doesn't have enough verified data unless the page supplies context
// via window.__agrisphereContext (set by pages that have relevant data).
export default function AIAssistantWidget() {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Ask me things like "Should I wait 3 days?" or "Why is this buyer the best match?"' },
  ]);
  const [loading, setLoading] = useState(false);

  const ask = async () => {
    if (!question.trim()) return;
    const q = question.trim();
    setMessages((m) => [...m, { role: 'user', text: q }]);
    setQuestion('');
    setLoading(true);
    try {
      const context = window.__agrisphereContext || {};
      const res = await api.askAssistant({ question: q, context });
      setMessages((m) => [...m, { role: 'assistant', text: res.answer }]);
    } catch (err) {
      setMessages((m) => [...m, { role: 'assistant', text: `I ran into an error: ${err.message}` }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open && (
        <div className="w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 mb-3 flex flex-col overflow-hidden">
          <div className="bg-agri-600 text-white px-4 py-3 flex items-center justify-between">
            <span className="font-semibold flex items-center gap-2"><Sparkles size={16} /> Farmer AI Assistant</span>
            <button onClick={() => setOpen(false)}><X size={18} /></button>
          </div>
          <div className="p-3 h-64 overflow-y-auto space-y-2 text-sm">
            {messages.map((m, i) => (
              <div key={i} className={`max-w-[85%] px-3 py-2 rounded-xl ${m.role === 'user' ? 'bg-intel-50 text-intel-800 ml-auto' : 'bg-slate-100 text-slate-700'}`}>
                {m.text}
              </div>
            ))}
            {loading && <Loader2 className="animate-spin text-slate-400" size={16} />}
          </div>
          <div className="p-3 border-t border-slate-100 flex gap-2">
            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && ask()}
              placeholder="Ask a question…"
              className="flex-1 border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-agri-400"
            />
            <button onClick={ask} className="bg-agri-600 hover:bg-agri-700 text-white rounded-xl px-3">
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-14 h-14 rounded-full bg-agri-600 hover:bg-agri-700 text-white shadow-lg flex items-center justify-center"
      >
        <MessageCircleQuestion size={24} />
      </button>
    </div>
  );
}
