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
              <div className="fw-bold h5 text-center mt-2" style={{color:"gold"}}>Points: 1500</div>
              <div className="flex-grow-1">
                <div className="d-flex mt-2">

                  <div>🌟</div>
                  <div className="ms-2">Basic Crypto Knowledge




</div>
                </div>
                <div className="d-flex mt-2">
                  <div>🌟</div>
                  <div className="ms-2">Basic Buy/Sell On Centralised Exchange</div>
                </div>
                <div className="d-flex mt-2">
                  <div>🌟</div>
                  <div className="ms-2">Crypto Sip Guide</div>
                </div>
                <div className="d-flex mt-2">
                  <div>🌟</div>
                  <div className="ms-2">Portfolio Management Guide</div>
                </div>
                <div className="d-flex mt-2">
                  <div>🌟</div>
                  <div className="ms-2">Monthly Spot Call</div>
                </div>
                 <div className="d-flex mt-2">
                  <div>🌟</div>
                  <div className="ms-2">Basic Fundamental Analysis, Technical Analysis</div>
                </div>
                <div className="d-flex mt-2">
                  <div>🌟</div>
                  <div className="ms-2">One Month Subscription</div>
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
              <div className="fw-bold h5 text-center mt-2" style={{color:"gold"}}>Points: 3000</div>
              <div className="flex-grow-1">
              
                <div className="d-flex mt-2">
                  <div>🌟</div>
                  <div className="ms-2"> Advance Crypto Trading Knowledge</div>
                </div>
                <div className="d-flex mt-2">
                  <div>🌟</div>
                  <div className="ms-2">Spot, Future, Margin Trading</div>
                </div>
                <div className="d-flex mt-2">
                  <div>🌟</div>
                  <div className="ms-2">Regular Future Trading Call</div>
                </div>
                <div className="d-flex mt-2">
                  <div>🌟</div>
                  <div className="ms-2">Risk Management Strategy</div>
                </div>
                <div className="d-flex mt-2">
                  <div>🌟</div>
                  <div className="ms-2">Regular PNL Strategy</div>
                </div>
                <div className="d-flex mt-2">
                  <div>🌟</div>
                  <div className="ms-2">Liquidation Strategy</div>
                </div>
                <div className="d-flex mt-2">
                  <div>🌟</div>
                  <div className="ms-2">Portfolio Management (Advance)</div>
                </div>
                 <div className="d-flex mt-2">
                  <div>🌟</div>
                  <div className="ms-2">Advance Fundamental Analysis, Technical Analysis</div>
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
              <div className="fw-bold h5 text-center mt-2" style={{color:"gold"}}>Points: 6000</div>
              <div className="flex-grow-1">
                <div className="d-flex">
                  <div>🌟</div>
                  <div className="ms-2">Crypto Education A To Z</div>
                </div>
                <div className="d-flex mt-2">
                  <div>🌟</div>
                  <div className="ms-2">Premium Future Trading Strategy</div>
                </div>
                <div className="d-flex mt-2">
                  <div>🌟</div>
                  <div className="ms-2">Regular Premium Call</div>
                </div>
                <div className="d-flex mt-2">
                  <div>🌟</div>
                  <div className="ms-2">Premium Portfolio Management</div>
                </div>
                <div className="d-flex mt-2">
                  <div>🌟</div>
                  <div className="ms-2">Five Long-Term Holding Coin Name Suggestion</div>
                </div>
                <div className="d-flex mt-2">
                  <div>🌟</div>
                  <div className="ms-2">Fund Management Strategy</div>
                </div>
                <div className="d-flex mt-2">
                  <div>🌟</div>
                  <div className="ms-2">A To Z Fundamental Analysis, Technical Analysis</div>
              </div>
              <div className="d-flex mt-2">
                  <div>🌟</div>
                  <div className="ms-2">Six Months Subscription</div>
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
              <div className="fw-bold h5 text-center mt-2" style={{color:"gold"}}>Points: 10,000</div>
              <div className="flex-grow-1">
                <div className="d-flex">
                  <div>🌟</div>
                  <div className="ms-2">Whales Wallet Tracking</div>
                </div>
                <div className="d-flex mt-2">
                  <div>🌟</div>
                  <div className="ms-2">Crypto Taxation</div>
                </div>
                <div className="d-flex mt-2">
                  <div>🌟</div>
                  <div className="ms-2">Crypto Rules And Knowledge</div>
                </div>
                <div className="d-flex mt-2">
                  <div>🌟</div>
                  <div className="ms-2">Fundamental Analysis and Technical Analysis (Complete)</div>
                </div>
                 <div className="d-flex mt-2">
                  <div>🌟</div>
                  <div className="ms-2">DEX And CEX Arbitrage Model</div>
                </div>
                 <div className="d-flex mt-2">
                  <div>🌟</div>
                  <div className="ms-2">One Year Subscription</div>
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
              <div className="fw-bold h5 text-center mt-2" style={{color:"gold"}}>Points: 25,000</div>
              <div className="flex-grow-1">
                <div className="d-flex">
                  <div>🌟</div>
                  <div className="ms-2">Whale Wallet Tracking</div>
                </div>
                <div className="d-flex mt-2">
                  <div>🌟</div>
                  <div className="ms-2">Crypto Taxation</div>
                </div>
                <div className="d-flex mt-2">
                  <div>🌟</div>
                  <div className="ms-2">Crypto Rules And Knowledge</div>
                </div>
                <div className="d-flex mt-2">
                  <div>🌟</div>
                  <div className="ms-2">Fundamental Analysis and Technical Analysis (Complete)</div>
                </div>
                <div className="d-flex mt-2">
                  <div>🌟</div>
                  <div className="ms-2">DEX And CEX Arbitrage Model</div>
                </div>
                <div className="d-flex mt-2">
                  <div>🌟</div>
                  <div className="ms-2">One Year Subscription</div>
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
              <div className="fw-bold h5 text-center mt-2" style={{color:"gold"}}>Points: 800</div>
              <div className="flex-grow-1">
              <div className="d-flex">
                <div>🌟</div>
                <div className="ms-2">Monthly Trading Guidance</div>
              </div>
              <div className="d-flex mt-2">
                <div>🌟</div>
                <div className="ms-2">Monthly Special Classes</div>
              </div>
              <div className="d-flex mt-2">
                <div>🌟</div>
                <div className="ms-2">Expert Advice</div>
              </div>
               <div className="d-flex mt-2">
                <div>🌟</div>
                <div className="ms-2">Two Coin Suggestion</div>
              </div>
              <div className="d-flex mt-2">
                <div>🌟</div>
                <div className="ms-2">One Special Call</div>
              </div>
          
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Allcourses
