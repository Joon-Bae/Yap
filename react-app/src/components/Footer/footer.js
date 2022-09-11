import React from 'react';
import './footer.css'
import githubLogo from '../../Images/github-logo.svg'
import linkedinLogo from '../../Images/linkedin-logo.svg'

const Footer = () => {

    return (
        <>
        <div className='footer-container'>
            <div className='creator-footer'>
                <>
                <div className='joon-footer'>
                    <p className='name'>Created by Joon Bae</p>
                    <div className='socials'>
                    <a target='_blank' href='https://www.github.com/Joon-Bae'>
                        <img className='github-logo' src={githubLogo}/>
                    </a>
                    <a target='_blank' href='https://www.linkedin.com/in/joon-bae-b06a84199/'>
                        <img className='linkedin-logo' src={linkedinLogo}/>
                    </a>
                    </div>
                </div>
                </>
                <>
            <div className='technologies-used'>
                <ul className='technologies-used-list'>
                    <p className='technologies-1'>Technologies used</p>
                    <div className='footer-li'><li>Python</li></div>
                    <div className='footer-li'><li>React</li></div>
                    <div className='footer-li'><li>Redux</li></div>
                    <div className='footer-li'><li>Flask</li></div>
                    <div className='footer-li'><li>SQLAlchemy</li></div>
                </ul>
            </div>
                </>
                <>
            <div className='technologies-used-cont'>
                <ul className='technologies-used-list-cont'>
                    <p className='technologies-2'>Technologies used cont.</p>
                    <div className='footer-li'><li>Docker</li></div>
                    <div className='footer-li'><li>HTML</li></div>
                    <div className='footer-li'><li>CSS</li></div>
                    <div className='footer-li'><li>Javascript</li></div>
                </ul>
            </div>
                </>
            </div>
        </div>
        </>
    )
}

export default Footer
