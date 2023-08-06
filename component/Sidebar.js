import React, { useEffect } from 'react'

const Sidebar = () => {

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
            <div class="sidebar">
                <a href="#" class="logo">
                    <i class='bx bx-code-alt'></i>
                    <div class="logo-name"><span>Asmr</span>Prog</div>
                </a>
                <ul class="side-menu">
                    <li><a href="#"><i class='bx bxs-dashboard'></i>Dashboard</a></li>
                    <li><a href="#"><i class='bx bx-store-alt'></i>Shop</a></li>
                    <li class="active"><a href="#"><i class='bx bx-analyse'></i>Analytics</a></li>
                    <li><a href="#"><i class='bx bx-message-square-dots'></i>Tickets</a></li>
                    <li><a href="#"><i class='bx bx-group'></i>Users</a></li>
                    <li><a href="#"><i class='bx bx-cog'></i>Settings</a></li>
                </ul>
                <ul class="side-menu">
                    <li>
                        <a href="#" class="logout">
                            <i class='bx bx-log-out-circle'></i>
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