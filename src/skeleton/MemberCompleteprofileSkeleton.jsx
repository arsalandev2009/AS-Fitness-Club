import React from 'react'

function MemberCompleteprofileSkeleton() {
  return (
   <div className="fit-page min-vh-100 bg-black text-white">

  {/* HEADER */}
  <header className="border-bottom border-secondary">
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center py-2">

        <div className="placeholder-glow" style={{ width: "220px", height: "55px" }}>
          <span className="placeholder w-100 h-100 rounded"></span>
        </div>

        <div className="placeholder-glow" style={{ width: "100px", height: "42px" }}>
          <span className="placeholder w-100 h-100 rounded-3"></span>
        </div>

      </div>
    </div>
  </header>


  {/* MAIN */}
  <main className="container-fluid py-4">

    {/* INTRO */}
    <div className="text-center mb-4">

      <div className="placeholder-glow">
        <span
          className="placeholder col-8 col-md-4"
          style={{ height: "25px" }}
        ></span>
      </div>

      <div className="placeholder-glow mt-2">
        <span
          className="placeholder col-12 col-md-8"
          style={{ height: "17px" }}
        ></span>
      </div>

      <div className="placeholder-glow mt-2">
        <span
          className="placeholder col-10 col-md-6"
          style={{ height: "17px" }}
        ></span>
      </div>

    </div>


    <div className="row g-3">

      {/* PERSONAL INFORMATION */}
      <div className="col-12 col-xl-6">

        <div className="bg-dark border border-secondary rounded-3 p-4 h-100">

          <div className="d-flex align-items-center gap-3 mb-4">

            <div
              className="placeholder-glow flex-shrink-0"
              style={{ width: "45px", height: "45px" }}
            >
              <span className="placeholder w-100 h-100 rounded-2"></span>
            </div>

            <div className="w-100">
              <div className="placeholder-glow">
                <span
                  className="placeholder col-7"
                  style={{ height: "22px" }}
                ></span>
              </div>

              <div className="placeholder-glow mt-2">
                <span
                  className="placeholder col-5"
                  style={{ height: "15px" }}
                ></span>
              </div>
            </div>

          </div>


          <div className="row g-3">

            {[1, 2, 3, 4].map((item) => (
              <div className="col-12 col-md-6" key={item}>

                <div className="placeholder-glow mb-2">
                  <span
                    className="placeholder col-5"
                    style={{ height: "15px" }}
                  ></span>
                </div>

                <div className="placeholder-glow">
                  <span
                    className="placeholder w-100 rounded-2"
                    style={{ height: "45px" }}
                  ></span>
                </div>

              </div>
            ))}

          </div>

        </div>

      </div>


      {/* GOAL & ACTIVITY */}
      <div className="col-12 col-xl-6">

        <div className="bg-dark border border-secondary rounded-3 p-4 h-100">

          <div className="d-flex align-items-center gap-3 mb-4">

            <div
              className="placeholder-glow flex-shrink-0"
              style={{ width: "45px", height: "45px" }}
            >
              <span className="placeholder w-100 h-100 rounded-2"></span>
            </div>

            <div className="w-100">

              <div className="placeholder-glow">
                <span
                  className="placeholder col-6"
                  style={{ height: "22px" }}
                ></span>
              </div>

              <div className="placeholder-glow mt-2">
                <span
                  className="placeholder col-7"
                  style={{ height: "15px" }}
                ></span>
              </div>

            </div>

          </div>


          <div className="row g-3">

            {/* GOAL */}
            <div className="col-12 col-md-6">

              <div className="placeholder-glow mb-2">
                <span
                  className="placeholder col-6"
                  style={{ height: "15px" }}
                ></span>
              </div>

              <div className="d-flex flex-column gap-2">

                {[1, 2, 3, 4].map((item) => (
                  <div className="placeholder-glow" key={item}>
                    <span
                      className="placeholder w-100 rounded-2"
                      style={{ height: "40px" }}
                    ></span>
                  </div>
                ))}

              </div>

            </div>


            {/* ACTIVITY */}
            <div className="col-12 col-md-6">

              <div className="placeholder-glow mb-2">
                <span
                  className="placeholder col-7"
                  style={{ height: "15px" }}
                ></span>
              </div>

              <div className="d-flex flex-column gap-2">

                {[1, 2, 3, 4].map((item) => (
                  <div className="placeholder-glow" key={item}>
                    <span
                      className="placeholder w-100 rounded-2"
                      style={{ height: "40px" }}
                    ></span>
                  </div>
                ))}

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* TRAINING */}
      <div className="col-12">

        <div className="bg-dark border border-secondary rounded-3 p-4">

          <div className="d-flex align-items-center gap-3 mb-4">

            <div
              className="placeholder-glow flex-shrink-0"
              style={{ width: "45px", height: "45px" }}
            >
              <span className="placeholder w-100 h-100 rounded-2"></span>
            </div>

            <div className="w-100">

              <div className="placeholder-glow">
                <span
                  className="placeholder col-5"
                  style={{ height: "22px" }}
                ></span>
              </div>

              <div className="placeholder-glow mt-2">
                <span
                  className="placeholder col-6"
                  style={{ height: "15px" }}
                ></span>
              </div>

            </div>

          </div>


          <div className="row g-3">

            {/* EXPERIENCE */}
            <div className="col-12 col-lg-5">

              <div className="placeholder-glow mb-2">
                <span
                  className="placeholder col-5"
                  style={{ height: "15px" }}
                ></span>
              </div>

              <div className="row g-2">

                {[1, 2, 3].map((item) => (
                  <div className="col-12 col-sm-4" key={item}>
                    <div className="placeholder-glow">
                      <span
                        className="placeholder w-100 rounded-2"
                        style={{ height: "42px" }}
                      ></span>
                    </div>
                  </div>
                ))}

              </div>

            </div>


            {/* DAYS */}
            <div className="col-12 col-lg-3">

              <div className="placeholder-glow mb-2">
                <span
                  className="placeholder col-8"
                  style={{ height: "15px" }}
                ></span>
              </div>

              <div className="row g-2">

                {[1, 2, 3, 4].map((item) => (
                  <div className="col-6 col-lg-6" key={item}>
                    <div className="placeholder-glow">
                      <span
                        className="placeholder w-100 rounded-2"
                        style={{ height: "42px" }}
                      ></span>
                    </div>
                  </div>
                ))}

              </div>

            </div>


            {/* EQUIPMENT */}
            <div className="col-12 col-lg-4">

              <div className="placeholder-glow mb-2">
                <span
                  className="placeholder col-7"
                  style={{ height: "15px" }}
                ></span>
              </div>

              <div className="d-flex flex-column gap-2">

                {[1, 2, 3].map((item) => (
                  <div className="placeholder-glow" key={item}>
                    <span
                      className="placeholder w-100 rounded-2"
                      style={{ height: "42px" }}
                    ></span>
                  </div>
                ))}

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* DIET */}
      <div className="col-12 col-xl-8">

        <div className="bg-dark border border-secondary rounded-3 p-4 h-100">

          <div className="d-flex align-items-center gap-3 mb-4">

            <div
              className="placeholder-glow flex-shrink-0"
              style={{ width: "45px", height: "45px" }}
            >
              <span className="placeholder w-100 h-100 rounded-2"></span>
            </div>

            <div className="w-100">

              <div className="placeholder-glow">
                <span
                  className="placeholder col-5"
                  style={{ height: "22px" }}
                ></span>
              </div>

              <div className="placeholder-glow mt-2">
                <span
                  className="placeholder col-6"
                  style={{ height: "15px" }}
                ></span>
              </div>

            </div>

          </div>


          <div className="row g-3">

            <div className="col-12 col-lg-4">

              <div className="placeholder-glow mb-2">
                <span
                  className="placeholder col-6"
                  style={{ height: "15px" }}
                ></span>
              </div>

              <div className="row g-2">

                {[1, 2].map((item) => (
                  <div className="col-6" key={item}>
                    <div className="placeholder-glow">
                      <span
                        className="placeholder w-100 rounded-2"
                        style={{ height: "42px" }}
                      ></span>
                    </div>
                  </div>
                ))}

              </div>

            </div>


            <div className="col-12 col-lg-8">

              <div className="placeholder-glow mb-2">
                <span
                  className="placeholder col-8"
                  style={{ height: "15px" }}
                ></span>
              </div>

              <div className="placeholder-glow">
                <span
                  className="placeholder w-100 rounded-2"
                  style={{ height: "45px" }}
                ></span>
              </div>

            </div>

          </div>

        </div>

      </div>


      {/* BUDGET */}
      <div className="col-12 col-xl-4">

        <div className="bg-dark border border-secondary rounded-3 p-4 h-100">

          <div className="d-flex align-items-center gap-3 mb-4">

            <div
              className="placeholder-glow flex-shrink-0"
              style={{ width: "45px", height: "45px" }}
            >
              <span className="placeholder w-100 h-100 rounded-2"></span>
            </div>

            <div className="w-100">

              <div className="placeholder-glow">
                <span
                  className="placeholder col-4"
                  style={{ height: "22px" }}
                ></span>
              </div>

              <div className="placeholder-glow mt-2">
                <span
                  className="placeholder col-8"
                  style={{ height: "15px" }}
                ></span>
              </div>

            </div>

          </div>


          <div className="placeholder-glow mb-2">
            <span
              className="placeholder col-8"
              style={{ height: "15px" }}
            ></span>
          </div>

          <div className="placeholder-glow">
            <span
              className="placeholder w-100 rounded-2"
              style={{ height: "45px" }}
            ></span>
          </div>

          <div className="placeholder-glow mt-3">
            <span
              className="placeholder col-12"
              style={{ height: "35px" }}
            ></span>
          </div>

        </div>

      </div>

    </div>


    {/* FOOTER BUTTON */}
    <div className="border border-secondary rounded-3 p-4 mt-3 text-center">

      <div className="placeholder-glow">
        <span
          className="placeholder col-6 col-md-3 rounded-2"
          style={{ height: "48px" }}
        ></span>
      </div>

    </div>

  </main>

</div>
  )
}

export default MemberCompleteprofileSkeleton
