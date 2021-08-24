import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  useParams
} from "react-router-dom";
import { fetchDetailDoctor } from "../stores/actions/actionDoctors";

export default function DoctorDetail() {
  const {id} = useParams()
  const dispatch = useDispatch()
  const detailDoctor = useSelector(state => state.doctors.detailDoctor)

  useEffect(() => {
    dispatch(fetchDetailDoctor(id))
  }, [detailDoctor])

  return (
    <div className="containers mx-40 my-30">
      <div className="shadow-xl mt-40">
        <div className="flex flex-row justify-center items-center">
            <div>
                <img src={detailDoctor.photo} className="w-44 h-44 m-auto" alt=""/>
            </div>
        </div>
        <div className="flex flex-row justify-center items-center">
            <div className="flex mt-10">
                <div className="flex-col">
                  Name :
                </div>
                <div className="flex-col ml-5">
                      {detailDoctor.username}
                </div>
            </div>
        </div>
        <div className="flex flex-row justify-center items-center">
            <div className="flex">
                <div className="flex-col">
                      Spesialis : 
                </div>
                <div className="flex-col ml-5">
                      {detailDoctor.specialist}
                </div>
            </div>
        </div>
        <div className="flex flex-row justify-center items-center">
            <div className="flex">
                <div className="flex-col">
                      Status : 
                </div>
                <div className="flex-col ml-5">
                      {detailDoctor.status}
                </div>
            </div>
        </div>
        <div className="flex flex-row justify-center items-center">
            <div className="flex mb-5">
                <div className="flex-col">
                      Alamat praktek : 
                </div>
                <div className="flex-col ml-5">
                      Jalan hacktiv8 bulan purnama blok sapphire 88
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
