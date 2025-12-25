"use client";

import { useState, useEffect } from "react";
import { toast } from "alert-go";
import HowInstall from "./HowInstall";

const positions = [
	"top-left",
	"top-center",
	"top-right",
	"bottom-left",
	"bottom-center",
	"bottom-right",
] as const;
const types = ["success", "error", "warning", "default"] as const;

const baseColors: Record<string, { bg: string; color: string }> = {
	success: { bg: "#10b981", color: "#ffffff" },
	error: { bg: "#ef4444", color: "#ffffff" },
	warning: { bg: "#f59e0b", color: "#ffffff" },
	default: { bg: "#6b7280", color: "#ffffff" },
};

const typeColors: Record<string, string> = {
	success: "bg-green-500",
	error: "bg-red-500",
	warning: "bg-amber-500",
	default: "bg-gray-500",
};

export default function AlertGoPlayground() {
	const [position, setPosition] =
		useState<(typeof positions)[number]>("top-left");
	const [type, setType] = useState<(typeof types)[number]>("success");
	const [duration, setDuration] = useState<number>(3000);
	const [message, setMessage] = useState<string>("Hello world");
	const [copyStatus, setCopyStatus] = useState<string>("");
	const [copyCssStatus, setCopyCssStatus] = useState<string>("");

	const [currentColor, setCurrentColor] = useState(baseColors[type]);

	useEffect(() => {
		setCurrentColor(baseColors[type]);
	}, [type]);

	useEffect(() => {
		const styleId = "alert-go-dynamic-styles";
		let styleTag = document.getElementById(styleId) as HTMLStyleElement;
		if (!styleTag) {
			styleTag = document.createElement("style");
			styleTag.id = styleId;
			document.head.appendChild(styleTag);
		}
		styleTag.textContent = `.notify.${type} {
  background: ${currentColor.bg} !important;
  color: ${currentColor.color} !important;
}`;
	}, [type, currentColor]);

	const handleShowToast = () => {
		if (type === "default") toast(message, { position, duration });
		else if (type === "success") toast.success(message, { position, duration });
		else if (type === "error") toast.error(message, { position, duration });
		else if (type === "warning") toast.warning(message, { position, duration });
	};

	const codeExample =
		type === "default"
			? `toast("${message}", {\n  position: "${position}",\n  duration: ${duration}\n});`
			: `toast.${type}("${message}", {\n  position: "${position}",\n  duration: ${duration}\n});`;

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(codeExample);
			setCopyStatus("Скопировано!");
			setTimeout(() => setCopyStatus(""), 2000);
		} catch {
			setCopyStatus("Ошибка");
			setTimeout(() => setCopyStatus(""), 2000);
		}
	};

	const currentCss = `.notify.${type} {
  background: ${currentColor.bg} !important;
  color: ${currentColor.color} !important;
}`;

	const handleCopyCss = async () => {
		try {
			await navigator.clipboard.writeText(currentCss);
			setCopyCssStatus("Скопировано!");
			setTimeout(() => setCopyCssStatus(""), 2000);
		} catch {
			setCopyCssStatus("Ошибка");
			setTimeout(() => setCopyCssStatus(""), 2000);
		}
	};

	const updateBg = (value: string) =>
		setCurrentColor((prev) => ({ ...prev, bg: value }));
	const updateColor = (value: string) =>
		setCurrentColor((prev) => ({ ...prev, color: value }));
	const resetColors = () => setCurrentColor(baseColors[type]);

	return (
		<div className="max-w-4xl mx-auto p-4 sm:p-6">
			<div className="text-center mb-8">
				<h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
					Alert-go
				</h1>
				<p className="text-gray-600 mt-2">
					Лёгкие, быстрые и кастомизируемые уведомления
				</p>
			</div>

			<HowInstall />

			<div className="my-8 text-center">
      <p className="text-gray-600 max-w-2xl mx-auto">
        Теперь, когда библиотека установлена, настройте уведомление под свой стиль — 
        выберите позицию, тип, длительность и даже цвета!
      </p>
    </div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
				<div className="space-y-5">
					<div>
						<label className="block text-sm font-medium text-gray-800 mb-2">
							Позиция
						</label>
						<div className="grid grid-cols-3 gap-2">
							{positions.map((pos) => (
								<button
									key={pos}
									onClick={() => setPosition(pos)}
									className={`py-2.5 px-3 rounded-lg text-sm font-medium transition-all ${
										position === pos
											? "bg-blue-500 text-white shadow-md"
											: "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
									}`}>
									{pos}
								</button>
							))}
						</div>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-800 mb-2">
							Тип уведомления
						</label>
						<div className="flex flex-wrap gap-2">
							{types.map((t) => (
								<button
									key={t}
									onClick={() => setType(t)}
									className={`px-4 py-2 rounded-lg text-sm border font-medium capitalize transition-all flex items-center gap-1.5 ${
										type === t
											? `${typeColors[t]} text-white shadow-md`
											: "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
									}`}>
									<div
										className={`w-2 h-2 rounded-full border ${typeColors[
											t
										].replace("bg-", "bg-")}`}></div>
									{t}
								</button>
							))}
						</div>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-800 mb-2">
							Длительность: <span className="font-mono">{duration} мс</span>
						</label>
						<input
							type="range"
							min="500"
							max="10000"
							step="500"
							value={duration}
							onChange={(e) => setDuration(Number(e.target.value))}
							className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-800 mb-2">
							Сообщение
						</label>
						<textarea
							value={message}
							onChange={(e) => setMessage(e.target.value)}
							className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							rows={2}
						/>
					</div>

					<div className="pt-4 border-t border-gray-200">
						<div className="flex items-center gap-2 mb-2">
							<h3 className="text-sm font-medium text-gray-800">
								Стили (по желанию)
							</h3>
							<span className="text-xs text-gray-500">— не обязательно</span>
						</div>
						<p className="text-xs text-gray-600 mb-3">
							Подберите идеальные цвета и скопируйте CSS в свой проект.
						</p>

						<div className="space-y-3">
							<div>
								<label className="block text-xs text-gray-600 mb-1">
									background
								</label>
								<div className="flex items-center gap-2">
									<input
										type="color"
										value={currentColor.bg}
										onChange={(e) => updateBg(e.target.value)}
										className="w-8 h-8 rounded cursor-pointer border-0"
									/>
									<input
										type="text"
										value={currentColor.bg}
										onChange={(e) => updateBg(e.target.value)}
										className="text-xs border border-gray-300 px-2 py-1.5 w-24 rounded"
									/>
								</div>
							</div>
							<div>
								<label className="block text-xs text-gray-600 mb-1">
									color
								</label>
								<div className="flex items-center gap-2">
									<input
										type="color"
										value={currentColor.color}
										onChange={(e) => updateColor(e.target.value)}
										className="w-8 h-8 rounded cursor-pointer border-0"
									/>
									<input
										type="text"
										value={currentColor.color}
										onChange={(e) => updateColor(e.target.value)}
										className="text-xs border border-gray-300 px-2 py-1.5 w-24 rounded"
									/>
								</div>
							</div>
						</div>

						<button
							onClick={resetColors}
							className="mt-3 text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-3.5 w-3.5"
								viewBox="0 0 20 20"
								fill="currentColor">
								<path
									fillRule="evenodd"
									d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h4.001a1 1 0 011 1v5a1 1 0 01-1 1h-5a1 1 0 010-2h2.999a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
									clipRule="evenodd"
								/>
							</svg>
							Сбросить цвета
						</button>
					</div>

					<button
						onClick={handleShowToast}
						className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-[1.02] active:scale-[0.98]">
						Показать уведомление
					</button>
				</div>

				<div className="space-y-6 mt-7">
					<div className="bg-gray-900 rounded-xl p-4 relative overflow-hidden">
						<h2 className="text-white font-medium mb-2 text-sm">
							Пример использования
						</h2>
						<pre className="text-[#7ed6ff] text-sm overflow-x-auto whitespace-pre">
							{codeExample}
						</pre>
						<button
							onClick={handleCopy}
							className="absolute top-2 right-2 bg-gray-800 hover:bg-gray-700 text-white text-[11px] px-2 py-1 rounded transition">
							{copyStatus || "Копировать"}
						</button>
					</div>

					<div className="bg-white rounded-xl border border-gray-200 p-4">
						<h2 className="font-semibold text-gray-800 mb-2">Живой просмотр</h2>
						<p className="text-gray-600 text-sm mb-4">
							Нажмите кнопку, чтобы увидеть уведомление в выбранной позиции.
						</p>

						<div className="border-t border-gray-200"></div>

						<div className="mt-3">
							<div className="flex items-center gap-2 mb-2">
								<h3 className="text-sm font-medium text-gray-800">
									Стили (по желанию)
								</h3>
								<span className="text-xs text-gray-500">— не обязательно</span>
							</div>
							<h3 className="text-sm font-medium text-gray-800 mb-2">
								CSS для{" "}
								<span
									className={`font-mono px-1.5 py-0.5 rounded ${typeColors[type]} text-white`}>
									.{type}
								</span>
							</h3>
							<div className="relative">
								<pre className="bg-gray-900 text-[#7ed6ff] p-3 rounded-lg text-[13px] overflow-x-auto">
									{currentCss}
								</pre>
								<button
									onClick={handleCopyCss}
									className="absolute top-2 right-2 bg-gray-800 hover:bg-gray-700 text-white text-[10px] px-1.5 py-0.5 rounded transition">
									{copyCssStatus || "Копировать CSS"}
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
