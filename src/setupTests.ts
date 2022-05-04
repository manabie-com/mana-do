// import '@testing-library/jest-dom/extend-expect';
// import 'jest-canvas-mock';
import 'jest-localstorage-mock';
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });
