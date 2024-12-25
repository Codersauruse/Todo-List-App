import img1 from "/assets/img1.svg";
import img2 from "/assets/img2.svg";
import "./Home.css";

export default function Home() {
  return (
    <div className="d-flex flex-column  home">
      <div className="d-flex flex-row align-items-center  con1">
        <div className="d-flex flex-column  intro">
          <p>Simple To Do App</p>
        </div>
        <div className="img1">
          <img src={img1} alt="Image 1" />
        </div>
      </div>
      <div className="d-flex flex-row justify-content-evenly con2">
        <div className="img2">
          <img src={img2} alt="Image 2" />
        </div>
        <div className="d-flex flex-column  row-gap-4 features">
          <p className="fs-1">Features</p>
          <ul className="d-flex flex-column row-gap-3">
            <li>In perfect sync All across the devices.</li>
            <li>Organize, priortize and get things done</li>
            <li>focus on the right things at right time</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
