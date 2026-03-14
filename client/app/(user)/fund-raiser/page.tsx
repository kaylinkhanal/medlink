"use client";

import DonationProgressSection from "./DonationProgress";
import DonationOptionsSection from "./DonateOptions";
import FooterSection from "./FooterSection";
import { fundraiserData } from "./fundraiserData";
import { HeartHandshakeIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

const Index = () => {
	const data = fundraiserData;

	const scrollToDonate = () => {
		document.getElementById("donate")?.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<main className="min-h-screen bg-zinc-100 py-8">
			
			<div>
				<div className=" grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Left: main content */}
					<div className="lg:col-span-2 space-y-8">
						<div className="bg-transparent">
							<DonationProgressSection
								raisedAmount={data.raisedAmount}
								goalAmount={data.goalAmount}
								donorCount={data.donorCount}
								lastDonation={data.recentDonations[0]}
							/>
						</div>

						<div className="bg-transparent">
							<DonationOptionsSection />
						</div>
					</div>
				</div>

				{/* Footer */}
				{/* <div className="mt-12">
					<FooterSection />
				</div> */}
			</div>
		</main>
	);
};

export default Index;
