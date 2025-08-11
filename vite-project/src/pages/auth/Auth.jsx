
const Auth = ({children}) => {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#5c3b58]">
            <div className="w-full max-w-md min-w-[420] px-6">
                {children}
            </div>
        </div>
    )
}

export default Auth
