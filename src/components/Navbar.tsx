import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="navbar bg-primary text-white py-3 px-6">
            <div className="flex-1">
                <img className="w-14 h-14" src="./ducs_logo.webp" alt="QuackTrack" />
                <a className="btn btn-ghost text-xl hover:rounded-md">QuackTrack</a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1 text-base">
                    <li>
                        <Link className="hover:rounded-md" to="/commute">
                Commute
                        </Link>
                    </li>
                    <li>
                        <Link className="hover:rounded-md" to="/travel">
                Travel
                        </Link>
                    </li>
                    <li>
                        <Link className="hover:rounded-md" to="/office">
                Office
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;