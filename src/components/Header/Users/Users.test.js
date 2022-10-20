import React from "react";
import { shallow } from "enzyme";
import Users from "./Users";

describe("Users", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Users />);
    expect(wrapper).toMatchSnapshot();
  });
});
