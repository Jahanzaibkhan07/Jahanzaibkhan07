import { Fragment, useState } from "react";
import classnames from "classnames";
import { isObjEmpty } from "@utils";
import { useForm } from "react-hook-form";
import { ArrowLeft, ArrowRight } from "react-feather";
import { Label, FormGroup, Row, Col, Button, Form, Input } from "reactstrap";
import FileUploaderBasic from "../../components/fileUploaderBasic";
import ProfileImageUpload from "../../components/profileImage";
const SocialLinks = ({ stepper, type, FourthFormStep }) => {
  const [file, setFile] = useState();

  const { register, errors, handleSubmit, trigger } = useForm();

  const onSubmit = () => {
    trigger();
    if (isObjEmpty(errors)) {
      FourthFormStep(file);
      stepper.next();
    }
  };
  const uploadFile = (val) => {
    setFile(val);
  };

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">Add your business photos</h5>
        <small>
          Upload photos showing your place of business and services offered,
          logos and stock images are not suitable. See photo guidelines.
        </small>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {/* <Row> */}
        {/* <FormGroup> */}
        <FileUploaderBasic uploadFile={uploadFile} />
        {/* </FormGroup> */}
        {/* </Row> */}
        <div className="d-flex justify-content-between">
          <Button.Ripple
            color="dark"
            className="btn-prev"
            onClick={() => stepper.previous()}
          >
            <ArrowLeft
              size={14}
              className="align-middle mr-sm-25 mr-0"
            ></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">
              Previous
            </span>
          </Button.Ripple>
          <Button.Ripple type="submit" color="dark" className="btn-next">
            <span className="align-middle d-sm-inline-block d-none">Next</span>
            <ArrowRight
              size={14}
              className="align-middle ml-sm-25 ml-0"
            ></ArrowRight>
          </Button.Ripple>
        </div>
      </Form>
    </Fragment>
  );
};

export default SocialLinks;
