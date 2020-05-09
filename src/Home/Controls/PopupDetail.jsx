import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

//Images
import ic_close_gray from "./../../images/ic_close_gray.svg";

PopupDetail.propTypes = {
  data: PropTypes.object,
  togglePopupDetail: PropTypes.func,
};
PopupDetail.defaultProps = {
  data: null,
  togglePopupDetail: null,
};

const PopupDetailStyled = styled.div`
  width: 100vw;
  min-height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  text-align: left;
  .popup-bound {
    display: flex;
    flex-direction: column;
    width: 215px;
    height: calc(100% - 62px - 30px - 66px);
    padding: 30px 20px 0 20px;
    background-color: floralwhite;
    position: absolute;
    bottom: 0;
    right: -255px;
    transition: right 0.5s;
    img {
      position: absolute;
      top: 10px;
      right: 19px;
      cursor: pointer;
    }
  }
`;
let isMouseDown = false;
function PopupDetail(props) {
  const { title, points, author, time, comments } = props.data;

  const _handle = () => {
    if (!isMouseDown) {
      props.togglePopupDetail();
    }
  };
  useEffect(() => {
    document.getElementById("img_id").addEventListener("click", () => {
      props.togglePopupDetail();
      _handle();
    });
    return () => {
      document.getElementById("img_id").removeEventListener("click", () => {
        props.togglePopupDetail();
        _handle();
      });
    };
  }, []);
  return (
    <PopupDetailStyled
      onMouseDown={() => {
        if (!isMouseDown) {
          props.togglePopupDetail();
        }
      }}
    >
      >
      <div className="popup-bound" id="popup_detail_id">
        <img
          onMouseLeave={() => (isMouseDown = false)}
          src={ic_close_gray}
          alt="ic_close"
          id="img_id"
        />
        <h2>Tile: {!!title && title}</h2>
        <h3>Points: {!!points && points} points</h3>
        <h4>Author: {!!author && author}</h4>
        <h5>Time: {!!time && time}</h5>
        <h5>
          Comments: <br />
          {!!comments && comments.length > 0
            ? comments.map((item) => item).join(",")
            : "No comment"}
        </h5>
      </div>
    </PopupDetailStyled>
  );
}

export default React.memo(PopupDetail);
