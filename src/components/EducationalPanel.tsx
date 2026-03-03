/**
 * EducationalPanel - Interactive explanations for Islamic calendar concepts
 * 
 * Provides: Why? buttons, visual diagrams, and trust-first UX language
 * READS FROM: HijriContext (single source of truth)
 */

import { useHijri } from "@/contexts/HijriContext";
import { 
  HelpCircle, 
  Moon, 
  Sunset, 
  Globe, 
  Eye, 
  Calendar,
  ChevronDown,
  Lightbulb,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ExplanationTopic {
  id: string;
  question: string;
  questionAr: string;
  icon: React.ReactNode;
  shortAnswer: string;
  fullExplanation: string;
  diagram?: React.ReactNode;
  sources?: string[];
}

const TOPICS: ExplanationTopic[] = [
  {
    id: "maghrib-day-start",
    question: "Why does the Islamic date change in the evening?",
    questionAr: "لماذا يتغير التاريخ الإسلامي في المساء؟",
    icon: <Sunset className="w-5 h-5" />,
    shortAnswer: "The Islamic day begins at Maghrib (sunset), following the lunar calendar tradition.",
    fullExplanation: `In Islam, the day begins at Maghrib (sunset), not at midnight like the Gregorian calendar. This is based on the lunar calendar tradition where the new day starts when the sun sets.

This is why:
• Ramadan begins after seeing the new moon at sunset
• Eid is celebrated starting from Maghrib the night before
• Laylat al-Qadr and other Islamic nights begin in the evening
• The weekly Jumu'ah (Friday) actually begins Thursday evening

When you see the Islamic date change in the evening on this website, it's showing the religiously correct time — the Islamic day has indeed begun at Maghrib.`,
    diagram: <MaghribDiagram />,
    sources: [
      "Quran 2:187 - 'Eat and drink until the white thread of dawn becomes distinct'",
      "Hadith - 'When the sun sets, the fasting person breaks their fast'"
    ],
  },
  {
    id: "moon-sighting",
    question: "Why might Eid be on a different day than in Saudi Arabia?",
    questionAr: "لماذا قد يكون العيد في يوم مختلف عن السعودية؟",
    icon: <Moon className="w-5 h-5" />,
    shortAnswer: "Different regions follow local moon sighting, which can result in 1-day differences.",
    fullExplanation: `Islamic months begin with the sighting of the new moon. Because the moon is visible at different times in different parts of the world, regional variations are natural and religiously valid.

In India, many communities follow:
• Local moon sighting by the Indian Central Committee
• Regional confirmation from local scholars
• The principle that each region should sight their own moon

This is why Indian Islamic dates may differ from Saudi Arabia, which follows its own sighting. Both approaches have scholarly support, and neither is "wrong."

The difference is usually just 1 day and reflects the beautiful diversity in how Muslims worldwide practice their faith.`,
    sources: [
      "Hadith - 'Fast when you see it (the moon) and break your fast when you see it'",
      "Various Fiqh councils supporting local moon sighting"
    ],
  },
  {
    id: "month-length",
    question: "How can we know if the month will be 29 or 30 days?",
    questionAr: "كيف نعرف إذا كان الشهر 29 أو 30 يوماً؟",
    icon: <Calendar className="w-5 h-5" />,
    shortAnswer: "We cannot know for certain — it depends on when the new moon is sighted.",
    fullExplanation: `Islamic months are either 29 or 30 days long, depending on when the new moon is sighted. This cannot be predicted with absolute certainty in advance.

Key principles:
• If the new moon is sighted on the 29th evening, the new month begins
• If not sighted (due to clouds, atmospheric conditions, etc.), the current month completes 30 days
• Astronomy can predict the likelihood, but actual sighting is what counts

This is why:
• Ramadan dates are "expected" until confirmed
• Eid announcements often come at the last moment
• Future Islamic dates shown on calendars are approximate

This uncertainty is intentional in Islamic tradition — it keeps believers attentive to the natural signs and connected to their community's announcements.`,
  },
  {
    id: "calculation-vs-sighting",
    question: "Why not just use astronomical calculations?",
    questionAr: "لماذا لا نستخدم الحسابات الفلكية فقط؟",
    icon: <Eye className="w-5 h-5" />,
    shortAnswer: "While calculations are precise, traditional scholars emphasize actual moon sighting.",
    fullExplanation: `Astronomical calculations can predict when the new moon will be born with great precision. However, many scholars emphasize actual human sighting because:

Religious basis:
• The Prophet ﷺ said: "Fast when you see it (the moon)"
• Actual sighting connects the community to natural signs
• It maintains a tradition of 1400+ years

Practical considerations:
• Calculations tell us when the moon is theoretically visible
• Actual visibility depends on weather, location, and conditions
• Some scholars accept calculations as valid; others require sighting

This website:
• Uses calculations as a fallback when sighting isn't confirmed
• Clearly marks calculated dates as "Expected"
• Will update instantly when official sighting is confirmed

Both approaches serve the same goal: determining the Islamic month correctly.`,
  },
  {
    id: "regional-differences",
    question: "Which moon sighting authority should I follow?",
    questionAr: "أي هيئة رؤية الهلال يجب أن أتبع؟",
    icon: <Globe className="w-5 h-5" />,
    shortAnswer: "Follow your local community and the scholars you trust.",
    fullExplanation: `There is no single "correct" authority for moon sighting worldwide. The best approach is:

Recommended hierarchy:
1. Your local mosque or Islamic center
2. Regional/national Islamic authority (in India: Central Committee)
3. Scholars you trust and follow

This website uses:
• Indian Central Committee moon sighting as the primary source
• Hyderabad-specific calculations for Maghrib times
• Astronomical fallback when sighting isn't yet confirmed

Why local matters:
• Islam encourages community unity in worship
• Following your local community creates harmony
• Regional sighting has strong scholarly support

If you're ever uncertain, asking your local imam is always the right approach.`,
  },
];

function MaghribDiagram() {
  return (
    <div className="my-4 p-4 bg-muted/50 rounded-xl">
      <p className="text-xs font-medium text-muted-foreground mb-3">Day Comparison</p>
      <div className="space-y-3">
        {/* Gregorian Day */}
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Gregorian Day:</p>
          <div className="h-8 rounded-lg bg-gradient-to-r from-indigo-500/30 via-amber-500/30 to-indigo-500/30 relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 text-[10px] text-foreground font-medium px-2">12 AM</div>
            <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-[10px] text-foreground font-medium">12 PM</div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[10px] text-foreground font-medium px-2">12 AM</div>
          </div>
        </div>
        
        {/* Islamic Day */}
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Islamic Day:</p>
          <div className="h-8 rounded-lg bg-gradient-to-r from-primary/30 via-indigo-500/30 via-amber-500/30 to-primary/30 relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 text-[10px] text-foreground font-medium px-2">Maghrib</div>
            <div className="absolute left-1/4 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground">Night</div>
            <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-[10px] text-foreground font-medium">Fajr</div>
            <div className="absolute right-1/4 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground">Day</div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[10px] text-foreground font-medium px-2">Maghrib</div>
          </div>
        </div>
      </div>
      <p className="mt-3 text-[10px] text-muted-foreground italic">
        The Islamic day starts ~6 hours earlier than the Gregorian day
      </p>
    </div>
  );
}

interface WhyButtonProps {
  topicId: string;
  onOpen: (topicId: string) => void;
}

export function WhyButton({ topicId, onOpen }: WhyButtonProps) {
  return (
    <button
      onClick={() => onOpen(topicId)}
      className="inline-flex items-center gap-1 px-2 py-1 text-xs text-primary hover:text-primary-foreground hover:bg-primary rounded-full transition-colors border border-primary/20 hover:border-primary"
    >
      <HelpCircle className="w-3 h-3" />
      <span>Why?</span>
    </button>
  );
}

export function EducationalPanel() {
  const { maghrib } = useHijri();
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);

  return (
    <div className="glass-card rounded-2xl p-6 animate-slide-up" style={{ animationDelay: "0.3s" }}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <Lightbulb className="w-5 h-5 text-gold" />
        <h3 className="font-display text-lg text-foreground">Understanding Islamic Time</h3>
      </div>

      {/* Quick Tip */}
      <div className="bg-gold/10 rounded-xl p-4 mb-6 border border-gold/20">
        <p className="text-sm text-foreground">
          <span className="font-medium">Quick Tip:</span> The Islamic date on this website changes at 
          <span className="font-bold text-gold-dark"> ~{maghrib.formatted}</span> (Maghrib time in Hyderabad), 
          not at midnight. This is religiously correct.
        </p>
      </div>

      {/* FAQ Accordion */}
      <Accordion type="single" collapsible value={expandedTopic || undefined} onValueChange={setExpandedTopic}>
        {TOPICS.map((topic) => (
          <AccordionItem key={topic.id} value={topic.id} className="border-border/50">
            <AccordionTrigger className="hover:no-underline py-4">
              <div className="flex items-center gap-3 text-left">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  {topic.icon}
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">{topic.question}</p>
                  <p className="text-xs text-muted-foreground font-arabic mt-0.5">{topic.questionAr}</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="pl-12 pr-4 pb-4 space-y-4">
                {/* Short Answer */}
                <div className="bg-primary/5 rounded-lg p-3 border-l-2 border-primary">
                  <p className="text-sm text-foreground font-medium">{topic.shortAnswer}</p>
                </div>
                
                {/* Diagram */}
                {topic.diagram}
                
                {/* Full Explanation */}
                <div className="text-sm text-muted-foreground whitespace-pre-line">
                  {topic.fullExplanation}
                </div>
                
                {/* Sources */}
                {topic.sources && topic.sources.length > 0 && (
                  <div className="pt-3 border-t border-border">
                    <p className="text-xs font-medium text-foreground mb-2">Sources:</p>
                    <ul className="space-y-1">
                      {topic.sources.map((source, idx) => (
                        <li key={idx} className="text-xs text-muted-foreground italic">
                          • {source}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Trust Statement */}
      <div className="mt-6 p-4 bg-muted/50 rounded-xl text-center">
        <p className="text-xs text-muted-foreground">
          This website prioritizes <span className="text-foreground font-medium">religious correctness</span> over convenience. 
          All dates follow Indian moon sighting traditions. When in doubt, consult your local scholars.
        </p>
      </div>
    </div>
  );
}
