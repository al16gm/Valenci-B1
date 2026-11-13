import { useState } from 'react';
import { Check, ChevronDown, Copy, MessageSquareQuote, ShieldAlert } from 'lucide-react';
import { SYSTEM_INSTRUCTIONS } from '../data/pla28Dies';
import { copyTextToClipboard } from '../utils/storage';

interface AiPracticeCardProps {
  dayNumber: number;
  promptIa: string;
}

export function AiPracticeCard({ dayNumber, promptIa }: AiPracticeCardProps) {
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedSystem, setCopiedSystem] = useState(false);
  const [copiedBundle, setCopiedBundle] = useState(false);
  const [showSystemDetails, setShowSystemDetails] = useState(true);

  const handleCopyPrompt = async () => {
    const ok = await copyTextToClipboard(promptIa);
    if (ok) {
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2500);
    }
  };

  const handleCopySystem = async () => {
    const ok = await copyTextToClipboard(SYSTEM_INSTRUCTIONS);
    if (ok) {
      setCopiedSystem(true);
      setTimeout(() => setCopiedSystem(false), 2500);
    }
  };

  const handleCopyBoth = async () => {
    const combined = `INSTRUCCIONS DE SISTEMA:\n${SYSTEM_INSTRUCTIONS}\n\nEXERCICI DEL DIA ${dayNumber}:\n${promptIa}`;
    const ok = await copyTextToClipboard(combined);
    if (ok) {
      setCopiedBundle(true);
      setTimeout(() => setCopiedBundle(false), 2500);
    }
  };

  return (
    <section
      aria-labelledby="ai-practice-heading"
      className="bg-[#F4F7FC] border border-[#C7D7F5] rounded-2xl p-6 sm:p-8 space-y-6"
    >
      {/* Daily Prompt Block */}
      <div>
        <div className="flex items-center gap-2 text-xs font-medium text-[#1E3A8A] mb-2">
          <span>Pràctica oral amb IA</span>
          <span aria-hidden="true">·</span>
          <span>Gemini o ChatGPT</span>
        </div>

        <h2
          id="ai-practice-heading"
          className="font-display text-xl sm:text-2xl font-bold text-[#181A1F] mb-4 [text-wrap:balance]"
        >
          Simulacre guiat del Dia {String(dayNumber).padStart(2, '0')}
        </h2>

        <div className="bg-white border border-[#DCE5F7] rounded-xl p-5 mb-5">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#52555E] mb-2">
            <MessageSquareQuote className="w-4 h-4 text-[#1D4ED8] shrink-0" />
            <span>Prompt específic per a enganxar al xat</span>
          </div>
          <p className="text-[15px] text-[#181A1F] leading-relaxed">
            {promptIa}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button
            type="button"
            onClick={handleCopyPrompt}
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 min-h-[48px] text-[15px] font-semibold text-white bg-[#1D4ED8] hover:bg-[#1E40AF] rounded-xl transition-colors cursor-pointer"
          >
            {copiedPrompt ? (
              <>
                <Check className="w-4 h-4 shrink-0" />
                <span>Prompt copiat al porta-retalls!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 shrink-0" />
                <span>Copiar Prompt per a IA</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleCopyBoth}
            className="inline-flex items-center justify-center gap-2 px-4 py-3.5 min-h-[48px] text-sm font-semibold text-[#1E3A8A] bg-white hover:bg-[#EFF4FF] border border-[#BFDBFE] rounded-xl transition-colors cursor-pointer"
          >
            {copiedBundle ? (
              <>
                <Check className="w-4 h-4 text-[#15803D] shrink-0" />
                <span>Tot copiat!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 shrink-0" />
                <span>Copiar Sistema + Prompt junts</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* System Instructions Block */}
      <div
        id="instruccions-sistema"
        className="bg-white border border-[#DCE5F7] rounded-xl overflow-hidden scroll-mt-24"
      >
        <button
          type="button"
          onClick={() => setShowSystemDetails((prev) => !prev)}
          aria-expanded={showSystemDetails}
          className="w-full px-5 py-4 flex items-center justify-between gap-3 text-left hover:bg-[#FAF9F6] transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <ShieldAlert className="w-4 h-4 text-[#1D4ED8] shrink-0" />
            <div className="min-w-0">
              <div className="text-sm font-semibold text-[#181A1F]">
                Instruccions de Sistema (Examinador CIEACOVA B1)
              </div>
              <div className="text-xs text-[#52555E]">
                Configura aquest context en Gemini Gems, ChatGPT o a l’inici de la conversa
              </div>
            </div>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-[#52555E] shrink-0 transition-transform duration-200 ${
              showSystemDetails ? 'rotate-180' : ''
            }`}
          />
        </button>

        {showSystemDetails && (
          <div className="px-5 pb-5 pt-2 border-t border-[#F0ECE3] space-y-3">
            <p className="text-sm text-[#272A30] leading-relaxed bg-[#FAF9F6] border border-[#E4E0D8] rounded-lg p-4">
              {SYSTEM_INSTRUCTIONS}
            </p>
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <span className="text-xs text-[#52555E]">
                Regles actives: CD sense «a» · haver de/caldre · hi ha · repetició obligatòria
              </span>
              <button
                type="button"
                onClick={handleCopySystem}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#1E3A8A] bg-[#EFF4FF] hover:bg-[#DBEAFE] rounded-lg transition-colors cursor-pointer"
              >
                {copiedSystem ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#15803D]" />
                    <span>Instruccions copiades</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar Instruccions</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
