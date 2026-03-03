/**
 * UserSettings - User customization panel
 * 
 * Allows users to:
 * - Set custom Maghrib time offset (± minutes)
 * - Choose Asr calculation method
 * - These are USER PREFERENCES, not authority overrides
 */

import { useState, useEffect } from "react";
import { Settings, Clock, Sun, Info, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const SETTINGS_KEY = "hijri-user-settings";

export interface HijriUserSettings {
  maghribOffset: number; // -30 to +30 minutes
  asrMethod: "shafii" | "hanafi";
}

const DEFAULT_SETTINGS: HijriUserSettings = {
  maghribOffset: 0,
  asrMethod: "hanafi", // Default for India
};

export function getUserSettings(): HijriUserSettings {
  try {
    const stored = localStorage.getItem(SETTINGS_KEY);
    if (stored) {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
    }
  } catch {
    // Ignore parse errors
  }
  return DEFAULT_SETTINGS;
}

export function saveUserSettings(settings: HijriUserSettings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

interface UserSettingsProps {
  onSettingsChange?: (settings: HijriUserSettings) => void;
}

export function UserSettings({ onSettingsChange }: UserSettingsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<HijriUserSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    setSettings(getUserSettings());
  }, []);

  const handleMaghribOffsetChange = (value: number[]) => {
    const newSettings = { ...settings, maghribOffset: value[0] };
    setSettings(newSettings);
    saveUserSettings(newSettings);
    onSettingsChange?.(newSettings);
  };

  const handleAsrMethodChange = (value: "shafii" | "hanafi") => {
    const newSettings = { ...settings, asrMethod: value };
    setSettings(newSettings);
    saveUserSettings(newSettings);
    onSettingsChange?.(newSettings);
  };

  const handleReset = () => {
    setSettings(DEFAULT_SETTINGS);
    saveUserSettings(DEFAULT_SETTINGS);
    onSettingsChange?.(DEFAULT_SETTINGS);
  };

  const formatOffset = (offset: number) => {
    if (offset === 0) return "No adjustment";
    return offset > 0 ? `+${offset} minutes` : `${offset} minutes`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Settings className="h-4 w-4" />
          <span className="sr-only">Settings</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            User Preferences
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Disclaimer */}
          <div className="flex items-start gap-2 p-3 bg-amber-500/10 rounded-lg text-xs">
            <Info className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
            <p className="text-muted-foreground">
              These are personal preferences for display only. They do <strong className="text-foreground">not override</strong> the 
              official Indian moon sighting authority. Always verify with local scholars for religious obligations.
            </p>
          </div>

          {/* Maghrib Offset */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                Maghrib Time Offset
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="w-4 h-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p className="text-sm">
                      Adjust the displayed Maghrib time to match your local observation. 
                      Useful if sunset in your area differs from the calculated time.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div className="space-y-2">
              <Slider
                value={[settings.maghribOffset]}
                onValueChange={handleMaghribOffsetChange}
                min={-30}
                max={30}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>-30 min</span>
                <span className="font-medium text-foreground">
                  {formatOffset(settings.maghribOffset)}
                </span>
                <span>+30 min</span>
              </div>
            </div>
          </div>

          {/* Asr Method */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2">
                <Sun className="w-4 h-4 text-muted-foreground" />
                Asr Calculation Method
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="w-4 h-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p className="text-sm">
                      <strong>Hanafi:</strong> Shadow = 2× object height<br />
                      <strong>Shafi'i:</strong> Shadow = 1× object height<br />
                      The Hanafi method starts Asr later.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <Select
              value={settings.asrMethod}
              onValueChange={handleAsrMethodChange}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hanafi">Hanafi (Later Asr)</SelectItem>
                <SelectItem value="shafii">Shafi'i / Hanbali / Maliki (Standard)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Reset Button */}
          <div className="pt-4 border-t border-border">
            <Button
              variant="outline"
              onClick={handleReset}
              className="w-full"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset to Defaults
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
