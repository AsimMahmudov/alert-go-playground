"use client";

import React, { useState } from "react";

const HowInstall = () => {
	const [activeTab, setActiveTab] = useState<"npm" | "pnpm" | "bun">("npm");
	const [copyStatusInstall, setCopyStatusInstall] = useState<string>("");
	const [copyStatusCss, setCopyStatusCss] = useState<string>("");

	const installCommands = {
		npm: "npm install alert-go",
		pnpm: "pnpm add alert-go",
		bun: "bun add alert-go",
	};

	const cssImport = "import 'alert-go/dist/notifier.css';";

	const handleCopyInstall = async () => {
		try {
			await navigator.clipboard.writeText(installCommands[activeTab]);
			setCopyStatusInstall("Скопировано!");
			setTimeout(() => setCopyStatusInstall(""), 2000);
		} catch {
			setCopyStatusInstall("Ошибка");
			setTimeout(() => setCopyStatusInstall(""), 2000);
		}
	};

	const handleCopyCss = async () => {
		try {
			await navigator.clipboard.writeText(cssImport);
			setCopyStatusCss("Скопировано!");
			setTimeout(() => setCopyStatusCss(""), 2000);
		} catch {
			setCopyStatusCss("Ошибка");
			setTimeout(() => setCopyStatusCss(""), 2000);
		}
	};

	return (
		<div className="mx-auto">
			<h2 className="text-xl font-bold text-gray-800 mb-4">
				Установка и подключение
			</h2>

			<div className="flex w-full items-end gap-8 md:flow-row flex-col">
				<div className="w-full">
					{/* Табы */}
					<div className="flex border-b border-gray-200 mb-4">
						{(["npm", "pnpm", "bun"] as const).map((tab) => (
							<button
								key={tab}
								onClick={() => setActiveTab(tab)}
								className={`px-4 py-2 font-medium text-sm rounded-t-lg border ${
									activeTab === tab
										? "bg-white border-gray-200 text-blue-600 border-b-transparent"
										: "text-gray-500 hover:text-gray-700 border-transparent"
								}`}>
								{tab}
							</button>
						))}
					</div>

					{/* Команда установки */}
					<div className="bg-gray-900 rounded-lg p-4 relative ">
						<pre className="text-[#7ed6ff] text-sm overflow-x-auto">
							{installCommands[activeTab]}
						</pre>
						<button
							onClick={handleCopyInstall}
							className="absolute top-2 right-2 bg-gray-800 hover:bg-gray-700 text-white text-xs px-2 py-1 rounded transition">
							{copyStatusInstall || "Копировать"}
						</button>
					</div>
				</div>

				<div className="w-full">
					<h3 className="text-sm font-medium text-gray-700 mb-2">
						Подключите стили в вашем корневом layout-файле:
					</h3>
					<div className="bg-gray-900 rounded-lg p-4 relative">
						<pre className="text-[#7ed6ff] text-sm overflow-x-auto">
							{cssImport}
						</pre>
						<button
							onClick={handleCopyCss}
							className="absolute top-2 right-2 bg-gray-800 hover:bg-gray-700 text-white text-xs px-2 py-1 rounded transition">
							{copyStatusCss || "Копировать"}
						</button>
					</div>
					 
				</div>
			</div>

			{/* Подключение стилей */}
		</div>
	);
};

export default HowInstall;
