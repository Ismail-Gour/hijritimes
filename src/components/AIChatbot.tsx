/**
 * AIChatbot - Natural language Q&A about Islamic dates
 * 
 * CRITICAL: All responses MUST reference HijriTruthEngine
 * NO independent Hijri calculations allowed
 * Must include disclaimers about data sources
 * 
 * Currently: Frontend-only with pre-built responses
 * Future: Will integrate with Lovable Cloud + AI Gateway
 */

import { useHijri } from "@/contexts/HijriContext";
import { useState, useRef, useEffect } from "react";
import { 
  MessageCircle, 
  Send, 
  Moon, 
  X, 
  Sparkles,
  AlertTriangle,
  Info
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  disclaimer?: string;
  timestamp: Date;
}

// Pre-built Q&A database (until Cloud is enabled)
interface QAEntry {
  patterns: string[];
  getResponse: (context: ReturnType<typeof useHijri>) => { answer: string; disclaimer?: string };
}

const QA_DATABASE: QAEntry[] = [
  {
    patterns: ["what is today", "today's date", "current date", "what date", "hijri date"],
    getResponse: (ctx) => ({
      answer: `Today is **${ctx.hijri.day} ${ctx.hijri.monthName} ${ctx.hijri.year} AH** (${ctx.hijri.monthNameAr}).

In the Gregorian calendar, it's ${ctx.gregorian.dayOfWeek}, ${ctx.gregorian.monthName} ${ctx.gregorian.day}, ${ctx.gregorian.year}.

${ctx.maghrib.hasStarted 
  ? `The Islamic day changed at Maghrib (~${ctx.maghrib.formatted}). The next Islamic day begins tomorrow at Maghrib.`
  : `The Islamic date will change today at Maghrib (~${ctx.maghrib.formatted}).`
}`,
      disclaimer: "Based on Indian moon sighting tradition. The Islamic date changes at Maghrib, not midnight.",
    }),
  },
  {
    patterns: ["when is eid", "eid date", "eid al-fitr", "eid ul fitr"],
    getResponse: (ctx) => {
      const eidEvent = ctx.upcomingEvents.find(e => e.event.name.includes("Eid al-Fitr"));
      if (eidEvent) {
        return {
          answer: `**Eid al-Fitr** is expected on **${eidEvent.gregorianDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}** (${eidEvent.daysUntil} days from now).

This corresponds to **1 Shawwal ${ctx.hijri.year + (ctx.hijri.month >= 10 ? 1 : 0)} AH**.

⚠️ **Important**: Eid begins at Maghrib the evening before. The exact date depends on moon sighting.`,
          disclaimer: "This is an EXPECTED date based on astronomical calculation. Official Indian moon sighting may differ by ±1 day. Please await official announcement from your local community.",
        };
      }
      return {
        answer: "I couldn't find upcoming Eid dates. Please check the countdown section for the latest information.",
        disclaimer: "Based on available data from HijriTruthEngine.",
      };
    },
  },
  {
    patterns: ["when is ramadan", "ramadan date", "ramadan start"],
    getResponse: (ctx) => {
      const ramadanEvent = ctx.upcomingEvents.find(e => e.event.name.includes("Ramadan"));
      if (ramadanEvent) {
        return {
          answer: `**Ramadan** is expected to begin on **${ramadanEvent.gregorianDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}** (${ramadanEvent.daysUntil} days from now).

🌙 Ramadan begins at Maghrib when the new moon is sighted. Fasting starts from Fajr the next morning.`,
          disclaimer: "This is an EXPECTED date. The actual start of Ramadan depends on official moon sighting in India. The date may vary by ±1 day.",
        };
      }
      return {
        answer: ctx.hijri.month === 9 
          ? `We are currently in **Ramadan ${ctx.hijri.year} AH**! Today is the ${ctx.hijri.day}${getOrdinalSuffix(ctx.hijri.day)} day of Ramadan.`
          : "I couldn't find the upcoming Ramadan date. Please check the countdown section.",
        disclaimer: "Based on HijriTruthEngine data for Hyderabad, India.",
      };
    },
  },
  {
    patterns: ["maghrib", "sunset", "when does day change", "day start", "day begin"],
    getResponse: (ctx) => ({
      answer: `**Maghrib (sunset) in Hyderabad today is approximately at ${ctx.maghrib.formatted}.**

The Islamic day begins at Maghrib, not at midnight. This is why:
• Ramadan begins at Maghrib when the moon is sighted
• Eid nights start in the evening
• The weekly Jumu'ah (Friday) begins Thursday evening

${ctx.maghrib.hasStarted 
  ? `✅ Maghrib has passed. We are now in the Islamic day of **${ctx.hijri.day} ${ctx.hijri.monthName}**.`
  : `⏳ ${formatTimeUntil(ctx.maghrib.timeUntil)} until Maghrib. After that, it will be **${ctx.hijri.day} ${ctx.hijri.monthName}**.`
}`,
      disclaimer: "Maghrib time is approximate for Hyderabad, India (IST). For precise prayer times, please consult your local mosque.",
    }),
  },
  {
    patterns: ["moon", "moon phase", "new moon", "crescent"],
    getResponse: (ctx) => ({
      answer: `**Current Moon Phase: ${ctx.moon.phaseName}**

🌙 Illumination: ${Math.round(ctx.moon.illumination)}%
${ctx.moon.isWaxing ? "📈 The moon is waxing (growing)" : "📉 The moon is waning (decreasing)"}

${ctx.moon.daysToNewMoon > 0 
  ? `The next new moon (potential new month) is in approximately **${ctx.moon.daysToNewMoon} days**.`
  : "A new moon phase is beginning soon."
}`,
      disclaimer: "Moon phase is based on astronomical calculation. The start of the Islamic month depends on official moon sighting, not just the astronomical new moon.",
    }),
  },
  {
    patterns: ["why different", "saudi", "different date", "different day"],
    getResponse: () => ({
      answer: `**Why might the Islamic date differ from Saudi Arabia?**

Islamic months begin with moon sighting, and different regions may sight the moon on different days. This is normal and religiously valid.

In India:
• Many communities follow local moon sighting
• The Indian Central Committee announces dates based on sightings within India
• This can result in 1-day differences from Saudi Arabia

**Neither approach is wrong** — both follow valid Islamic scholarly opinions. The important thing is to follow your local community for unity in worship.`,
      disclaimer: "This website follows Indian moon sighting tradition. For Saudi/global sighting calendars, please consult other sources.",
    }),
  },
  {
    patterns: ["help", "what can you do", "how to use", "features"],
    getResponse: () => ({
      answer: `I can help you with questions about the **Islamic calendar** for Hyderabad, India:

**Ask me about:**
• Today's Hijri date
• Upcoming events (Eid, Ramadan, etc.)
• When does the Islamic day change (Maghrib)
• Current moon phase
• Why dates might differ from other regions

**Examples:**
• "What is today's Hijri date?"
• "When is Eid al-Fitr?"
• "What time is Maghrib today?"
• "Why is the date different from Saudi?"`,
      disclaimer: "All answers are based on Indian moon sighting tradition and the HijriTruthEngine. For religious rulings, please consult qualified scholars.",
    }),
  },
];

