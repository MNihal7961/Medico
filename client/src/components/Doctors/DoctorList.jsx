import React from "react";
import DoctorCard from "./DoctorCard";
import useFetchData from "../../hooks/useFetchData";
import Loader from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import { BASE_URL } from "../../config";

const DoctorList = () => {
  const { data: doctors, loading, error } = useFetchData(`${BASE_URL}/doctor`);
  return (
    <>
      {loading && !error && <Loader />}
      {error && !loading && <Error errorMessage={error} />}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
        {!loading &&
          !error &&
          doctors.map((doctor) => (
            <DoctorCard key={doctor._id} doctor={doctor} />
          ))}
      </div>
    </>
  );
};

export default DoctorList;
