import React, { useEffect, useState } from "react";
import MoviesForm from "./MoviesForm";
import moment from "moment";
import { Table, message } from "antd";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { getAllMovies } from "../../api/movies";

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [showMoviePopUp, setShowMoviePopUp] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [formType, setFormType] = useState("add");
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getAllMovies();
      if (response.success) {
        setMovies(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Duration",
      dataIndex: "duration",
    },
    {
      title: "Genre",
      dataIndex: "genre",
    },
    {
      title: "Language",
      dataIndex: "language",
    },
    {
      title: "Release Date",
      dataIndex: "releaseDate",
      render: (text, record) => {
        return moment(record.releaseDate).format("DD-MM-YYYY");
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div className="flex">
            <span class="material-symbols-outlined px-2">edit</span>
            <span class="material-symbols-outlined px-2">delete</span>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className=" font-poppins">
      <div className="flex justify-start">
        <button
          onClick={() => {
            setShowMoviePopUp(true);
            setFormType("add");
          }}
          className="bg-rose-600 text-white p-2 px-4 rounded"
        >
          Add Movies
        </button>
      </div>

      <Table columns={columns} dataSource={movies} className="mt-4" />

      {showMoviePopUp && (
        <MoviesForm
          showMoviePopUp={showMoviePopUp}
          setShowMoviePopUp={setShowMoviePopUp}
          selectedMovie={selectedMovie}
          setSelectedMovie={setSelectedMovie}
          formType={formType}
        />
      )}
    </div>
  );
};

export default MoviesList;
