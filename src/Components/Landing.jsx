export default function Landing() {
  return (
    <div className="landing-container">
      <div className="landing">
        <div className="left-landing">
          <h2 className="h2-landing">
            Welcome To <br />
            <span className="span-name">Trendy Tide</span>
          </h2>
          <div>
            <p>
              Find & Buy Everything You Need! Pay On Delivery. <br /> Wide Range of
              Genuine Products, Easy Returns, <br /> Cash on Delivery, Browse Now!
            </p>
          </div>
        </div>
        <div>
          <img
            src="https://images.pexels.com/photos/5076516/pexels-photo-5076516.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
            className="img-landing"
          />
        </div>
      </div>
    </div>
  );
}
