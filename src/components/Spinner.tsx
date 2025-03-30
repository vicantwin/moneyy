import { useEffect } from "react";
import { navigate } from "astro:transitions/client";

export default function Spinner() {
	useEffect(() => {
		let ms = 1000; // Default to 1 second
		let redirectTo = "/"; // Default redirect

		const urlParams = new URLSearchParams(window.location.search);
		ms = Number.parseInt(urlParams.get("ms") || "1000", 10);
		redirectTo = urlParams.get("redirectTo") || "/";

		setTimeout(() => {
			navigate(redirectTo);
		}, ms);
	}, []);
	return <div></div>;
}
