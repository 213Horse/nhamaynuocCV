import {
  CloseOutlined,
  DeleteOutlined,
  LoadingOutlined,
  SaveOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Button, Divider, Image, Modal, Popconfirm, Tree } from "antd";
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@apollo/client";
import SplitPane from "split-pane-react";
import "split-pane-react/esm/themes/default.css";
import dayjs from "dayjs";

import attachmentSlice, {
  fetchApiDeleteFileOfContract,
  fetchApiSaveFileToContract,
} from "../../../../../redux/slices/attachmentSlice/attachmentSlice";
import {
  LOAD_ATTACHMENT,
  LOAD_ATTACHMENTS,
} from "../../../../../graphql/attachment/queries";
import { setDataFileOfContractSelector } from "../../../../../redux/selector";

const { DirectoryTree } = Tree;

function InfoFile({ modalFile, hideModalFile, customer, waterClocks }) {
  const pageSize = 100;
  const [sizes, setSizes] = useState([80, "10%", "auto"]);
  const [newImage, setNewImage] = useState([]);
  const [fileId, setFileId] = useState("");

  const dispatch = useDispatch();

  // get from graphql
  const { data, loading, refetch } = useQuery(LOAD_ATTACHMENTS, {
    variables: {
      first: pageSize,
      hopDongId: customer?.hopDongs[0]?.id || waterClocks[0]?.hopDongId,
    },
  });
  const { data: fileImage, loading: fileLoading } = useQuery(LOAD_ATTACHMENT, {
    variables: { id: fileId },
  });

  // get from redux
  const listFile = useSelector(setDataFileOfContractSelector);

  //   console.log("newImage", newImage);
  //   console.log("waterClocks", waterClocks);
  // console.log("listFile", listFile);
  // console.log("fileId", fileId);
  // console.log("fileImage", fileImage);

  useEffect(() => {
    dispatch(attachmentSlice.actions.setDataFileOfContract(data));
    refetch();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, refetch]);

  // fake data tree
  const treeData = [
    {
      title: "tepDinhKem",
      key: "0-0",
      //   children: [
      //     {
      //       title: "file 1.1",
      //       key: "0-0-0",
      //       isLeaf: true,
      //     },
      //     {
      //       title: "file 1.2",
      //       key: "0-0-1",
      //       isLeaf: true,
      //     },
      //   ],
    },
    // {
    //   title: "Tệp đính kèm 2",
    //   key: "0-1",
    //   children: [
    //     {
    //       title: "file 2.1",
    //       key: "0-1-0",
    //       isLeaf: true,
    //     },
    //     {
    //       title: "leaf 2.1",
    //       key: "0-1-1",
    //       isLeaf: true,
    //     },
    //   ],
    // },
  ];

  // handle option change images
  const handleOptionChangeImages = (e) => {
    const files = e.target.files;
    const listFiles = [];

    [...files].forEach((_file) => {
      listFiles.push({
        imageFile: _file,
        preview: URL.createObjectURL(_file),
      });
    });

    setNewImage(listFiles);
  };

  // handle save file
  const handleSaveFileToContract = () => {
    dispatch(
      fetchApiSaveFileToContract({
        newImage: newImage,
        hopDongId: customer?.hopDongs[0]?.id || waterClocks[0]?.hopDongId,
      })
    );
    setNewImage([]);
  };

  // handle select -> get file id
  const handleSelectGetFileId = (selectedKeys, info) => {
    setFileId(selectedKeys[0]);
  };

  // handle delete file
  const handleDeleteFileOfContract = () => {
    dispatch(
      fetchApiDeleteFileOfContract({
        hopDongId: customer?.hopDongs[0]?.id || waterClocks[0]?.hopDongId,
        fileId: fileId,
      })
    );
  };

  return (
    <Modal
      open={modalFile}
      onCancel={hideModalFile}
      centered={true}
      width={1200}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
    >
      <h3>Thông tin tệp đính kèm</h3>

      <div className="splitter-container-attachment">
        <SplitPane
          split="vertical"
          sizes={sizes}
          onChange={(sizes) => setSizes(sizes)}
        >
          {/* Left */}
          <div>
            <DirectoryTree
              multiple
              defaultExpandAll
              treeData={treeData}
              // onSelect={onSelect}
              // onExpand={onExpand}
            />

            <Divider />
            <Divider orientation="left">Thông tin tệp đính kèm</Divider>

            {loading ? (
              <div className="loading-icon">
                <LoadingOutlined className="icon-loading" />
              </div>
            ) : listFile?.GetHopDongs?.nodes[0]?.fileDinhKems?.length > 0 ? (
              <div className="info-attachment-left-container">
                <DirectoryTree
                  multiple
                  defaultExpandAll
                  onSelect={handleSelectGetFileId}
                  treeData={listFile?.GetHopDongs?.nodes[0]?.fileDinhKems?.map(
                    (_file) => ({
                      title: (
                        <div key={_file.id} className="info-attachment-left">
                          {_file.tenFileDinhKem}
                          <div className="attachment-left-icon-del">
                            <Popconfirm
                              placement="top"
                              title="Bạn có chắc chắn xóa file này không?"
                              onConfirm={handleDeleteFileOfContract}
                            >
                              <DeleteOutlined className="attachment-icon-del" />
                            </Popconfirm>
                          </div>
                        </div>
                      ),
                      key: _file.id,
                    })
                  )}
                />
              </div>
            ) : (
              <p>-- Chưa có tệp nào --</p>
            )}
          </div>

          {/* Right */}
          <div>
            {newImage.length > 0
              ? newImage.map((_file, index) => {
                  return (
                    <div
                      key={index}
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <Image
                        src={_file.preview}
                        alt={_file.imageFile.name}
                        className="file-img-of-contract"
                      />
                    </div>
                  );
                })
              : fileImage?.GetFileDinhKems?.nodes?.length > 0 // when selected file
              ? fileImage?.GetFileDinhKems?.nodes?.map((_fileImg) => {
                  return (
                    <div
                      key={_fileImg.id}
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <Image
                        src={`${process.env.REACT_APP_ORIGINAL}${_fileImg.duongdan}`}
                        alt={_fileImg.tenFileDinhKem}
                        className="file-img-of-contract"
                      />
                    </div>
                  );
                })
              : null}

            {fileLoading ? (
              <div className="loading-icon">
                <LoadingOutlined className="icon-loading" />
              </div>
            ) : fileImage?.GetFileDinhKems?.nodes?.length > 0 ? (
              <div className="info-attachment-right-container">
                <Divider />

                <div className="attachment-right-item">
                  <b>- Tên tập tin: </b>
                  <span>
                    {fileImage?.GetFileDinhKems?.nodes[0]?.tenFileDinhKem}
                  </span>
                </div>

                {/* <div className="attachment-right-item">
                  <b>- Kích thước: </b>
                  <span>...</span>
                </div> */}

                <div className="attachment-right-item">
                  <b>- Ngày tạo: </b>
                  <span>
                    {dayjs(
                      fileImage?.GetFileDinhKems?.nodes[0]?.createdTime
                    ).format("DD/MM/YYYY - HH:mm")}
                  </span>
                </div>

                <div className="attachment-right-item">
                  <b>- Ngày cập nhật: </b>
                  <span>
                    {dayjs(
                      fileImage?.GetFileDinhKems?.nodes[0]?.lastUpdatedTime
                    ).format("DD/MM/YYYY - HH:mm")}
                  </span>
                </div>
              </div>
            ) : null}
          </div>
        </SplitPane>
      </div>

      <Divider />

      {/* Buttons */}
      <div className="modal-func-files">
        {newImage?.length > 0 ? (
          <Button type="primary" onClick={handleSaveFileToContract}>
            <SaveOutlined /> Lưu
          </Button>
        ) : (
          <Button className="btn-attachment">
            <label htmlFor="option-files" className="option-files">
              <input
                id="option-files"
                type="file"
                name="option-files"
                multiple
                accept=".png, .jpg, .jpeg, .mov, .mp4"
                className="option-files-hide"
                onChange={handleOptionChangeImages}
              />
              <UploadOutlined /> Tải tệp lên
            </label>
          </Button>
        )}

        <Button
          className="custom-btn-close files-btn-close"
          onClick={hideModalFile}
        >
          <CloseOutlined /> Đóng
        </Button>
      </div>
    </Modal>
  );
}

export default memo(InfoFile);
