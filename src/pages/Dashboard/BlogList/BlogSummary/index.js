import "./style.scss";

import Highlight from "../../../../components/Highlight";
import { useNavigate } from "react-router-dom";

import convertTime from "../../../../functions/TimeConverter";
import cap from "../../../../functions/Capitalize";

const BlogSummary = ({ id, data, search }) => {
  const navigate = useNavigate();

  const openBlog = () => {
    navigate(`/post/${id}`, { state: { data: data } });
  };

  if (
    search === "" ||
    data.title.toLowerCase().includes(search.toLowerCase()) ||
    data.author.toLowerCase().includes(search.toLowerCase()) ||
    data.summary.toLowerCase().includes(search.toLowerCase())
  ) {
    return (
      <div className="post-container" onClick={openBlog}>
        <div className="author-container">
          <img className="profile-photo" src={data.photo} alt="" />
          <Highlight text={cap(data.author)} highlight={search} />
        </div>
        <div className="title-container">
          <Highlight text={data.title} highlight={search} />
        </div>
        <Highlight text={data.summary} highlight={search} />
        <p className="date">{convertTime(data.created.seconds)}</p>
      </div>
    );
  } else return <></>;
};

export default BlogSummary;
