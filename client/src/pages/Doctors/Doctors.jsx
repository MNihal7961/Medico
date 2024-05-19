import React, { useEffect, useState } from "react";
import DoctorCard from "../../components/Doctors/DoctorCard";
import { doctors } from "../../assets/data/doctors";
import Testimonial from "../../components/Testimonial/Testimonial";
import useFetchData from "../../hooks/useFetchData";
import Loader from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import { BASE_URL } from "../../config";

const Doctors = () => {
  const [query, setQuery] = useState("");
  const [debounce, setDebounce] = useState("");
  const {
    data: doctors,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/doctor?query=${debounce}`);
  

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setDebounce(query);
    }, 700);

    return ()=> clearTimeout(timeOut)
  }, [query]);

  const handleSearch = () => {
    setQuery(query.trim());
  };
  return (
    <>
      <section className="bg-[#fff9ea]">
        <div className="container text-center">
          <h2 className="heading">Find a Doctor</h2>
          <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between">
            <input
              type="search"
              className="py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor"
              placeholder="Search Doctor By Name Or Specifications"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              className="btn mt-0 rounded-[0px] rounded-r-md"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          {loading && !error && <Loader />}
          {error && !loading && <Error errorMessage={error.message} />}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 ">
            {!loading &&
              !error &&
              doctors.map((doctor) => (
                <DoctorCard key={doctor._id} doctor={doctor} />
              ))}
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="heading text-center">What our users say</h2>
            <p className="text__para text-center">
              World-class healt care for everyone. Our services offer the best
              health services currently available now.
            </p>
          </div>
          <Testimonial />
        </div>
      </section>
    </>
  );
};

export default Doctors;