function getOrdinalSuffix(n: number): string {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
}

function formatTimeUntil(time: { hours: number; minutes: number; seconds: number }): string {
  if (time.hours > 0) {
    return `${time.hours}h ${time.minutes}m`;
  }
  return `${time.minutes}m ${time.seconds}s`;
}

function findBestResponse(query: string, context: ReturnType<typeof useHijri>): Message {
  const normalizedQuery = query.toLowerCase();
  
  for (const qa of QA_DATABASE) {
    if (qa.patterns.some(pattern => normalizedQuery.includes(pattern))) {
      const { answer, disclaimer } = qa.getResponse(context);
      return {
        id: Date.now().toString(),
        role: "assistant",
        content: answer,
        disclaimer,
        timestamp: new Date(),
      };
    }
  }
  
  // Default response
  return {
    id: Date.now().toString(),
    role: "assistant",
    content: `I'm not sure how to answer that question. Try asking about:
• Today's Hijri date
• When is Eid or Ramadan
• Maghrib/sunset time
• Moon phase
• Why dates differ from other regions

Type "help" for more examples.`,
    disclaimer: "I can only answer questions about the Islamic calendar based on data from the HijriTruthEngine.",
    timestamp: new Date(),
  };
}

export function AIChatbot() {
  const hijriContext = useHijri();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate typing delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 500));

    const response = findBestResponse(input, hijriContext);
    setMessages(prev => [...prev, response]);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-50 p-4 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all hover:scale-105",
          isOpen && "hidden"
        )}
        aria-label="Open Islamic Calendar Assistant"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] h-[500px] max-h-[calc(100vh-100px)] bg-card rounded-2xl shadow-2xl border border-border flex flex-col overflow-hidden animate-scale-in">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-primary/5">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Moon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display font-medium text-foreground">Islamic Calendar Assistant</h3>
                <p className="text-xs text-muted-foreground">Ask about dates, events & more</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-muted rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center py-8 space-y-4">
                <Sparkles className="w-10 h-10 text-gold mx-auto" />
                <div>
                  <p className="font-medium text-foreground">Assalamu Alaikum! 👋</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    I can answer questions about the Islamic calendar for Hyderabad, India.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {["What is today's date?", "When is Eid?", "When is Maghrib?"].map((q) => (
                    <button
                      key={q}
                      onClick={() => {
                        setInput(q);
                        setTimeout(() => handleSend(), 100);
                      }}
                      className="px-3 py-1.5 text-xs bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl px-4 py-3",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                  <div 
                    className={cn(
                      "text-sm prose prose-sm max-w-none",
                      message.role === "user" ? "prose-invert" : ""
                    )}
                    dangerouslySetInnerHTML={{ 
                      __html: message.content
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\n/g, '<br />')
                    }}
                  />
                  
                  {message.disclaimer && (
                    <div className="mt-3 pt-2 border-t border-border/30">
                      <div className="flex items-start gap-2">
                        <Info className="w-3 h-3 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <p className="text-[10px] text-muted-foreground italic">
                          {message.disclaimer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0ms]" />
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:150ms]" />
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Data Source Warning */}
          <div className="px-4 py-2 bg-gold/10 border-t border-gold/20">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-3 h-3 text-gold-dark flex-shrink-0" />
              <p className="text-[10px] text-gold-dark">
                Responses based on Indian moon sighting. Confirm official dates with your local community.
              </p>
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about Islamic dates..."
                className="flex-1"
                disabled={isTyping}
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                size="icon"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
