import React, { Component, useEffect, useState } from "react";
import Sidebar from "../components/staffSide";
import { useNavigate } from "react-router-dom";
import { st_semi } from '../services/Apis'
import { ft_seminars } from '../services/Apis'
import TablesSeminars, { StatusPill } from "../tables/TablesSeminars";
import FtyTablesSeminars from "../tables/FtyTablesSeminars";

function StaffSeminar() {
  const navigate = useNavigate();

  const utype = "1";
  const [data, setUserData] = useState([]);
  const userGet = async () => {
    const response = await st_semi();
    if (response.status === 200) {
      setUserData(response.data)
      console.log(response.data)
    } else {
      console.log("error for get user data")
    }
  }
  useEffect(() => {
    userGet();
    setTimeout(() => {
    }, 1200)
  }, [])


  const columns = React.useMemo(
    () => [
      {
        Header: "Student Name",
        accessor: "student_name",
      },
      {
        Header: " Title",
        accessor: "title",
      },
      {
        Header: " Type",
        accessor: "type",
      },
      {
        Header: "Year",
        accessor: "year",
      },
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "Venue",
        accessor: "venue",
      },
      {
        Header: "Chief_guest",
        accessor: "chief_guest",
      },
      {
        Header: "Mode",
        accessor: "mode",
      },
      {
        Header: "Collaborator",
        accessor: "collaborator",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: StatusPill,
      },
      {
        Header: 'Edit',
        Cell: props => {
          const { original } = props.cell.row;

          return (<div>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full" onClick={() => navigate("./SeminarsEdit.js/" + original._id, {
              state: {
                faculty_name: original.faculty_name,
                student_name: original.student_name,
                title: original.title,
                type: original.type,
                year: original.year,
                date: original.date,
                venue: original.venue,
                chief_guest: original.chief_guest,
                mode: original.mode,
                collaborator: original.collaborator,
                id: original._id,
                utype: utype
              }
            })}>Edit</button>
          </div>);
        }

      }
    ],
    []
  );




  const [data2, setUserData2] = useState([]);
  const userGet2 = async () => {
    const response = await ft_seminars();
    if (response.status === 200) {
      setUserData2(response.data)
      console.log(response.data)
    } else {
      console.log("error for get user data")
    }
  }
  useEffect(() => {
    userGet2();
    setTimeout(() => {
    }, 1200)
  }, [])


  const columns2 = React.useMemo(
    () => [
      {
        Header: "Faculty Name",
        accessor: "faculty_name"
      },
      {
        Header: " Title",
        accessor: "title",
      },
      {
        Header: " Type",
        accessor: "type",
      },
      {
        Header: "Year",
        accessor: "year",
      },
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "Venue",
        accessor: "venue",
      },
      {
        Header: "Chief_guest",
        accessor: "chief_guest",
      },
      {
        Header: "Mode",
        accessor: "mode",
      },
      {
        Header: "Collaborator",
        accessor: "collaborator",
      },
      {
        Header: 'Edit',
        Cell: props => {
          const { original } = props.cell.row;

          return (<div>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full" onClick={() => navigate("./FtySeminarsEdit.js/" + origin._id, {
              state: {
                faculty_name: original.faculty_name,
                title: original.title,
                type: original.type,
                year: original.year,
                date: original.date,
                venue: original.venue,
                chief_guest: original.chief_guest,
                mode: original.mode,
                collaborator: original.collaborator,
                id: original._id,
                utype:utype
              }
            })}>Edit</button>
          </div>);
        }

      }
    ],
    []
  );

  return (
    <>

      <div className=" absolute right-0  w-3/4 bg-gray-100 text-gray-900">
        <Sidebar />
        <main className="absolute max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="">
            <h1 className="text-xl font-semibold">Student Seminars/Workshops Organized</h1>
          </div>
          <div className="mt-4">
            <TablesSeminars columns={columns} data={data} utype={utype} />
          </div>
          <br />
          <div className="">
            <h1 className="text-xl font-semibold">Faculty Seminars/Workshops Organized</h1>
          </div>
          <div className="mt-4">
            <FtyTablesSeminars columns={columns2} data={data2} utype={utype} />
          </div>


        </main>
      </div>
      <div className="w-1/2 bg-gray-100 text-gray-900"></div>
    </>

  );
}

export default StaffSeminar;






