import styled from 'styled-components';

const SelectContainer = styled.section`
  display: flex;
  flex-wrap: nowrap;
`;

const ImageGrid = styled.div`
  display: flex;
  gap: 1px;
  overflow-x: auto;

  /* &::-webkit-scrollbar {
    display: none;
  } */

  .selectedImgList {
    display: inline-block;
    position: relative;
  }

  .seletedImg {
    width: 15.2rem;
    aspect-ratio: 1/1;
    object-fit: contain;
    background-color: var(--gray-900);
  }

  .deleteBtn {
    position: absolute;
    top: 8px;
    right: 8px;

    .deleteBtnImg {
      background-color: var(--gray-100);
      padding: 4px;
      border-radius: 50%;
      opacity: 80%;
    }
  }
`;

const PreviewSection = styled.div`
  width: 15.2rem;
  aspect-ratio: 1/1;
  position: relative;
  background-color: var(--gray-900);

  .btnUpload {
    width: 2.4rem;
    height: 2.4rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
  }

  #file {
    display: none;
  }
`;

export { SelectContainer, ImageGrid, PreviewSection };
