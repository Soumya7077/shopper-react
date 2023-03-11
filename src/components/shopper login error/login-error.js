import { Link } from "react-router-dom";

export function LoginError()
{
    return(
        <div className="container-fluid">
            <h3 className="text-danger">Invalid User id or Password</h3>
            <div>
                <Link to="/login">Try Again</Link>
            </div>

        </div>
    )
}