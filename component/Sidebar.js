import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { MdPeople } from 'react-icons/md'

const Sidebar = () => {

    const router = useRouter();

    // logout code 
    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem("is_login");
        router.push("/login")
    }

    useEffect(() => {
        const sideLinks = document.querySelectorAll('.sidebar .side-menu li a:not(.logout)');

        sideLinks.forEach(item => {
            const li = item.parentElement;
            item.addEventListener('click', () => {
                sideLinks.forEach(i => {
                    i.parentElement.classList.remove('active');
                })
                li.classList.add('active');
            })
        });
    }, []);
    return (
        <>
            {/* Sidebar  */}
            <div className="sidebar">
                <Link href="/" className="logo">
                    <i className='bx bx-code-alt'></i>
                    <div className="logo-name"><span>Asmr</span>Prog</div>
                </Link>
                <ul className="side-menu">
                    <li className="active"><Link href='/'><i className='bx bxs-dashboard'></i>Dashboard</Link></li>
                    <li><Link href='/category'><i className='bx bx-analyse'> </i>Category</Link></li>
                     <li><Link href='/memberlist'> <MdPeople className='bx' />Member List</Link></li> 
                    <li><Link href='/user'><i className='bx bx-group'></i>Users</Link></li>
                    <li><Link href='/payment'><i className='bx bx-message-square-dots'></i>Add Payment</Link></li>
                    <li><Link href='/borrowmoney'><i className='bx bx-message-square-dots'></i>Borrow Payment</Link></li>
                    <li><a><i className='bx bx-cog'></i>Settings</a></li>
                </ul>
                <ul className="side-menu">
                    <li onClick={handleLogout}>
                        <a href="#" className="logout">
                            <i className='bx bx-log-out-circle'></i>
                            Logout
                        </a>
                    </li>
                </ul>
            </div>
            {/* End of Sidebar  */}
        </>
    )
}

export default Sidebar