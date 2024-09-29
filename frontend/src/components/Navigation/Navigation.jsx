import NavLogo from "./NavLogo";
import ProfileButton from "./ProfileButton";

import "./Navigation.css";
import MenuItems from "./MenuItems";

function Navigation() {
  return (
    <nav className="navigation">
      <div>
        <NavLogo />
      </div>
      <div>
        <MenuItems />
      </div>
      <div>
        <ProfileButton />
      </div>
    </nav>
  );
}

export default Navigation;