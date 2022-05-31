import Flatpickr from "react-flatpickr";
import { Calendar } from "react-feather";
import { Bar } from "react-chartjs-2";
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap";

import { Fragment, useState, useEffect } from "react";
import { getAppointmentGraphAction } from "../../../redux/actions/appointmentGraphAction";
import { useDispatch, useSelector } from "react-redux";

const ChartjsBarChart = ({
  tooltipShadow,
  gridLineColor,
  labelColor,
  successColorShade,
}) => {
  const dispatch = useDispatch();
  const [appointmentGraph, setAppointmentGraph] = useState([]);
  const getAppointmentGraph = useSelector((state) => state.appointmentGraph);
  // const { loading } = getAppointmentGraph;

  const appointmentGraphStore =
    getAppointmentGraph?.appointmentGraphDetails?.data;
  const Branch = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    // debugger;
    dispatch(getAppointmentGraphAction(Branch?.data?.branchId, "New"));
  }, []);

  let appointmentData = [];

  console.log("data in appointment graph", appointmentGraph);

  const count = 12;

  for (let i = 0; i < count; i++) {
    appointmentData.push(0);
  }

  for (let i = 0; i < appointmentGraphStore?.length; i++) {
    appointmentData[appointmentGraphStore[i]?.dateDetails.month - 1] =
      appointmentGraphStore[i]?.totalSum
        ? appointmentGraphStore[i]?.totalSum
        : 0;
  }

  console.log("final data ", appointmentData);
  const options = {
      elements: {
        rectangle: {
          borderWidth: 2,
          borderSkipped: "bottom",
        },
      },
      responsive: true,
      maintainAspectRatio: false,
      responsiveAnimationDuration: 500,
      legend: {
        display: false,
      },
      tooltips: {
        // Updated default tooltip UI
        shadowOffsetX: 1,
        shadowOffsetY: 1,
        shadowBlur: 8,
        shadowColor: tooltipShadow,
        backgroundColor: "#fff",
        titleFontColor: "#000",
        bodyFontColor: "#000",
      },
      scales: {
        xAxes: [
          {
            display: true,
            gridLines: {
              display: true,
              color: gridLineColor,
              zeroLineColor: gridLineColor,
            },
            scaleLabel: {
              display: false,
            },
            ticks: {
              fontColor: labelColor,
            },
          },
        ],
        yAxes: [
          {
            display: true,
            gridLines: {
              color: gridLineColor,
              zeroLineColor: gridLineColor,
            },
            ticks: {
              stepSize: 100,
              min: 0,
              max: 400,
              fontColor: labelColor,
            },
          },
        ],
      },
    },
    data = {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "July",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          // data: [275, 90, 190, 205, 125, 85, 55, 87, 127, 150, 230, 280, 190],
          data: appointmentData,
          backgroundColor: successColorShade,
          borderColor: "transparent",
          barThickness: 15,
        },
      ],
    };

  return (
    <Card>
      <CardHeader className="d-flex justify-content-between align-items-sm-center align-items-start flex-sm-row flex-column">
        <CardTitle tag="h4">Appointments</CardTitle>
        <div className="d-flex align-items-center">
          {/* <Calendar size={14} /> */}
          {/* <Flatpickr
            options={{
              mode: "range",
              defaultDate: ["2019-05-01", "2019-05-10"],
            }}
            className="form-control flat-picker bg-transparent border-0 shadow-none"
          /> */}
        </div>
      </CardHeader>
      <CardBody>
        <div style={{ height: "400px" }}>
          <Bar data={data} options={options} height={400} />
        </div>
      </CardBody>
    </Card>
  );
};

export default ChartjsBarChart;
