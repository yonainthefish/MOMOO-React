import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DocumentData } from '@firebase/firestore';

import useGetFeedData from '../../../hooks/useGetFeedData';
import useEditContext from '../../../hooks/useEditContext';
import useAuthContext from '../../../hooks/useAuthContext';

import ChangeAlbumModal from '../../../components/Modal/ChangeAlbumModal/ChangeAlbumModal';
import DeleteFeedModal from './DeleteFeedModal';
import FeedMoreModal from './FeedMoreModal';
import Carousel from '../../../components/Carousel/Carousel';
import LoadingComponent from '../../../components/Loading/LoadingComponent';
import StyledFeedItem from './StyledFeedItem';

import SeeMore from '../../../asset/icon/More.svg';

export default function FeedItem() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [changeAlbumModalOpen, setChangeAlbumModalOpen] = useState(false);
  const [feedData, setFeedData] = useState<DocumentData | null>(null);
  const [time, setTime] = useState('');
  const [InvalidId, setInvalidId] = useState(false);
  const { uid, album, id } = useParams(); // uid, album -> 엑세스 권한 검증

  const { isEditModalOpen } = useEditContext();
  const { user } = useAuthContext();
  const getFeedData = useGetFeedData();
  const navigate = useNavigate();

  if (!user) {
    return;
  }

  if (!id || !uid) {
    navigate('/404');
    return;
  }

  useEffect(() => {
    // 엑세스 권한 없을 경우 로직 추가하기
  }, []);

  useEffect(() => {
    if (isEditModalOpen) {
      return;
    }

    const setData = async () => {
      const feedData = await getFeedData(id, uid);

      if (feedData) {
        setFeedData(feedData);

        const date = new Date(feedData.timestamp.toDate());
        const time = new Date(date.setHours(date.getHours() + 9))
          .toISOString()
          .slice(0, 10);

        setTime(time);
      } else {
        setInvalidId(true);
      }
    };

    setData();
  }, [isEditModalOpen]);

  const handleSeeMoreClick = () => {
    setIsModalOpen(true);
  };

  const closeMoreModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteCloseModal = () => {
    setDeleteModalOpen(false);
    setIsModalOpen(false);
  };

  const handleChangeAlbumModal = () => {
    setChangeAlbumModalOpen(false);
    setIsModalOpen(false);
  };

  // design 추가하기
  if (InvalidId) {
    return <div>존재하지 않는 게시물입니다</div>;
  }

  return (
    <>
      {!feedData ? (
        <LoadingComponent />
      ) : (
        <StyledFeedItem>
          <Carousel imgUrlList={feedData.imageUrl}></Carousel>
          <section className="contentsSection">
            {feedData.emotionImage && feedData.weatherImage && (
              <div className="iconSection">
                {feedData.emotionImage && (
                  <img
                    className="emotion"
                    src={feedData.emotionImage}
                    alt="오늘의 기분"
                  />
                )}
                {feedData.weatherImage && (
                  <img
                    className="weather"
                    src={feedData.weatherImage}
                    alt="오늘의 날씨"
                  />
                )}
              </div>
            )}
            {uid === user.uid && (
              <button
                className="more"
                type="button"
                onClick={handleSeeMoreClick}
              >
                <img src={SeeMore} alt="더보기 버튼" />
              </button>
            )}
          </section>
          <h3>{feedData.title}</h3>
          {feedData.text && typeof feedData.text === 'string' && (
            <p className="detailText">
              {feedData.text.split('\n').map((v, i) => {
                if (i === 0) {
                  return v;
                } else {
                  return (
                    <>
                      <br />
                      {v}
                    </>
                  );
                }
              })}
            </p>
          )}
          {feedData.selectedAddress && (
            <p className="locationSection">{feedData.selectedAddress}</p>
          )}
          <time dateTime={time} className="date">
            {time.replace(/-/gi, '.')}
          </time>
          {isModalOpen && (
            <FeedMoreModal
              setDeleteModalOpen={setDeleteModalOpen}
              setChangeAlbumModalOpen={setChangeAlbumModalOpen}
              closeModal={closeMoreModal}
            />
          )}
          {deleteModalOpen && (
            <DeleteFeedModal
              onClose={handleDeleteCloseModal}
              imgUrlList={feedData.imageUrl}
            />
          )}
          {changeAlbumModalOpen && (
            <ChangeAlbumModal onClose={handleChangeAlbumModal} />
          )}
        </StyledFeedItem>
      )}
    </>
  );
}
