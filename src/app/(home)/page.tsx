import HomeComponents from "@/components/pages/home/HomeComponents";
import { generateMetadata } from "@/lib/seo";

export const metadata = generateMetadata({
	title: "Alert-go",
	description: "Лёгкие, быстрые и кастомизируемые уведомления",
	url: "https://alert-go-playground.vercel.app/",
	image: "/image.png",
});

const Home = () => <HomeComponents />;

export default Home;
