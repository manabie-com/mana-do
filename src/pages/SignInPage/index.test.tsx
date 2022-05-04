import React from "react";
import { render } from "@testing-library/react";
import { shallow } from "enzyme";

import { toast } from "react-toastify";

import SignInPage from ".";
import * as storageUtils from "../../utils/storageUtils";
import * as ApiService from "../../service/api-frontend";

describe("Login render Page", () => {
  it("render 2 input components", () => {
    const { getByLabelText } = render(<SignInPage />);
    expect(getByLabelText(/username/i)).toBeInTheDocument();
    expect(getByLabelText(/password/i)).toBeInTheDocument();
  });

  test("renders a submit button", () => {
    const { getByText } = render(<SignInPage />);
    expect(getByText(/SIGN IN/i)).toBeInTheDocument();
  });
});

describe("Form behaviour", () => {
  it("should login success", async () => {
    const mockedToken = "token";
    ApiService.default.signIn = jest.fn().mockImplementation(() => Promise.resolve(mockedToken));

    const storeLoginToken = jest.spyOn(storageUtils, "storeLoginToken");
    const event = {
      preventDefault: jest.fn(),
    };
    const wrapper = shallow(<SignInPage />);
    const formProps = wrapper.find("form").props();

    // @ts-ignore
    await formProps.onSubmit(event);
    expect(storeLoginToken).toHaveBeenCalledWith(mockedToken);
    // TODO: should expect navigate to have been call with ROUTES.TODO
    // expect(navigate).toHaveBeenCalledWith(ROUTES.TODO);
  });

  it("should login failed", async () => {
    const errorMessage = "Incorrect username/password";
    ApiService.default.signIn = jest.fn().mockImplementation(() => Promise.reject(errorMessage));
    toast.error = jest.fn();
    const event = {
      preventDefault: jest.fn(),
    };
    const wrapper = shallow(<SignInPage />);
    const formProps = wrapper.find("form").props();

    // @ts-ignore
    await formProps.onSubmit(event);
    expect(toast.error).toHaveBeenCalledWith(errorMessage);
  });
});
