// ** React Import
import { useEffect, useState, useRef } from "react";
import Flatpickr from "react-flatpickr";
import React, { Component } from "react";
import Select from "react-select";
import { Home, Search } from "react-feather";

// ** Custom Components
import Sidebar from "@components/sidebar";
import { toast, Slide } from "react-toastify";
import AutoComplete from "@components/autocomplete";

// ** Third Party Components
import classnames from "classnames";
import { useForm } from "react-hook-form";
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Label,
  FormText,
  Form,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Spinner,
} from "reactstrap";
import InputPasswordToggle from "@components/input-password-toggle";
// import { MultiSelect } from "react-multi-select-component";
// import { Modal, Button } from "react-bootstrap";
// import { Search } from "react-feather";

// ** Store & Actions
import { useDispatch, useSelector } from "react-redux";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import { getServices } from "../../../../redux/actions/servicesActions";
import {
  addStaff,
  getStaff,
  updateStaffAction,
} from "../../../../redux/actions/staffActions";
import { ToastContent } from "../../components/ToastContent";
import { string } from "prop-types";

const SidebarNewUsers = ({ Data, open, toggleSidebar, hideSidebar }) => {
  // ** States
  // console.log("Data", Data);
  const allChecked = useRef("");

  const service = useSelector((state) => state.getServices);
  const serviceStore = service?.services?.data;
  const updateStaff = useSelector((state) => state.updateStaff);
  const { loading } = updateStaff;
  const updateSuccess = updateStaff?.Staff?.success;
  const updateError = updateStaff?.Staff?.error;
  const [role, setRole] = useState("subscriber");
  const [plan, setPlan] = useState("basic");
  const [endPicker, setEndPicker] = useState(new Date());
  const [startPicker, setStartPicker] = useState(new Date());
  const [selectedOption, setSelectedOption] = useState();
  const [selected, setSelected] = useState([]);
  const [modal, setModal] = useState(false);
  const [query, setQuery] = useState("Body");

  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [list, setList] = useState([]);
  // const [serviceTitle, setServiceTitle] = useState([]);

  //   console.log("data:", Data);

  const setCheckedList = (value, title) => {
    if (allChecked.current.checked && value === "all") {
      setList([]);

      Array1.forEach((category) => {
        category.services.forEach((service) => {
          setList((prevState) => [...prevState, service._id]);
        });
      });
    } else if (!allChecked.current.checked && value === "all") {
      setList([]);
    } else if (list.includes(value)) {
      const newList = list.filter((item) => item !== value);

      setList(newList);
    } else {
      setList([...list, value]);
    }
  };

  // ** Store Vars
  const dispatch = useDispatch();

  // ** Vars
  const { register, errors, handleSubmit } = useForm();

  useEffect(() => {
    dispatch(getServices(InfoData?.data?.branchId, true));
  }, []);

  useEffect(() => {
    if (updateError) {
      toast.error(<ToastContent error={updateStaff?.Staff?.message} />, {
        transition: Slide,
        hideProgressBar: true,
        autoClose: 2000,
      });
    }
    return () => {
      dispatch({ type: "STAFF_UPDATE_RESET" });
    };
  }, [updateError]);
  let service_array = [];
  for (let i = 0; i < serviceStore?.length; i++) {
    if (serviceStore[i].allServices?.length > 0) {
      for (let j = 0; j < serviceStore[i].allServices?.length; j++) {
        service_array.push(serviceStore[i].allServices[j]);
      }
    }
  }
  let ServiceData = [];
  service_array?.forEach((item) => {
    let obj = {};
    obj["value"] = item._id;
    obj["label"] = item.serviceTitle;
    ServiceData.push(obj);
  });
  const ServiceID =
    selectedOption != null ? selectedOption.map((item) => item.value) : null;
  const InfoData = JSON.parse(localStorage.getItem("userData"));
  const InfoDataId = InfoData?.data;
  useEffect(() => {
    if (updateSuccess) {
      dispatch(getStaff(InfoDataId?.branchId));
      hideSidebar();
      setList([]);
      toast.success(<ToastContent success={updateStaff?.Staff?.message} />, {
        transition: Slide,
        hideProgressBar: true,
        autoClose: 2000,
      });
      setList([]);
    }
    return () => {
      dispatch({ type: "STAFF_UPDATE_RESET" });
    };
  }, [updateSuccess]);

  let Array1 = [];
  let allServices = [];
  let allServicesLength = [];
  serviceStore?.forEach((item) => {
    let obj = {};
    obj["_id"] = item?._id;
    obj["title"] = item?.categoryTitle;
    obj["services"] = item?.allServices;
    allServices.push(item?.allServices);
    Array1.push(obj);
    //  obj["label"] = item.serviceTitle;
  });

  allServices.forEach((item) => {
    item.forEach((service) => {
      allServicesLength.push(service);
    });
  });

  const normalizeCardNumber = (value) => {
    return (
      value
        .replace(/\s/g, "")
        .match(/.{1,4}/g)
        ?.join(" ")
        .substr(0, 13) || ""
    );
  };
  // Modal
  const toggle = () => setModal(!modal);
  // ** Function to handle form submit
  const onSubmit = (value) => {
    const SendData = {
      fullName: value.fullName,
      // lastName: value.lastName,
      serviceId: list,
      email: value.email,
      gender: value.gender,
      contactNumber: value.mobileNumber,
      // password: value.password,
      bio: value.Notes,
      branchId: InfoDataId?.branchId,
      salonId: InfoDataId?.salonId,
    };
    dispatch(updateStaffAction(Data?._id, SendData));
  };

  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      zIndex: 99999,
    }),
  };

  // const AutoCompleteSections = () => {
  //   const [suggestions] =
  // }

  return (
    <Sidebar
      size="lg"
      open={open}
      title="Edit Beautician"
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label for="first name">
            Full Name <span className="text-danger">*</span>
          </Label>
          <Input
            name="fullName"
            id="full name"
            defaultValue={Data?.fullName}
            // placeholder='John Doe'
            innerRef={register({ required: true })}
            className={classnames({ "is-invalid": errors["full name"] })}
          />
        </FormGroup>

        <FormGroup>
          <Label for="Email">
            Email <span className="text-danger"></span>
          </Label>
          <Input
            name="email"
            id="Email"
            defaultValue={Data?.email}
            placeholder="mail@example.com"
            innerRef={register({ required: false })}
            className={classnames({ "is-invalid": errors["Email"] })}
          />
        </FormGroup>
        <FormGroup>
          <Label for="Mobile number">
            Mobile number <span className="text-danger">*</span>
          </Label>

          <Input
            // value={phone}
            placeholder="0300 XXXX XXX"
            type="tel"
            inputMode="numeric"
            name="mobileNumber"
            id="Mobile number"
            defaultValue={Data?.contactNumber}
            onChange={(event) => {
              const { value } = event.target;
              event.target.value = normalizeCardNumber(value);
            }}
            className={classnames({ "is-invalid": errors["mobileNumber"] })}
            innerRef={register({
              required: true,
              validate: (value) => value !== "",
              pattern: /^(?!.*[A-Za-z]).*$/g,
            })}
          />
        </FormGroup>
        <FormGroup>
          <Label for="Gender">Gender</Label>
          <Input
            type="select"
            id="gender"
            name="gender"
            placeholder="Select Gender"
            innerRef={register({ required: true })}
            className={classnames({ "is-invalid": errors["gender"] })}
          >
            <option value="F">Female</option>
            <option value="M">Male</option>
          </Input>
        </FormGroup>

        <Card>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",

              padding: 20,
            }}
          >
            <h5>
              Services (<span>{list.length}</span>)
            </h5>

            <a
              style={{ textDecoration: "underline" }}
              color="primary"
              onClick={toggle}
            >
              Edit
            </a>
            <Modal
              scrollable
              isOpen={modal}
              toggle={toggle}
              modalTransition={{ timeout: 500 }}
            >
              <ModalBody>
                <h3
                  style={{
                    padding: "10px 0 30px 0",
                    borderBottom: "1px solid #e6e6e6",
                  }}
                >
                  Services
                </h3>
                <div className="d-flex align-items-center mb-sm-0 mb-1 mr-1"></div>
                <br></br>

                <AutoComplete
                  suggestions={Array1}
                  className="form-control"
                  filterKey="serviceTitle"
                  filterHeaderKey="title"
                  grouped={true}
                  placeholder="Type 'haircut'"
                />

                <div
                  className="custom-control custom-checkbox"
                  style={{
                    padding: "20px 0",
                    borderBottom: "1px solid #e6e6e6",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <input
                    type="checkbox"
                    name="selectAll"
                    id="selectAll"
                    ref={allChecked}
                    onChange={(e) => setCheckedList("all")}
                    // handleClick={handleSelectAll}
                    // isChecked={isCheckAll}
                  />
                  <label
                    className="custom-control-label font-weight-bold p-1 font-size-lg text-dark"
                    htmlFor="selectAll"
                    style={{ fontSize: 20 }}
                  >
                    All Services
                  </label>
                </div>
                {Array1.map((item, index) => {
                  return (
                    <div className="category ">
                      <div
                        className="custom-control custom-checkbox"
                        style={{
                          padding: "20px 0",
                          borderBottom: "1px solid #e6e6e6",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {/* <input
                          type="checkbox"
                          onChange={(e) => setCheckedList(item.title)}
                          checked={true}
                          className="custom-control-input"
                          id={item._id}
                          name={item.title}
                        /> */}
                        <label
                          className="custom-control-label font-weight-bold p-1 font-size-lg text-dark"
                          htmlFor={item._id}
                          style={{ fontSize: 20 }}
                        >
                          {item.title}
                        </label>
                      </div>

                      {item.services.map((service, index) => {
                        return (
                          <div
                            className="custom-control custom-checkbox"
                            style={{
                              padding: "20px 0",
                              borderBottom: "1px solid #e6e6e6",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <input
                              type="checkbox"
                              onChange={(e) =>
                                setCheckedList(
                                  service._id,
                                  service.serviceTitle
                                )
                              }
                              checked={
                                list.includes(service._id) ? true : false
                              }
                              // checked={true}
                              // className="custom-control-input"
                              id={service._id}
                              name={service.serviceTitle}
                            />
                            <label
                              className="custom-control-label p-1 font-size-lg text-dark"
                              htmlFor={service._id}
                              style={{
                                width: "100%",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "flex-start",
                                  justifyContent: "space-between",
                                }}
                              >
                                <div>
                                  {service.serviceTitle}
                                  <br></br>
                                  <span>{service.duration} Minutes </span>
                                </div>

                                <div>{service.price} Pkr</div>
                              </div>
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </ModalBody>
              <ModalFooter>
                <div className="d-flex">
                  <Button
                    className="mr-1 button_slide slide_right"
                    color="dark"
                    onClick={toggle}
                  >
                    <span>Select Services</span>
                  </Button>
                  <Button onClick={toggle} color="secondary" outline>
                    Cancel
                  </Button>
                </div>
              </ModalFooter>
            </Modal>
          </div>
        </Card>

        <FormGroup>
          <Label for="Notes (optional)">
            Bio (optional) <span className="text-danger"></span>
          </Label>
          <Input
            type="textarea"
            name="Notes"
            id="Notes"
            defaultValue={Data?.bio}
            // placeholder="Company Pvt Ltd"
            innerRef={register({ required: false })}
            className={classnames({ "is-invalid": errors["Notes"] })}
          />
        </FormGroup>

        <div className="d-flex">
          <Button
            type="submit"
            className="mr-1 button_slide slide_right d-flex align-items-center "
            color="dark"
          >
            {loading && <Spinner className="mr-50" color="white" size="sm" />}

            <span> Submit </span>
          </Button>
          <Button
            type="reset"
            color="secondary"
            outline
            onClick={toggleSidebar}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </Sidebar>
  );
};

export default SidebarNewUsers;
