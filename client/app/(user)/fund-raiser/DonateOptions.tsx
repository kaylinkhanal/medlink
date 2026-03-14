import { useState } from "react";
import { CreditCard, Smartphone, Wallet } from "lucide-react";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogCancel,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fundraiserData } from "./fundraiserData";
import { HeartHandshakeIcon } from "lucide-react";

const presetAmounts = [100, 250, 500, 1000];

export default function DonationDialog() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(50);
  const [customAmount, setCustomAmount] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("card");

  const handlePresetClick = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomChange = (value: string) => {
    setCustomAmount(value);
    setSelectedAmount(null);
  };

  const activeAmount = customAmount ? Number(customAmount) : selectedAmount;
  const data = fundraiserData;

  return (
    <AlertDialog>
      {/* Trigger Button */}
      <AlertDialogTrigger asChild>
        <div className="group inline-flex  absolute top-4 right-20 cursor-pointer items-center gap-2 rounded-full border border-red-200  px-8 py-4 text-sm font-semibold text-red-700 shadow-sm transition-all duration-300 hover:bg-red-600 hover:text-white hover:shadow-md hover:-translate-y-0.5"
							>
								<HeartHandshakeIcon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
								Donate
        </div>
      </AlertDialogTrigger>

      {/* Popup Content */}
      <AlertDialogContent className="max-w-2xl p-0 overflow-hidden rounded-2xl">
        <div className="p-8 bg-white/70 backdrop-blur-xl">

          <AlertDialogTitle className="text-2xl font-bold text-slate-900 mb-6">
            Make a Donation
          </AlertDialogTitle>

          {/* Preset amounts */}
          <div className="mb-6">
            <label className="text-sm font-medium text-muted-foreground mb-3 block">
              Select amount
            </label>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {presetAmounts.map((amount) => (
                <button
                  key={amount}
                  onClick={() => handlePresetClick(amount)}
                  className={`h-14 rounded-xl text-lg font-semibold transition border ${
                    selectedAmount === amount
                      ? "bg-linear-to-r from-teal-500 to-sky-500 text-white scale-[1.02] shadow-xl"
                      : "bg-white text-slate-800 border hover:shadow-md"
                  }`}
                >
                  Rs{amount}
                </button>
              ))}
            </div>
          </div>

          {/* Custom amount */}
          <div className="mb-8">
            <label className="text-sm font-medium text-muted-foreground mb-3 block">
              Or enter custom amount
            </label>

            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                Rs.
              </span>

              <Input
                type="number"
                placeholder="Enter amount"
                value={customAmount}
                onChange={(e) => handleCustomChange(e.target.value)}
                className="pl-8 h-14 text-lg rounded-xl"
              />
            </div>
          </div>

          {/* Payment methods */}
          <div className="mb-8">
            <label className="text-sm font-medium text-muted-foreground mb-3 block">
              Payment method
            </label>

            <div className="grid grid-cols-3 gap-3">
              {[
                { id: "card", label: "Card", icon: CreditCard },
                { id: "fonpay", label: "fonpay", icon: Smartphone },
                { id: "E-sewa", label: "E-sewa", icon: Wallet },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setSelectedPayment(id)}
                  className={`flex items-center justify-center gap-2 h-12 rounded-xl text-sm font-medium border transition ${
                    selectedPayment === id
                      ? "bg-white/20 text-slate-900 border-white/30 shadow-inner"
                      : "bg-white text-muted-foreground hover:shadow-sm"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Donate button */}
          <Button
            className="w-full h-14 text-lg font-semibold rounded-xl bg-linear-to-r from-sky-600 to-teal-500 text-white shadow-xl"
            disabled={!activeAmount || activeAmount <= 0}
          >
            Donate {activeAmount ? `$${activeAmount}` : "Now"}
          </Button>

          <p className="text-center text-xs text-muted-foreground mt-4">
            Secured by MedLink Payment Gateway · 256-bit encryption
          </p>

          {/* Close button */}
          <div className="flex justify-end mt-6">
            <AlertDialogCancel>Close</AlertDialogCancel>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}