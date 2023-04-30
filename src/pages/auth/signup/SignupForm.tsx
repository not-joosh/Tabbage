
interface SignupFormProps {
    handleSubmit: (data: any) => void;
    register: any;
    errors: any;
};

export const SignupForm: React.FC<SignupFormProps> = ({ handleSubmit, register, errors, }) => {
  return (
    <div className = 'signupwrapper'>
        <div className="signupformbox">
            <form className = "signupform" onSubmit={handleSubmit}>
                <div className="signupinputgroup">
                    <input
                        className="signupnamefield"
                        type="text"
                        placeholder="Full Name..."
                        {...register("fullName")}
                    />
                    <input
                        className="signupusernamefield"
                        type="text"
                        placeholder="Username..."
                        {...register("userName")}
                    />
                    <input
                        className="signupemailfield"
                        type="email"
                        placeholder="Email..."
                        {...register("email")}
                    />
                    <input
                        className="signuppasswordfield"
                        type="password"
                        placeholder="Password..."
                    {...register("password")}
                    />
                    <input
                        className="signupconfirmfield"
                        type="password"
                        placeholder="Confirm Password..."
                        {...register("confirmPassword")}
                    />
                </div>
                <div className="signupoptionsgroup">
                    <input
                        className="signupdelivery"
                        type="radio"
                        value="driver"
                        {...register("accountType")}
                    />
                    <label className="signupdeliverytext">Tabbage Delivery</label>
                    <br />
                    <input
                        className="signupbusiness"
                        type="radio"
                        value="merchant"
                        {...register("accountType")}
                    />
                    <label className="signupbusinesstext">Business/Merchant</label>
                    <br />
                    <input
                        className="signuppersonal"
                        type="radio"
                        value="customer"
                        {...register("accountType")}
                    />
                    <label className="signuppersonaltext">Personal Use</label>
                    <br />
                </div>
                <input 
                    className="signupcreatebtn" 
                    type="submit" 
                    value="Create Account" 
                    style = {{
                        background: '#484262',
                        color: 'white',
                    }}
                />
            </form>
        </div>
    </div>
    );
};