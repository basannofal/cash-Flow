import Link from 'next/link'
import React from 'react'

const Header = ({ mainheading, tag1 = '', tag2, icon, btnname, btnlink = '' }) => {
    return (
        <>
            <div className="header">
                <div className="left">
                    <h1>{mainheading}</h1>
                    <ul className="breadcrumb">
                        {
                            tag2 ?
                                <li><a href="#">{tag1}</a></li>
                                :
                                <li><a href="#" className='active'>{tag1}</a></li>
                        }
                        {
                            tag2 ? <>
                                /
                                <li><a href="#" className="active">{tag2}</a></li>
                            </> : ""
                        }
                    </ul>
                </div>
                {btnname ?
                    <Link href={btnlink} className="report">
                        <i className={`bx ${icon}`}></i>
                        <span>{btnname}</span>
                    </Link>
                    : ""
                }
            </div>
        </>
    )
}

export default Header