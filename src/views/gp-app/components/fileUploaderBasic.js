import { useState } from "react";
import Uppy from "@uppy/core";
import thumbnailGenerator from "@uppy/thumbnail-generator";
import { DragDrop } from "@uppy/react";
import { Card, CardHeader, CardTitle, CardBody, Col } from "reactstrap";

const FileUploaderBasic = ({ uploadFile }) => {
  const [img, setImg] = useState(null);
  const uppy = new Uppy({
    meta: { type: "avatar" },
    restrictions: { maxNumberOfFiles: 1 },
    autoProceed: true,
  });

  uppy.use(thumbnailGenerator);

  uppy.on("thumbnail:generated", (file, preview) => {
    setImg(preview);
    uploadFile(file?.data);
  });
  return (
    <Card>
      <CardBody>
        <DragDrop uppy={uppy} />
        <Col className="d-flex justify-content-center align-items-center">
          {img !== null ? (
            <img
              className="rounded mt-3 "
              src={img}
              alt="avatar"
              style={{ height: 300 }}
            />
          ) : null}
        </Col>
      </CardBody>
    </Card>
  );
};

export default FileUploaderBasic;
