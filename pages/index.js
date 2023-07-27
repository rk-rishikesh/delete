import React, { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Nav from "../components/Nav";
import Link from "next/link";
import { clientPromise } from "../lib/mongodb";
import EventList from "../components/EventList";
import MainImage from '../public/cric.png'

export async function getServerSideProps() {
  
  try {
    await clientPromise;
    // const res = await fetch("http://localhost:3000/api/event");
    const data = [{"_id":"64c12ce01ddd7a32072f106f","name":"INDIA Vs NEWZEALAND","event":"ICC Men's Cricket World Cup 2023","date":"2023-10-22T12:00:00.000Z","venue":"Himachal Pradesh Cricket Association Stadium, Dharamsala","time":"02:00PM","match":"Match 21","ticket":[{"type":"General Admission (GA)","price":0.01,"amount":50000},{"type":"VIP","price":0.1,"amount":20}],"id":4,"description":"SUNDAY 22 OCTOBER 2023 - HIMACHAL PRADESH CRICKET ASSOCIATION STADIUM, DHARAMSALA, INDIA","slug":"indvsnz","tnc":["Limited to 5 tickets per customer","Children under the age of 14 must be accompanied by a parent/legal guardian at all times and have purchased a valid ticket.","Available to fully vaccinated individuals only."]}];

    console.log(data);

    return {
      props: { isDbConnected: true, data: data },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isDbConnected: false },
    };
  }
}

export default function Home({ isDbConnected, data }) {
  const testContract = "0x010c84e9b271C1ABdeA845A2Ae9eD2C164c37352";
  const [hasMounted, setHasMounted] = useState(false);
  const expo = [];
  const concert = [];
  const run = [];
  const featured = [];

  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  for (let i = 0; i < data.length; i++) {
    // console.log(data[i].date);

    const rawdate = new Date(data[i].date);
    // console.log(rawdate);
    const d = rawdate.getDate();
    const m = month[rawdate.getMonth()];
    const y = rawdate.getFullYear();

    data[i].date = d + " " + m + " " + y;

    if (i < 3) {
      featured.push(data[i]);
    }

    if (data[i].tag == "exhibition") {
      expo.push(data[i]);
    } else if (data[i].tag == "concert") {
      concert.push(data[i]);
    } else if (data[i].tag == "run") {
      run.push(data[i]);
    }

    // console.log(featured, expo, concert, run);
  }

  if (!isDbConnected) {
    console.log("Not Connected!");
  }

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return (
    <>
      <Head>
        <title>CricPass</title>
      </Head>

      <div className="main-container" style={{padding:"20px"}}>
        <Nav />
        <div className="flex flex-col" style={{marginTop:"-25px"}}>
          {/* Image Carousel */}
          <Image
                src={MainImage}
                alt="Cover Image"
                // height={600}
                // width={960}
                className="md:w-screen md:mt-6"
                style={{objectFit:"cover"}}
              />
<div className="btn btn-primary" style={{backgroundColor:"#e20086",marginTop:"-90px",backgroundImage:"unset"}} onClick={()=>window.location.href="/events"}>View All Fixtures</div>
          {/* <div className="w-full flex flex-row text-lg font-semibold px-4 md:px-0 justify-between items-center">
            <div>Featured Events : </div>
            <Link href="/events">
              
            </Link>
          </div> */}
          {/* <EventList events={featured.slice(0, 3)} />
          <div className="w-full text-lg font-semibold px-4 md:px-0 ">
            <div>Concerts: </div>
          </div>
          <EventList events={concert.slice(0, 3)} />
          <div className="w-full text-lg font-semibold px-4 md:px-0 ">
            <div>Running Events: </div>
          </div>
          <EventList events={run.slice(0, 3)} />
          <div className="w-full text-lg font-semibold px-4 md:px-0 ">
            <div>Exhibitions: </div>
          </div>
          <EventList events={expo.slice(0, 3)} /> */}
        </div>
      </div>
    </>
  );
}
