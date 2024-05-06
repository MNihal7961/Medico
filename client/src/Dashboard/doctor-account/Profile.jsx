import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import uploadImageToCloudinary from "../../utils/uploadCloudinary";
import { toast } from "react-toastify";
import { token } from "../../config";

const Profile = ({ doctorData }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: doctorData?.email,
    password: doctorData?.password,
    phone: "",
    bio: "",
    gender: "",
    specialization: "",
    ticketPrice: 0,
    qualifications: [],
    experiences: [],
    timeSlots: [],
    about: "",
    photo: selectedFile,
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    const data = await uploadImageToCloudinary(file);
    console.log(data);
    setPreviewURL(data.url);
    setSelectedFile(data.url);
    setFormData({ ...formData, photo: data?.url });
  };

  const addItem = (key, item) => {
    setFormData((previousFormData) => ({
      ...previousFormData,
      [key]: [...previousFormData[key], item],
    }));
  };

  useEffect(() => {
    setFormData({
      name: doctorData?.name,
      email: doctorData?.email,
      password: doctorData?.password,
      phone: doctorData?.phone,
      bio: doctorData?.bio,
      gender: doctorData?.gender,
      specialization: doctorData?.specialization,
      ticketPrice: doctorData?.ticketPrice,
      qualifications: doctorData?.qualifications,
      experiences: doctorData?.experiences,
      timeSlots: doctorData?.timeSlots,
      about: doctorData?.about,
      photo: doctorData?.photo,
    });
  }, [doctorData]);

  const handleReusableInputFunction = (key, index, event) => {
    const { name, value } = event.target;
    setFormData((previousFormData) => {
      const updateItems = [...previousFormData[key]];
      updateItems[index][name] = value;
      return {
        ...previousFormData,
        [key]: updateItems,
      };
    });
  };

  const deleteItem = (key, index) => {
    setFormData((previousFormData) => ({
      ...previousFormData,
      [key]: previousFormData[key].filter((_, i) => i !== index),
    }));
  };

  const addQualifications = (e) => {
    e.preventDefault();

    addItem("qualifications", {
      startingDate: "",
      endingDate: "",
      degree: "",
      university: "",
    });
  };

  const deleteQualification = (e, index) => {
    e.preventDefault();
    deleteItem("qualifications", index);
  };

  const handleQualificationChange = (event, index) => {
    handleReusableInputFunction("qualifications", index, event);
  };

  const addTimeSlots = (e) => {
    e.preventDefault();

    addItem("timeSlots", {
      day: "",
      startingTime: "",
      endingTime: "",
    });
  };

  const deleteTimeSlots = (e, index) => {
    e.preventDefault();
    deleteItem("timeSlots", index);
  };

  const handleTimeSlotsChange = (event, index) => {
    handleReusableInputFunction("timeSlots", index, event);
  };

  const addExperiences = (e) => {
    e.preventDefault();

    addItem("experiences", {
      startingDate: "",
      endingDate: "",
      position: "",
      hospital: "",
    });
  };

  const deleteExperiences = (e, index) => {
    e.preventDefault();
    deleteItem("experiences", index);
  };

  const handleExperienceChange = (event, index) => {
    handleReusableInputFunction("experiences", index, event);
  };

  const updateProfileHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `http://localhost:3000/doctor/${doctorData._id}`,
        {
          method: "put",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw Error(result.message);
      }

      toast.success(result.message);
    } catch (err) {
      toast.err(err.message);
    }
  };

  return (
    <div>
      <h2 className="text-headingColor font-bold text-[24px] leading-9 mb-10">
        Profile Information
      </h2>
      <form action="">
        <div className="mb-5">
          <p className="form__label">Name*</p>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Full Name"
            className="form__input"
          />
        </div>
        <div className="mb-5">
          <p className="form__label">Email*</p>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email Address"
            className="form__input"
            readOnly
            aria-readonly
            disabled="true"
          />
        </div>
        <div className="mb-5">
          <p className="form__label">Phone*</p>
          <input
            type="number"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Phone Number"
            className="form__input"
          />
        </div>
        <div className="mb-5">
          <p className="form__label">Bio*</p>
          <input
            type="text"
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            placeholder="Bio"
            className="form__input"
            maxLength={100}
          />
        </div>
        <div className="mb-5">
          <div className="grid grid-cols-3 gap-5 mb-[30px]">
            <div>
              <p className="form__label">Gender*</p>
              <select
                className="form__input py-3.5"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
            </div>
            <div>
              <p className="form__label">Specialization*</p>
              <select
                className="form__input py-3.5"
                name="specialization"
                value={formData.specialization}
                onChange={handleInputChange}
              >
                <option value="">Select</option>
                <option value="surgeon">Surgeon</option>
                <option value="neurologist">Neurologist</option>
                <option value="dermatologist">Dermatologist</option>
              </select>
            </div>
            <div>
              <p className="form__label">Token Fee*</p>
              <input
                type="number"
                placeholder="Fees"
                className="form__input"
                name="ticketPrice"
                value={formData.ticketPrice}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <div className="mb-5">
          <p className="form__label">Qualifications*</p>
          {formData.qualifications?.map((item, index) => (
            <div key={index}>
              <div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <p className="form__label">Starting Date*</p>
                    <input
                      className="form__input"
                      type="date"
                      name="startingDate"
                      value={item.startingDate}
                      onChange={(e) => handleQualificationChange(e, index)}
                    />
                  </div>
                  <div>
                    <p className="form__label">Ending Date*</p>
                    <input
                      className="form__input"
                      type="date"
                      name="endingDate"
                      value={item.endingDate}
                      onChange={(e) => handleQualificationChange(e, index)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <p className="form__label">Degree*</p>
                    <input
                      className="form__input"
                      type="text"
                      name="degree"
                      value={item.degree}
                      placeholder="Degree"
                      onChange={(e) => handleQualificationChange(e, index)}
                    />
                  </div>
                  <div>
                    <p className="form__label">University*</p>
                    <input
                      className="form__input"
                      type="text"
                      name="university"
                      value={item.university}
                      placeholder="University"
                      onChange={(e) => handleQualificationChange(e, index)}
                    />
                  </div>
                </div>
                <button
                  onClick={(e) => deleteQualification(e, index)}
                  className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer"
                >
                  <AiOutlineDelete />
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={addQualifications}
            className="bg-[#000] py-2 px-3 rounded text-white h-fit cursor-pointer"
          >
            Add Qualifications
          </button>
        </div>
        <div className="mb-5">
          <p className="form__label">Experiences*</p>
          {formData.experiences?.map((item, index) => (
            <div key={index}>
              <div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <p className="form__label">Starting Date*</p>
                    <input
                      className="form__input"
                      type="date"
                      name="startingDate"
                      value={item.startingDate}
                      onChange={(e) => handleExperienceChange(e, index)}
                    />
                  </div>
                  <div>
                    <p className="form__label">Ending Date*</p>
                    <input
                      className="form__input"
                      type="date"
                      name="endingDate"
                      value={item.endingDate}
                      onChange={(e) => handleExperienceChange(e, index)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <p className="form__label">Position*</p>
                    <input
                      className="form__input"
                      type="text"
                      name="position"
                      value={item.position}
                      placeholder="Position"
                      onChange={(e) => handleExperienceChange(e, index)}
                    />
                  </div>
                  <div>
                    <p className="form__label">Hospital*</p>
                    <input
                      className="form__input"
                      type="text"
                      name="hospital"
                      value={item.hospital}
                      placeholder="Hospital"
                      onChange={(e) => handleExperienceChange(e, index)}
                    />
                  </div>
                </div>
                <button
                  onClick={(e) => deleteExperiences(e, index)}
                  className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer"
                >
                  <AiOutlineDelete />
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={addExperiences}
            className="bg-[#000] py-2 px-3 rounded text-white h-fit cursor-pointer"
          >
            Add Experiences
          </button>
        </div>
        <div className="mb-5">
          <p className="form__label">Time Slots*</p>
          {formData.timeSlots?.map((item, index) => (
            <div key={index}>
              <div>
                <div className="grid grid-cols-2 md:grid-cols-4 mb-[30px]  gap-5">
                  <div>
                    <p className="form__label">Day*</p>
                    <select
                      name="day"
                      value={item.day}
                      className="form__input py-3.5"
                      onChange={(e) => handleTimeSlotsChange(e, index)}
                    >
                      <option value="">Select</option>
                      <option value="sunday">Sunday</option>
                      <option value="monday">Monday</option>
                      <option value="tuesday">Tuesday</option>
                      <option value="wednesday">Wednesday</option>
                      <option value="thursday">Thursday</option>
                      <option value="friday">Friday</option>
                      <option value="saturday">Saturday</option>
                    </select>
                  </div>
                  <div>
                    <p className="form__label">Starting Time*</p>
                    <input
                      className="form__input"
                      type="time"
                      name="startingTime"
                      value={item.startingTime}
                      onChange={(e) => handleTimeSlotsChange(e, index)}
                    />
                  </div>
                  <div>
                    <p className="form__label">Ending Time*</p>
                    <input
                      className="form__input"
                      type="time"
                      name="endingTime"
                      value={item.endingTime}
                      onChange={(e) => handleTimeSlotsChange(e, index)}
                    />
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={(e) => deleteTimeSlots(e, index)}
                      className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-6 cursor-pointer"
                    >
                      <AiOutlineDelete />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={addTimeSlots}
            className="bg-[#000] py-2 px-3 rounded text-white h-fit cursor-pointer"
          >
            Add Time Slots
          </button>
        </div>
        <div className="mb-5">
          <p className="form__label">About*</p>
          <textarea
            name="about"
            rows={5}
            value={formData.about}
            onChange={handleInputChange}
            placeholder="Write About You."
            className="form__input"
          ></textarea>
        </div>
        <div className="mb-5 flex items-center gap-3">
          {selectedFile && (
            <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
              <img
                src={previewURL}
                alt="avatar"
                className="w-full rounded-full"
              />
            </figure>
          )}
          <div className="relative w-[130px] h-[50px]">
            <input
              type="file"
              name="photo"
              id="customFile"
              accept=".jpg,.png,"
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleFileInputChange}
            />
            <label
              htmlFor="customFile"
              className="absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer"
            >
              Upload Photo
            </label>
          </div>
        </div>
        <div className="mt-7">
          <button
            type="submit"
            onClick={updateProfileHandler}
            className="bg-primaryColor text-white tet-[187px] leading-[30px] w-full py-3 px-4 rounded-lg"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
