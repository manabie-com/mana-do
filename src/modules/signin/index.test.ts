import Service from '../../service';
import axios from "axios";
import { act } from "react-dom/test-utils";

jest.mock("axios");

it("return token when sign in success", async () => {

  const button = document.querySelector("#btn-signin");

  act(async () => {
    if (button) {
      button.dispatchEvent(new MouseEvent("click", { bubbles: true }));

      const token = "testabc.xyz.ahk";
      jest.spyOn(Service, 'signIn').mockImplementation((username: any, password: any) => {
        return Promise.resolve(token)
      })

      const accessToken = await Service.signIn("firstUser", "example");
      expect(accessToken).toEqual('testabc.xyz.ahk');
    }
  });

});