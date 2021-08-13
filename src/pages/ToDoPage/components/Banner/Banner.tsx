import { forwardRef } from "react";
import { SvgLogout } from "../../../../assets";
import { Input } from "../../../../components";
import { logout } from "../../../../utils/logout";
import "./Banner.scss";

export const Banner = forwardRef<any, IBanner>(({ onKeyDown }, ref) => {
  return (
    <div className="banner">
      <div className="banner__logout" onClick={() => logout()}>
        <SvgLogout />
        <span>Logout</span>
      </div>
      <div className="banner__header">
        <h1 style={{ color: "white" }}>TO DO</h1>
        <Input
          ref={ref}
          className="banner__input"
          placeholder="What need to be done?"
          onKeyDown={onKeyDown}
        />
      </div>
    </div>
  );
});
