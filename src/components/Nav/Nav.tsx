import StyledNav from './StyledNav';
import MyPopup from '../MyPopup/MyPopup';
import Upload from '../Upload/Upload';
import HomeImg from '../../asset/icon/HomePc.svg';
import LogoImg from '../../asset/icon/Logo.svg';
import UploadImg from '../../asset/icon/UploadPc.svg';
import MypageImg from '../../asset/icon/ProfilePc.svg';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Nav() {
  const [openUploadModal, setOpenUploadModal] = useState(false);
  const [openMyModal, setOpenMyModal] = useState(false);

  const openUploadModalFunc = () => {
    setOpenUploadModal(true);
    document.body.classList.add('modal-open');
  };

  const openMyModalFunc = () => {
    setOpenMyModal(true);
  };

  return (
    <StyledNav>
      <div className="navBtn">
        <Link to="/home">
          <button className="home">
            <img src={HomeImg} alt="홈 아이콘" />
            <p>Home</p>
          </button>
        </Link>
        <button className="upload" onClick={openUploadModalFunc}>
          <img src={UploadImg} alt="업로드 아이콘" />
          <p>Upload</p>
        </button>
        <button className="my" onClick={openMyModalFunc}>
          <img src={MypageImg} alt="마이페이지 아이콘" />
          <p>Mypage</p>
        </button>
      </div>
      <Link to="/home">
        <img className="logoImg" src={LogoImg} alt="로고이미지" />
      </Link>
      {openUploadModal && (
        <div className="modal-overlay">
          <Upload setOpenPopup={setOpenUploadModal} />
        </div>
      )}
      {openMyModal && <MyPopup setOpenPopup={setOpenMyModal} />}
    </StyledNav>
  );
}
