import React from 'react'
import { Link } from 'react-router-dom'
import aboutimg from '../../assets/images/about.png'
import aboutcard from '../../assets/images/about-card.png'

const About = () => {
  return <section>
    <div className="container">
        <div className="flex justify-between gap-[50px] lg:gap-[130px] xl:gap-0 flex-col lg:flex-row ">
            {/* ===== ABOUT IMG ===== */}
            <div className="relative w-3/4 lg:w-1/2 xl:w-[770px] z-10 order-2 lg:order-1">
                <img src={aboutimg} alt="about-img"/>
                <div className="absolute z-20 bottom-4 w-[200px] md:w-[300px] right-[-30%] md:right-[-7%] lg:right-[22%]">
                    <img src={aboutcard} alt="aboutcard" />
                </div>
            </div>
            {/* ===== ABOUT CONTENT ===== */}
            <div className="w-full lg:w-1/2 xl:w-[670px] order-1 lg:order-2">
                <h2 className='heading'>
                    Proud to be one of the nations best
                </h2>
                <p className='text__para'>
                    For 30 years in a row, Indian News & World report has recognised us
                    as one of the best public social doctor booking website in the nation
                    and #1 in Kerala.
                </p>
                <p className='text__para mt-[30px]'>
                    Our best is something we strive for each day, caring for our
                    patients-not looking back at what we accomplished but towards what
                    we can do tommorrow. Providing the best.
                </p>
                <Link to='/'>
                    <button className="btn ">Learnmore</button>
                </Link>
            </div>
        </div>
    </div>
  </section>
}

export default About