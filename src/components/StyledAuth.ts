import styled from 'styled-components';

const StyledAuth = styled.main`
  min-height: 100vh;

  article {
    display: flex;

    h2,
    a {
      font-family: var(--serif);
      font-size: var(--title-xl);
    }

    h2 {
      margin-right: auto;
      color: var(--gray-900);
    }

    a {
      display: block;
      color: var(--gray-300);
    }
  }

  form {
    box-sizing: content-box;
    width: 100%;

    input + label + input:not(#profile-inp) {
      margin-top: 20px;
    }

    strong + label + input {
      margin-top: 20px;
    }

    input:not(#profile-inp) {
      padding: 20px 30px;
      font-size: var(--text-m);
    }

    strong {
      display: block;
      margin-top: 5px;
      color: var(--error-color);
      font-size: var(--text-m);
    }

    button {
      margin-top: 40px;
    }
  }

  .profile {
    display: block;
    width: 171px;
    margin: 0 auto 35px;

    img:first-child {
      border-radius: 50%;
      aspect-ratio: 1/1;
      object-fit: cover;
    }

    img:last-child {
      margin-top: -45px;
      margin-left: auto;
      width: 45px;
      aspect-ratio: 1/1;
      object-fit: contain;
    }
  }

  @media (min-width: 431px) {
    display: flex;
    align-items: center;

    div {
      display: flex;
      width: 100%;
    }

    article {
      flex-direction: column;
      justify-content: center;
      border-right: 1.5px solid var(--gray-300);

      h2::after {
        content: '';
        display: block;
        margin-top: -15px;
        width: 100%;
        height: 2px;
        background: var(--gray-900);
      }
    }
  }

  @media (min-width: 1025px) {
    div {
      padding-left: var(--nav-width-pc);
      padding-right: var(--right-padding-pc); // 임시
      justify-content: center;
    }

    article {
      padding-right: 90px;

      h2 + a,
      a + h2 {
        margin-top: 10px;
      }
    }

    form {
      padding-left: 90px;
      max-width: 480px;
    }
  }

  @media (max-width: 430px) {
    padding: 124px 16px 80px; // 80 임의

    h1 {
      width: 218px;
    }

    p {
      margin: 24px 0 66px;
      font-size: var(--title-s);
      line-height: 1.3;
    }

    article {
      margin-bottom: 25px;
      a,
      h2 {
        width: 50%;
        text-align: center;
        font-size: var(--title-m);
      }

      h2 {
        border-bottom: 3px solid var(--point-color);
        padding-bottom: 2.5px;
      }

      a {
        border-bottom: 1.5px solid var(--gray-300);
        padding-bottom: 4px;
      }
    }

    .profile {
      margin: 0 auto 25px;
      width: 94px;

      img:last-child {
        margin-top: -25px;
        width: 25px;
      }
    }

    form {
      input + label + input:not(#profile-inp) {
        margin-top: 15px;
      }

      strong + label + input {
        margin-top: 15px;
      }

      button {
        position: fixed;
        bottom: 0;
        width: calc(100% - 32px);
      }
    }
  }

  @media (max-width: 1024px) {
    form input:not(#profile-inp) {
      padding: 14px 20px;
    }
  }

  @media (min-width: 431px) and (max-width: 1024px) {
    div {
      margin: 0 var(--margin-tablet);
      padding: calc(var(--column-tablet) + var(--gutter-tablet));
    }

    article {
      padding-right: 34px;

      h2,
      a {
        font-size: var(--title-l);
      }

      h2 + a,
      a + h2 {
        margin-top: 25px;
      }

      h2::after {
        margin-top: -10px;
      }
    }

    .profile {
      margin-bottom: 30px;
      width: 106px;

      img:last-child {
        margin-top: -28px;
        width: 28px;
      }
    }

    form {
      width: calc(var(--column-tablet) * 4 + var(--gutter-tablet) * 3);
      padding-left: 24px;
      margin-left: auto;
    }
  }
`;

export default StyledAuth;