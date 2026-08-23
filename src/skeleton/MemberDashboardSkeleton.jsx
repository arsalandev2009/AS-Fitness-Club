import React from 'react'

function MemberDashboardSkeleton() {
  return (
    <div className="bg-black text-white min-vh-100">

      {/* ================= NAVBAR ================= */}
      <header
        className="border-bottom border-secondary"
        style={{
          backgroundColor: "black",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 999,
        }}
      >
        <div className="container-fluid">
          <div className="d-flex justify-content-between align-items-center py-2">

            <div
              className="placeholder-glow"
              style={{ width: "170px", height: "45px" }}
            >
              <span className="placeholder w-100 h-100 rounded" />
            </div>

            <div
              className="placeholder-glow"
              style={{ width: "90px", height: "40px" }}
            >
              <span className="placeholder w-100 h-100 rounded" />
            </div>

          </div>
        </div>
      </header>


      {/* ================= MAIN ================= */}
      <main
        className="container-fluid bg-black text-white py-5"
        style={{ marginTop: "70px" }}
      >

        {/* ================= PAGE HEADER ================= */}
        <div className="container mb-5">

          <div className="text-center placeholder-glow">

            <span
              className="placeholder col-8 col-md-4 rounded"
              style={{ height: "38px" }}
            />

            <div className="mt-3">
              <span
                className="placeholder col-10 col-md-5 rounded"
                style={{ height: "18px" }}
              />
            </div>

          </div>

        </div>


        {/* ================= GROCERY ================= */}
        <section className="container mb-5">

          <div className="placeholder-glow mb-4">
            <span
              className="placeholder col-5 col-md-2 rounded"
              style={{ height: "30px" }}
            />
          </div>

          <div className="row g-3">

            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (

              <div
                className="col-12 col-md-6 col-lg-4"
                key={item}
              >
                <div
                  className="card bg-dark border-secondary placeholder-glow"
                  style={{ minHeight: "85px" }}
                >

                  <div className="card-body">

                    <span
                      className="placeholder col-6"
                      style={{ height: "17px" }}
                    />

                    <br />

                    <span
                      className="placeholder col-4 mt-2"
                      style={{ height: "13px" }}
                    />

                  </div>

                </div>
              </div>

            ))}

          </div>


          {/* SHOP BUTTON */}
          <div className="d-flex justify-content-center justify-content-md-end mt-4">

            <div
              className="placeholder-glow"
              style={{
                width: "215px",
                height: "42px",
              }}
            >
              <span className="placeholder w-100 h-100 rounded" />
            </div>

          </div>

        </section>



        {/* ================= NUTRITION ================= */}
        <section className="container mb-5">

          <div className="placeholder-glow mb-4">

            <span
              className="placeholder col-7 col-md-3 rounded"
              style={{ height: "30px" }}
            />

          </div>


          {/* TOP NUTRITION CARDS */}
          <div className="row g-4">

            {[1, 2, 3, 4].map((item) => (

              <div
                className="col-6 col-lg-3"
                key={item}
              >

                <div
                  className="card bg-dark border-secondary placeholder-glow h-100"
                  style={{ minHeight: "130px" }}
                >

                  <div className="card-body text-center">

                    <span
                      className="placeholder col-4"
                      style={{ height: "14px" }}
                    />

                    <div className="mt-3">

                      <span
                        className="placeholder col-6"
                        style={{ height: "28px" }}
                      />

                    </div>

                    <div className="mt-2">

                      <span
                        className="placeholder col-4"
                        style={{ height: "13px" }}
                      />

                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>


          {/* MACROS */}
          <div className="row g-4 mt-2">

            {[1, 2, 3].map((item) => (

              <div
                className="col-12 col-md-4"
                key={item}
              >

                <div
                  className="card bg-dark border-secondary placeholder-glow"
                  style={{ minHeight: "95px" }}
                >

                  <div className="card-body">

                    <div className="d-flex justify-content-between">

                      <span
                        className="placeholder col-4"
                        style={{ height: "17px" }}
                      />

                      <span
                        className="placeholder col-2"
                        style={{ height: "17px" }}
                      />

                    </div>

                    <div
                      className="placeholder w-100 mt-3"
                      style={{ height: "8px" }}
                    />

                  </div>

                </div>

              </div>

            ))}

          </div>

        </section>



        {/* ================= WORKOUT ================= */}
        <section className="container mb-5">

          <div className="placeholder-glow mb-4">

            <span
              className="placeholder col-5 col-md-3 rounded"
              style={{ height: "30px" }}
            />

            <div className="mt-2">

              <span
                className="placeholder col-8 col-md-4 rounded"
                style={{ height: "14px" }}
              />

            </div>

          </div>


          <div className="row g-4">

            {[1, 2, 3, 4].map((item) => (

              <div
                className="col-12 col-lg-6"
                key={item}
              >

                <div
                  className="card bg-dark border-secondary placeholder-glow h-100"
                  style={{ minHeight: "300px" }}
                >

                  {/* DAY HEADER */}
                  <div className="card-header border-secondary">

                    <span
                      className="placeholder col-3"
                      style={{ height: "25px" }}
                    />

                    <div className="mt-2">

                      <span
                        className="placeholder col-6"
                        style={{ height: "22px" }}
                      />

                    </div>

                  </div>


                  {/* EXERCISES */}
                  <div className="card-body">

                    {[1, 2, 3].map((exercise) => (

                      <div
                        key={exercise}
                        className="border-bottom border-secondary py-3"
                      >

                        <div className="d-flex justify-content-between">

                          <span
                            className="placeholder col-4"
                            style={{ height: "17px" }}
                          />

                          <span
                            className="placeholder col-2"
                            style={{ height: "25px" }}
                          />

                        </div>

                        <div className="mt-2">

                          <span
                            className="placeholder col-5"
                            style={{ height: "13px" }}
                          />

                        </div>

                      </div>

                    ))}

                  </div>

                </div>

              </div>

            ))}

          </div>

        </section>



        {/* ================= MEAL PLAN ================= */}
        <section className="container mb-5">

          <div className="placeholder-glow mb-4">

            <span
              className="placeholder col-6 col-md-3 rounded"
              style={{ height: "30px" }}
            />

          </div>


          <div className="row g-4">

            {[1, 2, 3, 4, 5, 6, 7].map((day) => (

              <div
                className="col-12 col-lg-6"
                key={day}
              >

                <div
                  className="card bg-dark border-secondary placeholder-glow h-100"
                  style={{ minHeight: "400px" }}
                >

                  {/* DAY */}
                  <div className="card-header border-secondary">

                    <span
                      className="placeholder col-4"
                      style={{ height: "22px" }}
                    />

                  </div>


                  <div className="card-body">

                    {[1, 2, 3, 4, 5].map((meal) => (

                      <div
                        key={meal}
                        className="mb-4 pb-3 border-bottom border-secondary"
                      >

                        <span
                          className="placeholder col-4"
                          style={{ height: "18px" }}
                        />

                        <div className="mt-2">

                          <span
                            className="placeholder col-9"
                            style={{ height: "15px" }}
                          />

                        </div>

                      </div>

                    ))}

                  </div>

                </div>

              </div>

            ))}

          </div>

        </section>



        {/* ================= PROGRESS ================= */}
        <section className="container mb-5">

          <div className="placeholder-glow mb-4">

            <span
              className="placeholder col-6 col-md-3 rounded"
              style={{ height: "30px" }}
            />

          </div>


          <div className="row g-4">

            {[1, 2, 3, 4].map((item) => (

              <div
                className="col-12 col-md-6"
                key={item}
              >

                <div
                  className="card bg-dark border-secondary placeholder-glow"
                  style={{ minHeight: "110px" }}
                >

                  <div className="card-body">

                    <span
                      className="placeholder col-5"
                      style={{ height: "18px" }}
                    />

                    <div className="mt-3">

                      <span
                        className="placeholder col-9"
                        style={{ height: "14px" }}
                      />

                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </section>



        {/* ================= SAFETY ================= */}
        <section className="container mb-5">

          <div
            className="rounded-3 p-4 placeholder-glow"
            style={{
              backgroundColor: "#111",
              border: "1px solid #333",
            }}
          >

            <span
              className="placeholder col-5 col-md-3"
              style={{ height: "22px" }}
            />

            <div className="mt-3">

              <span
                className="placeholder col-12"
                style={{ height: "14px" }}
              />

              <span
                className="placeholder col-9 mt-2"
                style={{ height: "14px" }}
              />

            </div>

          </div>

        </section>

      </main>



      {/* ================= FOOTER ================= */}
      <footer className="bg-black text-white border-top border-secondary pt-5 pb-4">

        <div className="container">

          <div className="row align-items-center gy-4">

            {/* LOGO */}
            <div className="col-12 col-md-6 text-center text-md-start">

              <div className="placeholder-glow">

                <span
                  className="placeholder"
                  style={{
                    width: "180px",
                    height: "50px",
                    display: "inline-block",
                  }}
                />

              </div>

              <div className="mt-3 placeholder-glow">

                <span
                  className="placeholder col-8"
                  style={{ height: "14px" }}
                />

              </div>

            </div>


            {/* MESSAGE */}
            <div className="col-12 col-md-6 text-center text-md-end">

              <div className="placeholder-glow">

                <span
                  className="placeholder col-6"
                  style={{ height: "22px" }}
                />

              </div>

              <div className="mt-3 placeholder-glow">

                <span
                  className="placeholder col-8"
                  style={{ height: "14px" }}
                />

              </div>

            </div>

          </div>


          <hr className="border-secondary my-4" />


          {/* BOTTOM */}
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">

            <div className="placeholder-glow">

              <span
                className="placeholder"
                style={{ width: "220px", height: "13px" }}
              />

            </div>

            <div className="placeholder-glow">

              <span
                className="placeholder"
                style={{ width: "180px", height: "13px" }}
              />

            </div>

          </div>

        </div>

      </footer>

        </div>
  )
}

export default MemberDashboardSkeleton
