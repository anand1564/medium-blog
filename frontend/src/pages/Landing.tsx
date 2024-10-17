import { useNavigate } from "react-router-dom"


export default function Landing () {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen w-full bg-amber-50 font-medium">
            <nav className="w-full flex flex-row justify-around p-3">
                <h1 className="text-3xl font-bold text-black">Medium</h1>
                <ul className="flex flex-row items-end gap-5 font-sans">
                    <li className="p-2"><a href="">Our story</a></li>
                    <li className="p-2"><a href="">Membership</a></li>
                    <li className="p-2"><a href="">Write</a></li>
                    <li className="p-2"><a href="">Sign in</a></li>
                    <button className="bg-black text-white px-4 py-1.5 rounded-2xl" onClick={()=>navigate('/signup')}>Get Started</button>
                </ul>
            </nav>
            <hr className="w-full border-1 border-black" />
            <div className="w-full flex flex-rows justify-around mt-2">
                <div className="w-full md:w-1/2 p-10 mt-20">
                <h1 className="font-serif text-8xl font-light leading-11">Human<br />stories&ideas</h1>
                <p className="text-lg mt-10">A place to read, write, and deepen your understanding</p>
                <button className="bg-black text-white px-8 py-2 rounded-2xl mt-10">Start Reading</button>
                </div>
                <img src="https://miro.medium.com/v2/format:webp/4*SdjkdS98aKH76I8eD0_qjw.png" width={460} height={600}/>
            </div>
            <hr className="w-full border-1 border-black" />
            <div className="w-full">
                <ul className="flex justify-center gap-2 items-center p-2 font-sans">
                    <li><a>Help</a></li>
                    <li><a>Status</a></li>
                    <li><a>About</a></li>
                    <li><a>Press</a></li>
                    <li><a>Blog</a></li>
                    <li><a>Privacy</a></li>
                    <li><a>Teams</a></li>
                </ul>
            </div>
        </div>
    )
}