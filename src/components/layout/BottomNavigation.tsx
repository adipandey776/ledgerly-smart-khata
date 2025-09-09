import { Button } from "@/components/ui/button";
import { Home, Users, Plus, BarChart3, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

export type TabType = "dashboard" | "customers" | "add" | "reports" | "settings";

interface BottomNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  const tabs = [
    { id: "dashboard" as const, label: "Dashboard", icon: Home },
    { id: "customers" as const, label: "Customers", icon: Users },
    { id: "add" as const, label: "Add", icon: Plus },
    { id: "reports" as const, label: "Reports", icon: BarChart3 },
    { id: "settings" as const, label: "Settings", icon: Settings },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-large z-50">
      <div className="flex items-center justify-around py-2 px-2 max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const isAddButton = tab.id === "add";
          
          return (
            <Button
              key={tab.id}
              variant={isAddButton ? "gradient" : "ghost"}
              size={isAddButton ? "icon-lg" : "icon"}
              className={cn(
                "flex flex-col gap-1 h-auto py-2",
                isAddButton && "rounded-full shadow-glow",
                !isAddButton && isActive && "text-primary bg-primary/10",
                !isAddButton && !isActive && "text-muted-foreground",
                !isAddButton && "px-2"
              )}
              onClick={() => onTabChange(tab.id)}
            >
              <Icon className={cn(
                isAddButton ? "w-6 h-6" : "w-5 h-5"
              )} />
              {!isAddButton && (
                <span className="text-xs font-medium">{tab.label}</span>
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
}