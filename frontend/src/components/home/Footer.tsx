const Footer = () => {
  return (
    <footer
      className="
      border-t
      bg-white
      px-6
      py-10
    "
    >

      <div
        className="
        mx-auto
        flex
        max-w-7xl
        flex-col
        items-center
        justify-between
        gap-5
        md:flex-row
      "
      >

        <div>

          <h3
            className="
            text-2xl
            font-bold
            text-slate-800
          "
          >
            Return
            <span className="text-orange-500">
              X
            </span>
          </h3>


          <p
            className="
            mt-2
            text-sm
            text-slate-500
          "
          >
            Smart Enterprise Lost & Found Management System
          </p>

        </div>



        <div
          className="
          flex
          gap-6
          text-sm
          text-slate-600
        "
        >

          <a className="hover:text-orange-500">
            About
          </a>

          <a className="hover:text-orange-500">
            Features
          </a>

          <a className="hover:text-orange-500">
            Contact
          </a>

        </div>



        <p className="text-sm text-slate-500">
          © 2026 ReturnX. All rights reserved.
        </p>


      </div>

    </footer>
  );
};

export default Footer;