"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
	Heart,
	Droplet,
	Ambulance,
	HeartPulse,
	Bed,
	HandCoins,
	HeartHandshakeIcon,
	Hand,
} from "lucide-react";

export default function Navbar() {
	// dropdown state
	const [categoriesOpen, setCategoriesOpen] = useState(false);

	// Close menus on outside click / escape
	const navRef = useRef(null);

	useEffect(() => {
		function handleClick(e) {
			if (navRef.current && !navRef.current.contains(e.target)) {
				setCategoriesOpen(false);
			}
		}

		function handleKey(e) {
			if (e.key === "Escape") {
				setCategoriesOpen(false);
			}
		}

		document.addEventListener("mousedown", handleClick);
		document.addEventListener("keydown", handleKey);
		return () => {
			document.removeEventListener("mousedown", handleClick);
			document.removeEventListener("keydown", handleKey);
		};
	}, []);

	const categories = [
		{
			name: "Blood Donation",
			icon: Droplet,
			bg: "bg-red-50",
			iconColor: "text-red-600",
		},
		{
			name: "Organ Donor Request",
			icon: Heart,
			bg: "bg-orange-50",
			iconColor: "text-orange-600",
		},
		{
			name: "ICU Bed Booking",
			icon: Bed,
			bg: "bg-blue-50",
			iconColor: "text-blue-600",
		},
		{
			name: "Ambulance",
			icon: Ambulance,
			bg: "bg-red-50",
			iconColor: "text-red-600",
		},
		{
			name: "Emergency Funding",
			icon: HandCoins,
			bg: "bg-emerald-50",
			iconColor: "text-emerald-600",
		},
		{
			name: "General Medical Emergency",
			icon: HeartPulse,
			bg: "bg-purple-50",
			iconColor: "text-purple-600",
		},
	];

	return (
		<header className="w-full shadow-sm bg-white/80 backdrop-blur-sm sticky top-0 z-40">
			<nav
				ref={navRef}
				className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
				aria-label="Primary navigation"
			>
				<div className="flex items-center justify-between h-20">
					<div className=" shrink-0 mr-4">
						<Link
							href="/"
							aria-label="Medlink home"
							className="flex items-center"
						>
							<div className="relative w-25 h-25 overflow-hidden  flex items-center justify-center rounded-full">
								<Image
									src="/medlink-nobg-logo.png"
									alt="Medlink"
									fill
									sizes="144px"
									className="object-contain"
								/>
							</div>
						</Link>
					</div>
					<div className="hidden md:flex md:items-center md:space-x-6">
						{/* Home */}
						<Link
							href="/"
							className="group relative px-3 py-2 text-sm font-medium tracking-wide text-slate-900 transition-colors duration-300"
						>
							Home
							<span className="absolute left-0 -bottom-0.5 h-[1.5px] w-0 bg-slate-900 transition-all duration-300 group-hover:w-full" />
						</Link>

						{/* Emergency dropdown trigger */}
						<div className="relative">
							<button
								type="button"
								aria-haspopup="true"
								aria-expanded={categoriesOpen}
								onClick={() => setCategoriesOpen((s) => !s)}
								className="group relative px-3 py-2 text-sm font-medium tracking-wide text-slate-900 transition-colors duration-300 flex items-center gap-1"
							>
								Emergency
								{/* dropdown arrow */}
								<svg
									className={`w-4 h-4 transition-transform duration-300 ${categoriesOpen ? "rotate-180" : ""}`}
									viewBox="0 0 20 20"
									fill="currentColor"
									aria-hidden
								>
									<path
										fillRule="evenodd"
										d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
										clipRule="evenodd"
									/>
								</svg>
								{/* underline */}
								<span className="absolute left-0 -bottom-0.5 h-[1.5px] w-0 bg-slate-900 transition-all duration-300 group-hover:w-full" />
							</button>

							{categoriesOpen && (
								<div
									role="menu"
									aria-label="Emergency"
									className="absolute left-0 mt-3 w-64 rounded-xl bg-white shadow-lg ring-1 ring-slate-200 p-2"
								>
									<ul className="space-y-1">
										{categories.map((c) => {
											const Icon = c.icon;
											return (
												<li key={c.name}>
													<a
														href={`${c.name.toLowerCase().replace(/\s+/g, "-")}`}
														role="menuitem"
														className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50"
													>
														<span className={`p-1.5 rounded-md ${c.bg}`}>
															<Icon className={`w-4 h-4 ${c.iconColor}`} />
														</span>
														{c.name}
													</a>
												</li>
											);
										})}
									</ul>
								</div>
							)}
						</div>

						{/* Map */}
						<Link
							href="/map"
							className="group relative px-3 py-2 text-sm font-medium tracking-wide text-slate-900 transition-colors duration-300"
						>
							Map
							<span className="absolute left-0 -bottom-0.5 h-[1.5px] w-0 bg-slate-900 transition-all duration-300 group-hover:w-full" />
						</Link>

						{/* Profile */}
						<Link
							href="/profile"
							className="group relative px-3 py-2 text-sm font-medium tracking-wide text-slate-900 transition-colors duration-300"
						>
							Profile
							<span className="absolute left-0 -bottom-0.5 h-[1.5px] w-0 bg-slate-900 transition-all duration-300 group-hover:w-full" />
						</Link>
					</div>

					{/* Right section : search + donations */}
					<div className="flex items-center gap-3">
						{/* Search icon */}
						<button
							type="button"
							aria-label="Search emergencies"
							className="p-2 rounded-md hover:bg-slate-100 text-slate-700"
						>
							<svg
								className="w-5 h-5"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								aria-hidden
							>
								<path
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z"
								/>
							</svg>
						</button>

						{/* About us + Donate section*/}
						<div className="hidden sm:flex items-center gap-2">
							<Link
								href="/AboutUs"
								className="px-3 py-1.5 border border-transparent rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50"
							>
								About Us
							</Link>
							<Link
								href="/donate"
								className="group inline-flex items-center gap-2 rounded-full border border-red-200  px-4 py-2 text-sm font-semibold text-red-700 shadow-sm transition-all duration-300 hover:bg-red-600 hover:text-white hover:shadow-md hover:-translate-y-0.5"
							>
								<HeartHandshakeIcon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
								Donate
							</Link>
						</div>
					</div>
				</div>
			</nav>
		</header>
	);
}
