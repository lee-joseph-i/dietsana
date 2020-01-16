import React from 'react';
import { Link } from 'react-router-dom';


class Landing extends React.Component{
  constructor(props) {
    super(props)
  }

  componentDidMount(){
    $('#msg-1').click(function () {
      $('#msg-1').addClass('intro_highlights_selected');
      $('#msg-2').removeClass('intro_highlights_selected');
      $('#msg-3').removeClass('intro_highlights_selected');
      $('#vid-1').addClass('background-vid');
      $('#vid-1').removeClass('hidden');
      $('#vid-2').addClass('hidden');
      $('#vid-2').removeClass('background-vid');
      $('#vid-3').addClass('hidden');
      $('#vid-3').removeClass('background-vid');
    });

    $('#msg-2').click(function () {
      $('#msg-1').removeClass('intro_highlights_selected');
      $('#msg-2').addClass('intro_highlights_selected');
      $('#msg-3').removeClass('intro_highlights_selected');
      $('#vid-1').addClass('hidden');
      $('#vid-1').removeClass('background-vid');
      $('#vid-2').removeClass('hidden');
      $('#vid-2').addClass('background-vid');
      $('#vid-3').addClass('hidden');
      $('#vid-3').removeClass('background-vid');
    });

    $('#msg-3').click(function () {
      $('#msg-1').removeClass('intro_highlights_selected');
      $('#msg-2').removeClass('intro_highlights_selected');
      $('#msg-3').addClass('intro_highlights_selected');
      $('#vid-1').addClass('hidden');
      $('#vid-1').removeClass('background-vid');
      $('#vid-2').addClass('hidden');
      $('#vid-2').removeClass('background-vid');
      $('#vid-3').removeClass('hidden');
      $('#vid-3').addClass('background-vid');
    });
  }

  render(){
    const { currentUser, openModal } = this.props;

    return(
      <div>
        <section className="landing_body">
          <ul>
            <li>
              <div className="welcome_intro">
                <h1>Make more time for the work that matters most</h1>
                <p>Dietsana is the work management platform teams use to stay focused on the goals, projects, and daily tasks that grow business.</p>
                {
                  currentUser ? 
                  <Link className="return" to="/app">Return to my Dietsana</Link> 
                  : 
                  <button className="signup" onClick={() => openModal('signup')}>Try for free</button>
                }
              </div>
              <div>
              <div className="img-container">
                <video autoPlay playsInline loop muted id="vid-1" className="background-vid">
                    <source src="https://d1gwm4cf8hecp4.cloudfront.net/videos/homepage/list-grid/home-list-EN.mp4" type="video/mp4"/>
                </video>
                <video autoPlay playsInline loop muted id="vid-2" className="hidden">
                    <source src="https://d1gwm4cf8hecp4.cloudfront.net/videos/homepage/boards/home-boards-EN.mp4" type="video/mp4"/>
                </video>
                <video autoPlay playsInline loop muted id="vid-3" className="hidden">
                    <source src="https://d1gwm4cf8hecp4.cloudfront.net/videos/homepage/timeline/home-timeline-EN.mp4" type="video/mp4"/>
                </video>
                <div className="mosaic">
                  <div className="img-mosaic1">
                    <img src={window.landing1} />
                  </div>
                  <div className="img-mosaic2">
                    <img src={window.landing2} />
                  </div>
                  <div className="img-mosaic3">
                    <img src={window.landing3} />
                  </div>
                </div>
              </div>
              </div>
            </li>
            <li className="intro_highlights">
                <section id="msg-1" className="intro_highlights_selected">
                  <span id="pos-1"></span>
                  <p>Get organized</p>
                  <p>Plan and structure work in a way that’s best for you. Set priorities and deadlines. Share details and assign tasks. All in one place.</p>
                </section>
                <section id="msg-2">
                  <span id="pos-2"></span>
                  <p>Stay on track</p>
                  <p>Follow projects and tasks through every stage. You know where work stands and can keep everyone aligned on goals.</p>
                </section>
                <section id="msg-3">
                  <span id="pos-3"></span>
                  <p>Hit deadlines</p>
                  <p>Create visual project plans to see how every step maps out over time. Pinpoint risks. Eliminate roadblocks. Even when plans change.</p>
                </section>
            </li>

            <li>
              <div className="construction">
                <p>(Under Construction, more to come!)</p>
              </div>
            </li>

          </ul>
        </section>
      </div>
    )
  }
}

export default Landing;