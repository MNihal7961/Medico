import React from 'react'
import { formateDate } from '../../utils/formateDate'

const DoctorAbout = () => {
    return <div>
        <div>
            <h3 className='text-[20px] leading-[30px] text-headingColor font-semibold flex items-center gap-2'>
                About of
                <span className="text-irisBlueColor font-bold text-[24px] leading-9">
                    Nihal m
                </span>
            </h3>
            <p className="text__para">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis ipsa magnam ratione ducimus, libero ipsum, corporis rem sed eveniet aliquid, vero vel illo possimus odit dignissimos officia. Delectus quam ratione sit tenetur optio, facilis quia fugiat possimus rerum eligendi facere ducimus blanditiis, earum rem voluptas laboriosam nisi labore perferendis sunt.
            </p>
        </div>
        <div className="mt-12">
            <h3 className='text-[20px] leading-[30px] text-headingColor font-semibold'>Educations</h3>
            <ul className="pt-4 md:p-5">
                <li className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]">
                    <div>
                        <span className='text-irisBlueColor text-[15px] leading-6 font-semibold'>
                            {formateDate("12-04-2008")} - {formateDate("06-01-2012")}
                        </span>
                        <p className='text-[15px] leading-6 font-medium text-textColor'>
                            PHD in medicine
                        </p>
                    </div>
                    <p className='text-[14px] leading-5 font-medium text-textColor'>
                        Medical Collage, Delhi.
                    </p>
                </li>
                <li className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]">
                    <div>
                        <span className='text-irisBlueColor text-[15px] leading-6 font-semibold'>
                            {formateDate("03-10-2017")} - {formateDate("07-20-2022")}
                        </span>
                        <p className='text-[15px] leading-6 font-medium text-textColor'>
                            MBBS in general surgeon
                        </p>
                    </div>
                    <p className='text-[14px] leading-5 font-medium text-textColor'>
                        Medical Hospital, Kerala.
                    </p>
                </li>
            </ul>
        </div>
        <div className="mt-12">
            <h3 className='text-[20px] leading-[30px] text-headingColor font-semibold'>
                Experience  
            </h3>
            <ul className="grid sm:grid-cols-2 gap-[30px] pt-4 md:p-5">
                <li className="p-4 rounded bg-[#fff9ea]"> 
                    <span className="text-yellowColor text-[15px] leading-6 font-semibold">
                    {formateDate("12-04-2008")} - {formateDate("06-01-2012")}
                    </span>
                    <p className='text-[16px] leading-6 font-medium text-textColor'>
                            Junior Consultent
                    </p>
                    <p className='text-[14px] leading-5 font-medium text-textColor'>
                        Star Clinic, Delhi.
                    </p>
                </li>
                <li className="p-4 rounded bg-[#fff9ea]"> 
                    <span className="text-yellowColor text-[15px] leading-6 font-semibold">
                    {formateDate("12-04-2008")} - {formateDate("06-01-2012")}
                    </span>
                    <p className='text-[16px] leading-6 font-medium text-textColor'>
                            Senior Surgeon
                    </p>
                    <p className='text-[14px] leading-5 font-medium text-textColor'>
                        Care Clinic, Delhi.
                    </p>
                </li>
            </ul>
        </div>
    </div>
}

export default DoctorAbout