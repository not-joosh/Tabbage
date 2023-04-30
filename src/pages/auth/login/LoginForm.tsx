interface LoginFormProps {
    handleNav: () => void;
    handleSubmit: (data: any) => void;
    register: any;
    errors: any;
};

export const LoginForm = ({handleNav, handleSubmit, errors, register}: LoginFormProps) => {
    return (
        <div className = "liploginFORM">
            <div className ="">
                <form onSubmit= { handleSubmit }>
                    <input 
                        className = "lipinputEmail"
                        placeholder = "Email..." 
                        type = "text" 
                        {...register("userEmail")}
                    />
                    <input 
                        className = "lipinputPassword" 
                        placeholder = "Password..." 
                        type = "password" 
                        {...register("userPassword")}
                    />
                    <input 
                        className = "liploginBtn" 
                        type = "submit" 
                        value="Login"
                        style = {{
                            background: 'linear-gradient(to top, #c7bcf8, #484262)',
                        }}
                    /> 
                </form>
                <button 
                    className ="lipsignupBtn"
                    onClick = { handleNav }
                >Sign Up</button>
            </div>
        </div>
    );
};