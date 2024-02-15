import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import useAuthContext from '../../hooks/useAuthContext';
import useLogout from '../../hooks/useLogout';

import AlertModal from '../../components/Modal/AlertModal/AlertModal';
import StyledMyPopup from './StyledMyPopup';

import BasicProfile from '../../asset/image/profile-basic-img.svg';
import SettingIcon from '../../asset/icon/Setting.svg';
import DocumentIcon from '../../asset/icon/Document.svg';
import PolicyIcon from '../../asset/icon/Policy.svg';
import Github from '../../asset/icon/Github.svg';
import LogoutIcon from '../../asset/icon/Logout.svg';
import XIcon from '../../asset/icon/X.svg';

interface Props {
  setOpenPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MyPopup({ setOpenPopup }: Props) {
  const { user } = useAuthContext();
  const [submitErrMessage, setSubmitErrMessage] = useState('');
  const { logout, error } = useLogout();

  useEffect(() => {
    const closePopup = (e: KeyboardEvent) => {
      // esc
      if (e.keyCode === 27) {
        setOpenPopup(false);
      }
    };

    window.addEventListener('keydown', closePopup);
  }, []);

  useEffect(() => {
    if (error) {
      setSubmitErrMessage(error);
    }
  }, [error]);

  return (
    <StyledMyPopup role="dialog">
      {user && (
        <>
          <section className="profile">
            <img src={user.photoURL || BasicProfile} alt="프로필 사진" />
            <div className="displayName">{user.displayName}</div>
            <div className="email">{user.email}</div>
          </section>
          <section className="menu">
            <ul>
              <li>
                <Link to="/edit-profile">
                  <img src={SettingIcon} alt="" />
                  Edit profile
                </Link>
              </li>
              <li>
                <Link to="/terms">
                  <img src={DocumentIcon} alt="" />
                  Terms of use
                </Link>
              </li>
              <li>
                <Link to="/privacy">
                  <img src={PolicyIcon} alt="" />
                  Privacy policy
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/yonainthefish/MoMoo"
                  rel="noopener"
                  target="_blank"
                >
                  <img src={Github} alt="" />
                  GitHub
                </a>
              </li>
              <li>
                <button type="button" onClick={logout}>
                  <img src={LogoutIcon} alt="" />
                  Logout
                </button>
              </li>
            </ul>
          </section>
          <div className="footer">MOMOO 2023. All Right Reserved.</div>
          <button
            className="close"
            type="button"
            onClick={() => setOpenPopup(false)}
          >
            <img src={XIcon} alt="닫기" />
          </button>
        </>
      )}
      {submitErrMessage && (
        <AlertModal
          title={submitErrMessage}
          onClose={() => setSubmitErrMessage('')}
        />
      )}
    </StyledMyPopup>
  );
}
