import { useState, React } from 'react'

const Allcourses = () => {

  return (
    <div className="container my-5">
      <h2 className="text-center my-2">All Packages</h2>
      <div className="row justify-content-start">
        {/* Kick Starter Package */}
        <div className="col-md-3 my-4  ">
          <div className="card p-3 mt-3 w-100 w-md-75 w-lg-50 h-100 rounded-3 cardpackage">
            <div className="card-body d-flex flex-column">
              <h3 className="text-center fw-bold">Learner Course</h3>
              <div className="fw-bold h5 text-center mt-2">RS. 1770(Incl. GST)</div>
              <div className="flex-grow-1">
                <div className="d-flex mt-2">
                  <div>🌟</div>
                  <div className="ms-2"> Basic trading knowledge</div>
                </div>
                <div className="d-flex mt-2">
                  <div>🌟</div>
                  <div className="ms-2"> Meme coin name</div>
                </div>
                <div className="d-flex mt-2">
                  <div>🌟</div>
                  <div className="ms-2">1-month subscription for premium</div>
                </div>
                <div className="d-flex mt-2">
                  <div>🌟</div>
                  <div className="ms-2">Bonus 1-2 long-term GEM coin</div>
                </div>
                <div className="d-flex mt-2">
                  <div>🌟</div>
                  <div className="ms-2">Monthly Scholarship 3%</div>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-center">
             
            </div>
          </div>
        </div>

        {/* Bull Starter Package */}
        <div className="col-md-3 my-4">
          <div className="card p-3 mt-3 w-100 w-md-75 w-lg-50 rounded-3 h-100 cardpackage">
            <div className="card-body d-flex flex-column">
              <h3 className="text-center fw-bold">Master Course</h3>
              <div className="fw-bold h5 text-center mt-2">RS. 3540(Incl. GST)</div>
              <div className="flex-grow-1">
                <div className="d-flex mt-2">
                  <div>🌟</div>
                  <div className="ms-2"> Advance crypto knowledge</div>
                </div>
                <div className="d-flex mt-2">
                  <div>🌟</div>
                  <div className="ms-2"> Meme coin checklist</div>
                </div>
                <div className="d-flex mt-2">
                  <div>🌟</div>
                  <div className="ms-2"> 3-month subscription for premium group</div>
                </div>
                <div className="d-flex mt-2">
                  <div>🌟</div>
                  <div className="ms-2">Future trading call</div>
                </div>
                <div className="d-flex mt-2">
                  <div>🌟</div>
                  <div className="ms-2">Bonus 5 long-term holding</div>
                </div>
                <div className="d-flex mt-2">
                  <div>🌟</div>
                  <div className="ms-2">Monthly Scholarship 5%</div>
                </div>
                {/* <div className="kick">🌟 Advance crypto knowledge</div> */}
                {/* <div className="kick">🌟 Meme coin checklist</div> */}
                {/* <div className="kick">
                  🌟 3-month subscription for premium group
                </div> */}
                {/* <div className="kick">🌟 Future trading call</div> */}
                {/* <div className="kick">🌟 Bonus 5 long-term holding</div> */}
              </div>
            </div>
           
          </div>
        </div>

        {/* Pro Master Package */}
        <div className="col-md-3 my-4">
          <div className="card p-3 mt-3 w-100 w-md-75 w-lg-50 rounded-3 h-100 cardpackage">
            <div className="card-body d-flex flex-column">
              <h3 className="text-center fw-bold">Pro Master Course</h3>
              <div className="fw-bold h5 text-center">RS. 7080(Incl. GST)</div>
              <div className="flex-grow-1">
                <div className="d-flex">
                  <div>🌟</div>
                  <div className="ms-2">Master trading skill + life time asset</div>
                </div>
                <div className="d-flex mt-2">
                  <div>🌟</div>
                  <div className="ms-2">1-year subscription for premium group</div>
                </div>
                <div className="d-flex mt-2">
                  <div>🌟</div>
                  <div className="ms-2">10 GEM coin name</div>
                </div>
                <div className="d-flex mt-2">
                  <div>🌟</div>
                  <div className="ms-2">Portfolio management</div>
                </div>
              </div>
            </div>
            
          </div>
        </div>

        {/* Teacher package */}
        <div className="col-md-3 my-4">
          <div className="card p-3 mt-3 w-100 w-md-75 w-lg-50 rounded-3 h-100 cardpackage">
            <div className="card-body d-flex flex-column">
              <h3 className="text-center fw-bold">Teacher Course</h3>
              <div className="fw-bold h5 text-center">RS. 11800(Incl. GST)</div>
              <div className="flex-grow-1">
                <div className="d-flex">
                  <div>🌟</div>
                  <div className="ms-2">Master trading skill + life time asset</div>
                </div>
                <div className="d-flex mt-2">
                  <div>🌟</div>
                  <div className="ms-2">1-year subscription for premium group</div>
                </div>
                <div className="d-flex mt-2">
                  <div>🌟</div>
                  <div className="ms-2">10 GEM coin name</div>
                </div>
                <div className="d-flex mt-2">
                  <div>🌟</div>
                  <div className="ms-2">Portfolio management</div>
                </div>
              </div>
            </div>
           
          </div>
        </div>
        {/* pro teacher */}
        <div className="col-md-3 my-4">
          <div className="card p-3 mt-3 w-100 w-md-75 w-lg-50 rounded-3 h-100 cardpackage">
            <div className="card-body d-flex flex-column">
              <h3 className="text-center fw-bold">Pro Teacher Course</h3>
              <div className="fw-bold h5 text-center">RS. 59000(Incl. GST)</div>
              <div className="flex-grow-1">
                <div className="d-flex">
                  <div>🌟</div>
                  <div className="ms-2">Master trading skill + life time asset</div>
                </div>
                <div className="d-flex mt-2">
                  <div>🌟</div>
                  <div className="ms-2">1-year subscription for premium group</div>
                </div>
                <div className="d-flex mt-2">
                  <div>🌟</div>
                  <div className="ms-2">10 GEM coin name</div>
                </div>
                <div className="d-flex mt-2">
                  <div>🌟</div>
                  <div className="ms-2">Portfolio management</div>
                </div>
              </div>
            </div>
           
          </div>
        </div>

        {/* Monthly Subscription (Add-On) */}
        <div className="col-md-3 my-4">
          <div className="card p-3 mt-3 w-100 w-md-75 w-lg-50 rounded-3 h-100 cardpackage">
            <div className="card-body d-flex flex-column">
              <h3 className="text-center fw-bold " style={{ color: 'gold' }}>
                Monthly subscription
              </h3>
              <div className="fw-bold h5 text-center mt-3">RS. 944(Incl. GST)</div>
              {/* <div className="flex-grow-1">
              <div className="d-flex">
                <div>🌟</div>
                <div className="ms-2">Master trading skill + life time asset</div>
              </div>
              <div className="d-flex mt-2">
                <div>🌟</div>
                <div className="ms-2">1-year subscription for premium group</div>
              </div>
              <div className="d-flex mt-2">
                <div>🌟</div>
                <div className="ms-2">10 GEM coin name</div>
              </div>
               <div className="d-flex mt-2">
                <div>🌟</div>
                <div className="ms-2">Portfolio management</div>
              </div>
          
              </div> */}
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Allcourses
