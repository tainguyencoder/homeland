// Mục đích của việc tạo index.js này là ta có thể import nhìu comp = 1 hàng
// import { About, Contact, Home, Projects } from "./pages"; App.jsx line 4
import Home from "./Home";
import About from './About'
import Projects from "./Projects";
import Contact from "./Contact";

export {
    Home,
    About,
    Projects,
    Contact
}