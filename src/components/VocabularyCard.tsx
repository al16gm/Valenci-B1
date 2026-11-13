import { Eye } from 'lucide-react';
import type { VocabularyBlock } from '../types';

interface VocabularyCardProps {
  block: VocabularyBlock;
}

function splitKeywordParts(raw: string): { term: string; note: string | null } {
  const match = raw.match(/^(.*?)\s*\((.+)\)$/);
  if (!match) return { term: raw, note: null };
  return { term: match[1].trim(), note: match[2].trim() };
}

export function VocabularyCard({ block }: VocabularyCardProps) {
  return (
    <section
      aria-labelledby="vocab-heading"
      className="rounded-xl border border-[#E6D9B5] bg-[#FDFBF4] p-6 sm:p-8"
    >
      <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-[#92600A]">
        <Eye className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span>Fixació Visual · Lèxic Normatiu</span>
      </div>

      <h2
        id="vocab-heading"
        className="font-display mt-1.5 text-xl font-bold text-[#181A1F] sm:text-2xl"
      >
        {block.titol}
      </h2>

      <p className="mt-2.5 text-[15px] leading-relaxed text-[#374151]">
        {block.contingut}
      </p>

      <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {block.paraules_clau.map((item, idx) => {
          const { term, note } = splitKeywordParts(item);
          return (
            <li
              key={`${idx}-${item}`}
              className="flex flex-col justify-center rounded-lg border border-[#EAE0C5] bg-white px-4 py-3"
            >
              <span className="text-[15px] font-semibold leading-snug text-[#181A1F]">
                {term}
              </span>
              {note && (
                <span className="mt-0.5 text-xs text-[#6B5E45]">
                  {note}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
