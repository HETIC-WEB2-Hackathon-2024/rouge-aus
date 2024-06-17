import {useNavigate} from "react-router";

export default function Navbar() {
    const navigation = useNavigate()

    const navbarList = [
        {
            name: 'Dashboard',
            path: '/dashboard'
        },
        {
            name: 'Offres',
            path: '/offres'
        },
        {
            name: 'Selection',
            path: '/selection'
        },
    ]

    return (
        <div className="navbar">
            <div className="navlist">
                <ul>
                    {navbarList.map((el, index) => {
                        return (
                            <li onClick={() => navigation(el.path)}>
                                {el.name}
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}