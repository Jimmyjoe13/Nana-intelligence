"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  items: FAQItem[];
}

export function FAQSection({ items }: FAQSectionProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="lg:col-span-7 flex flex-col">
      {items.map((faq, i) => (
        <div key={i} className="border-b border-ink py-8 first:pt-0">
          <button 
            className="w-full flex items-center justify-between text-left group"
            onClick={() => setOpenFaq(openFaq === i ? null : i)}
          >
            <span className="font-display text-[22px] md:text-[26px] font-medium group-hover:text-orange transition-colors">
              {faq.question}
            </span>
            {openFaq === i ? <Minus size={24} className="text-orange" /> : <Plus size={24} className="text-ink-3" />}
          </button>
          <div className={cn(
            "overflow-hidden transition-all duration-300 ease-in-out",
            openFaq === i ? "max-h-[500px] mt-6" : "max-h-0"
          )}>
            <p className="text-ink-2 text-lg leading-relaxed max-w-2xl">
              {faq.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
