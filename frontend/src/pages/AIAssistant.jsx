import { useState } from 'react';
import { Sparkles, Send, Loader2 } from 'lucide-react';
import { api } from '../api/client.js';

const SAMPLE_QUESTIONS = [
  'Why should I sell to ABC Foods?',
  'Should I wait three days?',
  'Which market gives me the best net realization?',
  'Why is Bengaluru better than Kolar?',
];

export default function AIAssistant() {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const ask = async (q) => {
    const text = q ?? question;
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: 'user', text }]);
    setQuestion('');
    setLoading(true);
    try {
      const context = window.__agrisphereContext || {};
      const res = await api.askAssistant({ question: text, context });
      setMessages((m) => [...m, { role: 'assistant', text: res.answer, aiAvailable: res.aiAvailable }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <div className="w-14 h-14 rounded-2xl bg-agri-600 flex items-center justify-center mx-auto mb-3">
          <Sparkles size={26} className="text-white" />
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900">Farmer AI Assistant</h1>
        <p className="text-slate-500 text-sm mt-1">
          Answers strictly from AgriSphere's own data — market prices, buyer offers, logistics,
          storage and recommendations you've already viewed in this session.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        {SAMPLE_QUESTIONS.map((q) => (
          <button key={q} onClick={() => ask(q)} className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full px-3 py-1.5">
            {q}
          </button>
        ))}
      </div>

      <div className="card min-h-[16rem] space-y-3">
        {messages.map((m, i) => (
          <div key={i} className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm ${m.role === 'user' ? 'bg-intel-50 text-intel-800 ml-auto' : 'bg-slate-100 text-slate-700'}`}>
            {m.text}
          </div>
        ))}
        {loading && <Loader2 className="animate-spin text-slate-400" size={18} />}
        {!messages.length && !loading && (
          <p className="text-slate-400 text-sm text-center pt-12">Visit the Dashboard or Market pages first so the assistant has data to answer from, then ask a question.</p>
        )}
      </div>

      <div className="flex gap-2">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && ask()}
          placeholder="Ask about your best selling option…"
          className="flex-1 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-agri-400"
        />
        <button onClick={() => ask()} className="btn-primary"><Send size={16} /></button>
      </div>
    </div>
  );
}
