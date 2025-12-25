import { Description } from "@/components/ui/text/Description";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="  bottom-0 left-0 w-full border-transparent border-t border-gray-300  py-3">

			<div className="container flex justify-center items-center">
				<Link href={`https://twin-core-ui.vercel.app/`} target={"_blank"}>
					<Description className="md:text-[18px] font-bold rounded-[6px] px-3 text-[18px] bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent    ">
						Разработал TwinCore
					</Description>
				</Link>
			</div>
		</footer>
  );
};

export default Footer;