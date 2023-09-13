import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export const Footer = () => {
    const year = new Date().getFullYear();

    return(
        <footer
        className=" my-8 border-t border-gray-400 pt-4"
        >
            <div className="mx-auto max-w-[1244px]
            flex flex-col justify-between gap-8
            ">
            <section
            className=" flex justify-center gap-4
            "
            >
                <FaFacebook className="h-6 w-6"/>
                <FaInstagram className="h-6 w-6"/>
                <FaTwitter className="h-6 w-6"/>
                <FaYoutube className="h-6 w-6"/>
            </section>
            <section
            className=" flex justify-center gap-4 flex-col md:flex-row
            text-center md:text-left
            "
            >
                <p>
                    Conditions of Use

                </p>
                <p>
                    Privacy & Policy
                </p>
                <p>
                    Press Room
                </p>
               
            </section>
            <section
            className=" flex justify-center gap-4"
            >
            <p>
                    &copy; {year} Movie App MovieBox by Adriana Eka Prayudha
                </p>
            </section>
            </div>
           
        </footer>
    )
}
