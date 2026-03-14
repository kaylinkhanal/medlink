"use client";

import DonationProgressSection from "./DonationProgress";
import DonationOptionsSection from "./DonateOptions";
import { fundraiserData } from "./fundraiserData";


const Index = () => {
	const data = fundraiserData;
	const scrollToDonate = () => {
		document.getElementById("donate")?.scrollIntoView({ behavior: "smooth" });
	};
	return (
		<main className=" bg-zinc-100">
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
			</div>
		</main>
	);
};

export default Index;
