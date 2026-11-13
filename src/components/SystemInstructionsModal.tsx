import { Check, Copy, X } from 'lucide-react';
import { useState } from 'react';
import { SYSTEM_INSTRUCTIONS } from '../data/pla28Dies';
import { copyTextToClipboard } from '../utils/storage';

interface SystemInstructionsModalProps {
  open: boolean;
  onClose: () => void;
}

export function SystemInstructionsModal({
  open,
  onClose,
}: SystemInstructionsModalProps) {
  const [copied, setCopied] = useState(false);

  if (!open) return null;

  const handleCopy = async () => {
    const ok = await copyTextToClipboard(SYSTEM_INSTRUCTIONS);
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="system-modal-title"
    >
      <div
        className="fixed inset-0 bg-[#181A1F]/45 backdrop-blur-[1px]"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-2xl rounded-xl border border-[#E4E0D8] bg-white p-6 shadow-xl sm:p-8">
        <div className="flex items-start justify-between gap-4 border-b border-[#E4E0D8] pb-4">
          <div>
            <p className="text-xs font-semibold text-[#1D4ED8]">
              Configuració per a Gemini o ChatGPT
            </p>
            <h2
              id="system-modal-title"
              className="font-display mt-1 text-xl font-bold text-[#181A1F] sm:text-2xl"
            >
              Instruccions de Sistema · Examinador CIEACOVA B1
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tancar finestra"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-[#52555E] hover:bg-[#F2EFE9] hover:text-[#181A1F]"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-[#52555E]">
          Copia aquest bloc com a instruccions personalitzades (System Instructions o Custom
          Instructions) abans d’enganxar el prompt específic de cada dia perquè la IA actue com un
          examinador oficial rigorós.
        </p>

        <div className="mt-4 rounded-lg border border-[#E4E0D8] bg-[#FAF9F6] p-4 sm:p-5">
          <p className="text-sm leading-relaxed text-[#181A1F]">
            {SYSTEM_INSTRUCTIONS}
          </p>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="min-h-[42px] rounded-lg border border-[#E4E0D8] bg-white px-4 py-2 text-sm font-medium text-[#181A1F] hover:bg-[#FAF9F6]"
          >
            Tancar
          </button>
          <button
            type="button"
            onClick={handleCopy}
            className={`inline-flex min-h-[42px] items-center gap-2 rounded-lg px-5 py-2 text-sm font-semibold text-white transition-colors ${
              copied
                ? 'bg-[#15803D] hover:bg-[#166534]'
                : 'bg-[#1D4ED8] hover:bg-[#1E40AF]'
            }`}
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" aria-hidden="true" />
                <span>Instruccions copiades!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" aria-hidden="true" />
                <span>Copiar Instruccions de Sistema</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
