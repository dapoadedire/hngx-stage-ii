import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export const Footer = () => {
    const year = new Date().getFullYear();

    return(
        <footer
        className=" my-8  p-4"
        >
            <div className="mx-auto flex
            max-w-[1244px] flex-col justify-between gap-8
            ">
            <section
            className=" flex justify-center gap-4
            "
            >
                <FaFacebook className="h-6 w-6 cursor-pointer"/>
                <FaInstagram className="h-6 w-6 cursor-pointer"/>
                <FaTwitter className="h-6 w-6 cursor-pointer"/>
                <FaYoutube className="h-6 w-6 cursor-pointer"/>
            </section>
            <section
            className=" flex flex-col justify-center gap-4 text-center
            md:flex-row md:text-left
            "
            >
                <a href="/">
                    Conditions of Use

                </a>
                <a href="/">
                    Privacy & Policy
                </a>
                <a href="/">
                    Press Room
                </a>
               
            </section>
            <section
            className=" flex justify-center gap-4"
            >
            <p
            className="text-center text-gray-600"
            >
                    &copy; {year} Movie App MovieBox by Adriana Eka Prayudha
                </p>
            </section>
            </div>
           
        </footer>
    )
}
