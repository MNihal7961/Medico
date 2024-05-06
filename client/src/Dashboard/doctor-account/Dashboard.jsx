import React, { useState } from "react";
import Loader from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import useGetProfile from "../../hooks/useFetchData";
import { BASE_URL, token } from "../../config";
import Tabs from "./Tabs";
import avatar from "../../assets/images/doctor-img01.png";
import starIcon from "../../assets/images/Star.png";
import DoctorAbout from "../../pages/Doctors/DoctorAbout";
import Profile from "./Profile";
import Appointments from "./Appointments";

const Dashboard = () => {
  const { data, loading, error } = useGetProfile(
    "http://localhost:3000/doctor/profile/me"
  );
  console.log(data, "dfghjk");

  const [tab, setTab] = useState("overview");
  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        {loading && !error && <Loader />}
        {error && !loading && <Error errorMessage={error} />}
        {!error && !loading && (
          <div className="grid lg:grid-cols-3 gap-[30px] lg:gap-[50px]">
            <Tabs tab={tab} setTab={setTab} />
            <div className="lg:col-span-2">
              {data.isApproved == "pending" && (
                <div className="flex p-4 mb-4 text-yellow-800  bg-yellow-50 rounded-lg">
                  <span className="sr-only">Info</span>
                  <div className="ml-3 text-sm font-medium">
                    To get approval please complete your profile . we&apos;ll
                    review all manually and approve within 3 days.
                  </div>
                </div>
              )}
              <div className="mt-8">
                {tab === "overview" && (
                  <div>
                    <div className="flex items-center gap-4 mb-10">
                      <figure className="max-w-[200px] max-h-[200px]">
                        <img
                          src={data?.photo ? data.photo : avatar}
                          alt="profile-pic"
                          className="w-full"
                        />
                      </figure>
                      <div className="">
                        <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-4 lg:py-2 lg:px-6 rounded text-[12px] leading-4 lg:text-[16px] lg:leading-6 font-semibold">
                          {data?.specialization ? data?.specialization : "NA"}
                        </span>
                        <h3 className="text-[22px] leading-9 font-bold text-headingColor mt-3">
                          {data?.name}
                        </h3>
                        <div className="flex items-center gap-[6px]">
                          <span className="flex items-center gap-[6px] text-textColor text-[14px] leading-5 lg:text-[16px] lg:leading-6 font-semibold">
                            <img src={starIcon} alt="star-logo" />
                            {data?.averageRating
                              ? data?.averageRating
                              : "NA"}
                          </span>
                          <span className="text-textColor text-[14px] leading-5 lg:text-[16px] lg:leading-6 font-semibold">
                            ({data?.totalRating})
                          </span>
                        </div>
                        <p
                          className={`${
                            !data?.bio ? "text-red-600" : "text__para"
                          } text__para font-[15px] lg:max-w-[390px] leading-6`}
                        >
                          {data?.bio ? data?.bio : "No Bio Added"}
                        </p>
                      </div>
                    </div>
                    <DoctorAbout
                      name={data?.name}
                      about={data?.about}
                      qualifications={data?.qualifications}
                      experiences={data?.experiences}
                    />
                  </div>
                )}
                {tab === "appointments" && <Appointments appointments={data.appointments}/>}
                {tab === "profile" && <Profile doctorData={data} />}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
