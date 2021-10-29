import styled from "styled-components";
export const Navbar = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding-left: 15px;
  padding-right: 15px;
  width: 90%;
  .navbar {
    font-size: 1.2rem;
  }

  .flex-box {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .nav-menu {
    display: grid;
    grid-template-columns: repeat(5, auto);
    grid-gap: 10px;
    list-style: none;
    text-align: center;
    width: 60vw;
    justify-content: end;
  }

  .nav-links {
    color: white;
    text-decoration: none;
    padding: 0.5rem 1rem;
  }

  .nav-links:hover {
    background-color: #1888ff;
    border-radius: 4px;
    transition: all 0.2s ease-out;
  }

  .fa-bars {
    color: #5db85b;
  }

  .nav-links-mobile {
    display: none;
  }

  .menu-icon {
    display: none;
  }

  @media screen and (max-width: 756px) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: white;
    z-index: 1;

    .NavbarItems {
      position: relative;
    }

    .nav-item {
      display: flex;
      align-items: center;
      height: 100px;
    }

    .nav-item .nav-link {
      color: #fff;
      text-align: center;
      padding: 2rem;
      width: 100%;
      font-size: 1.5rem;
      display: table;
      font-family: titillium web, sans-serif;
    }

    .nav-menu {
      display: flex;
      flex-direction: column;
      width: 130%;
      height: calc(100vh - 60px);
      padding-bottom: 30px;
      position: absolute;
      top: 60px;
      margin-left: -15%;
      left: -130%;
      transition: all 0.5s ease;
    }

    .nav-menu.active {
      background: #5db85b;
      left: 0;
      opacity: 1;
      transition: all 0.5s ease;
      z-index: 1;
    }

    .nav-links {
      text-align: center;
      padding: 2rem;
      width: 100%;
      display: table;
    }

    .nav-links:hover {
      background-color: #1888ff;
      border-radius: 0;
    }

    .navbar-logo {
      position: absolute;
      top: 0;
      left: 0;
      transform: translate(25%, 50%);
    }

    .menu-icon {
      display: block;
      font-size: 1.8rem;
      cursor: pointer;
      float: right;
    }

    .flex-box {
      display: block;
    }

    .fa-times {
      color: #5db85b;
      font-size: 2rem;
    }

    .nav-links-mobile {
      display: block;
      text-align: center;
      padding: 1.5rem;
      margin: 2rem auto;
      border-radius: 4px;
      width: 80%;
      background: #1888ff;
      text-decoration: none;
      color: #fff;
      font-size: 1.5rem;
    }

    .nav-links-mobile:hover {
      background: #fff;
      color: #1888ff;
      transition: 250ms;
    }

    button {
      display: none;
    }
  }
`;
