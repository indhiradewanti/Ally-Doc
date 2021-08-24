import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchDataDoctor } from "../stores/actions/actionDoctors";
import DoctorCard from "../components/DoctorsCard";

export default function DoctorsList() {
  const dispatch = useDispatch()
  const allDoctor = useSelector(state => state.doctors.allDoctor)
  useEffect(() => {
    dispatch(fetchDataDoctor())
  },[allDoctor])

  // console.log(allDoctor,'all doctors')

  return (
    <article>
      <div className="h-screen">
        <div className="mt-20">
          <h1 className="mt-12 text-center text-4xl text-yellow-500 font-bold">Our Doctors List</h1>
          <h5 className="text-center mt-4 text-yellow-400">We are here to help you feel better</h5>
          <section className="container px-8 py-14 mx-auto">
            <div className="grid gap-10 mb-8 grid-cols-3">
              {allDoctor.map(doctor => (
                <DoctorCard doctor={doctor} key={doctor._id}/>
              ))}
            </div>
          </section>
        </div>
      </div>
    </article>
  );
}
