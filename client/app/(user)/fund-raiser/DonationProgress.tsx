import { TrendingUp, Users, Clock } from "lucide-react";
import { fundraiserData } from "./fundraiserData";

interface DonationProgressSectionProps {
  raisedAmount: number;
  goalAmount: number;
  donorCount: number;
  lastDonation: { name: string; amount: number; time: string };
}

const DonationProgressSection = ({
  raisedAmount,
  goalAmount,
  donorCount,
  lastDonation,
}: DonationProgressSectionProps) => {
  const percentage = Math.min((raisedAmount / goalAmount) * 100, 100);

const data = fundraiserData;

  return (
    <section className="container min-w-6xl mx-20  px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-4xl  text-center font-extrabold text-slate-900 mb-8">Donation Progress</h2>

        <div className="rounded-2xl font-stretch-50% bg-white/60 backdrop-blur-md ring-1 ring-white/30 shadow-xl p-8">
        <div className="text-xl">{data.title}</div>
          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex justify-between items-baseline mb-3">
              <span className="text-3xl font-bold text-foreground">Rs.{raisedAmount.toLocaleString()}</span>
              <span className="text-muted-foreground">Goal of Rs.{goalAmount.toLocaleString()}</span>
            </div>
            <div className="w-full h-4 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-progress rounded-full animate-progress-fill bg-linear-to-r from-teal-400 to-sky-500"
								style={{ width: `${Math.min(100, Math.round((data.raisedAmount / data.goalAmount) * 100))}%` }}
              />
            </div>
          </div>
          <div className="text-center p-4 rounded-xl bg-white/40 backdrop-blur-sm border border-white/20">
              <div className="text-sm font-normal">{data.description}</div>
            </div>
            {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="text-center p-4 rounded-xl bg-white/40 backdrop-blur-sm border border-white/20">
              <TrendingUp className="w-5 h-5 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{Math.round(percentage)}%</div>
              <div className="text-sm text-muted-foreground">Funded</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-white/40 backdrop-blur-sm border border-white/20">
              <Users className="w-5 h-5 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{donorCount}</div>
              <div className="text-sm text-muted-foreground">Donors</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-white/40 backdrop-blur-sm border border-white/20">
              <Clock className="w-5 h-5 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">12</div>
              <div className="text-sm text-muted-foreground">Days Left</div>
            </div>
          </div>

          {/* Latest donation ticker */}
          <div className="flex items-center gap-3 p-4 rounded-xl bg-white/30 border border-white/10">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-foreground">
              <span className="font-semibold">{lastDonation.name}</span> donated{" "}
              <span className="font-semibold text-primary">Rs.{lastDonation.amount}</span>{" "}
              {lastDonation.time}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonationProgressSection;
