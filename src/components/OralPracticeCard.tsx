import { Check, ChevronDown, ChevronUp, Copy, Mic } from 'lucide-react';
import { useState } from 'react';
import { SYSTEM_INSTRUCTIONS } from '../data/pla28Dies';
import type { AiProductionBlock } from '../types';
import { copyTextToClipboard } from '../utils/storage';

interface OralPracticeCardProps {
  dayNumber: number;
  block: AiProductionBlock;
}

export function OralPracticeCard({ dayNumber, block }: OralPracticeCardProps) {
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedSystem, setCopiedSystem] = useState(false);
  const [copiedBundle, setCopiedBundle] = useState(false);
  const [showSystem, setShowSystem] = useState(false);

  const handleCopyPrompt = async () => {
    const ok = await copyTextToClipboard(block.prompt);
    if (ok) {
      setCopiedPrompt(true);
      window.setTimeout(() => setCopiedPrompt(false), 2500);
    }
  };

  const handleCopySystem = async () => {
    const ok = await copyTextToClipboard(SYSTEM_INSTRUCTIONS);
    if (ok) {
      setCopiedSystem(true);
      window.setTimeout(() => setCopiedSystem(false), 2500);
    }
  };

  const handleCopyBundle = async () => {
    const bundle = `INSTRUCCIONS DE SISTEMA:\n${SYSTEM_INSTRUCTIONS}\n\nPROMPT DEL DIA ${dayNumber}:\n${block.prompt}`;
    const ok = await copyTextToClipboard(bundle);
    if (ok) {
      setCopiedBundle(true);
      window.setTimeout(() => setCopiedBundle(false), 2500);
    }
  };

  return (
    <section
      aria-labelledby="oral-practice-heading"
      className="rounded-xl border border-[#BFDBFE] bg-[#F4F7FE] p-6 sm:p-8"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-[#1D4ED8]">
            <Mic className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>Interacció amb IA · Simulacre Oral</span>
          </div>
          <h2
            id="oral-practice-heading"
            className="font-display mt-1.5 text-xl font-bold text-[#181A1F] sm:text-2xl"
          >
            {block.titol}
          </h2>
          <p className="mt-1.5 text-sm text-[#374151]">{block.instruccions}</p>
        </div>

        <button
          type="button"
          onClick={handleCopyBundle}
          className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-[#BFDBFE] bg-white px-3.5 py-2 text-xs font-semibold text-[#1E40AF] transition-colors hover:bg-[#EFF4FF] whitespace-nowrap"
        >
          {copiedBundle ? (
            <>
              <Check className="h-3.5 w-3.5 text-[#15803D]" aria-hidden="true" />
              <span>Tot copiat!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Copiar Sistema + Prompt</span>
            </>
          )}
        </button>
      </div>

      {/* Daily prompt block */}
      <div className="mt-5 rounded-lg border border-[#DBEAFE] bg-white p-5">
        <p className="text-xs font-semibold text-[#52555E]">
          Prompt del Dia {String(dayNumber).padStart(2, '0')}
        </p>
        <p className="mt-2 text-[15px] leading-relaxed text-[#181A1F]">
          {block.prompt}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleCopyPrompt}
            className={`inline-flex min-h-[48px] w-full items-center justify-center gap-2.5 rounded-lg px-6 py-3 text-sm font-semibold text-white transition-colors sm:w-auto whitespace-nowrap ${
              copiedPrompt
                ? 'bg-[#15803D] hover:bg-[#166534]'
                : 'bg-[#1D4ED8] hover:bg-[#1E40AF]'
            }`}
          >
            {copiedPrompt ? (
              <>
                <Check className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Prompt copiat!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Copiar Prompt</span>
              </>
            )}
          </button>

          <span className="text-xs text-[#52555E]">
            Enganxa’l a Gemini o ChatGPT i activa el micròfon.
          </span>
        </div>
      </div>

      {/* Collapsible System Instructions reference */}
      <div className="mt-4 rounded-lg border border-[#DBEAFE] bg-white/85">
        <button
          type="button"
          onClick={() => setShowSystem((prev) => !prev)}
          aria-expanded={showSystem}
          className="flex min-h-[44px] w-full items-center justify-between gap-3 px-5 py-3 text-left"
        >
          <span className="text-xs font-semibold text-[#1E3A8A]">
            Instruccions de Sistema recomanades (Examinador CIEACOVA B1)
          </span>
          {showSystem ? (
            <ChevronUp className="h-4 w-4 shrink-0 text-[#52555E]" aria-hidden="true" />
          ) : (
            <ChevronDown className="h-4 w-4 shrink-0 text-[#52555E]" aria-hidden="true" />
          )}
        </button>

        {showSystem && (
          <div className="border-t border-[#DBEAFE] px-5 py-4">
            <p className="text-sm leading-relaxed text-[#374151]">
              {SYSTEM_INSTRUCTIONS}
            </p>
            <div className="mt-3 flex justify-end">
              <button
                type="button"
                onClick={handleCopySystem}
                className="inline-flex min-h-[38px] items-center gap-1.5 rounded-lg border border-[#E4E0D8] bg-[#FAF9F6] px-3 py-1.5 text-xs font-semibold text-[#181A1F] transition-colors hover:bg-[#F2EFE9] whitespace-nowrap"
              >
                {copiedSystem ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-[#15803D]" aria-hidden="true" />
                    <span>Instruccions copiades!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Copiar Instruccions de Sistema</span>
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
