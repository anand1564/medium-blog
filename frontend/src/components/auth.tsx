import { SignupInput } from "anand-medium-common"
import { useState } from "react"
import { ChangeEvent } from "react"
import { Link } from "react-router-dom"
export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const [postInput, setPostInput] = useState<SignupInput>({
        username: "",
        password: "",
        email: ""
    });
    return (
        <div className="h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div className="px-12"> 
                    <div className="text-3xl font-extrabold">
                        Create an account
                    </div>
                    <div className="text-slate-400">
                     <Link className="pl-2 underline" to={type==="signin" ? "/signin" : "/signup"}>
                        {type==="signin" ? "Login" : "Create an account"}</Link>
                    </div>
                    <LabelledInput label="name" placeholder="Anand Pandey" onChange={(e) => {
                        setPostInput({
                            ...postInput,
                            username: e.target.value
                        })
                    }}>
                    </LabelledInput>
                    <LabelledInput label="email" placeholder="anand..@gmail.com" onChange={(e) => {
                        setPostInput({
                            ...postInput,
                            email: e.target.value
                        })
                    }}></LabelledInput>
                    <LabelledInput label="password" type={"password"} placeholder="Enter your password" onChange={(e) => {
                        setPostInput({
                            ...postInput,
                            password: e.target.value
                        })
                    }}></LabelledInput>
                </div>
            </div>
        </div>)
}
interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}
function LabelledInput({ label, placeholder, onChange }: LabelledInputType) {
    return <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">{label}</label>
        <input type="text" id="first_name" onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
    </div>
}