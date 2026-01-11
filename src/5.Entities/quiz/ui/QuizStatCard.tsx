import { cn } from "@/6.shared/lib";
import { ColorVariant, STAT_CARD_COLORS } from "../model/quiz.constants";

interface QuizStatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  color: ColorVariant;
}

const QuizStatCard = ({ icon, label, value, color }: QuizStatCardProps) => {
  return (
    <div
      className={cn(
        "flex items-center gap-3 p-4 rounded-xl border",
        STAT_CARD_COLORS[color]
      )}
    >
      <div className="shrink-0">{icon}</div>
      <div>
        <p className="text-xs font-medium opacity-80">{label}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export { QuizStatCard };
export type { QuizStatCardProps };
