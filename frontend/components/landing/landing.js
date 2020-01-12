import React from 'react';
import { Link } from 'react-router-dom';


class Landing extends React.Component{
  constructor(props) {
    super(props)
  }

  render(){
    const { currentUser, openModal } = this.props;

    const vid1 = "https://d1gwm4cf8hecp4.cloudfront.net/videos/homepage/list-grid/home-list-EN.mp4";
    const vid2 = "https://d1gwm4cf8hecp4.cloudfront.net/videos/homepage/boards/home-boards-EN.mp4";
    const vid3 = "https://d1gwm4cf8hecp4.cloudfront.net/videos/homepage/timeline/home-timeline-EN.mp4";

    $(document).ready(function () {
      $('#msg-1').click(function () {
        $('#msg-1').addClass('intro_highlights_selected');
        $('#msg-2').removeClass('intro_highlights_selected');
        $('#msg-3').removeClass('intro_highlights_selected');
        $('.img-container video source').attr('src', vid1);
        $(".img-container video")[0].load();
      });
    });

    $(document).ready(function () {
      $('#msg-2').click(function () {
        $('#msg-1').removeClass('intro_highlights_selected');
        $('#msg-2').addClass('intro_highlights_selected');
        $('#msg-3').removeClass('intro_highlights_selected');
        $('.img-container video source').attr('src', vid2);
        $(".img-container video")[0].load();
      });
    });

    $(document).ready(function () {
      $('#msg-3').click(function () {
        $('#msg-1').removeClass('intro_highlights_selected');
        $('#msg-2').removeClass('intro_highlights_selected');
        $('#msg-3').addClass('intro_highlights_selected');
        $('.img-container video source').attr('src', vid3);
        $(".img-container video")[0].load();
      });
    });

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
                <video autoPlay playsInline loop muted className="background-vid" poster="video broke">
                  <source src={vid1} type="video/mp4"/>
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