/**
 * DisclaimerModal - First-time visitor acknowledgment
 * 
 * MANDATORY: Must be accepted before using the app
 * Stored in localStorage to remember returning users
 */

import { useState, useEffect } from "react";
import { AlertTriangle, CheckCircle2, Moon, Building2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const DISCLAIMER_ACCEPTED_KEY = "hijri-disclaimer-accepted";
const DISCLAIMER_VERSION = "1.0"; // Increment to re-show disclaimer after major changes

export function DisclaimerModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const acceptedVersion = localStorage.getItem(DISCLAIMER_ACCEPTED_KEY);
    if (acceptedVersion !== DISCLAIMER_VERSION) {
      setIsOpen(true);
    }
  }, []);

  const handleAccept = () => {
    if (isChecked) {
      localStorage.setItem(DISCLAIMER_ACCEPTED_KEY, DISCLAIMER_VERSION);
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent 
        className="sm:max-w-lg [&>button]:hidden max-h-[90vh] flex flex-col"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader className="text-center sm:text-center flex-shrink-0">
          <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Moon className="w-8 h-8 text-primary" />
          </div>
          <DialogTitle className="text-xl font-display">
            Important Notice
          </DialogTitle>
          <DialogDescription className="text-center">
            Please read and acknowledge before continuing
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-4 py-4 min-h-0">
          {/* Educational Purpose */}
          <div className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg border border-primary/10">
            <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-foreground mb-1">
                Educational & Informational Purpose
              </p>
              <p className="text-muted-foreground">
                This website is for educational and informational purposes only. 
                Islamic dates and events shown here are based on astronomical calculations 
                and may vary due to regional moon sighting differences.
              </p>
            </div>
          </div>

          {/* Local Authority */}
          <div className="flex items-start gap-3 p-3 bg-amber-500/5 rounded-lg border border-amber-500/10">
            <Building2 className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-foreground mb-1">
                Consult Local Authorities
              </p>
              <p className="text-muted-foreground">
                For religious obligations such as fasting, Eid, and other Islamic observances, 
                <strong className="text-foreground"> please consult your local mosque, scholars, 
                or Islamic authorities</strong> for official dates specific to your region.
              </p>
            </div>
          </div>

          {/* Indian Moon Sighting */}
          <div className="flex items-start gap-3 p-3 bg-secondary/50 rounded-lg">
            <Moon className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-foreground mb-1">
                Based on Indian Moon Sighting
              </p>
              <p className="text-muted-foreground">
                This calendar follows the Indian Islamic moon sighting tradition. 
                Dates marked as "Expected" are astronomical predictions awaiting official confirmation.
              </p>
            </div>
          </div>
        </div>

        {/* Fixed Footer with Checkbox and Button */}
        <div className="flex-shrink-0 pt-4 border-t border-border space-y-4">
          <label 
            htmlFor="disclaimer-checkbox" 
            className="flex items-start gap-3 cursor-pointer"
          >
            <Checkbox
              id="disclaimer-checkbox"
              checked={isChecked}
              onCheckedChange={(checked) => setIsChecked(checked === true)}
              className="mt-0.5"
            />
            <span className="text-sm text-foreground">
              I understand and acknowledge that this website is for informational purposes only, 
              and I will verify important religious dates with local authorities.
            </span>
          </label>

          <Button 
            onClick={handleAccept} 
            disabled={!isChecked}
            className="w-full"
            size="lg"
          >
            <CheckCircle2 className="w-4 h-4 mr-2" />
            I Understand & Continue
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            By continuing, you agree to use this information responsibly
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
