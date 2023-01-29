import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import "bootstrap/dist/css/bootstrap.min.css";
import tc from '../images/tc.png'
import lq from '../images/lq.png'
import ff from '../images/ff.png'

export default function HomePage() {
  return (
    <div><div className="content">
    {/* <h1 className="head">Toppic Gamming</h1> */}
    <div className="row">
        <div className="col-3 left">
            <ol>
                <li>Game</li>
                <hr />
                <li>Account</li>
                <hr />
                <li>News</li>
                <hr />
                <li>Support</li>
            </ol>
        </div>

        <div className="col-6 main">
            <div className="center">
                <h1>Hot Games</h1>
                <p>
                    The advertising strategy that turned Free Fire into a hundred million dollar game, 
                    explaining why it surpassed PUBG Mobile in important markets. Since "Fortress Night" 
                    was removed from the App Store and Google Play, overseas "chicken-eating" (survival) 
                    mobile games have basically formed the tripod situation of "PUBG Mobile", " Call of Duty: Mobile" and 
                    "Free Fire".
                </p>
                <div>
                    <Carousel>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={ff}
                            />
                        </Carousel.Item>

                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={lq}
                            />
                        </Carousel.Item>

                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={tc}
                            />
                        </Carousel.Item>
                    </Carousel>
                </div>
            </div>
        </div>

        <div className="col-3 right">
            <h1>What?</h1>
            <p>
                The Pulpit Rock is a part of a mountain that looks like a pulpit.
            </p>
            <h1>Where?</h1>
            <p>The Pulpit Rock is in Norway</p>
            <h1>Download</h1>
            <p>The walk is free!</p>
        </div>
    </div>
</div></div>
  )
}
