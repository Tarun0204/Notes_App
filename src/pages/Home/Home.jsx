import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/Cards/NoteCard";
import Search from "../../components/SearchBar/Search";
import { MdAdd } from "react-icons/md";
import "./Home.css";
import EditNotes from "./EditNotes";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosapp from "../../utils/axiosapp";
import Empty from "../../assets/Empty.png";
import NoResults from "../../assets/NoResults.png";
import { toast } from "react-toastify";

Modal.setAppElement("#root");

const Home = () => {
  const [openModal, setOpenModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });
  const [allNotes, setAllNotes] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);

  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleEdit = (noteDetails) => {
    setOpenModal({ isShown: true, data: noteDetails, type: "edit" });
  };

  const getUserInfo = async () => {
    try {
      const response = await axiosapp.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      } else {
        console.log("Error occurred:", error.message);
      }
    }
  };

  const getAllNotes = async () => {
    try {
      const response = await axiosapp.get("/all-notes");
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("Error occurred!");
    }
  };

  const onSearchNote = async (query) => {
    try {
      const response = await axiosapp.get("/search-note", {
        params: { query },
      });
      if (response.data && response.data.notes) {
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNote = async (data) => {
    const noteId = data?._id;
    try {
      const response = await axiosapp.delete("/delete-note/" + noteId);
      if (response.data && !response.data.error) {
        getAllNotes();
        toast.success("Note Deleted Successfully", "delete");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.log("Error occurred!");
        toast.error("Error occurred!");
      }
    }
  };

  const noteIsPinned = async (noteData) => {
    const noteId = noteData?._id;
    const updatedPinnedStatus = !noteData.isPinned;
    try {
      const response = await axiosapp.put(`/pin-note/${noteId}`, {
        isPinned: updatedPinnedStatus,
      });
      console.log("API Response:", response.data);
      if (response.data && response.data.note) {
        setAllNotes((prevNotes) =>
          prevNotes.map((note) =>
            note._id === noteId
              ? { ...note, isPinned: updatedPinnedStatus }
              : note
          )
        );
        toast.success(updatedPinnedStatus ? "Note Pinned!" : "Note Unpinned!");
      }
    } catch (error) {
      console.error("Error updating pin status:", error);
    }
  };

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setIsSearch(false);
    getAllNotes();
  };

  useEffect(() => {
    getUserInfo();
    getAllNotes();
  }, []);

  return (
    <>
      <Navbar userInfo={userInfo} isMobileView={isMobileView} />

      {isMobileView && (
        <div className="search-bar-home-container">
          <Search
            value={searchQuery}
            onChange={({ target }) => setSearchQuery(target.value)}
            handleSearch={handleSearch}
            onClearSearch={handleClearSearch}
          />
        </div>
      )}

      <div className="home-container">
        {allNotes.length > 0 ? (
          allNotes.map((item) => (
            <NoteCard
              key={item._id}
              title={item.title}
              date={item.createdOn}
              content={item.content}
              tags={item.tags}
              isPinned={item.isPinned}
              onEdit={() => handleEdit(item)}
              onDelete={() => deleteNote(item)}
              onPinNote={() => noteIsPinned(item)}
            />
          ))
        ) : isSearch ? (
          <div className="empty-view">
            <img src={NoResults} alt="No Results" className="empty-img" />
            <h2 className="empty-heading">No Results Found</h2>
            <p className="empty-para">
              Try searching with a different keyword.
            </p>
          </div>
        ) : (
          <div className="empty-view">
            <img src={Empty} alt="No Notes" className="empty-img" />
            <h2 className="empty-heading">No Notes Yet!!</h2>
            <p className="empty-para">Notes you add will appear here.</p>
          </div>
        )}
      </div>

      <button
        className="add-note-btn"
        type="button"
        onClick={() => setOpenModal({ isShown: true, type: "add", data: null })}
      >
        <MdAdd />
      </button>

      <Modal
        isOpen={openModal.isShown}
        onRequestClose={() =>
          setOpenModal({ isShown: false, type: "add", data: null })
        }
        style={{
          overlay: { marginTop: "50px", backgroundColor: "rgba(0, 0, 0, 0.2)" },
        }}
        className="modal-container"
      >
        <EditNotes
          type={openModal.type}
          noteData={openModal.data}
          onClose={() =>
            setOpenModal({ isShown: false, type: "add", data: null })
          }
          getAllNotes={getAllNotes}
        />
      </Modal>
    </>
  );
};

export default Home;
