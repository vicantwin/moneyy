import { useEffect, useState } from "react";
import "src/styles/Countdown.css";

interface CountdownProps {
	initialTime: number;
}

const Countdown: React.FC<CountdownProps> = ({ initialTime }) => {
	const [time, setTime] = useState<number>(initialTime);
	const [isRunning, setIsRunning] = useState<boolean>(true);
	const [savedTime, setSavedTime] = useState<number>(initialTime);

	useEffect(() => {
		if (!isRunning) return;
		const timer = setInterval(() => {
			setTime((prev) => (prev > 0 ? prev - 1 : 0));
		}, 1000);
		return () => clearInterval(timer);
	}, [isRunning]);

	useEffect(() => {
		const handleKeyPress = (e: KeyboardEvent) => {
			if (e.key === "p") setIsRunning((prev) => !prev); // Pause/Resume:
			if (e.key === "r") setTime(savedTime); // Reset to last set time
			if (e.key === "t") {
				const hours = prompt("Enter hours:", "0");
				const minutes = prompt("Enter minutes:", "0");
				const seconds = prompt("Enter seconds:", "0");

				const totalSeconds =
					Number.parseInt(hours || "0", 10) * 3600 +
					Number.parseInt(minutes || "0", 10) * 60 +
					Number.parseInt(seconds || "0", 10);

				if (!Number.isNaN(totalSeconds) && totalSeconds >= 0) {
					setTime(totalSeconds);
					setSavedTime(totalSeconds); // Save new time for resets
				}
			}
		};
		document.addEventListener("keydown", handleKeyPress);
		return () => document.removeEventListener("keydown", handleKeyPress);
	}, [savedTime]);

	const formatTime = (seconds: number): string => {
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		const secs = seconds % 60;
		return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
	};

	return (
		<div className="countdown-container">
			{formatTime(time)
				.split("")
				.map((char, index) => (
					<span key={index} className="digit">
						{char}
					</span>
				))}
		</div>
	);
};

export default Countdown;
