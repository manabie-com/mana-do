import { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { logout } from "App/App.actions";
import { useHistory } from "react-router-dom";
import { LogoutIcon, HeaderContainer } from "./Header.styles";
import { PATH } from "constants/paths";
import { IoPowerOutline } from "react-icons/io5";
const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  logout,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

interface Props extends ConnectedProps<typeof connector> {}

const Header = (props: Props) => {
  const { logout } = props;
  const history = useHistory();
  const handleLogout = () => {
    logout();
    history.push(PATH.LOGIN);
  };
  useEffect(() => {}, [history]);

  return (
    <HeaderContainer>
      <LogoutIcon onClick={handleLogout} className="cursor-pointer">
        <IoPowerOutline />
        <span className="pl-8">Logout</span>
      </LogoutIcon>
    </HeaderContainer>
  );
};

export default connector(Header);
