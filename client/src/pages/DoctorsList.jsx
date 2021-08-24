import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchDataDoctor } from "../stores/actions/actionDoctors";
import DoctorCard from "../components/DoctorsCard";

export default function DoctorsList() {
  const dispatch = useDispatch();
  const allDoctor = useSelector((state) => state.doctors.allDoctor);
  useEffect(() => {
    dispatch(fetchDataDoctor());
  }, []);

  // console.log(allDoctor,'all doctors')
console.log(allDoctor);
  return (
    <article>
      <div className="bg-white h-full justify-center place-content-center flex">
        <div className="mt-28">
          <div className="max-w-xl mx-auto text-center">
            <div className="w-24 h-2 bg-nude1 mb-4 mx-auto"></div>
            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-3 meg">Our Doctors</h2>
            <p className="font-light text-lg text-gray-600 mb-6 leading-relaxed">We are here to help you feel better</p>
          </div>
         
          <section className="container px-8 py-14 mx-auto">
            <div className="grid gap-12 mb-8 grid-cols-3">
              {allDoctor.map((doctor) => (
                <DoctorCard doctor={doctor} key={doctor._id} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </article>
  );
}
