import React from "react";
import { Col, Form, Modal, Row, message } from "antd";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { addMovie } from "../../api/movies.js";

const MoviesForm = ({
  showMoviePopUp,
  setShowMoviePopUp,
  selectedMovie,
  setSelectedMovie,
  formType,
}) => {
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      let response = null;
      if (formType === "add") {
        response = await addMovie(values);
      } else {
      }

      if (response.success) {
        message.success(response.message);
        setShowMoviePopUp(false);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <Modal
      title={formType === "add" ? "Add Movie" : "Edit Movie"}
      open={showMoviePopUp}
      onCancel={() => setShowMoviePopUp(false)}
      footer={null}
      width={800}
    >
      <Form
        onFinish={onFinish}
        layout="vertical"
        className=" font-poppins mt-3 "
      >
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Movie Title" name="title" className=" font-poppins">
              <input
                type="text"
                className=" bg-slate-300/30 p-3 rounded-md focus:outline-none w-full"
              />
            </Form.Item>
          </Col>
          <Col span={24} >
            <Form.Item label="Movie Description" name="description">
              <textarea
                type="text"
                className=" bg-slate-300/30 p-3 rounded-md focus:outline-none resize-none h-24 w-full"
              />
            </Form.Item>
          </Col>
          <Col span={8} >
            <Form.Item label="Movie Duration" name="duration">
              <input
                type="text"
                className=" bg-slate-300/30 p-3 rounded-md focus:outline-none w-full "
              />
            </Form.Item>
          </Col>
          <Col span={8} >
            <Form.Item label="Language" name="language">
              <select
                
                className=" font-poppins bg-slate-300/30 p-3 rounded-md focus:outline-none w-full"
              >
                <option className=" text-blue-600 font-semibold font-poppins">
                  Select Language...
                </option>
                <option value="Bengali" className=" font-poppins">
                  Bengali
                </option>
                <option value="English" className=" font-poppins">
                  English
                </option>
                <option value="Hindi" className=" font-poppins">
                  Hindi
                </option>
              </select>
            </Form.Item>
          </Col>
          <Col span={8} >
            <Form.Item label="Release Date" name="releaseDate">
              <input
                type="date"
                
                className=" bg-slate-300/30 p-3 rounded-md focus:outline-none w-full"
              />
            </Form.Item>
          </Col>
          <Col span={8} >
            <Form.Item label="Genre" name="genre">
              <select
                
                className=" font-poppins bg-slate-300/30 p-3 rounded-md focus:outline-none w-full"
              >
                <option className=" text-blue-600 font-semibold font-poppins">
                  Select Genre...
                </option>
                <option value="Action" className=" font-poppins">
                  Action
                </option>
                <option value="Comedy" className=" font-poppins">
                  Comedy
                </option>
                <option value="Drama" className=" font-poppins">
                  Drama
                </option>
                <option value="Romance" className=" font-poppins">
                  Romance
                </option>
                <option value="Adventure" className=" font-poppins">
                  Adventure
                </option>
              </select>
            </Form.Item>
          </Col>
          <Col span={16} >
            <Form.Item label='Poster URL' name='poster'>
            <input
              type="text"
              
              className=" bg-slate-300/30 p-3 rounded-md focus:outline-none w-full"
            />
            </Form.Item>
          </Col>
        </Row>

        <div className="flex justify-between mt-6">
          <button
            className="bg-rose-600 text-white p-2 px-8 rounded"
            onClick={() => {
              setShowMoviePopUp(false);
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-rose-600 text-white p-2 px-8 rounded"
          >
            save
          </button>
        </div>
      </Form>
    </Modal>
  );
};

export default MoviesForm;
