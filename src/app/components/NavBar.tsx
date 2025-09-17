import Link from "next/link";
import globe from "../../../public/globe.svg";
import Image from "next/image";
import Menu from "./Menu";


export default function NavBar(){
    

    return(
        <nav className="fixed w-full h-24 shadow-sm">
            <div className="flex justify-between items-center h-full w-full px-4 2xl:px-16">
                <Link href="/" className="mr-4">
                    <Image
                    src={globe}
                    alt="globe"
                    width={45}
                    height={30}
                    priority
                    />
                </Link>
                
                <div className="hidden md:flex">
                    <ul className="hidden sm:flex gap-15">
                        <Link href="/planner">
                            <li className="uppercase hover:border-b text-xl"> Planner </li>
                        </Link>
                        <Link href="/Placeholder1">
                            <li className="uppercase hover:border-b text-xl"> Placeholder1 </li>
                        </Link>
                        <Link href="/Placeholder2">
                            <li className="uppercase hover:border-b text-xl"> Planceholder2</li>
                        </Link>
                        <Link href="/resources">
                            <li className="uppercase hover:border-b text-xl"> Resources </li>
                        </Link>
                    </ul>
                </div>

                <div className="md:hidden">
                    <Menu />
                </div>
                
            </div>
        </nav>

    )
}

