import localFont from "next/font/local";

export const inter = localFont({
	src: [
		{
			path: "../../app/fonts/Inter-Regular.ttf",
			weight: "400",
			style: "normal",
		},
		{
			path: "../../app/fonts/Inter-Bold.ttf",
			weight: "700",
			style: "normal",
		},
	],
	variable: "--font-inter",
	display: "swap",
});

export const lusitana = localFont({
	src: [
		{
			path: "../../app/fonts/Lusitana-Regular.ttf",
			weight: "400",
			style: "normal",
		},
		{
			path: "../../app/fonts/Lusitana-Bold.ttf",
			weight: "700",
			style: "normal",
		},
	],
	variable: "--font-lusitana",
	display: "swap",
});

// import { Inter, Lusitana } from 'next/font/google';

// export const inter = Inter({ subsets: ['latin'] });
// export const lusitana = Lusitana({ subsets: ['latin'], weight: ["400", "700"] })
